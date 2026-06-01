import type { Ad } from "@/types/database";

interface AdBannerProps {
  ad: Ad;
  variant?: "wide" | "card";
}

export function AdBanner({ ad, variant = "wide" }: AdBannerProps) {
  if (variant === "card") {
    return (
      <aside className="rounded-2xl border border-dashed border-amber-300 bg-gradient-to-br from-amber-50 to-white p-5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600">
          Publicité
        </p>
        <h4 className="mt-2 text-base font-semibold text-stone-900">{ad.title}</h4>
        {ad.description && (
          <p className="mt-1 text-sm text-stone-600">{ad.description}</p>
        )}
      </aside>
    );
  }

  return (
    <aside className="flex items-center gap-4 rounded-2xl border border-dashed border-amber-300 bg-gradient-to-r from-amber-50 via-white to-amber-50 p-5">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
          <path d="M14 9l-4 4-2-2-3 3v2h16v-9l-7 2z" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600">
          Publicité
        </p>
        <h4 className="text-base font-semibold text-stone-900">{ad.title}</h4>
        {ad.description && (
          <p className="text-sm text-stone-600">{ad.description}</p>
        )}
      </div>
    </aside>
  );
}
