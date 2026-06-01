import Link from "next/link";
import { notFound } from "next/navigation";
import { RequestForm } from "@/components/forms/RequestForm";
import { requireAuth } from "@/lib/auth";
import { getProviderById } from "@/lib/queries";

export const metadata = { title: "Nouvelle demande — Client" };

interface PageProps {
  searchParams: Promise<{ provider?: string }>;
}

export default async function NewRequestPage({ searchParams }: PageProps) {
  const ctx = await requireAuth(["client", "admin"]);
  const { provider: providerId } = await searchParams;

  if (!providerId) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-stone-900">Nouvelle demande</h1>
        <p className="text-sm text-stone-600">
          Choisissez d&apos;abord un prestataire pour envoyer une demande.
        </p>
        <Link
          href="/providers"
          className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
          Voir les prestataires
        </Link>
      </div>
    );
  }

  const provider = await getProviderById(providerId);
  if (!provider) notFound();

  return (
    <div className="space-y-6">
      <header>
        <Link
          href={`/providers/${provider.id}`}
          className="text-sm text-stone-500 hover:text-purple-600"
        >
          ← Retour au profil du prestataire
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-stone-900">Envoyer une demande</h1>
        <p className="mt-1 text-sm text-stone-600">
          Décrivez précisément votre besoin pour obtenir une réponse rapide.
        </p>
      </header>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <RequestForm provider={provider} defaultCity={ctx.profile.city} />
      </div>
    </div>
  );
}
