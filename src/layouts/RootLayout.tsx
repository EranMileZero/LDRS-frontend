import { Outlet, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RootLayout() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-8">
          <div className="me-4 flex">
            <Link to="/" className="me-6 flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">L</span>
              </div>
              <span className="font-bold sm:inline-block">{t('brand')}</span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm font-medium">
               {user?.role === 'influencer' && <Link to="/influencer" className="transition-colors hover:text-foreground/80 text-foreground/60">{t('nav.influencer')}</Link>}
               {user?.role === 'consumer' && <Link to="/consumer" className="transition-colors hover:text-foreground/80 text-foreground/60">{t('nav.consumer')}</Link>}
               {user?.role === 'admin' && <Link to="/admin" className="transition-colors hover:text-foreground/80 text-foreground/60">{t('nav.admin')}</Link>}
            </nav>
            <LanguageSwitcher />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">{t('auth.login_btn')}</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">{t('auth.register_link')}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
}
