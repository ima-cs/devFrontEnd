import Link from "next/link";
import { RequestCard } from "@/components/cards/RequestCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { updateRequestStatusAction } from "@/actions/requests";
import { requireAuth, getProviderForCurrentUser } from "@/lib/auth";
import { getRequestsForProvider } from "@/lib/queries";

export const metadata = { title: "Demandes reçues — Prestataire" };

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

function StatusButton({ id, next, label, variant }: {
  id: string;
  next: string;
  label: string;
  variant: "primary" | "outline" | "danger" | "secondary";
}) {
  return (
    <form action={updateRequestStatusAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={next} />
      <Button type="submit" size="sm" variant={variant}>
        {label}
      </Button>
    </form>
  );
}

export default async function ProviderRequestsPage({ searchParams }: PageProps) {
  await requireAuth(["provider", "admin"]);
  const sp = await searchParams;

  const provider = await getProviderForCurrentUser();
  if (!provider) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
        <p className="text-sm font-medium text-stone-900">Aucun profil prestataire.</p>
      </div>
    );
  }

  let requests = await getRequestsForProvider(provider.id);
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
      <header>
        <h1 className="text-2xl font-bold text-stone-900">Demandes reçues</h1>
        <p className="mt-1 text-sm text-stone-600">
          {requests.length} demande{requests.length > 1 ? "s" : ""}
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link
            key={f.value}
            href={f.value ? `/provider/requests?status=${f.value}` : "/provider/requests"}
          >
            <Badge variant={(sp.status ?? "") === f.value ? "info" : "default"}>
              {f.label}
            </Badge>
          </Link>
        ))}
      </div>

      {requests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
          <p className="text-sm font-medium text-stone-900">Aucune demande.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((r) => {
            let actions: React.ReactNode = null;
            if (r.status === "pending") {
              actions = (
                <>
                  <StatusButton id={r.id} next="accepted" label="Accepter" variant="primary" />
                  <StatusButton id={r.id} next="rejected" label="Refuser" variant="danger" />
                </>
              );
            } else if (r.status === "accepted") {
              actions = (
                <StatusButton
                  id={r.id}
                  next="completed"
                  label="Marquer terminée"
                  variant="primary"
                />
              );
            }
            return (
              <RequestCard key={r.id} request={r} perspective="provider" actions={actions} />
            );
          })}
        </div>
      )}
    </div>
  );
}
