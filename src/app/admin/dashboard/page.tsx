import Link from "next/link";
import { StatsCard } from "@/components/cards/StatsCard";
import { Button } from "@/components/ui/Button";
import { requireAuth } from "@/lib/auth";
import { getPlatformStats } from "@/lib/queries";

export const metadata = { title: "Administration — ServicePro" };

export default async function AdminDashboardPage() {
  await requireAuth("admin");
  const stats = await getPlatformStats();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-stone-900">Tableau de bord administrateur</h1>
        <p className="mt-1 text-sm text-stone-600">
          Vue d&apos;ensemble de l&apos;activité de la plateforme.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Clients" value={stats.clients} tone="info" />
        <StatsCard
          label="Prestataires"
          value={stats.providers}
          hint={`dont ${stats.premiumProviders} Premium`}
          tone="info"
        />
        <StatsCard label="Demandes" value={stats.requests} tone="default" />
        <StatsCard label="Avis" value={stats.reviews} tone="warning" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-stone-900">Demandes par statut</h2>
          <dl className="mt-4 space-y-3">
            <StatusBar label="En attente" value={stats.pendingRequests} total={stats.requests} color="bg-amber-400" />
            <StatusBar label="Acceptées" value={stats.acceptedRequests} total={stats.requests} color="bg-purple-500" />
            <StatusBar label="Terminées" value={stats.completedRequests} total={stats.requests} color="bg-emerald-500" />
            <StatusBar label="Refusées" value={stats.rejectedRequests} total={stats.requests} color="bg-red-500" />
          </dl>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-stone-900">Actions rapides</h2>
          <div className="mt-4 space-y-2">
            <Link href="/admin/providers" className="block">
              <Button variant="outline" fullWidth>
                Gérer les prestataires {stats.pendingProviders ? `(${stats.pendingProviders} à valider)` : ""}
              </Button>
            </Link>
            <Link href="/admin/categories" className="block">
              <Button variant="outline" fullWidth>
                Gérer les catégories ({stats.categories})
              </Button>
            </Link>
            <Link href="/admin/reviews" className="block">
              <Button variant="outline" fullWidth>
                Modérer les avis ({stats.reviews})
              </Button>
            </Link>
            <Link href="/admin/statistics" className="block">
              <Button variant="outline" fullWidth>
                Statistiques détaillées
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBar({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-stone-700">{label}</span>
        <span className="font-medium text-stone-900">{value}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-stone-100">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
