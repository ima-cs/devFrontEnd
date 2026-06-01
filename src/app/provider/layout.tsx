import { DashboardLayout } from "@/components/layout/DashboardLayout";
import type { SidebarItem } from "@/components/layout/DashboardSidebar";

const PROVIDER_NAV: SidebarItem[] = [
  {
    href: "/provider/dashboard",
    label: "Tableau de bord",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
      </svg>
    ),
  },
  {
    href: "/provider/profile",
    label: "Mon profil pro",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
      </svg>
    ),
  },
  {
    href: "/provider/requests",
    label: "Demandes reçues",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        <path d="M4 4h16v2H4zm0 5h16v2H4zm0 5h10v2H4z" />
      </svg>
    ),
  },
  {
    href: "/provider/reviews",
    label: "Avis reçus",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        <path d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.5L12 14.77 7.06 17.4 8 11.9 4 8l5.61-1.16L12 2z" />
      </svg>
    ),
  },
  {
    href: "/provider/premium",
    label: "Premium",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm0 2h14v2H5v-2z" />
      </svg>
    ),
  },
];

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout title="Espace prestataire" items={PROVIDER_NAV}>
      {children}
    </DashboardLayout>
  );
}
