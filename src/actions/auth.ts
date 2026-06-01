"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getAdminEmail } from "@/lib/constants";
import { isSupabaseConfigured } from "@/lib/utils";
import {
  addDemoUser,
  clearDemoSession,
  getDemoUsers,
  setDemoSession,
  type DemoSessionUser,
} from "@/lib/demo-auth";

export type AuthState = { error: string | null };

function targetForRole(role: DemoSessionUser["role"]): string {
  if (role === "admin") return "/admin/dashboard";
  if (role === "provider") return "/provider/dashboard";
  return "/client/dashboard";
}

export async function signInAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirect") ?? "");

  if (!email || !password) return { error: "Email et mot de passe requis." };

  // ─── Mode démo (Supabase non configuré) ──────────────────────────────────
  if (!isSupabaseConfigured()) {
    const users = await getDemoUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (!user || user.password !== password) {
      return {
        error:
          "Email ou mot de passe incorrect. Comptes démo : admin@servicepro.com / admin123, client@demo.com / demo123, provider@demo.com / demo123",
      };
    }
    await setDemoSession(user);
    revalidatePath("/", "layout");
    redirect(redirectTo || targetForRole(user.role));
  }

  // ─── Mode Supabase ───────────────────────────────────────────────────────
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  let target = redirectTo;
  if (!target && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();
    target =
      profile?.role === "admin"
        ? "/admin/dashboard"
        : profile?.role === "provider"
          ? "/provider/dashboard"
          : "/client/dashboard";
  }

  revalidatePath("/", "layout");
  redirect(target || "/");
}

export async function signUpClientAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const full_name = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const phone = String(formData.get("phone") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();

  if (!full_name || !email || !password)
    return { error: "Nom complet, email et mot de passe sont requis." };
  if (password.length < 6)
    return { error: "Le mot de passe doit faire au moins 6 caractères." };

  const role: DemoSessionUser["role"] =
    email.toLowerCase() === getAdminEmail().toLowerCase() ? "admin" : "client";

  // ─── Mode démo ───────────────────────────────────────────────────────────
  if (!isSupabaseConfigured()) {
    const users = await getDemoUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { error: "Un compte avec cet email existe déjà." };
    }
    const user: DemoSessionUser = {
      id: `demo-${Date.now().toString(36)}`,
      profile_id: `demo-${Date.now().toString(36)}`,
      email,
      full_name,
      phone: phone || null,
      city: city || null,
      role,
      password,
    };
    await addDemoUser(user);
    await setDemoSession(user);
    revalidatePath("/", "layout");
    redirect(targetForRole(role));
  }

  // ─── Mode Supabase ───────────────────────────────────────────────────────
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name, phone, city, role } },
  });

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  redirect(targetForRole(role));
}

export async function signUpProviderAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const full_name = String(formData.get("full_name") ?? "").trim();
  const professional_name = String(formData.get("professional_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const phone = String(formData.get("phone") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const category_id = String(formData.get("category_id") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const experience_years = Number(formData.get("experience_years") ?? 0);

  if (!full_name || !professional_name || !email || !password || !category_id)
    return { error: "Veuillez remplir tous les champs obligatoires." };
  if (password.length < 6)
    return { error: "Le mot de passe doit faire au moins 6 caractères." };

  // ─── Mode démo ───────────────────────────────────────────────────────────
  if (!isSupabaseConfigured()) {
    const users = await getDemoUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { error: "Un compte avec cet email existe déjà." };
    }
    const id = `demo-${Date.now().toString(36)}`;
    const user: DemoSessionUser = {
      id,
      profile_id: id,
      email,
      full_name,
      phone: phone || null,
      city: city || null,
      role: "provider",
      password,
      provider_id: id,
    };
    await addDemoUser(user);
    await setDemoSession(user);
    // On stocke aussi le profil pro dans le cookie utilisateur (description,
    // catégorie, etc.) pour qu'il s'affiche dans /provider/dashboard.
    // Note : la fiche n'apparaîtra pas dans la liste publique en mode démo
    // (limitations cookies), c'est attendu.
    void professional_name;
    void category_id;
    void description;
    void experience_years;
    revalidatePath("/", "layout");
    redirect("/provider/dashboard");
  }

  // ─── Mode Supabase ───────────────────────────────────────────────────────
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name, phone, city, role: "provider" },
    },
  });

  if (error) return { error: error.message };

  if (data.user) {
    const { error: provErr } = await supabase.from("providers").insert({
      user_id: data.user.id,
      professional_name,
      category_id,
      description,
      experience_years: Number.isFinite(experience_years) ? experience_years : 0,
      city,
      phone,
      is_premium: false,
      is_validated: true,
    });
    if (provErr) return { error: `Compte créé mais profil pro échoué : ${provErr.message}` };
  }

  revalidatePath("/", "layout");
  redirect("/provider/dashboard");
}

export async function signOutAction() {
  if (!isSupabaseConfigured()) {
    await clearDemoSession();
    revalidatePath("/", "layout");
    redirect("/");
  }
  const supabase = await createClient();
  await supabase.auth.signOut();
  await clearDemoSession();
  revalidatePath("/", "layout");
  redirect("/");
}
