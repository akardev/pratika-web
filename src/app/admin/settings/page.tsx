import { requireAdmin, getAdminDashboardData } from '@/lib/admin';
import { createClient } from '@/lib/supabase/server';
import styles from '@/components/admin/admin.module.css';

export default async function AdminSettingsPage() {
  const { user } = await requireAdmin();
  const stats = await getAdminDashboardData();

  const supabase = await createClient();
  let auditLogs: Array<{
    id: string;
    actor_email: string;
    action: string;
    target_type: string;
    target_id?: string | null;
    details?: Record<string, unknown> | null;
    created_at: string;
  }> = [];

  try {
    const { data } = await supabase
      .from('admin_audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    if (data) {
      auditLogs = data;
    }
  } catch {
    auditLogs = [];
  }

  const actionLabels: Record<string, string> = {
    user_created: '👤 Kullanıcı Oluşturuldu',
    user_deleted: '🗑️ Kullanıcı Silindi',
    role_updated: '👑 Rol Güncellendi',
    business_deleted: '🏪 İşletme Silindi',
    business_status_updated: '⚡ Menü Durumu Değiştirildi',
    request_status_updated: '📨 Talep Durumu Güncellendi',
    password_reset_sent: '📧 Şifre Sıfırlama Gönderildi',
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          ⚙️ Sistem &amp; Denetim Logları (Audit Logs)
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Pratika SaaS altyapısı, veritabanı durumu ve gerçekleştirilen yönetici işlemleri.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {/* 1. ADMIN SESSION & SECURITY */}
        <div className={styles.adminCard}>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
            🛡️ Yönetici Oturumu &amp; Güvenlik
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Aktif Yönetici:</span>
              <strong className="text-white font-mono">{user.email}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Yetki Seviyesi:</span>
              <span className="font-bold text-emerald-400">● Süper Yönetici (Admin V2)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Erişim Doğrulaması:</span>
              <span className="text-slate-200">Server-side Guard (requireAdmin)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Oturum Tipi:</span>
              <span className="text-slate-200">Supabase Secure HTTP-Only Cookie</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Gizlilik Koruması:</span>
              <span className="text-emerald-400 font-semibold">✓ Service Role anahtarları gizlidir</span>
            </div>
          </div>
        </div>

        {/* 2. PLATFORM & DATABASE HEALTH */}
        <div className={styles.adminCard}>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
            ⚡ Platform &amp; Veritabanı Sağlığı
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Framework:</span>
              <span className="text-white font-semibold">Next.js 16.3.2 (Turbopack)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Veritabanı Sağlayıcı:</span>
              <span className="text-emerald-400 font-bold">● Supabase PostgreSQL (Aktif)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Toplam Kullanıcılar:</span>
              <span className="text-white font-bold">{stats.totalUsers} Kullanıcı</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Kayıtlı İşletmeler:</span>
              <span className="text-white font-bold">{stats.totalBusinesses} Adet</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Toplam Ürünler:</span>
              <span className="text-white font-bold">{stats.totalProducts} Adet</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. AUDIT LOGS TABLE */}
      <div className={styles.adminCard}>
        <div className={styles.adminCardHeader}>
          <div>
            <h2 className={styles.adminCardTitle}>
              <span>📜</span> Son Yönetici İşlemleri (Audit Logs)
            </h2>
            <p className={styles.adminCardDesc}>
              Kullanıcı oluşturma, silme, rol değiştirme ve sistem üzerindeki kritik işlemlerin geçmişi.
            </p>
          </div>
        </div>

        {auditLogs.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            Henüz kaydedilmiş denetim işlemi bulunmuyor. Yeni bir kullanıcı oluşturduğunuzda veya rol değiştirdiğinizde burada listelenecektir.
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>İşlem</th>
                  <th>Hedef Türü</th>
                  <th>Yönetici</th>
                  <th>Detay</th>
                  <th>Tarih</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => {
                  const dateStr = new Date(log.created_at).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <tr key={log.id}>
                      <td>
                        <strong className="text-white text-xs">
                          {actionLabels[log.action] || log.action}
                        </strong>
                      </td>
                      <td>
                        <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-300 border border-white/10">
                          {log.target_type}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs text-slate-300 font-mono">{log.actor_email}</span>
                      </td>
                      <td>
                        <span className="text-xs text-slate-400 font-mono max-w-xs truncate block">
                          {JSON.stringify(log.details || {})}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs text-slate-400">{dateStr}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
