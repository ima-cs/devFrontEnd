import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { STATUS_LABELS } from "@/lib/constants";
import type { RequestWithRelations } from "@/types/database";

interface RequestCardProps {
  request: RequestWithRelations;
  perspective: "client" | "provider";
  actions?: React.ReactNode;
}

const STATUS_VARIANT: Record<string, "default" | "warning" | "info" | "danger" | "success"> = {
  pending: "warning",
  accepted: "info",
  rejected: "danger",
  completed: "success",
};

export function RequestCard({ request, perspective, actions }: RequestCardProps) {
  const counterpart =
    perspective === "client" ? request.providers : request.profiles;
  const counterpartName =
    perspective === "client"
      ? request.providers?.professional_name
      : request.profiles?.full_name;
  const counterpartLink =
    perspective === "client" && request.providers
      ? `/providers/${request.providers.id}`
      : null;

  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-stone-500">
            {perspective === "client" ? "Prestataire" : "Client"}
          </p>
          {counterpartLink ? (
            <Link
              href={counterpartLink}
              className="text-base font-semibold text-stone-900 hover:text-purple-700"
            >
              {counterpartName ?? "—"}
            </Link>
          ) : (
            <p className="text-base font-semibold text-stone-900">
              {counterpartName ?? "—"}
            </p>
          )}
          {counterpart && "city" in counterpart && counterpart.city && (
            <p className="text-xs text-stone-500">{counterpart.city}</p>
          )}
        </div>
        <Badge variant={STATUS_VARIANT[request.status] ?? "default"}>
          {STATUS_LABELS[request.status]}
        </Badge>
      </header>

      {request.service_type && (
        <p className="mt-3 text-sm font-medium text-stone-700">
          Service : {request.service_type}
        </p>
      )}

      <p className="mt-2 text-sm text-stone-700">{request.description}</p>

      <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-3">
        <div>
          <dt className="text-stone-500">Ville</dt>
          <dd className="font-medium text-stone-900">{request.city ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-stone-500">Date souhaitée</dt>
          <dd className="font-medium text-stone-900">
            {request.desired_date ? formatDate(request.desired_date) : "—"}
          </dd>
        </div>
        <div>
          <dt className="text-stone-500">Envoyée le</dt>
          <dd className="font-medium text-stone-900">{formatDate(request.created_at)}</dd>
        </div>
      </dl>

      {perspective === "provider" && request.profiles?.phone && (
        <p className="mt-3 text-xs text-stone-500">
          Contact :{" "}
          <span className="font-medium text-stone-700">{request.profiles.phone}</span>
          {request.profiles.email && (
            <>
              {" · "}
              <span className="font-medium text-stone-700">{request.profiles.email}</span>
            </>
          )}
        </p>
      )}

      {actions && <div className="mt-4 flex flex-wrap gap-2">{actions}</div>}
    </article>
  );
}
