import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { checkIsAdmin, getAdminDashboardData } from '@/lib/admin';
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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = checkIsAdmin(user);

  let pendingRequestsCount = 0;
  if (isAdmin) {
    try {
      const stats = await getAdminDashboardData();
      pendingRequestsCount = stats.pendingRequests;
    } catch {
      pendingRequestsCount = 0;
    }
  }

  return (
    <AdminLayoutClient
      adminEmail={user?.email || ''}
      pendingRequestsCount={pendingRequestsCount}
      isAdmin={isAdmin}
    >
      {children}
    </AdminLayoutClient>
  );
}
