import Link from "next/link";
import { CategoryIcon } from "@/components/CategoryIcon";
import type { Category } from "@/types/database";

interface CategoryCardProps {
  category: Category;
  providerCount?: number;
}

export function CategoryCard({ category, providerCount }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white p-5 transition hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100"
    >
      {/* halo décoratif */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-purple-100/0 transition group-hover:bg-purple-100/60"
        aria-hidden
      />
      <CategoryIcon name={category.name} size="md" />
      <h3 className="relative mt-3 text-base font-semibold text-stone-900 group-hover:text-purple-700">
        {category.name}
      </h3>
      {category.description && (
        <p className="relative mt-1 line-clamp-2 text-sm text-stone-600">{category.description}</p>
      )}
      <div className="relative mt-4 flex items-center justify-between">
        {providerCount !== undefined && providerCount > 0 ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-100 to-rose-100 px-2.5 py-0.5 text-xs font-medium text-purple-700">
            {providerCount} prestataire{providerCount > 1 ? "s" : ""} disponible{providerCount > 1 ? "s" : ""}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
            Bientôt disponible
          </span>
        )}
        <span className="text-sm font-medium text-purple-600 opacity-0 transition group-hover:opacity-100">
          Découvrir →
        </span>
      </div>
    </Link>
  );
}
