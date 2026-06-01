export const APP_NAME = "ServicePro";
export const APP_TAGLINE = "Trouvez un prestataire de confiance, près de chez vous";

export const CITIES = [
  "Casablanca",
  "Rabat",
  "Tanger",
  "Fès",
  "Marrakech",
  "Agadir",
  "Meknès",
  "Oujda",
  "Laâyoune",
  "Dakhla",
] as const;

export const ROLES = ["client", "provider", "admin"] as const;
export const REQUEST_STATUSES = ["pending", "accepted", "rejected", "completed"] as const;

export const STATUS_LABELS: Record<(typeof REQUEST_STATUSES)[number], string> = {
  pending: "En attente",
  accepted: "Acceptée",
  rejected: "Refusée",
  completed: "Terminée",
};

export const STATUS_STYLES: Record<(typeof REQUEST_STATUSES)[number], string> = {
  pending: "bg-amber-100 text-amber-800",
  accepted: "bg-purple-100 text-purple-800",
  rejected: "bg-red-100 text-red-700",
  completed: "bg-emerald-100 text-emerald-800",
};

export function getAdminEmail(): string {
  return process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@servicepro.com";
}
