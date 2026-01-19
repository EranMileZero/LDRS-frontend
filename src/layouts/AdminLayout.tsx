import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

const sidebarItems = [
  { icon: LayoutDashboard, label: "admin.sidebar.overview", href: "/admin" },
  { icon: Users, label: "admin.sidebar.users", href: "/admin/users" },
  { icon: Settings, label: "admin.sidebar.settings", href: "/admin/settings" },
];

export default function AdminLayout() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="w-64 border-e bg-muted/20 hidden md:block">
        <div className="flex flex-col gap-2 p-4">
          <div className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">{t('admin.sidebar.title')}</div>
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {t(item.label)}
              </Link>
            );
          })}
        </div>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
