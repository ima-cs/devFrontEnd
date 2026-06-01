import Link from "next/link";
import { notFound } from "next/navigation";
import { StarRating } from "@/components/StarRating";
import { PremiumBadge } from "@/components/PremiumBadge";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { Button } from "@/components/ui/Button";
import { getProviderById, getReviewsForProvider } from "@/lib/queries";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProviderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const provider = await getProviderById(id);
  if (!provider) notFound();

  const reviews = await getReviewsForProvider(id);
  const initial = provider.professional_name.charAt(0).toUpperCase();

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <Link
        href="/providers"
        className="text-sm text-stone-500 hover:text-purple-600"
      >
        ← Retour à la liste
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        {/* Profil principal */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-3xl font-bold text-white">
                {initial}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-stone-900">
                    {provider.professional_name}
                  </h1>
                  {provider.is_premium && <PremiumBadge />}
                </div>
                <p className="mt-1 text-sm text-stone-600">
                  {provider.categories?.name ?? "Service"}
                  {provider.city ? ` · ${provider.city}` : ""}
                </p>
                <div className="mt-2">
                  <StarRating
                    rating={provider.average_rating}
                    showValue
                    reviewsCount={provider.reviews_count}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-stone-100 pt-6">
              <h2 className="text-sm font-semibold text-stone-900">À propos</h2>
              <p className="mt-2 text-sm text-stone-700">
                {provider.description || "Aucune description fournie."}
              </p>
            </div>

            <dl className="mt-6 grid gap-4 border-t border-stone-100 pt-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs uppercase tracking-wider text-stone-500">
                  Expérience
                </dt>
                <dd className="mt-1 text-sm font-medium text-stone-900">
                  {provider.experience_years} an
                  {provider.experience_years > 1 ? "s" : ""}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-stone-500">
                  Ville
                </dt>
                <dd className="mt-1 text-sm font-medium text-stone-900">
                  {provider.city ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-stone-500">
                  Téléphone
                </dt>
                <dd className="mt-1 text-sm font-medium text-stone-900">
                  {provider.phone ?? "—"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Avis */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-stone-900">
              Avis clients
              <span className="ml-2 text-sm font-normal text-stone-500">
                ({reviews.length})
              </span>
            </h2>

            {reviews.length === 0 ? (
              <p className="mt-4 rounded-xl border border-dashed border-stone-200 bg-white p-6 text-center text-sm text-stone-600">
                Pas encore d&apos;avis pour ce prestataire.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {reviews.map((r) => (
                  <ReviewCard
                    key={r.id}
                    review={r}
                    authorName={r.profiles?.full_name}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar action */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-stone-900">
              Contacter ce prestataire
            </h3>
            <p className="mt-1 text-sm text-stone-600">
              Décrivez votre besoin et recevez une réponse rapide.
            </p>

            <Link href={`/client/requests/new?provider=${provider.id}`} className="mt-4 block">
              <Button fullWidth size="lg">
                Envoyer une demande
              </Button>
            </Link>

            <p className="mt-3 text-center text-xs text-stone-500">
              Vous serez invité à vous connecter si nécessaire.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
