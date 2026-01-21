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
import { Input } from "@/components/ui/input";
import { useMarketplace } from "@/context/MarketplaceContext";
import { useState } from "react";
import { promotionService } from "@/services/promotion.service";
import { useNavigate } from "react-router-dom";

export default function Campaigns() {
  const { t } = useTranslation();
  const { promotions, refresh } = useMarketplace();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const budget = (form.elements.namedItem('budget') as HTMLInputElement).value;
    
    try {
        await promotionService.create({
            name,
            budget: parseInt(budget) || 0,
            status: 'Active',
            reach: 0,
            coupons: []
        });
        await refresh();
        setOpen(false);
    } catch (error) {
        console.error("Failed to create campaign", error);
        alert("Failed to create campaign (Backend API not ready)");
    } finally {
        setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
      if (!confirm(t('common.confirm_delete', 'Are you sure?'))) return;
      try {
          await promotionService.delete(id);
          await refresh();
      } catch (error) {
          console.error("Failed to delete campaign", error);
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{t('campaigns.title')}</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="me-2 h-4 w-4" /> {t('campaigns.create_btn')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{t('campaigns.create_btn', 'Create Campaign')}</DialogTitle>
                <DialogDescription>
                  {t('campaigns.create_desc', 'Fill in the details for your new campaign.')}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-end text-sm font-medium col-span-1">
                    {t('campaigns.table.name', 'Name')}
                  </label>
                  <Input id="name" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="budget" className="text-end text-sm font-medium col-span-1">
                    {t('campaigns.budget', 'Budget')}
                  </label>
                  <Input id="budget" type="number" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>{t('common.create', 'Create')}</Button>
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
              <TableHead>{t('campaigns.table.status')}</TableHead>
              <TableHead className="text-end">{t('campaigns.table.reach')}</TableHead>
              <TableHead className="text-end">{t('campaigns.table.conversions')}</TableHead>
              <TableHead className="text-end">{t('campaigns.table.revenue')}</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotions.map((promo) => (
              <TableRow key={promo.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/influencer/campaigns/${promo.id}`, { state: { promotion: promo } })}>
                <TableCell className="font-medium">{promo.name}</TableCell>
                <TableCell>
                  <Badge variant={promo.status === 'Active' ? 'default' : 'secondary'}>
                    {promo.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-end">{promo.reach.toLocaleString()}</TableCell>
                <TableCell className="text-end">{promo.conversions}</TableCell>
                <TableCell className="text-end">${promo.revenue.toLocaleString()}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/influencer/campaigns/${promo.id}`, { state: { promotion: promo } })}>{t('common.view_details')}</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/influencer/campaigns/${promo.id}`, { state: { promotion: promo } })}>{t('marketplace.manage_coupons')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('common.edit')}</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(promo.id)}>{t('common.delete')}</DropdownMenuItem>
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
