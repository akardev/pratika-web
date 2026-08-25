import { notFound } from 'next/navigation';
import { requireAdmin, getAdminCustomerDetail } from '@/lib/admin';
import AdminCustomerDetailClient from '@/components/admin/AdminCustomerDetailClient';

interface CustomerDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminCustomerDetailPage({ params }: CustomerDetailPageProps) {
  await requireAdmin();
  const { id } = await params;

  const data = await getAdminCustomerDetail(id);

  if (!data || !data.user) {
    notFound();
  }

  return <AdminCustomerDetailClient data={data} />;
}
