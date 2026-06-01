import Link from "next/link";
import { StarRating } from "@/components/StarRating";
import { PremiumBadge } from "@/components/PremiumBadge";
import type { ProviderWithStats } from "@/types/database";

interface ProviderCardProps {
  provider: ProviderWithStats;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const initial = provider.professional_name.charAt(0).toUpperCase();
  return (
    <Link
      href={`/providers/${provider.id}`}
      className="group flex flex-col rounded-3xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100"
    >
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-rose-500 text-xl font-bold text-white shadow-md shadow-purple-500/20">
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold text-stone-900 group-hover:text-purple-700">
              {provider.professional_name}
            </h3>
            {provider.is_premium && <PremiumBadge />}
          </div>
          <p className="mt-1 text-xs text-stone-500">
            {provider.categories?.name ?? "Service"}
            {provider.city ? ` · ${provider.city}` : ""}
          </p>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-sm text-stone-600">
        {provider.description || "Aucune description fournie."}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <StarRating
          rating={provider.average_rating}
          showValue
          reviewsCount={provider.reviews_count}
          size="sm"
        />
        <span className="text-xs text-stone-500">
          {provider.experience_years} {provider.experience_years > 1 ? "ans d'exp." : "an d'exp."}
        </span>
      </div>
    </Link>
  );
}
