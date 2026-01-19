import { Search, Heart, ShoppingCart, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function MarketplaceHeader() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const categories = [
    { label: t('marketplace.featured'), href: '#' },
    { label: t('marketplace.beauty_spas'), href: '#' },
    { label: t('marketplace.things_to_do'), href: '#' },
    { label: t('marketplace.gifts'), href: '#' },
    { label: t('marketplace.food_drink'), href: '#' },
    { label: t('marketplace.local'), href: '#' },
    { label: t('marketplace.travel'), href: '#' },
    { label: t('marketplace.goods'), href: '#' },
    { label: t('marketplace.coupons'), href: '#' },
  ];

  return (
    <div className="flex flex-col w-full bg-white border-b">
      {/* Top Header */}
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4 md:gap-8">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">LDRS<span className="text-muted-foreground font-normal">MARKET</span></h1>
        </Link>

        {/* Search Bar - Hidden on mobile, visible on md+ */}
        <div className="hidden md:flex flex-1 max-w-2xl relative">
            <div className="relative w-full flex items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search Theatre"
                    className="pl-10 h-10 md:h-11 rounded-full border-slate-300 bg-slate-50 focus-visible:ring-black w-full pr-24"
                />
                <Button className="absolute right-1 top-1 h-8 md:h-9 rounded-full bg-foreground hover:bg-black/90 px-6">
                    <Search className="h-4 w-4" />
                </Button>
            </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-6">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden sm:flex">
                <Heart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden sm:flex">
                <ShoppingCart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-emerald-600 relative hidden sm:flex">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center font-bold">
                    3
                </span>
            </Button>
            
            {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-slate-100 rounded-full">
                         <div className="flex items-center gap-2">
                             <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatars/01.png" alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                             </Avatar>
                             <span className="hidden lg:inline-block font-medium text-sm text-foreground">
                                 {user.name.split(' ')[0]}
                             </span>
                         </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>{t('common.my_account')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>{t('common.profile')}</DropdownMenuItem>
                    <DropdownMenuItem>{t('common.orders')}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">{t('auth.logout')}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Link to="/login">
                    <Button variant="ghost" className="font-bold flex items-center gap-2 hover:bg-slate-100 rounded-full">
                        <User className="h-5 w-5" />
                        <span className="hidden sm:inline-block">{t('auth.login_btn')}</span>
                    </Button>
                </Link>
            )}
        </div>
      </div>

      {/* Navigation Categories */}
      <div className="border-t">
          <div className="container mx-auto px-4">
              <nav className="flex items-center gap-6 overflow-x-auto py-3 no-scrollbar">
                  {categories.map((cat, i) => (
                      <Link
                        key={i}
                        to={cat.href}
                        className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline underline-offset-4 whitespace-nowrap transition-colors"
                      >
                          {cat.label}
                      </Link>
                  ))}
              </nav>
          </div>
      </div>
    </div>
  );
}
