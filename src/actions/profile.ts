"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getAuthContext } from "@/lib/auth";
import { isSupabaseConfigured, SUPABASE_NOT_CONFIGURED_MSG } from "@/lib/utils";

export type FormState = { error: string | null; success: string | null };

export async function updateProfileAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!isSupabaseConfigured())
    return { error: SUPABASE_NOT_CONFIGURED_MSG, success: null };

  const ctx = await getAuthContext();
  if (!ctx) return { error: "Vous devez être connecté.", success: null };

  const full_name = String(formData.get("full_name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();

  if (!full_name) return { error: "Le nom complet est obligatoire.", success: null };

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ full_name, phone: phone || null, city: city || null })
    .eq("user_id", ctx.userId);

  if (error) return { error: error.message, success: null };

  revalidatePath("/client/profile");
  revalidatePath("/client/dashboard");
  revalidatePath("/", "layout");
  return { error: null, success: "Profil mis à jour." };
}
