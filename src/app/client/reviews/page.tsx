import Link from "next/link";
import { StarRating } from "@/components/StarRating";
import { ReviewForm } from "@/components/forms/ReviewForm";
import { Button } from "@/components/ui/Button";
import { deleteReviewAction } from "@/actions/reviews";
import { requireAuth } from "@/lib/auth";
import { getReviewsByClient } from "@/lib/queries";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Mes avis — Client" };

export default async function ClientReviewsPage() {
  const ctx = await requireAuth(["client", "admin"]);
  const reviews = await getReviewsByClient(ctx.profile.id);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-stone-900">Mes avis</h1>
        <p className="mt-1 text-sm text-stone-600">
          {reviews.length} avis publié{reviews.length > 1 ? "s" : ""}
        </p>
      </header>

      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
          <p className="text-sm font-medium text-stone-900">
            Vous n&apos;avez pas encore publié d&apos;avis.
          </p>
          <p className="mt-1 text-sm text-stone-600">
            Évaluez un prestataire après une intervention pour aider la communauté.
          </p>
          <Link href="/providers" className="mt-4 inline-block">
            <Button>Voir les prestataires</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-stone-500">
                    Avis sur
                  </p>
                  {r.providers ? (
                    <Link
                      href={`/providers/${r.providers.id}`}
                      className="text-base font-semibold text-stone-900 hover:text-purple-700"
                    >
                      {r.providers.professional_name}
                    </Link>
                  ) : (
                    <p className="text-base font-semibold text-stone-900">
                      Prestataire supprimé
                    </p>
                  )}
                  <p className="mt-1 text-xs text-stone-500">
                    Publié le {formatDate(r.created_at)}
                  </p>
                </div>
                <StarRating rating={r.rating} size="md" showValue />
              </header>

              {r.comment && (
                <p className="mt-3 text-sm text-stone-700">{r.comment}</p>
              )}

              {r.providers && (
                <details className="mt-4 group">
                  <summary className="cursor-pointer text-sm font-medium text-purple-600 hover:underline">
                    Modifier mon avis
                  </summary>
                  <div className="mt-3 border-t border-stone-100 pt-4">
                    <ReviewForm
                      providerId={r.providers.id}
                      providerName={r.providers.professional_name}
                      existing={r}
                      compact
                    />
                  </div>
                </details>
              )}

              <form action={deleteReviewAction} className="mt-3">
                <input type="hidden" name="id" value={r.id} />
                <Button type="submit" variant="ghost" size="sm">
                  Supprimer
                </Button>
              </form>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
