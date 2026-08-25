import { requireAdmin, getAdminRequestsList } from '@/lib/admin';
import AdminRequestsClient, { type ContactRequestItem } from '@/components/admin/AdminRequestsClient';

export default async function AdminRequestsPage() {
  await requireAdmin();
  const rawRequests = await getAdminRequestsList();

  const requests: ContactRequestItem[] = (rawRequests || []).map((r) => ({
    id: r.id,
    full_name: r.full_name,
    email: r.email,
    phone: r.phone || null,
    subject: r.subject,
    message: r.message,
    status: r.status || 'new',
    admin_notes: r.admin_notes || null,
    created_at: r.created_at,
    updated_at: r.updated_at,
  }));

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            📨 Gelen Talepler &amp; İletişim Mesajları
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Menü kurulum desteği, ek dil talepleri ve müşteri iletişim formlarının yönetimi.
          </p>
        </div>
      </div>

      <AdminRequestsClient initialRequests={requests} />
    </div>
  );
}
