import { DashboardSidebar, type SidebarItem } from "./DashboardSidebar";

interface DashboardLayoutProps {
  title: string;
  items: SidebarItem[];
  children: React.ReactNode;
}

export function DashboardLayout({ title, items, children }: DashboardLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-6 lg:flex-row">
        <DashboardSidebar title={title} items={items} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
