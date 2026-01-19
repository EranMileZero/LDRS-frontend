import { Outlet, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function RootLayout() {
  const { t } = useTranslation();

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
              <Link to="/influencer" className="transition-colors hover:text-foreground/80 text-foreground/60">{t('nav.influencer')}</Link>
              <Link to="/consumer" className="transition-colors hover:text-foreground/80 text-foreground/60">{t('nav.consumer')}</Link>
              <Link to="/admin" className="transition-colors hover:text-foreground/80 text-foreground/60">{t('nav.admin')}</Link>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
}
