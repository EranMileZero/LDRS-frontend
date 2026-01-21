import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from "@/context/MarketplaceContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, ChevronRight, MapPin, Tag, Send, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ConsumerMarketplace() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { coupons } = useMarketplace();
  const navigate = useNavigate();

  const handleActionClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      e.stopPropagation();
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col">
       {/* Hero Section */}
       <div className="bg-slate-100 py-8 md:py-12 px-4 mb-8">
           <div className="container mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                            New Year, New Me
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Facials, hair, nails, and more - now up to 30% off! Use code GLOWUP.
                        </p>
                        <Button size="lg" className="rounded-full px-8 text-base bg-foreground text-background hover:bg-black/80">
                            Check it out <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                    <div className="hidden md:block relative w-64 h-64 md:w-80 md:h-80">
                         <img
                            src="https://images.unsplash.com/photo-1512690459411-b9245aed8ad6?q=80&w=2080&auto=format&fit=crop"
                            alt="Spa"
                            className="rounded-full object-cover w-full h-full shadow-lg"
                         />
                    </div>
                </div>
           </div>
       </div>

       {/* Main Content */}
       <div className="container mx-auto px-4 pb-20 space-y-10">
          
          {/* Section 1: Trending */}
          <div className="space-y-6">
              <div className="flex items-center gap-2">
                 <h2 className="text-2xl font-bold text-foreground">Trending in Chicago</h2>
                 <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <ChevronRight className="h-5 w-5 rotate-90" />
                 </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {coupons.map((coupon) => (
                    <div key={coupon.id} className="group flex flex-col gap-2">
                        {/* Card Image Wrapper */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted">
                            <Link to={`/coupon/${coupon.id}`}>
                                <img
                                    src={coupon.image}
                                    alt={coupon.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </Link>
                            {/* Badge Overlay */}
                            <div className="absolute top-3 left-3 pointer-events-none">
                                <Badge className="bg-white/90 text-foreground hover:bg-white flex items-center gap-1 shadow-sm border-0 font-medium">
                                    <Tag className="h-3 w-3 fill-rose-500 text-rose-500" />
                                    Popular Gift
                                </Badge>
                            </div>
                            {/* Heart Icon */}
                            <div className="absolute top-3 right-3 z-10">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white text-muted-foreground hover:text-red-500 transition-colors" onClick={(e) => { e.preventDefault(); e.stopPropagation(); /* Add to favorites logic */ }}>
                                    <Heart className="h-5 w-5" />
                                </Button>
                            </div>
                            
                            {/* Chat Button */}
                            <div className="absolute bottom-3 right-3 z-10">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="sm" className="rounded-full gap-2 shadow-lg" onClick={(e) => { if (!user) { e.preventDefault(); navigate('/login'); } }}>
                                            <MessageCircle className="h-4 w-4" />
                                            Chat
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>{t('marketplace.chat_title', { brand: coupon.brand })}</DialogTitle>
                                        </DialogHeader>
                                        <div className="flex flex-col h-[400px]">
                                            <ScrollArea className="flex-1 p-4 border rounded-md mb-4 bg-slate-50">
                                                <div className="space-y-4">
                                                    <div className="flex justify-start">
                                                        <div className="bg-white border text-foreground rounded-lg rounded-tl-none px-3 py-2 text-sm max-w-[80%] shadow-sm">
                                                            <p className="font-semibold text-xs text-muted-foreground mb-1">{coupon.brand}</p>
                                                            Hello! How can I help you with the {coupon.title} offer?
                                                        </div>
                                                    </div>
                                                </div>
                                            </ScrollArea>
                                            <div className="flex gap-2">
                                                <Input placeholder={t('common.type_message')} className="flex-1" />
                                                <Button size="icon" className="rounded-full"><Send className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>

                        {/* Card Content */}
                        <Link to={`/coupon/${coupon.id}`} className="space-y-1 block">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-base leading-tight group-hover:underline decoration-2 underline-offset-4 decoration-foreground/30 line-clamp-2">
                                    {coupon.brand}: {coupon.title}
                                </h3>
                            </div>
                            
                            <div className="flex items-center text-xs text-muted-foreground gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{coupon.location || 'Nearby'}</span>
                                <span>•</span>
                                <span>{((coupon.location?.length || 0) / 2).toFixed(1)} mi</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <div className="flex text-amber-400">
                                    <Star className="h-3 w-3 fill-current" />
                                    <Star className="h-3 w-3 fill-current" />
                                    <Star className="h-3 w-3 fill-current" />
                                    <Star className="h-3 w-3 fill-current" />
                                    <Star className="h-3 w-3 fill-current text-muted/30" />
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {coupon.rating || 4.5} ({coupon.reviews || 100})
                                </span>
                            </div>

                            <div className="pt-1 flex items-baseline gap-2">
                                {coupon.originalPrice && (
                                    <span className="text-sm text-muted-foreground line-through decoration-slate-400">
                                        ${coupon.originalPrice}
                                    </span>
                                )}
                                <span className="text-lg font-bold text-green-600">
                                    ${coupon.price || coupon.discount}
                                </span>
                                {coupon.originalPrice && coupon.price && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-0 text-xs font-bold rounded px-1.5">
                                        -{Math.round(((coupon.originalPrice - coupon.price) / coupon.originalPrice) * 100)}%
                                    </Badge>
                                )}
                            </div>
                            
                            {coupon.soldCount && (
                                <p className="text-xs text-muted-foreground">
                                    {coupon.soldCount.toLocaleString()}+ bought
                                </p>
                            )}
                        </Link>
                    </div>
                 ))}
              </div>
          </div>
       </div>
    </div>
  );
}
