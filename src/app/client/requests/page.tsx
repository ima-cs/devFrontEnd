import Link from "next/link";
import { RequestCard } from "@/components/cards/RequestCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { requireAuth } from "@/lib/auth";
import { getRequestsForClient } from "@/lib/queries";

export const metadata = { title: "Mes demandes — Client" };

interface PageProps {
  searchParams: Promise<{ sent?: string; status?: string }>;
}

export default async function ClientRequestsPage({ searchParams }: PageProps) {
  const ctx = await requireAuth(["client", "admin"]);
  const sp = await searchParams;

  let requests = await getRequestsForClient(ctx.profile.id);
  if (sp.status) requests = requests.filter((r) => r.status === sp.status);

  const filters = [
    { value: "", label: "Toutes" },
    { value: "pending", label: "En attente" },
    { value: "accepted", label: "Acceptées" },
    { value: "rejected", label: "Refusées" },
    { value: "completed", label: "Terminées" },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Mes demandes</h1>
          <p className="mt-1 text-sm text-stone-600">
            {requests.length} demande{requests.length > 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/providers">
          <Button>Nouvelle demande</Button>
        </Link>
      </header>

      {sp.sent === "1" && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Votre demande a bien été envoyée. Le prestataire vous répondra prochainement.
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link
            key={f.value}
            href={f.value ? `/client/requests?status=${f.value}` : "/client/requests"}
            className="inline-block"
          >
            <Badge
              variant={
                (sp.status ?? "") === f.value ? "info" : "default"
              }
            >
              {f.label}
            </Badge>
          </Link>
        ))}
      </div>

      {requests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
          <p className="text-sm font-medium text-stone-900">Aucune demande pour ce filtre.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((r) => (
            <RequestCard key={r.id} request={r} perspective="client" />
          ))}
        </div>
      )}
    </div>
  );
}
