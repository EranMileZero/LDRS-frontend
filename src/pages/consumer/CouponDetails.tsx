import { useParams, useNavigate } from 'react-router-dom';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, ArrowLeft, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CouponDetails() {
  const { id } = useParams();
  const { coupons } = useMarketplace();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const coupon = coupons.find(c => c.id === id);

  if (!coupon) {
    return <div className="p-10 text-center">Coupon not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="h-4 w-4 me-2" /> Back
        </Button>
        
        <div className="grid md:grid-cols-2 gap-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <img src={coupon.image} alt={coupon.title} className="h-full w-full object-cover" />
            </div>
            
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">{coupon.title}</h1>
                    <p className="text-xl text-muted-foreground mt-2">{coupon.brand}</p>
                </div>
                
                <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-green-600">${coupon.price || coupon.discount}</span>
                    {coupon.originalPrice && (
                        <span className="text-xl text-muted-foreground line-through">${coupon.originalPrice}</span>
                    )}
                    {coupon.originalPrice && coupon.price && (
                        <Badge variant="secondary" className="text-lg">
                            -{Math.round(((coupon.originalPrice - coupon.price) / coupon.originalPrice) * 100)}%
                        </Badge>
                    )}
                </div>
                
                <p className="text-lg">{coupon.description}</p>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span>{coupon.location || 'Online'}</span>
                </div>
                
                <div className="flex gap-4">
                    <Button size="lg" className="flex-1">Get Deal</Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="lg" variant="outline" className="gap-2">
                                <MessageCircle className="h-5 w-5" />
                                Chat with Influencer
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
        </div>
    </div>
  );
}
