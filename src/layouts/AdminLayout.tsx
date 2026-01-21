import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Settings, Store } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sidebarItems = [
  { icon: LayoutDashboard, label: "admin.sidebar.overview", href: "/admin" },
  { icon: Users, label: "admin.sidebar.users", href: "/admin/users" },
  { icon: Settings, label: "admin.sidebar.settings", href: "/admin/settings" },
  { icon: Store, label: "sidebar.marketplace", href: "/" },
];

export default function AdminLayout() {
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="w-64 border-e bg-muted/20 hidden md:flex flex-col">
        <div className="flex flex-col gap-2 p-4 flex-1">
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
        <div className="px-4 py-2 border-t">
            <LanguageSwitcher />
        </div>
        <div className="p-4 bg-muted/20 border-t">
          <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors cursor-pointer">
              <Avatar className="h-9 w-9 border-2 border-background">
                  <AvatarImage src="/avatars/01.png" alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0) || 'A'}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden transition-all">
                  <p className="text-sm font-semibold leading-none truncate">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-muted-foreground truncate mt-1">
                      {user?.email}
                  </p>
              </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
