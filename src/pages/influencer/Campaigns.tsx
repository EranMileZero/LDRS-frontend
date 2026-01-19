import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PROMOTIONS } from "@/lib/mockData";
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

export default function Campaigns() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{t('campaigns.title')}</h2>
        <Button>
          <Plus className="me-2 h-4 w-4" /> {t('campaigns.create_btn')}
        </Button>
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
            {PROMOTIONS.map((promo) => (
              <TableRow key={promo.id}>
                <TableCell className="font-medium">{promo.name}</TableCell>
                <TableCell>
                  <Badge variant={promo.status === 'Active' ? 'default' : 'secondary'}>
                    {promo.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-end">{promo.reach.toLocaleString()}</TableCell>
                <TableCell className="text-end">{promo.conversions}</TableCell>
                <TableCell className="text-end">${promo.revenue.toLocaleString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{t('common.actions')}</DropdownMenuLabel>
                      <DropdownMenuItem>{t('common.view_details')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('common.edit')}</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">{t('campaigns.end_campaign')}</DropdownMenuItem>
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
