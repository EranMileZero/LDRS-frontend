import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, ArrowLeft, MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { promotionService } from "@/services/promotion.service";
import { couponService } from "@/services/coupon.service";
import { useAuth } from "@/context/AuthContext";
import type { PromotionResponse, CouponResponse } from '@/types/api';

export default function CampaignDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const [promotion, setPromotion] = useState<PromotionResponse | null>(location.state?.promotion || null);
  const [coupons, setCoupons] = useState<CouponResponse[]>([]);
  const [loading, setLoading] = useState(!location.state?.promotion);
  const [openAddCoupon, setOpenAddCoupon] = useState(false);
  const [openLinkCoupon, setOpenLinkCoupon] = useState(false);
  const [allCoupons, setAllCoupons] = useState<CouponResponse[]>([]);
  const [selectedCouponId, setSelectedCouponId] = useState<string>("");
  
  // Coupon Form State
  const [formData, setFormData] = useState({
      title: "",
      description: "",
      code: "",
      discount: "",
      price: "",
      expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      category: "General",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2070&auto=format&fit=crop"
  });

  const fetchData = async () => {
      if (!id) return;
      try {
          const promo = await promotionService.getById(id);
          setPromotion(promo);
          const campaignCoupons = await promotionService.getCoupons(id);
          setCoupons(campaignCoupons);
      } catch (error) {
          console.error("Failed to fetch campaign details", error);
      } finally {
          setLoading(false);
      }
  };

  const fetchAllCoupons = async () => {
      if (user?.id) {
          try {
              const data = await couponService.getByInfluencer(user.id);
              // Filter out coupons already linked
              const linkedIds = coupons.map(c => c.id);
              setAllCoupons(data.filter(c => !linkedIds.includes(c.id)));
          } catch (error) {
              console.error("Failed to fetch coupons", error);
          }
      }
  };

  useEffect(() => {
      fetchData();
  }, [id]);

  useEffect(() => {
      if (openLinkCoupon) {
          fetchAllCoupons();
      }
  }, [openLinkCoupon, coupons]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleAddCoupon = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!id) return;
      
      const payload = {
        title: formData.title,
        description: formData.description,
        code: formData.code,
        discount: formData.discount,
        brand: user?.name || "MyBrand",
        influencerId: user?.id,
        expiry: new Date(formData.expiry).toISOString(),
        category: formData.category,
        image: formData.image,
        originalPrice: parseFloat(formData.price) * 1.2,
        price: parseFloat(formData.price),
        location: "Online"
    };

    try {
        // 1. Create Coupon
        const newCoupon = await couponService.create(payload);
        
        // 2. Link Coupon to Campaign
        if (newCoupon && newCoupon.id) {
            await promotionService.addCoupon(id, newCoupon.id);
        }
        
        await fetchData();
        setOpenAddCoupon(false);
    } catch (error) {
        console.error("Failed to add coupon", error);
    }
  };

  const handleLinkCoupon = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!id || !selectedCouponId) return;

      try {
          await promotionService.addCoupon(id, selectedCouponId);
          await fetchData();
          setOpenLinkCoupon(false);
          setSelectedCouponId("");
      } catch (error) {
          console.error("Failed to link coupon", error);
          alert("Failed to link coupon");
      }
  };

  const handleUnlinkCoupon = async (couponId: string) => {
      if (!id || !confirm(t('common.confirm_delete', 'Are you sure?'))) return;
      try {
          await promotionService.removeCoupon(id, couponId);
          await fetchData();
      } catch (error) {
          console.error("Failed to unlink coupon", error);
      }
  };

  if (loading) return <div>Loading...</div>;
  if (!promotion) return <div>Campaign not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/influencer/campaigns')}>
            <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">{promotion.name}</h2>
        <Badge variant={promotion.status === 'Active' ? 'default' : 'secondary'}>{promotion.status}</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
          <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{t('dashboard.stats.total_revenue')}</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">${promotion.revenue}</div></CardContent>
          </Card>
          <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{t('dashboard.stats.total_reach')}</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">{promotion.reach}</div></CardContent>
          </Card>
          <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{t('dashboard.stats.conversions')}</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">{promotion.conversions}</div></CardContent>
          </Card>
      </div>

      <div className="flex items-center justify-between mt-8">
          <h3 className="text-xl font-semibold">{t('marketplace.coupons')}</h3>
          <div className="flex gap-2">
            <Dialog open={openLinkCoupon} onOpenChange={setOpenLinkCoupon}>
                <DialogTrigger asChild>
                    <Button variant="outline">{t('common.link_coupon', 'Link Coupon')}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleLinkCoupon}>
                        <DialogHeader>
                            <DialogTitle>{t('common.link_coupon', 'Link Coupon')}</DialogTitle>
                            <DialogDescription>{t('common.link_coupon_desc', 'Select an existing coupon to add to this campaign.')}</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="coupon" className="text-end text-sm font-medium col-span-1">{t('marketplace.coupons', 'Coupon')}</label>
                                <div className="col-span-3">
                                    <Select value={selectedCouponId} onValueChange={setSelectedCouponId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('common.select_coupon', 'Select Coupon')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {allCoupons.map(c => (
                                                <SelectItem key={c.id} value={c.id}>{c.title} ({c.code})</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={!selectedCouponId}>{t('common.link', 'Link')}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={openAddCoupon} onOpenChange={setOpenAddCoupon}>
                <DialogTrigger asChild>
                    <Button><Plus className="me-2 h-4 w-4" /> {t('common.create_and_link', 'Create Coupon')}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleAddCoupon}>
                        <DialogHeader>
                            <DialogTitle>{t('common.create_and_link', 'Create Coupon')}</DialogTitle>
                            <DialogDescription>{t('campaigns.create_desc', 'Fill in the details.')}</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="title" className="text-end text-sm font-medium col-span-1">{t('campaigns.table.name', 'Title')}</label>
                                <Input id="title" value={formData.title} onChange={handleChange} required className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="code" className="text-end text-sm font-medium col-span-1">{t('campaigns.form.code', 'Code')}</label>
                                <Input id="code" value={formData.code} onChange={handleChange} required className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="price" className="text-end text-sm font-medium col-span-1">{t('campaigns.form.price', 'Price')}</label>
                                <Input id="price" type="number" value={formData.price} onChange={handleChange} required className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">{t('common.create_and_link', 'Create & Link')}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
          </div>
      </div>

      <div className="rounded-md border">
          <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead className="text-end">Price</TableHead>
                      <TableHead className="text-end">Sold</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {coupons.map(coupon => (
                      <TableRow key={coupon.id}>
                          <TableCell className="font-medium">{coupon.title}</TableCell>
                          <TableCell>{coupon.code}</TableCell>
                          <TableCell className="text-end">${coupon.price}</TableCell>
                          <TableCell className="text-end">{coupon.soldCount}</TableCell>
                          <TableCell>
                              <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                      <DropdownMenuItem>{t('common.view_details')}</DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-600" onClick={() => handleUnlinkCoupon(coupon.id)}>
                                          {t('common.remove')}
                                      </DropdownMenuItem>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </div>
    </div>
  );
}
