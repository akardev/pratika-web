import Link from 'next/link';
import { requireAdmin, getAdminBusinessesList } from '@/lib/admin';
import styles from '@/components/admin/admin.module.css';

export default async function AdminSubscriptionsPage() {
  await requireAdmin();
  const customers = await getAdminBusinessesList();

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            💳 Abonelikler &amp; Trial Durumları
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Tüm işletmelerin 15 günlük ücretsiz deneme ve plan kullanım süreleri.
          </p>
        </div>
      </div>

      {/* NOTICE BOX */}
      <div className="mb-6 rounded-2xl border border-slate-700/60 bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 p-5 text-slate-300 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-base">💳</span>
          <h3 className="text-sm font-bold text-white">Ödeme Altyapısı Bilgisi</h3>
        </div>
        <p className="mt-1 text-xs text-slate-400 max-w-3xl leading-relaxed">
          SaaS ödeme gateway&apos;i (Iyzico / Stripe) entegrasyonu henüz aktif edilmemiştir. Platformdaki tüm kayıtlı işletmeler <strong>15 Günlük Ücretsiz Deneme (Profesyonel)</strong> planı kapsamında hizmet almaktadır.
        </p>
      </div>

      {/* SUBSCRIPTION LIST TABLE */}
      <div className={styles.adminCard}>
        <div className={styles.adminCardHeader}>
          <div>
            <h2 className={styles.adminCardTitle}>
              <span>📋</span> Aktif Abonelik ve Trial Listesi ({customers.length})
            </h2>
            <p className={styles.adminCardDesc}>
              Kayıtlı işletmelerin üyelik başlangıç, bitiş ve kalan süre dökümü.
            </p>
          </div>
        </div>

        {customers.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            Kayıtlı işletme bulunamadı.
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>İşletme / Müşteri</th>
                  <th>Kayıt Tarihi</th>
                  <th>Plan Adı</th>
                  <th>Trial Bitiş</th>
                  <th>Kalan Süre</th>
                  <th>Durum</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => {
                  const dateStr = new Date(c.createdAt).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });

                  return (
                    <tr key={c.id}>
                      <td>
                        <strong className="block text-white text-sm">{c.name}</strong>
                        <span className="text-[11px] text-slate-400 font-mono">
                          ID: {c.userId.slice(0, 8)}...
                        </span>
                      </td>
                      <td>
                        <span className="text-xs text-slate-400">{dateStr}</span>
                      </td>
                      <td>
                        <span className="text-xs font-semibold text-slate-200">
                          {c.trial.planName}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs text-slate-300">
                          {c.trial.endDateFormatted}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`text-xs font-extrabold ${
                            c.trial.isExpired ? 'text-red-400' : 'text-amber-400'
                          }`}
                        >
                          {c.trial.isExpired ? '0 Gün' : `${c.trial.daysLeft} Gün`}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            c.trial.isExpired ? styles.badgeDanger : styles.badgeSuccess
                          }`}
                        >
                          {c.trial.isExpired ? 'Süresi Doldu' : 'Aktif Trial'}
                        </span>
                      </td>
                      <td>
                        <Link
                          href={`/admin/customers/${c.userId}`}
                          className={styles.btnSecondary}
                        >
                          İncele →
                        </Link>
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
