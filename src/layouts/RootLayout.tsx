import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-8">
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">L</span>
              </div>
              <span className="font-bold sm:inline-block">LDRS</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
             <Link to="/influencer" className="transition-colors hover:text-foreground/80 text-foreground/60">Influencer</Link>
             <Link to="/consumer" className="transition-colors hover:text-foreground/80 text-foreground/60">Consumer</Link>
             <Link to="/admin" className="transition-colors hover:text-foreground/80 text-foreground/60">Admin</Link>
          </nav>
        </div>
      </header>
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
}
