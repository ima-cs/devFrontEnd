import { cn } from "@/lib/utils";

interface CategoryIconProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const BOX_SIZES = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

const ICON_SIZES = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

const ICONS: Record<string, { bg: string; fg: string; d: string }> = {
  Plomberie: {
    bg: "bg-purple-100",
    fg: "text-purple-700",
    d: "M12 2c-3 5-6 8-6 12a6 6 0 0 0 12 0c0-4-3-7-6-12z",
  },
  Électricité: {
    bg: "bg-amber-100",
    fg: "text-amber-700",
    d: "M11 2L3 14h7l-1 8 9-12h-7l1-8z",
  },
  Menuiserie: {
    bg: "bg-orange-100",
    fg: "text-orange-700",
    d: "M2.7 19.3l1.4 1.4 7.1-7.1 1.4 1.4 4.2-4.2L13.5 7l-4.2 4.2 1.4 1.4-7.1 7.1zM20.5 5.5l-2.1 2.1-2.8-2.8L17.7 2.7c.4-.4 1-.4 1.4 0l1.4 1.4c.4.4.4 1 0 1.4z",
  },
  Maçonnerie: {
    bg: "bg-stone-200",
    fg: "text-stone-700",
    d: "M3 6h6v4H3V6zm8 0h10v4H11V6zM3 12h10v4H3v-4zm12 0h6v4h-6v-4zM3 18h6v4H3v-4zm8 0h10v4H11v-4z",
  },
  Climatisation: {
    bg: "bg-sky-100",
    fg: "text-sky-700",
    d: "M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L15.83 13H22z",
  },
  Nettoyage: {
    bg: "bg-emerald-100",
    fg: "text-emerald-700",
    d: "M16 3h-3V2c0-.55-.45-1-1-1s-1 .45-1 1v1H8c-.55 0-1 .45-1 1v3h10V4c0-.55-.45-1-1-1zM5 21h6v-9H5l-1 4 1 5zm15-9h-8v9h8v-9z",
  },
  "Réparation électroménager": {
    bg: "bg-indigo-100",
    fg: "text-indigo-700",
    d: "M18 2.01L6 2c-1.1 0-2 .89-2 2v16c0 1.11.9 2 2 2h12c1.1 0 2-.89 2-2V4c0-1.11-.9-1.99-2-1.99zM18 20H6v-9.02h12V20zm0-11H6V4h12v5zM8 5h2v3H8V5z",
  },
  "Aide à domicile": {
    bg: "bg-pink-100",
    fg: "text-pink-700",
    d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  },
  "Installation internet/fibre": {
    bg: "bg-violet-100",
    fg: "text-violet-700",
    d: "M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z",
  },
};

const FALLBACK = {
  bg: "bg-stone-100",
  fg: "text-stone-700",
  d: "M3 6h18v2H3V6zm0 5h12v2H3v-2zm0 5h18v2H3v-2z",
};

export function CategoryIcon({ name, size = "md", className }: CategoryIconProps) {
  const cfg = ICONS[name] ?? FALLBACK;
  return (
    <div
      className={cn(
        "grid place-items-center rounded-xl",
        BOX_SIZES[size],
        cfg.bg,
        cfg.fg,
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={ICON_SIZES[size]}
        aria-hidden
      >
        <path d={cfg.d} />
      </svg>
    </div>
  );
}
