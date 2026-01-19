import { Outlet, useLocation } from "react-router-dom";
import { MarketplaceHeader } from "@/components/layout/MarketplaceHeader";

export default function RootLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/influencer') || location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {!isDashboard && <MarketplaceHeader />}
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
}
