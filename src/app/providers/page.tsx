import { ProviderCard } from "@/components/cards/ProviderCard";
import { SearchFilters } from "@/components/SearchFilters";
import { AdBanner } from "@/components/ads/AdBanner";
import { getAds, getCategories, getProviders } from "@/lib/queries";

export const metadata = { title: "Prestataires — ServicePro" };

interface PageProps {
  searchParams: Promise<{
    search?: string;
    city?: string;
    category?: string;
    minRating?: string;
    premium?: string;
  }>;
}

export default async function ProvidersPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  const [categories, providers, ads] = await Promise.all([
    getCategories(),
    getProviders({
      search: sp.search,
      city: sp.city,
      categoryId: sp.category,
      minRating: sp.minRating ? Number(sp.minRating) : undefined,
      premiumOnly: sp.premium === "1",
    }),
    getAds("providers"),
  ]);

  const ad = ads[0];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-stone-900">Trouver un prestataire</h1>
        <p className="mt-1 text-stone-600">
          {providers.length} prestataire{providers.length > 1 ? "s" : ""} disponible
          {providers.length > 1 ? "s" : ""}
        </p>
      </header>

      <SearchFilters categories={categories} />

      {ad && (
        <div className="mt-6">
          <AdBanner ad={ad} />
        </div>
      )}

      {providers.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
          <p className="text-base font-semibold text-stone-900">Aucun résultat</p>
          <p className="mt-1 text-sm text-stone-600">
            Essayez d&apos;élargir vos critères de recherche.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>
      )}
    </section>
  );
}
