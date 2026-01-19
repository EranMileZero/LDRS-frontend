import { COUPONS } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";

export default function ConsumerMarketplace() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t('marketplace.title')}</h1>
        <div className="flex flex-1 gap-4 md:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute start-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('marketplace.search_placeholder')}
              className="ps-8"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t('marketplace.category')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('marketplace.all_categories')}</SelectItem>
              <SelectItem value="fashion">{t('marketplace.fashion')}</SelectItem>
              <SelectItem value="food">{t('marketplace.food')}</SelectItem>
              <SelectItem value="health">{t('marketplace.health')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Coupon Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {COUPONS.map((coupon) => (
          <Card key={coupon.id} className="overflow-hidden flex flex-col">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={coupon.image}
                alt={coupon.title}
                className="h-full w-full object-cover transition-all hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{coupon.category}</Badge>
                <span className="text-sm text-muted-foreground">{coupon.brand}</span>
              </div>
              <CardTitle className="line-clamp-1">{coupon.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {coupon.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
               <div className="text-2xl font-bold text-primary">{coupon.discount}</div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">{t('marketplace.contact_influencer')}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{t('marketplace.chat_title', { brand: coupon.brand })}</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col h-[300px]">
                      <ScrollArea className="flex-1 p-4 border rounded-md mb-4">
                          <div className="space-y-4">
                              <div className="flex justify-start">
                                  <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm max-w-[80%]">
                                      Hello! How can I help you with the {coupon.title} offer?
                                  </div>
                              </div>
                          </div>
                      </ScrollArea>
                      <div className="flex gap-2">
                          <Input placeholder={t('common.type_message')} className="flex-1" />
                          <Button size="icon"><Send className="h-4 w-4" /></Button>
                      </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
