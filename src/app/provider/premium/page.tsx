import { Button } from "@/components/ui/Button";
import { PremiumBadge } from "@/components/PremiumBadge";
import { togglePremiumAction } from "@/actions/provider";
import { requireAuth, getProviderForCurrentUser } from "@/lib/auth";

export const metadata = { title: "Premium — Prestataire" };

const BENEFITS = [
  "Badge Premium visible sur votre profil et dans les résultats",
  "Apparition prioritaire dans la liste des prestataires",
  "Mise en avant sur la page d'accueil",
  "Meilleure visibilité auprès des clients",
  "Statistiques de profil détaillées (à venir)",
];

const FREE_FEATURES = [
  "Profil professionnel public",
  "Réception illimitée de demandes",
  "Visibilité standard dans les résultats",
];

export default async function ProviderPremiumPage() {
  await requireAuth(["provider", "admin"]);
  const provider = await getProviderForCurrentUser();

  if (!provider) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
        <p className="text-sm font-medium text-stone-900">Aucun profil prestataire.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-stone-900">Abonnement Premium</h1>
        <p className="mt-1 text-sm text-stone-600">
          Boostez votre visibilité et recevez plus de demandes.
        </p>
      </header>

      {/* Statut actuel */}
      <div
        className={
          provider.is_premium
            ? "rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm"
            : "rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
        }
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-stone-500">
              Votre statut actuel
            </p>
            <div className="mt-2 flex items-center gap-3">
              {provider.is_premium ? (
                <>
                  <PremiumBadge />
                  <span className="text-base font-semibold text-stone-900">
                    Vous êtes Premium
                  </span>
                </>
              ) : (
                <span className="text-base font-semibold text-stone-900">
                  Compte gratuit
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-stone-600">
              {provider.is_premium
                ? "Vous bénéficiez de tous les avantages Premium."
                : "Activez Premium en un clic (paiement simulé pour ce projet)."}
            </p>
          </div>

          <form action={togglePremiumAction}>
            <Button
              type="submit"
              variant={provider.is_premium ? "outline" : "primary"}
              size="lg"
            >
              {provider.is_premium ? "Désactiver Premium" : "Activer Premium"}
            </Button>
          </form>
        </div>

        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          ⚠ Paiement simulé pour démonstration académique — aucune transaction réelle.
        </p>
      </div>

      {/* Comparaison Free / Premium */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <p className="text-xs uppercase tracking-wider text-stone-500">Gratuit</p>
          <p className="mt-2 text-2xl font-bold text-stone-900">0 DH</p>
          <p className="text-xs text-stone-500">Toujours gratuit</p>
          <ul className="mt-4 space-y-2">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-stone-700">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mt-0.5 h-4 w-4 text-emerald-500"
                  aria-hidden
                >
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <p className="text-xs uppercase tracking-wider text-amber-700">Premium</p>
            <PremiumBadge />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">99 DH / mois</p>
          <p className="text-xs text-stone-500">Paiement simulé</p>
          <ul className="mt-4 space-y-2">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-stone-700">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mt-0.5 h-4 w-4 text-amber-500"
                  aria-hidden
                >
                  <path d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.5L12 14.77 7.06 17.4 8 11.9 4 8l5.61-1.16L12 2z" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
