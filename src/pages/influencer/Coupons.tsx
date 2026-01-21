import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { couponService } from "@/services/coupon.service";
import { promotionService } from "@/services/promotion.service";
import type { CouponResponse, PromotionResponse } from "@/types/api";

export default function Coupons() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myCoupons, setMyCoupons] = useState<CouponResponse[]>([]);
  const [editingCoupon, setEditingCoupon] = useState<CouponResponse | null>(null);
  
  // Link to Campaign State
  const [openLink, setOpenLink] = useState(false);
  const [linkingCouponId, setLinkingCouponId] = useState<string | null>(null);
  const [promotions, setPromotions] = useState<PromotionResponse[]>([]);
  const [selectedPromoId, setSelectedPromoId] = useState<string>("");

  // Form State
  const [formData, setFormData] = useState({
      title: "",
      description: "",
      code: "",
      discount: "",
      price: "",
      expiry: "",
      category: "General",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2070&auto=format&fit=crop"
  });

  const fetchMyCoupons = async () => {
      if (user?.id) {
          try {
              const data = await couponService.getByInfluencer(user.id);
              setMyCoupons(data);
          } catch (error) {
              console.error("Failed to fetch my coupons", error);
          }
      }
  };

  const fetchPromotions = async () => {
      try {
          const data = await promotionService.getAll();
          setPromotions(data);
      } catch (error) {
          console.error("Failed to fetch promotions", error);
      }
  };

  useEffect(() => {
      fetchMyCoupons();
      fetchPromotions();
  }, [user?.id]);

  const handleOpenLink = (couponId: string) => {
      setLinkingCouponId(couponId);
      setOpenLink(true);
  };

  const handleLinkToCampaign = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedPromoId || !linkingCouponId) return;
      try {
          await promotionService.addCoupon(selectedPromoId, linkingCouponId);
          setOpenLink(false);
          setLinkingCouponId(null);
          setSelectedPromoId("");
          alert("Linked successfully!");
      } catch (error) {
          console.error("Failed to link coupon", error);
          alert("Failed to link coupon");
      }
  };

  const handleOpenCreate = () => {
      setEditingCoupon(null);
      setFormData({
          title: "",
          description: "",
          code: "",
          discount: "",
          price: "",
          expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
          category: "General",
          image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2070&auto=format&fit=crop"
      });
      setOpen(true);
  };

  const handleOpenEdit = (coupon: CouponResponse) => {
      setEditingCoupon(coupon);
      setFormData({
          title: coupon.title,
          description: coupon.description,
          code: coupon.code,
          discount: coupon.discount,
          price: coupon.price.toString(),
          expiry: new Date(coupon.expiry).toISOString().split('T')[0],
          category: coupon.category,
          image: coupon.image
      });
      setOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
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
        if (editingCoupon) {
            await couponService.update(editingCoupon.id, payload);
        } else {
            await couponService.create(payload);
        }
        
        await fetchMyCoupons();
        setOpen(false);
    } catch (error) {
        console.error("Failed to save coupon", error);
        alert("Failed to save coupon");
    } finally {
        setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
      if (!confirm(t('common.confirm_delete', 'Are you sure?'))) return;
      try {
          await couponService.delete(id);
          await fetchMyCoupons();
      } catch (error) {
          console.error("Failed to delete coupon", error);
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{t('marketplace.coupons')}</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenCreate}>
              <Plus className="me-2 h-4 w-4" /> {t('common.create')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{editingCoupon ? t('common.edit') : t('common.create')} {t('marketplace.coupons', 'Coupon')}</DialogTitle>
                <DialogDescription>
                  {t('manage_coupons_desc', 'Manage your coupons.')}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="title" className="text-end text-sm font-medium col-span-1">
                    {t('campaigns.table.name', 'Title')}
                  </label>
                  <Input id="title" value={formData.title} onChange={handleChange} required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="description" className="text-end text-sm font-medium col-span-1">
                    {t('campaigns.form.description', 'Description')}
                  </label>
                  <Input id="description" value={formData.description} onChange={handleChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="code" className="text-end text-sm font-medium col-span-1">
                    {t('campaigns.form.code', 'Code')}
                  </label>
                  <Input id="code" value={formData.code} onChange={handleChange} required className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="discount" className="text-end text-sm font-medium col-span-1">
                    {t('campaigns.form.discount', 'Discount')}
                  </label>
                  <Input id="discount" value={formData.discount} onChange={handleChange} required className="col-span-3" placeholder="e.g. 20%" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="price" className="text-end text-sm font-medium col-span-1">
                    {t('campaigns.form.price', 'Price')}
                  </label>
                  <Input id="price" type="number" value={formData.price} onChange={handleChange} required className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="expiry" className="text-end text-sm font-medium col-span-1">
                    {t('campaigns.form.expiry', 'Expiry')}
                  </label>
                  <Input id="expiry" type="date" value={formData.expiry} onChange={handleChange} required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="image" className="text-end text-sm font-medium col-span-1">
                    {t('common.image', 'Image URL')}
                  </label>
                  <Input id="image" value={formData.image} onChange={handleChange} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>{editingCoupon ? t('common.save', 'Save') : t('common.create', 'Create')}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={openLink} onOpenChange={setOpenLink}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleLinkToCampaign}>
                    <DialogHeader>
                        <DialogTitle>{t('common.link_to_campaign', 'Link to Campaign')}</DialogTitle>
                        <DialogDescription>{t('common.select_campaign', 'Select a campaign to add this coupon to.')}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="campaign" className="text-end text-sm font-medium col-span-1">{t('campaigns.title', 'Campaign')}</label>
                            <div className="col-span-3">
                                <Select value={selectedPromoId} onValueChange={setSelectedPromoId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('common.select_campaign', 'Select Campaign')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {promotions.map(p => (
                                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={!selectedPromoId}>{t('common.link', 'Link')}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('campaigns.table.name')}</TableHead>
              <TableHead>{t('campaigns.form.code')}</TableHead>
              <TableHead className="text-end">{t('campaigns.form.price')}</TableHead>
              <TableHead className="text-end">{t('campaigns.table.conversions', 'Sold')}</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myCoupons.map((coupon) => {
                const conversions = coupon.soldCount || 0;
                return (
              <TableRow key={coupon.id}>
                <TableCell className="font-medium">{coupon.title}</TableCell>
                <TableCell>{coupon.code}</TableCell>
                <TableCell className="text-end">${coupon.price}</TableCell>
                <TableCell className="text-end">{conversions}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenEdit(coupon)}>{t('common.edit')}</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleOpenLink(coupon.id)}>{t('common.link_to_campaign', 'Link to Campaign')}</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(coupon.id)}>
                          {t('common.delete', 'Delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
