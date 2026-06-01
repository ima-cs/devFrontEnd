import { CategoryCard } from "@/components/cards/CategoryCard";
import { getCategories, getProviders } from "@/lib/queries";

export const metadata = { title: "Catégories — ServicePro" };

export default async function CategoriesPage() {
  const [categories, providers] = await Promise.all([
    getCategories(),
    getProviders(),
  ]);

  const countByCategory = providers.reduce<Record<string, number>>((acc, p) => {
    if (p.category_id) acc[p.category_id] = (acc[p.category_id] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-200/70 bg-gradient-to-b from-purple-50 via-rose-50/40 to-white">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[80%] -translate-x-1/2 rounded-full bg-purple-200/30 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-12">
          <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
            Explorer les métiers
          </span>
          <h1 className="mt-3 text-3xl font-bold text-stone-900 md:text-4xl">
            Catégories de services
          </h1>
          <p className="mt-2 max-w-2xl text-stone-600">
            Parcourez les métiers disponibles sur ServicePro. Chaque catégorie
            regroupe des artisans et professionnels vérifiés à travers le Maroc.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard
              key={c.id}
              category={c}
              providerCount={countByCategory[c.id] ?? 0}
            />
          ))}
        </div>
      </section>
    </>
  );
}
