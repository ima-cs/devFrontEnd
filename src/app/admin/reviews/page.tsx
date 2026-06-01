import Link from "next/link";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/Button";
import { deleteReviewByAdminAction } from "@/actions/admin";
import { requireAuth } from "@/lib/auth";
import { getAllReviewsForAdmin } from "@/lib/queries";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Avis — Admin" };

export default async function AdminReviewsPage() {
  await requireAuth("admin");
  const reviews = await getAllReviewsForAdmin();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-stone-900">Modération des avis</h1>
        <p className="mt-1 text-sm text-stone-600">
          {reviews.length} avis sur la plateforme
        </p>
      </header>

      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
          <p className="text-sm font-medium text-stone-900">Aucun avis.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-stone-500">
                    Prestataire
                  </p>
                  {r.providers ? (
                    <Link
                      href={`/providers/${r.providers.id}`}
                      className="text-base font-semibold text-stone-900 hover:text-purple-700"
                    >
                      {r.providers.professional_name}
                    </Link>
                  ) : (
                    <p className="text-base font-semibold text-stone-900">—</p>
                  )}
                  <p className="mt-1 text-xs text-stone-500">
                    Par {r.profiles?.full_name ?? "Client supprimé"} · {formatDate(r.created_at)}
                  </p>
                </div>
                <StarRating rating={r.rating} showValue />
              </header>

              {r.comment && (
                <p className="mt-3 text-sm text-stone-700">{r.comment}</p>
              )}

              <form action={deleteReviewByAdminAction} className="mt-3">
                <input type="hidden" name="id" value={r.id} />
                <Button type="submit" variant="ghost" size="sm">
                  Supprimer l&apos;avis
                </Button>
              </form>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
