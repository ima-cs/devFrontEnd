"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getAuthContext } from "@/lib/auth";
import { isSupabaseConfigured, SUPABASE_NOT_CONFIGURED_MSG } from "@/lib/utils";

export type FormState = { error: string | null; success: string | null };

export async function updateProviderProfileAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!isSupabaseConfigured())
    return { error: SUPABASE_NOT_CONFIGURED_MSG, success: null };

  const ctx = await getAuthContext();
  if (!ctx) return { error: "Vous devez être connecté.", success: null };
  if (ctx.profile.role !== "provider") {
    return { error: "Réservé aux prestataires.", success: null };
  }

  const full_name = String(formData.get("full_name") ?? "").trim();
  const professional_name = String(formData.get("professional_name") ?? "").trim();
  const category_id = String(formData.get("category_id") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const experience_years = Number(formData.get("experience_years") ?? 0);
  const city = String(formData.get("city") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!full_name || !professional_name || !category_id) {
    return {
      error: "Nom, nom professionnel et catégorie sont obligatoires.",
      success: null,
    };
  }

  const supabase = await createClient();

  const { error: profErr } = await supabase
    .from("profiles")
    .update({ full_name, city: city || null, phone: phone || null })
    .eq("user_id", ctx.userId);
  if (profErr) return { error: profErr.message, success: null };

  const { error: provErr } = await supabase
    .from("providers")
    .update({
      professional_name,
      category_id,
      description: description || null,
      experience_years: Number.isFinite(experience_years) ? experience_years : 0,
      city: city || null,
      phone: phone || null,
    })
    .eq("user_id", ctx.userId);
  if (provErr) return { error: provErr.message, success: null };

  revalidatePath("/provider/profile");
  revalidatePath("/provider/dashboard");
  revalidatePath("/providers", "layout");
  revalidatePath("/", "layout");
  return { error: null, success: "Profil professionnel mis à jour." };
}

export async function togglePremiumAction(): Promise<void> {
  if (!isSupabaseConfigured()) return;

  const ctx = await getAuthContext();
  if (!ctx || ctx.profile.role !== "provider") return;

  const supabase = await createClient();
  const { data: provider } = await supabase
    .from("providers")
    .select("id, is_premium")
    .eq("user_id", ctx.userId)
    .maybeSingle();

  if (!provider) return;

  await supabase
    .from("providers")
    .update({ is_premium: !provider.is_premium })
    .eq("id", provider.id);

  revalidatePath("/provider/premium");
  revalidatePath("/provider/dashboard");
  revalidatePath("/providers");
  revalidatePath("/", "layout");
}
