import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Megaphone, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";

const sidebarItems = [
  { icon: LayoutDashboard, label: "sidebar.dashboard", href: "/influencer" },
  { icon: Megaphone, label: "sidebar.campaigns", href: "/influencer/campaigns" },
  { icon: MessageSquare, label: "sidebar.chat", href: "/influencer/chat" },
];

export default function InfluencerLayout() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <aside className="w-64 border-e bg-slate-50/50 hidden md:flex flex-col">
        <div className="flex flex-col gap-2 p-4 flex-1">
          <div className="mb-6 px-2 py-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">{t('sidebar.menu')}</h2>
          </div>
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-white text-primary shadow-sm border border-slate-100"
                    : "text-muted-foreground hover:bg-white hover:text-foreground hover:shadow-sm"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                {t(item.label)}
              </Link>
            );
          })}
        </div>
        
        {/* User Profile Section in Sidebar */}
        <div className="border-t p-4">
            <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                        john@example.com
                    </p>
                </div>
            </div>
        </div>
      </aside>
      <main className="flex-1 bg-muted/10">
        <div className="container p-6 md:p-8 max-w-7xl mx-auto space-y-8">
             <header className="flex items-center justify-between pb-4 border-b md:hidden">
                 <h1 className="text-xl font-bold">{t('nav.influencer')}</h1>
             </header>
            <Outlet />
        </div>
      </main>
    </div>
  );
}
