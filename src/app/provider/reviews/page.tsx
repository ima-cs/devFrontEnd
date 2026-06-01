import { ReviewCard } from "@/components/cards/ReviewCard";
import { StarRating } from "@/components/StarRating";
import { requireAuth, getProviderForCurrentUser } from "@/lib/auth";
import { getReviewsForProvider } from "@/lib/queries";

export const metadata = { title: "Avis reçus — Prestataire" };

export default async function ProviderReviewsPage() {
  await requireAuth(["provider", "admin"]);
  const provider = await getProviderForCurrentUser();

  if (!provider) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
        <p className="text-sm font-medium text-stone-900">Aucun profil prestataire.</p>
      </div>
    );
  }

  const reviews = await getReviewsForProvider(provider.id);
  const avg =
    reviews.length > 0
      ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) /
        10
      : 0;

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));
  const total = reviews.length || 1;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-stone-900">Avis reçus</h1>
        <p className="mt-1 text-sm text-stone-600">
          {reviews.length} avis publié{reviews.length > 1 ? "s" : ""} par vos clients
        </p>
      </header>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wider text-stone-500">
              Note moyenne
            </p>
            <p className="mt-2 text-5xl font-bold text-stone-900">
              {avg ? avg.toFixed(1) : "—"}
            </p>
            <div className="mt-2">
              <StarRating rating={avg} size="lg" />
            </div>
          </div>

          <div className="space-y-2">
            {distribution.map((d) => (
              <div key={d.star} className="flex items-center gap-3">
                <span className="w-8 text-xs text-stone-600">{d.star} ★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-100">
                  <div
                    className="h-full bg-amber-400"
                    style={{ width: `${(d.count / total) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs text-stone-600">
                  {d.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
          <p className="text-sm font-medium text-stone-900">
            Vous n&apos;avez pas encore reçu d&apos;avis.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
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
  );
}
