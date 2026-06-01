"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface SidebarItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface DashboardSidebarProps {
  title: string;
  items: SidebarItem[];
}

export function DashboardSidebar({ title, items }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="lg:w-64 lg:shrink-0">
      <div className="rounded-2xl border border-stone-200 bg-white p-4">
        <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
          {title}
        </p>
        <nav className="space-y-1">
          {items.map((item) => {
            const active =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-purple-50 text-purple-700"
                    : "text-stone-700 hover:bg-stone-100",
                )}
              >
                <span
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-md",
                    active ? "bg-purple-100 text-purple-700" : "bg-stone-100 text-stone-600",
                  )}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
