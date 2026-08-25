import { requireAdmin, getAllAdminUsers } from '@/lib/admin';
import AdminCustomersTableClient from '@/components/admin/AdminCustomersTableClient';

export default async function AdminCustomersPage() {
  await requireAdmin();
  const users = await getAllAdminUsers();

  return <AdminCustomersTableClient initialUsers={users} />;
}
