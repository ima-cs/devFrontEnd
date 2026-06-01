import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "info" | "success" | "warning" | "danger";
  icon?: React.ReactNode;
}

const TONES = {
  default: "bg-stone-100 text-stone-700",
  info: "bg-purple-100 text-purple-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
};

export function StatsCard({ label, value, hint, tone = "default", icon }: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold text-stone-900">{value}</p>
          {hint && <p className="mt-1 text-xs text-stone-500">{hint}</p>}
        </div>
        {icon && (
          <div className={cn("grid h-10 w-10 place-items-center rounded-lg", TONES[tone])}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
