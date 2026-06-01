import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PremiumBadge } from "@/components/PremiumBadge";
import { StarRating } from "@/components/StarRating";
import {
  setProviderPremiumAction,
  setProviderValidatedAction,
  deleteProviderAction,
} from "@/actions/admin";
import { requireAuth } from "@/lib/auth";
import { getAllProvidersForAdmin } from "@/lib/queries";

export const metadata = { title: "Prestataires — Admin" };

export default async function AdminProvidersPage() {
  await requireAuth("admin");
  const providers = await getAllProvidersForAdmin();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-stone-900">Prestataires</h1>
        <p className="mt-1 text-sm text-stone-600">
          {providers.length} prestataire{providers.length > 1 ? "s" : ""}
        </p>
      </header>

      {providers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
          <p className="text-sm font-medium text-stone-900">Aucun prestataire.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {providers.map((p) => (
            <article
              key={p.id}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/providers/${p.id}`}
                      className="text-base font-semibold text-stone-900 hover:text-purple-700"
                    >
                      {p.professional_name}
                    </Link>
                    {p.is_premium && <PremiumBadge />}
                    <Badge variant={p.is_validated ? "success" : "warning"}>
                      {p.is_validated ? "Validé" : "À valider"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-stone-500">
                    {p.categories?.name ?? "Sans catégorie"}
                    {p.city ? ` · ${p.city}` : ""}
                    {p.profiles?.email ? ` · ${p.profiles.email}` : ""}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-stone-600">
                    {p.description ?? "Aucune description."}
                  </p>
                  <div className="mt-2">
                    <StarRating
                      rating={p.average_rating}
                      showValue
                      reviewsCount={p.reviews_count}
                      size="sm"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <form action={setProviderValidatedAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="value" value={p.is_validated ? "0" : "1"} />
                    <Button
                      type="submit"
                      size="sm"
                      variant={p.is_validated ? "outline" : "primary"}
                    >
                      {p.is_validated ? "Désactiver" : "Valider"}
                    </Button>
                  </form>

                  <form action={setProviderPremiumAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="value" value={p.is_premium ? "0" : "1"} />
                    <Button
                      type="submit"
                      size="sm"
                      variant={p.is_premium ? "outline" : "secondary"}
                    >
                      {p.is_premium ? "Retirer Premium" : "Activer Premium"}
                    </Button>
                  </form>

                  <form action={deleteProviderAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <Button type="submit" size="sm" variant="ghost">
                      Supprimer
                    </Button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
