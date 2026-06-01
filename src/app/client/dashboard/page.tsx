import Link from "next/link";
import { StatsCard } from "@/components/cards/StatsCard";
import { RequestCard } from "@/components/cards/RequestCard";
import { Button } from "@/components/ui/Button";
import { requireAuth } from "@/lib/auth";
import { getRequestsForClient } from "@/lib/queries";

export const metadata = { title: "Tableau de bord — Client" };

export default async function ClientDashboardPage() {
  const ctx = await requireAuth(["client", "admin"]);
  const requests = await getRequestsForClient(ctx.profile.id);

  const total = requests.length;
  const pending = requests.filter((r) => r.status === "pending").length;
  const accepted = requests.filter((r) => r.status === "accepted").length;
  const completed = requests.filter((r) => r.status === "completed").length;

  const recent = requests.slice(0, 3);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-stone-900">
          Bonjour, {ctx.profile.full_name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          Voici un aperçu de votre activité.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Demandes envoyées" value={total} tone="info" />
        <StatsCard label="En attente" value={pending} tone="warning" />
        <StatsCard label="Acceptées" value={accepted} tone="info" />
        <StatsCard label="Terminées" value={completed} tone="success" />
      </div>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-stone-900">Demandes récentes</h2>
          <Link href="/client/requests" className="text-sm font-medium text-purple-600 hover:underline">
            Tout voir →
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center">
            <p className="text-sm font-medium text-stone-900">
              Vous n&apos;avez encore envoyé aucune demande.
            </p>
            <p className="mt-1 text-sm text-stone-600">
              Trouvez un prestataire et envoyez votre première demande.
            </p>
            <Link href="/providers" className="mt-4 inline-block">
              <Button>Voir les prestataires</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {recent.map((r) => (
              <RequestCard key={r.id} request={r} perspective="client" />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
