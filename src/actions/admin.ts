"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getAuthContext } from "@/lib/auth";
import { isSupabaseConfigured, SUPABASE_NOT_CONFIGURED_MSG } from "@/lib/utils";

export type FormState = { error: string | null; success: string | null };

async function requireAdmin() {
  if (!isSupabaseConfigured()) return null;
  const ctx = await getAuthContext();
  if (!ctx || ctx.profile.role !== "admin") return null;
  return ctx;
}

// ============================================================
// Providers
// ============================================================
export async function setProviderValidatedAction(formData: FormData) {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id") ?? "");
  const value = String(formData.get("value") ?? "") === "1";
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("providers").update({ is_validated: value }).eq("id", id);
  revalidatePath("/admin/providers");
  revalidatePath("/providers");
}

export async function setProviderPremiumAction(formData: FormData) {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id") ?? "");
  const value = String(formData.get("value") ?? "") === "1";
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("providers").update({ is_premium: value }).eq("id", id);
  revalidatePath("/admin/providers");
  revalidatePath("/providers");
  revalidatePath("/", "layout");
}

export async function deleteProviderAction(formData: FormData) {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("providers").delete().eq("id", id);
  revalidatePath("/admin/providers");
  revalidatePath("/providers");
}

// ============================================================
// Users (profiles)
// ============================================================
export async function deleteUserProfileAction(formData: FormData) {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("profiles").delete().eq("id", id);
  revalidatePath("/admin/users");
  revalidatePath("/admin/statistics");
}

// ============================================================
// Categories
// ============================================================
export async function createCategoryAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!isSupabaseConfigured())
    return { error: SUPABASE_NOT_CONFIGURED_MSG, success: null };
  if (!(await requireAdmin()))
    return { error: "Accès refusé.", success: null };

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!name) return { error: "Le nom de la catégorie est obligatoire.", success: null };

  const supabase = await createClient();
  const { error } = await supabase
    .from("categories")
    .insert({ name, description: description || null });
  if (error) return { error: error.message, success: null };

  revalidatePath("/admin/categories");
  revalidatePath("/categories");
  return { error: null, success: "Catégorie créée." };
}

export async function updateCategoryAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!isSupabaseConfigured())
    return { error: SUPABASE_NOT_CONFIGURED_MSG, success: null };
  if (!(await requireAdmin()))
    return { error: "Accès refusé.", success: null };

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!id || !name) return { error: "Champs incomplets.", success: null };

  const supabase = await createClient();
  const { error } = await supabase
    .from("categories")
    .update({ name, description: description || null })
    .eq("id", id);
  if (error) return { error: error.message, success: null };

  revalidatePath("/admin/categories");
  revalidatePath("/categories");
  return { error: null, success: "Catégorie mise à jour." };
}

export async function deleteCategoryAction(formData: FormData) {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("categories").delete().eq("id", id);
  revalidatePath("/admin/categories");
  revalidatePath("/categories");
}

// ============================================================
// Reviews
// ============================================================
export async function deleteReviewByAdminAction(formData: FormData) {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("reviews").delete().eq("id", id);
  revalidatePath("/admin/reviews");
}
