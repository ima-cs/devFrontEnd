import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";
import {
  DEMO_ADS,
  DEMO_CATEGORIES,
  DEMO_PROVIDERS,
  DEMO_REVIEWS,
} from "@/lib/demo-data";
import type {
  Ad,
  Category,
  ProviderWithStats,
  RequestWithRelations,
  Review,
  ServiceRequest,
} from "@/types/database";

export interface ProviderFilters {
  city?: string;
  categoryId?: string;
  premiumOnly?: boolean;
  minRating?: number;
  search?: string;
}

function statsFromReviews(reviews: { rating: number }[]) {
  if (!reviews.length) return { reviews_count: 0, average_rating: 0 };
  const sum = reviews.reduce((s, r) => s + r.rating, 0);
  return {
    reviews_count: reviews.length,
    average_rating: Math.round((sum / reviews.length) * 10) / 10,
  };
}

export async function getCategoryById(id: string): Promise<Category | null> {
  if (!isSupabaseConfigured())
    return DEMO_CATEGORIES.find((c) => c.id === id) ?? null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    return (data as Category) ?? DEMO_CATEGORIES.find((c) => c.id === id) ?? null;
  } catch {
    return DEMO_CATEGORIES.find((c) => c.id === id) ?? null;
  }
}

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return DEMO_CATEGORIES;
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("categories").select("*").order("name");
    return data?.length ? (data as Category[]) : DEMO_CATEGORIES;
  } catch {
    return DEMO_CATEGORIES;
  }
}

export async function getProviders(
  filters: ProviderFilters = {},
): Promise<ProviderWithStats[]> {
  const apply = (list: ProviderWithStats[]) => {
    let out = list;
    if (filters.city) out = out.filter((p) => p.city === filters.city);
    if (filters.categoryId)
      out = out.filter((p) => p.category_id === filters.categoryId);
    if (filters.premiumOnly) out = out.filter((p) => p.is_premium);
    if (filters.minRating)
      out = out.filter((p) => p.average_rating >= filters.minRating!);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      out = out.filter(
        (p) =>
          p.professional_name.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q),
      );
    }
    return [...out].sort((a, b) => {
      if (a.is_premium !== b.is_premium) return a.is_premium ? -1 : 1;
      return b.average_rating - a.average_rating;
    });
  };

  if (!isSupabaseConfigured()) return apply(DEMO_PROVIDERS);

  try {
    const supabase = await createClient();
    let query = supabase
      .from("providers")
      .select("*, categories(id, name), reviews(rating)")
      .eq("is_validated", true);

    if (filters.city) query = query.eq("city", filters.city);
    if (filters.categoryId) query = query.eq("category_id", filters.categoryId);
    if (filters.premiumOnly) query = query.eq("is_premium", true);
    if (filters.search)
      query = query.or(
        `professional_name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`,
      );

    const { data } = await query.order("is_premium", { ascending: false });
    if (!data?.length) return apply(DEMO_PROVIDERS);

    const enriched: ProviderWithStats[] = (data as unknown as Array<
      ProviderWithStats & { reviews: { rating: number }[] }
    >).map((p) => {
      const { reviews_count, average_rating } = statsFromReviews(p.reviews ?? []);
      return { ...p, reviews_count, average_rating };
    });

    return apply(enriched);
  } catch {
    return apply(DEMO_PROVIDERS);
  }
}

export async function getFeaturedProviders(limit = 4): Promise<ProviderWithStats[]> {
  const providers = await getProviders({ premiumOnly: true });
  return providers.slice(0, limit);
}

export async function getProviderById(
  id: string,
): Promise<ProviderWithStats | null> {
  if (!isSupabaseConfigured()) {
    return DEMO_PROVIDERS.find((p) => p.id === id) ?? null;
  }
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("providers")
      .select("*, categories(id, name), reviews(rating)")
      .eq("id", id)
      .maybeSingle();

    if (!data) return DEMO_PROVIDERS.find((p) => p.id === id) ?? null;

    const p = data as unknown as ProviderWithStats & {
      reviews: { rating: number }[];
    };
    const { reviews_count, average_rating } = statsFromReviews(p.reviews ?? []);
    return { ...p, reviews_count, average_rating };
  } catch {
    return DEMO_PROVIDERS.find((p) => p.id === id) ?? null;
  }
}

export async function getReviewsForProvider(
  providerId: string,
): Promise<Array<Review & { profiles: { full_name: string } | null }>> {
  if (!isSupabaseConfigured())
    return (DEMO_REVIEWS[providerId] ?? []).map((r) => ({ ...r, profiles: null }));
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("reviews")
      .select("*, profiles(full_name)")
      .eq("provider_id", providerId)
      .order("created_at", { ascending: false });
    return (
      (data as Array<Review & { profiles: { full_name: string } | null }>) ??
      (DEMO_REVIEWS[providerId] ?? []).map((r) => ({ ...r, profiles: null }))
    );
  } catch {
    return (DEMO_REVIEWS[providerId] ?? []).map((r) => ({ ...r, profiles: null }));
  }
}

export async function getRequestsForClient(
  clientProfileId: string,
): Promise<RequestWithRelations[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("service_requests")
      .select("*, providers(id, professional_name, city), profiles(id, full_name, email, phone)")
      .eq("client_id", clientProfileId)
      .order("created_at", { ascending: false });
    return (data as RequestWithRelations[]) ?? [];
  } catch {
    return [];
  }
}

export async function getRequestsForProvider(
  providerId: string,
): Promise<RequestWithRelations[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("service_requests")
      .select("*, providers(id, professional_name, city), profiles(id, full_name, email, phone)")
      .eq("provider_id", providerId)
      .order("created_at", { ascending: false });
    return (data as RequestWithRelations[]) ?? [];
  } catch {
    return [];
  }
}

export async function getReviewsByClient(
  clientProfileId: string,
): Promise<Array<Review & { providers: { id: string; professional_name: string } | null }>> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("reviews")
      .select("*, providers(id, professional_name)")
      .eq("client_id", clientProfileId)
      .order("created_at", { ascending: false });
    return (data as Array<Review & { providers: { id: string; professional_name: string } | null }>) ?? [];
  } catch {
    return [];
  }
}

export async function getReviewByClientAndProvider(
  clientProfileId: string,
  providerId: string,
): Promise<Review | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("client_id", clientProfileId)
      .eq("provider_id", providerId)
      .maybeSingle();
    return (data as Review) ?? null;
  } catch {
    return null;
  }
}

export type { ServiceRequest };

// ============================================================
// Admin queries
// ============================================================
export interface AdminProvider extends ProviderWithStats {
  profiles: { full_name: string; email: string } | null;
}

export async function getAllProvidersForAdmin(): Promise<AdminProvider[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("providers")
      .select(
        "*, categories(id, name), reviews(rating), profiles!providers_user_id_fkey(full_name, email)",
      )
      .order("is_premium", { ascending: false })
      .order("created_at", { ascending: false });

    if (!data) return [];
    return (data as unknown as Array<
      AdminProvider & { reviews: { rating: number }[] }
    >).map((p) => {
      const { reviews_count, average_rating } = statsFromReviews(p.reviews ?? []);
      return { ...p, reviews_count, average_rating };
    });
  } catch {
    return [];
  }
}

export async function getAllUsersForAdmin(): Promise<
  Array<{
    id: string;
    user_id: string | null;
    full_name: string;
    email: string;
    phone: string | null;
    city: string | null;
    role: string;
    created_at: string;
  }>
> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getAllReviewsForAdmin(): Promise<
  Array<
    Review & {
      providers: { id: string; professional_name: string } | null;
      profiles: { id: string; full_name: string } | null;
    }
  >
> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("reviews")
      .select(
        "*, providers(id, professional_name), profiles(id, full_name)",
      )
      .order("created_at", { ascending: false });
    return (data as Array<
      Review & {
        providers: { id: string; professional_name: string } | null;
        profiles: { id: string; full_name: string } | null;
      }
    >) ?? [];
  } catch {
    return [];
  }
}

export interface PlatformStats {
  clients: number;
  providers: number;
  premiumProviders: number;
  pendingProviders: number;
  requests: number;
  pendingRequests: number;
  acceptedRequests: number;
  completedRequests: number;
  rejectedRequests: number;
  reviews: number;
  categories: number;
}

export async function getPlatformStats(): Promise<PlatformStats> {
  const empty: PlatformStats = {
    clients: 0, providers: 0, premiumProviders: 0, pendingProviders: 0,
    requests: 0, pendingRequests: 0, acceptedRequests: 0, completedRequests: 0,
    rejectedRequests: 0, reviews: 0, categories: 0,
  };
  if (!isSupabaseConfigured()) return empty;
  try {
    const supabase = await createClient();
    const [clientsRes, providersRes, premiumRes, pendingProvRes,
           reqRes, pendingReqRes, acceptedRes, completedRes, rejectedRes,
           reviewsRes, categoriesRes] = await Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "client"),
      supabase.from("providers").select("id", { count: "exact", head: true }),
      supabase.from("providers").select("id", { count: "exact", head: true }).eq("is_premium", true),
      supabase.from("providers").select("id", { count: "exact", head: true }).eq("is_validated", false),
      supabase.from("service_requests").select("id", { count: "exact", head: true }),
      supabase.from("service_requests").select("id", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("service_requests").select("id", { count: "exact", head: true }).eq("status", "accepted"),
      supabase.from("service_requests").select("id", { count: "exact", head: true }).eq("status", "completed"),
      supabase.from("service_requests").select("id", { count: "exact", head: true }).eq("status", "rejected"),
      supabase.from("reviews").select("id", { count: "exact", head: true }),
      supabase.from("categories").select("id", { count: "exact", head: true }),
    ]);

    return {
      clients: clientsRes.count ?? 0,
      providers: providersRes.count ?? 0,
      premiumProviders: premiumRes.count ?? 0,
      pendingProviders: pendingProvRes.count ?? 0,
      requests: reqRes.count ?? 0,
      pendingRequests: pendingReqRes.count ?? 0,
      acceptedRequests: acceptedRes.count ?? 0,
      completedRequests: completedRes.count ?? 0,
      rejectedRequests: rejectedRes.count ?? 0,
      reviews: reviewsRes.count ?? 0,
      categories: categoriesRes.count ?? 0,
    };
  } catch {
    return empty;
  }
}

export async function getTopTestimonials(
  limit = 3,
): Promise<
  Array<
    Review & {
      providers: { id: string; professional_name: string } | null;
    }
  >
> {
  if (!isSupabaseConfigured()) {
    const all = Object.entries(DEMO_REVIEWS).flatMap(([providerId, reviews]) =>
      reviews.map((r) => ({
        ...r,
        providers:
          DEMO_PROVIDERS.find((p) => p.id === providerId) ?? null,
      })),
    );
    return all
      .filter((r) => r.rating === 5 && r.comment && r.providers)
      .sort(() => Math.random() - 0.5)
      .slice(0, limit)
      .map((r) => ({
        ...r,
        providers: r.providers
          ? { id: r.providers.id, professional_name: r.providers.professional_name }
          : null,
      }));
  }
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("reviews")
      .select("*, providers(id, professional_name)")
      .eq("rating", 5)
      .not("comment", "is", null)
      .order("created_at", { ascending: false })
      .limit(limit);
    return (
      (data as Array<
        Review & { providers: { id: string; professional_name: string } | null }
      >) ?? []
    );
  } catch {
    return [];
  }
}

export async function getAds(position?: string): Promise<Ad[]> {
  if (!isSupabaseConfigured())
    return DEMO_ADS.filter((a) => (position ? a.position === position : true));
  try {
    const supabase = await createClient();
    let query = supabase.from("ads").select("*").eq("active", true);
    if (position) query = query.eq("position", position);
    const { data } = await query;
    return (data as Ad[]) ?? DEMO_ADS;
  } catch {
    return DEMO_ADS.filter((a) => (position ? a.position === position : true));
  }
}
