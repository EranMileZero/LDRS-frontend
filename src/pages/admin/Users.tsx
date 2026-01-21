import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { userService } from "@/services/user.service";
import { useEffect, useState } from "react";
import type { UserResponse } from "@/types/api";

export default function Users() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
      try {
          const data = await userService.getAll();
          setUsers(data);
      } catch (error) {
          console.error("Failed to fetch users", error);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
      if (!confirm(t('common.confirm_delete', 'Are you sure?'))) return;
      try {
          await userService.delete(id);
          fetchUsers();
      } catch (error) {
          console.error("Failed to delete user", error);
      }
  };

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
            {loading ? (
                <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">Loading...</TableCell>
                </TableRow>
            ) : users.length === 0 ? (
                 <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">No users found</TableCell>
                </TableRow>
            ) : (
                users.map((user) => (
                <TableRow key={user.id}>
                    <TableCell className="font-medium text-start">{user.name}</TableCell>
                    <TableCell className="text-start">{user.email}</TableCell>
                    <TableCell className="text-start">
                    <Badge variant="outline" className="capitalize">{user.role}</Badge>
                    </TableCell>
                    <TableCell className="text-end gap-2 flex justify-end">
                    <Button variant="ghost" size="sm">{t('common.edit', 'Edit')}</Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(user.id)}>
                        {t('common.delete', 'Delete')}
                    </Button>
                    </TableCell>
                </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
