"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getAuthContext } from "@/lib/auth";
import { isSupabaseConfigured, SUPABASE_NOT_CONFIGURED_MSG } from "@/lib/utils";
import type { RequestStatus } from "@/types/database";

export type FormState = { error: string | null; success: string | null };

export async function createRequestAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!isSupabaseConfigured())
    return { error: SUPABASE_NOT_CONFIGURED_MSG, success: null };

  const ctx = await getAuthContext();
  if (!ctx) return { error: "Vous devez être connecté.", success: null };
  if (ctx.profile.role !== "client" && ctx.profile.role !== "admin") {
    return { error: "Seuls les clients peuvent envoyer une demande.", success: null };
  }

  const provider_id = String(formData.get("provider_id") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const service_type = String(formData.get("service_type") ?? "").trim() || null;
  const city = String(formData.get("city") ?? "").trim() || null;
  const desired_date_raw = String(formData.get("desired_date") ?? "").trim();
  const desired_date = desired_date_raw || null;

  if (!provider_id) return { error: "Prestataire manquant.", success: null };
  if (!description) return { error: "La description du besoin est obligatoire.", success: null };

  const supabase = await createClient();
  const { error } = await supabase.from("service_requests").insert({
    client_id: ctx.profile.id,
    provider_id,
    service_type,
    description,
    city,
    desired_date,
    status: "pending" as RequestStatus,
  });

  if (error) return { error: error.message, success: null };

  revalidatePath("/client/requests");
  redirect("/client/requests?sent=1");
}

export async function updateRequestStatusAction(formData: FormData) {
  if (!isSupabaseConfigured()) return;

  const ctx = await getAuthContext();
  if (!ctx) return;

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as RequestStatus;
  if (!id || !["accepted", "rejected", "completed", "pending"].includes(status))
    return;

  const supabase = await createClient();
  await supabase.from("service_requests").update({ status }).eq("id", id);

  revalidatePath("/provider/requests");
  revalidatePath("/client/requests");
  revalidatePath("/provider/dashboard");
  revalidatePath("/client/dashboard");
}
