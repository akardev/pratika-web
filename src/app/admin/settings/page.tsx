import { requireAdmin, getAdminDashboardData } from '@/lib/admin';
import styles from '@/components/admin/admin.module.css';

export default async function AdminSettingsPage() {
  const { user } = await requireAdmin();
  const stats = await getAdminDashboardData();

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          ⚙️ Sistem &amp; Platform Durumu
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Pratika SaaS altyapısı, veritabanı bağlantısı ve yönetici oturum detayları.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
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
              <span className="font-bold text-emerald-400">● Süper Yönetici (Admin V1)</span>
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
              <span className="text-emerald-400 font-semibold">✓ Hassas anahtarlar gizlenmiştir</span>
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
              <span className="text-slate-400">Kayıtlı İşletmeler:</span>
              <span className="text-white font-bold">{stats.totalBusinesses} Adet</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Toplam Ürünler:</span>
              <span className="text-white font-bold">{stats.totalProducts} Adet</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-slate-400">Toplam Kategoriler:</span>
              <span className="text-white font-bold">{stats.totalCategories} Adet</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
