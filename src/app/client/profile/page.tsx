import { ProfileForm } from "@/components/forms/ProfileForm";
import { Badge } from "@/components/ui/Badge";
import { requireAuth } from "@/lib/auth";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Mon profil — Client" };

export default async function ClientProfilePage() {
  const ctx = await requireAuth(["client", "admin"]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-stone-900">Mon profil</h1>
        <p className="mt-1 text-sm text-stone-600">
          Mettez à jour vos informations personnelles.
        </p>
      </header>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between border-b border-stone-100 pb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-stone-500">
              Membre depuis
            </p>
            <p className="mt-1 text-sm font-medium text-stone-900">
              {formatDate(ctx.profile.created_at)}
            </p>
          </div>
          <Badge variant="info">Rôle : {ctx.profile.role}</Badge>
        </div>

        <ProfileForm profile={ctx.profile} />
      </div>
    </div>
  );
}
