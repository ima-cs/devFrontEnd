"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getAuthContext } from "@/lib/auth";
import { isSupabaseConfigured, SUPABASE_NOT_CONFIGURED_MSG } from "@/lib/utils";

export type FormState = { error: string | null; success: string | null };

export async function createOrUpdateReviewAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!isSupabaseConfigured())
    return { error: SUPABASE_NOT_CONFIGURED_MSG, success: null };

  const ctx = await getAuthContext();
  if (!ctx) return { error: "Vous devez être connecté.", success: null };
  if (ctx.profile.role !== "client") {
    return { error: "Seuls les clients peuvent laisser un avis.", success: null };
  }

  const provider_id = String(formData.get("provider_id") ?? "").trim();
  const rating = Number(formData.get("rating"));
  const comment = String(formData.get("comment") ?? "").trim();

  if (!provider_id) return { error: "Prestataire manquant.", success: null };
  if (!rating || rating < 1 || rating > 5)
    return { error: "Note invalide (1 à 5).", success: null };

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("reviews")
    .select("id")
    .eq("client_id", ctx.profile.id)
    .eq("provider_id", provider_id)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("reviews")
      .update({ rating, comment: comment || null })
      .eq("id", existing.id);
    if (error) return { error: error.message, success: null };
  } else {
    const { error } = await supabase.from("reviews").insert({
      client_id: ctx.profile.id,
      provider_id,
      rating,
      comment: comment || null,
    });
    if (error) return { error: error.message, success: null };
  }

  revalidatePath("/client/reviews");
  revalidatePath(`/providers/${provider_id}`);
  return { error: null, success: "Avis enregistré." };
}

export async function deleteReviewAction(formData: FormData) {
  if (!isSupabaseConfigured()) return;

  const ctx = await getAuthContext();
  if (!ctx) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  await supabase
    .from("reviews")
    .delete()
    .eq("id", id)
    .eq("client_id", ctx.profile.id);

  revalidatePath("/client/reviews");
}
