import { ProviderProfileForm } from "@/components/forms/ProviderProfileForm";
import { Badge } from "@/components/ui/Badge";
import { requireAuth, getProviderForCurrentUser } from "@/lib/auth";
import { getCategories } from "@/lib/queries";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Mon profil pro — Prestataire" };

export default async function ProviderProfilePage() {
  const ctx = await requireAuth(["provider", "admin"]);
  const [provider, categories] = await Promise.all([
    getProviderForCurrentUser(),
    getCategories(),
  ]);

  if (!provider) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
        <p className="text-sm font-medium text-stone-900">
          Aucun profil prestataire trouvé.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-stone-900">Mon profil professionnel</h1>
        <p className="mt-1 text-sm text-stone-600">
          Mettez à jour vos informations professionnelles visibles par les clients.
        </p>
      </header>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-stone-500">
              Inscription
            </p>
            <p className="mt-1 text-sm font-medium text-stone-900">
              {formatDate(provider.created_at)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={provider.is_validated ? "success" : "warning"}>
              {provider.is_validated ? "Profil validé" : "En attente de validation"}
            </Badge>
            <Badge variant={provider.is_premium ? "premium" : "default"}>
              {provider.is_premium ? "Premium" : "Gratuit"}
            </Badge>
          </div>
        </div>

        <ProviderProfileForm
          profile={ctx.profile}
          provider={provider}
          categories={categories}
        />
      </div>
    </div>
  );
}
