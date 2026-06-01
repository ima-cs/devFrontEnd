import Link from "next/link";
import { StatsCard } from "@/components/cards/StatsCard";
import { RequestCard } from "@/components/cards/RequestCard";
import { PremiumBadge } from "@/components/PremiumBadge";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/Button";
import { requireAuth, getProviderForCurrentUser } from "@/lib/auth";
import { getRequestsForProvider, getReviewsForProvider } from "@/lib/queries";

export const metadata = { title: "Tableau de bord — Prestataire" };

export default async function ProviderDashboardPage() {
  const ctx = await requireAuth(["provider", "admin"]);
  const provider = await getProviderForCurrentUser();

  if (!provider) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
        <p className="text-sm font-medium text-stone-900">
          Aucun profil prestataire trouvé pour votre compte.
        </p>
        <p className="mt-1 text-sm text-stone-600">
          Si vous êtes prestataire, contactez un administrateur pour créer votre fiche.
        </p>
      </div>
    );
  }

  const [requests, reviews] = await Promise.all([
    getRequestsForProvider(provider.id),
    getReviewsForProvider(provider.id),
  ]);

  const total = requests.length;
  const pending = requests.filter((r) => r.status === "pending").length;
  const accepted = requests.filter((r) => r.status === "accepted").length;
  const completed = requests.filter((r) => r.status === "completed").length;

  const avgRating =
    reviews.length > 0
      ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) /
        10
      : 0;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">
            Bonjour, {ctx.profile.full_name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            {provider.professional_name}
            {provider.city ? ` · ${provider.city}` : ""}
          </p>
        </div>
        {provider.is_premium ? (
          <PremiumBadge />
        ) : (
          <Link href="/provider/premium">
            <Button variant="outline" size="sm">
              Passer Premium
            </Button>
          </Link>
        )}
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Demandes reçues" value={total} tone="info" />
        <StatsCard label="En attente" value={pending} tone="warning" />
        <StatsCard label="Acceptées" value={accepted} tone="info" />
        <StatsCard label="Terminées" value={completed} tone="success" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
            Note moyenne
          </p>
          <div className="mt-3 flex items-center gap-3">
            <p className="text-4xl font-bold text-stone-900">
              {avgRating ? avgRating.toFixed(1) : "—"}
            </p>
            <StarRating rating={avgRating} size="lg" />
          </div>
          <p className="mt-2 text-xs text-stone-500">
            {reviews.length} avis reçu{reviews.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
            Statut visibilité
          </p>
          <div className="mt-3 flex items-center gap-2">
            {provider.is_premium ? (
              <>
                <PremiumBadge />
                <span className="text-sm font-medium text-stone-900">
                  Mise en avant active
                </span>
              </>
            ) : (
              <span className="text-sm font-medium text-stone-900">
                Compte gratuit
              </span>
            )}
          </div>
          <p className="mt-2 text-xs text-stone-500">
            {provider.is_premium
              ? "Vous apparaissez en priorité dans les résultats."
              : "Activez Premium pour plus de visibilité."}
          </p>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-stone-900">Demandes récentes</h2>
          <Link
            href="/provider/requests"
            className="text-sm font-medium text-purple-600 hover:underline"
          >
            Tout voir →
          </Link>
        </div>

        {requests.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center">
            <p className="text-sm text-stone-600">
              Aucune demande reçue pour le moment.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {requests.slice(0, 3).map((r) => (
              <RequestCard key={r.id} request={r} perspective="provider" />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
