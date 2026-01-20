import { USERS } from "@/lib/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

export default function Users() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{t('admin.sidebar.users')}</h2>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">{t('auth.name', 'Name')}</TableHead>
              <TableHead className="text-start">{t('auth.email', 'Email')}</TableHead>
              <TableHead className="text-start">{t('admin.role', 'Role')}</TableHead>
              <TableHead className="text-end">{t('common.actions', 'Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {USERS.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium text-start">{user.name}</TableCell>
                <TableCell className="text-start">{user.email}</TableCell>
                <TableCell className="text-start">
                  <Badge variant="outline" className="capitalize">{user.role}</Badge>
                </TableCell>
                <TableCell className="text-end">
                   <span className="text-muted-foreground text-sm cursor-pointer hover:underline">{t('common.view_details', 'View')}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
