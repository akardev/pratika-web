import type { Metadata } from 'next';
import { requireAdmin, getAdminDashboardData } from '@/lib/admin';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

export const metadata: Metadata = {
  title: 'Pratika Admin | SaaS Yönetim Paneli',
  robots: { index: false, follow: false },
};

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireAdmin();
  const stats = await getAdminDashboardData();

  return (
    <AdminLayoutClient
      adminEmail={user.email}
      pendingRequestsCount={stats.pendingRequests}
    >
      {children}
    </AdminLayoutClient>
  );
}
