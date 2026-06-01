import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { deleteUserProfileAction } from "@/actions/admin";
import { requireAuth } from "@/lib/auth";
import { getAllUsersForAdmin } from "@/lib/queries";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Utilisateurs — Admin" };

const ROLE_VARIANT: Record<string, "default" | "info" | "success" | "premium"> = {
  client: "info",
  provider: "success",
  admin: "premium",
};

export default async function AdminUsersPage() {
  await requireAuth("admin");
  const users = await getAllUsersForAdmin();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-stone-900">Utilisateurs</h1>
        <p className="mt-1 text-sm text-stone-600">
          {users.length} utilisateur{users.length > 1 ? "s" : ""} enregistré
          {users.length > 1 ? "s" : ""}
        </p>
      </header>

      {users.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
          <p className="text-sm font-medium text-stone-900">Aucun utilisateur.</p>
          <p className="mt-1 text-xs text-stone-500">
            Connectez-vous via un compte avec Supabase configuré.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-stone-100">
            <thead className="bg-stone-50">
              <tr className="text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3 hidden md:table-cell">Téléphone</th>
                <th className="px-4 py-3 hidden md:table-cell">Ville</th>
                <th className="px-4 py-3">Rôle</th>
                <th className="px-4 py-3 hidden lg:table-cell">Inscription</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-sm">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3 font-medium text-stone-900">{u.full_name}</td>
                  <td className="px-4 py-3 text-stone-600">{u.email}</td>
                  <td className="px-4 py-3 text-stone-600 hidden md:table-cell">
                    {u.phone ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-stone-600 hidden md:table-cell">
                    {u.city ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={ROLE_VARIANT[u.role] ?? "default"}>{u.role}</Badge>
                  </td>
                  <td className="px-4 py-3 text-stone-500 hidden lg:table-cell">
                    {formatDate(u.created_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {u.role !== "admin" && (
                      <form action={deleteUserProfileAction}>
                        <input type="hidden" name="id" value={u.id} />
                        <Button type="submit" variant="ghost" size="sm">
                          Supprimer
                        </Button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
