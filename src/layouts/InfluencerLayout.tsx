import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Megaphone, MessageSquare, Menu, Store, Tag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/context/AuthContext";

const sidebarItems = [
  { icon: LayoutDashboard, label: "sidebar.dashboard", href: "/influencer" },
  { icon: Megaphone, label: "sidebar.campaigns", href: "/influencer/campaigns" },
  { icon: Tag, label: "marketplace.coupons", href: "/influencer/coupons" },
  { icon: MessageSquare, label: "sidebar.chat", href: "/influencer/chat" },
  { icon: Store, label: "sidebar.marketplace", href: "/" },
];

export default function InfluencerLayout() {
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
            L
          </div>
          <span>LDRS</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-1 px-3 flex-1">
        <div className="mb-2 px-3 py-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">{t('sidebar.menu')}</h2>
        </div>
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
              {t(item.label)}
            </Link>
          );
        })}
      </div>
      
      <div className="px-6 py-2">
        <LanguageSwitcher />
      </div>

      {/* User Profile Section in Sidebar */}
      <div className="p-4 mt-auto border-t bg-muted/20">
          <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors cursor-pointer">
              <Avatar className="h-9 w-9 border-2 border-background">
                  <AvatarImage src="/avatars/01.png" alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden transition-all">
                  <p className="text-sm font-semibold leading-none truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-muted-foreground truncate mt-1">
                      {user?.email}
                  </p>
              </div>
          </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-e bg-card fixed inset-y-0 start-0 z-50">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ps-64 flex flex-col min-h-screen transition-all duration-300 ease-in-out">
        
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur px-6 md:hidden supports-[backdrop-filter]:bg-background/60">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-ml-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 border-e">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2 font-bold text-lg">
                <div className="h-6 w-6 rounded bg-primary text-primary-foreground flex items-center justify-center text-xs">
                    L
                </div>
                <span>LDRS</span>
            </div>
        </header>

        <div className="container p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
        </div>
      </main>
    </div>
  );
}
