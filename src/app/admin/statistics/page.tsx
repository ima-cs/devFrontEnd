import { StatsCard } from "@/components/cards/StatsCard";
import { requireAuth } from "@/lib/auth";
import { getPlatformStats } from "@/lib/queries";

export const metadata = { title: "Statistiques — Admin" };

export default async function AdminStatisticsPage() {
  await requireAuth("admin");
  const stats = await getPlatformStats();

  const conversionRate =
    stats.requests > 0
      ? Math.round(
          ((stats.acceptedRequests + stats.completedRequests) / stats.requests) * 100,
        )
      : 0;

  const premiumRate =
    stats.providers > 0
      ? Math.round((stats.premiumProviders / stats.providers) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-stone-900">Statistiques</h1>
        <p className="mt-1 text-sm text-stone-600">
          Indicateurs détaillés de la plateforme.
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-stone-900">Utilisateurs</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard label="Clients" value={stats.clients} tone="info" />
          <StatsCard label="Prestataires" value={stats.providers} tone="info" />
          <StatsCard
            label="Premium"
            value={stats.premiumProviders}
            hint={`${premiumRate}% des prestataires`}
            tone="warning"
          />
          <StatsCard label="À valider" value={stats.pendingProviders} tone="danger" />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-stone-900">Activité</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard label="Demandes totales" value={stats.requests} tone="default" />
          <StatsCard
            label="En attente"
            value={stats.pendingRequests}
            tone="warning"
          />
          <StatsCard
            label="Acceptées"
            value={stats.acceptedRequests}
            tone="info"
          />
          <StatsCard
            label="Terminées"
            value={stats.completedRequests}
            tone="success"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-stone-900">Qualité</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatsCard label="Avis publiés" value={stats.reviews} tone="default" />
          <StatsCard
            label="Taux de conversion"
            value={`${conversionRate}%`}
            hint="Demandes acceptées ou terminées"
            tone="success"
          />
          <StatsCard label="Catégories" value={stats.categories} tone="info" />
        </div>
      </section>
    </div>
  );
}
