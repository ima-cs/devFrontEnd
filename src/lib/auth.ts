import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";
import { getDemoSession } from "@/lib/demo-auth";
import { DEMO_PROVIDERS } from "@/lib/demo-data";
import type { Profile, Provider, UserRole } from "@/types/database";

export interface AuthContext {
  userId: string;
  email: string | null;
  profile: Profile;
}

export async function getAuthContext(): Promise<AuthContext | null> {
  // ─── Mode démo ───────────────────────────────────────────────────────────
  if (!isSupabaseConfigured()) {
    const session = await getDemoSession();
    if (!session) return null;
    return {
      userId: session.id,
      email: session.email,
      profile: {
        id: session.profile_id,
        user_id: session.id,
        full_name: session.full_name,
        email: session.email,
        phone: session.phone,
        city: session.city,
        role: session.role,
        created_at: new Date().toISOString(),
      },
    };
  }

  // ─── Mode Supabase ───────────────────────────────────────────────────────
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!profile) return null;

    return {
      userId: user.id,
      email: user.email ?? null,
      profile: profile as Profile,
    };
  } catch {
    return null;
  }
}

export async function requireAuth(roles?: UserRole | UserRole[]): Promise<AuthContext> {
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");

  if (roles) {
    const allowed = Array.isArray(roles) ? roles : [roles];
    if (!allowed.includes(ctx.profile.role)) redirect("/");
  }
  return ctx;
}

export async function getProviderForCurrentUser(): Promise<Provider | null> {
  // ─── Mode démo ───────────────────────────────────────────────────────────
  if (!isSupabaseConfigured()) {
    const session = await getDemoSession();
    if (!session) return null;
    // 1) Compte démo lié à un prestataire existant (seed)
    if (session.provider_id) {
      const existing = DEMO_PROVIDERS.find((p) => p.id === session.provider_id);
      if (existing) return existing;
    }
    // 2) Prestataire fraîchement inscrit : on synthétise une fiche minimale
    //    à partir des infos de session (le profil pro complet n'est pas
    //    persisté dans le cookie).
    if (session.role === "provider") {
      return {
        id: session.provider_id || session.id,
        user_id: session.id,
        professional_name: session.full_name,
        category_id: null,
        description: null,
        experience_years: 0,
        city: session.city,
        phone: session.phone,
        avatar_url: null,
        is_premium: false,
        is_validated: true,
        created_at: new Date().toISOString(),
      };
    }
    return null;
  }

  // ─── Mode Supabase ───────────────────────────────────────────────────────
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from("providers")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    return (data as Provider) ?? null;
  } catch {
    return null;
  }
}
