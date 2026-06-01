import { Button } from "@/components/ui/Button";
import { CategoryForm } from "@/components/forms/CategoryForm";
import { deleteCategoryAction } from "@/actions/admin";
import { requireAuth } from "@/lib/auth";
import { getCategories } from "@/lib/queries";

export const metadata = { title: "Catégories — Admin" };

export default async function AdminCategoriesPage() {
  await requireAuth("admin");
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-stone-900">Catégories</h1>
        <p className="mt-1 text-sm text-stone-600">
          {categories.length} catégorie{categories.length > 1 ? "s" : ""}
        </p>
      </header>

      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-stone-900">
          Ajouter une catégorie
        </h2>
        <div className="mt-3">
          <CategoryForm />
        </div>
      </div>

      <div className="space-y-3">
        {categories.map((c) => (
          <article
            key={c.id}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-stone-900">{c.name}</h3>
                {c.description && (
                  <p className="mt-1 text-sm text-stone-600">{c.description}</p>
                )}
              </div>
              <form action={deleteCategoryAction}>
                <input type="hidden" name="id" value={c.id} />
                <Button type="submit" variant="ghost" size="sm">
                  Supprimer
                </Button>
              </form>
            </div>

            <details className="mt-3 group">
              <summary className="cursor-pointer text-sm font-medium text-purple-600 hover:underline">
                Modifier
              </summary>
              <div className="mt-3 border-t border-stone-100 pt-4">
                <CategoryForm existing={c} />
              </div>
            </details>
          </article>
        ))}
      </div>
    </div>
  );
}
