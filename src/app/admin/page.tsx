import Link from 'next/link';
import Image from 'next/image';
import { requireAdmin, getAdminDashboardData } from '@/lib/admin';
import styles from '@/components/admin/admin.module.css';

export default async function AdminDashboardPage() {
  await requireAdmin();
  const stats = await getAdminDashboardData();

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Yönetim Paneli Genel Bakış
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Pratika SaaS platformundaki tüm müşteri, işletme, menü ve trial aktivitelerinin anlık özeti.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/requests" className={styles.btnSecondary}>
            <span>📨</span>
            <span>Talepler {stats.pendingRequests > 0 ? `(${stats.pendingRequests})` : ''}</span>
          </Link>
          <Link href="/admin/customers" className={styles.btnPrimary}>
            <span>👥</span>
            <span>Müşterileri Gör</span>
          </Link>
        </div>
      </div>

      {/* 1. KEY STATS CARDS */}
      <div className={styles.statsGrid}>
        {/* TOPLAM MÜŞTERİ */}
        <div className={styles.statCard}>
          <div className={styles.statCardTop}>
            <div className={`${styles.statIcon} bg-blue-500/20 text-blue-400 border border-blue-500/30`}>
              👥
            </div>
            <span className={styles.badgeInfo}>Müşteri</span>
          </div>
          <div className={styles.statTitle}>Toplam Müşteri</div>
          <div className={styles.statValue}>{stats.totalCustomers}</div>
          <div className={styles.statHint}>Kayıtlı tekil işletme sahibi</div>
        </div>

        {/* AKTİF İŞLETME */}
        <div className={styles.statCard}>
          <div className={styles.statCardTop}>
            <div className={`${styles.statIcon} bg-emerald-500/20 text-emerald-400 border border-emerald-500/30`}>
              🏪
            </div>
            <span className={styles.badgeSuccess}>İşletme</span>
          </div>
          <div className={styles.statTitle}>Aktif İşletme</div>
          <div className={styles.statValue}>{stats.activeBusinesses}</div>
          <div className={styles.statHint}>Sistemde kayıtlı işletmeler</div>
        </div>

        {/* TRİAL MÜŞTERİ */}
        <div className={styles.statCard}>
          <div className={styles.statCardTop}>
            <div className={`${styles.statIcon} bg-amber-500/20 text-amber-400 border border-amber-500/30`}>
              ⏳
            </div>
            <span className={styles.badgeWarning}>15 Günlük</span>
          </div>
          <div className={styles.statTitle}>Trial Müşteri</div>
          <div className={styles.statValue}>{stats.trialCustomers}</div>
          <div className={styles.statHint}>Aktif deneme süresinde</div>
        </div>

        {/* ÜCRETLİ MÜŞTERİ */}
        <div className={styles.statCard}>
          <div className={styles.statCardTop}>
            <div className={`${styles.statIcon} bg-purple-500/20 text-purple-400 border border-purple-500/30`}>
              💳
            </div>
            <span className={styles.badgeNeutral}>Plan</span>
          </div>
          <div className={styles.statTitle}>Ücretli Müşteri</div>
          <div className={styles.statValue}>{stats.paidCustomers}</div>
          <div className={styles.statHint}>Ödeme altyapısı henüz aktif değil</div>
        </div>

        {/* AKTİF MENÜ */}
        <div className={styles.statCard}>
          <div className={styles.statCardTop}>
            <div className={`${styles.statIcon} bg-indigo-500/20 text-indigo-400 border border-indigo-500/30`}>
              🍽️
            </div>
            <span className={styles.badgeInfo}>Menü</span>
          </div>
          <div className={styles.statTitle}>Aktif Menü</div>
          <div className={styles.statValue}>{stats.activeMenus}</div>
          <div className={styles.statHint}>{stats.totalProducts} ürün · {stats.totalCategories} kategori</div>
        </div>
      </div>

      {/* 2. REVENUE / PAYMENT GATEWAY STATUS NOTICE */}
      <div className="mb-6 rounded-2xl border border-slate-700/60 bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 p-5 text-slate-300 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base">💳</span>
              <h3 className="text-sm font-bold text-white">Ödeme ve Gelir Altyapısı</h3>
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/30">
                Hazırlık Aşamasında
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400 max-w-2xl leading-relaxed">
              Platformda gerçek ödeme ağ geçidi (Iyzico / Stripe) entegrasyonu henüz bağlanmamıştır. Bu nedenle sahte gelir veya ödeme rakamları üretilmemektedir. Mevcut tüm işletmeler 15 günlük ücretsiz deneme süresi dahilinde çalışmaktadır.
            </p>
          </div>
          <Link href="/admin/subscriptions" className={styles.btnSecondary}>
            Abonelikleri İncele →
          </Link>
        </div>
      </div>

      {/* 3. RECENT BUSINESSES / CUSTOMERS TABLE */}
      <div className={styles.adminCard}>
        <div className={styles.adminCardHeader}>
          <div>
            <h2 className={styles.adminCardTitle}>
              <span>🏪</span> Son Kayıt Olan İşletmeler &amp; Müşteriler
            </h2>
            <p className={styles.adminCardDesc}>
              Platforma son katılan işletmelerin menü durumu, trial süresi ve içerik detayları.
            </p>
          </div>
          <Link href="/admin/businesses" className={styles.btnSecondary}>
            Tümünü Gör ({stats.totalBusinesses}) →
          </Link>
        </div>

        {stats.recentBusinesses.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            Henüz kayıtlı işletme bulunmuyor.
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>İşletme</th>
                  <th>Tür &amp; Lokasyon</th>
                  <th>Menü / Tema</th>
                  <th>İçerik</th>
                  <th>Trial Durumu</th>
                  <th>Kayıt Tarihi</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentBusinesses.map((b) => {
                  const dateStr = new Date(b.createdAt).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });

                  return (
                    <tr key={b.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 font-serif font-bold text-orange-400">
                            {b.logoUrl ? (
                              <Image
                                src={b.logoUrl}
                                alt={b.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              b.name[0]?.toUpperCase() || 'P'
                            )}
                          </div>
                          <div>
                            <strong className="block text-white text-sm">{b.name}</strong>
                            <span className="text-[11px] text-slate-400">/m/{b.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-xs">
                          <span className="font-semibold text-slate-300">{b.businessType}</span>
                          {b.city && <p className="text-[11px] text-slate-500 mt-0.5">📍 {b.city}</p>}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col gap-1 text-xs">
                          <span
                            className={`${styles.statusBadge} ${
                              b.menuActive ? styles.badgeSuccess : styles.badgeNeutral
                            }`}
                          >
                            {b.menuActive ? '✓ Yayında' : '○ Taslak'}
                          </span>
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                            Tema: {b.theme}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="text-xs text-slate-300">
                          <strong>{b.productCount}</strong> ürün · <strong>{b.categoryCount}</strong> kategori
                        </div>
                      </td>
                      <td>
                        <div className="text-xs">
                          <span
                            className={`${styles.statusBadge} ${
                              b.trial.isExpired ? styles.badgeDanger : styles.badgeWarning
                            }`}
                          >
                            {b.trial.isExpired ? 'Süresi Doldu' : `${b.trial.daysLeft} Gün Kaldı`}
                          </span>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            Bitiş: {b.trial.endDateFormatted}
                          </p>
                        </div>
                      </td>
                      <td>
                        <span className="text-xs text-slate-400">{dateStr}</span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/businesses/${b.id}`}
                            className={styles.btnSecondary}
                          >
                            İncele →
                          </Link>
                          <a
                            href={`/m/${b.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                            title="Public Menüyü Yeni Sekmede Aç"
                          >
                            Menü ↗
                          </a>
                        </div>
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
