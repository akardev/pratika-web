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
            Pratika SaaS platformundaki tüm kullanıcı, işletme, menü ve trial aktivitelerinin anlık özeti.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/requests" className={styles.btnSecondary}>
            <span>📨</span>
            <span>Talepler {stats.pendingRequests > 0 ? `(${stats.pendingRequests})` : ''}</span>
          </Link>
          <Link href="/admin/customers" className={styles.btnPrimary}>
            <span>👥</span>
            <span>Kullanıcıları Yönet</span>
          </Link>
        </div>
      </div>

      {/* 1. KEY STATS CARDS */}
      <div className={styles.statsGrid}>
        {/* TOPLAM KULLANICI */}
        <div className={styles.statCard}>
          <div className={styles.statCardTop}>
            <div className={`${styles.statIcon} bg-blue-500/20 text-blue-400 border border-blue-500/30`}>
              👥
            </div>
            <span className={styles.badgeInfo}>Kullanıcı</span>
          </div>
          <div className={styles.statTitle}>Toplam Kullanıcı</div>
          <div className={styles.statValue}>{stats.totalUsers}</div>
          <div className={styles.statHint}>
            {stats.adminCount} Yönetici · {stats.totalUsers - stats.adminCount} Müşteri
          </div>
        </div>

        {/* İŞLETMESİ OLAN / OLMAYAN */}
        <div className={styles.statCard}>
          <div className={styles.statCardTop}>
            <div className={`${styles.statIcon} bg-emerald-500/20 text-emerald-400 border border-emerald-500/30`}>
              🏪
            </div>
            <span className={styles.badgeSuccess}>İşletmeler</span>
          </div>
          <div className={styles.statTitle}>İşletmeli Kullanıcı</div>
          <div className={styles.statValue}>{stats.usersWithBusiness}</div>
          <div className={styles.statHint}>{stats.usersWithoutBusiness} kullanıcı işletmesiz</div>
        </div>

        {/* TRİAL DURUMU */}
        <div className={styles.statCard}>
          <div className={styles.statCardTop}>
            <div className={`${styles.statIcon} bg-amber-500/20 text-amber-400 border border-amber-500/30`}>
              ⏳
            </div>
            <span className={styles.badgeWarning}>15 Günlük</span>
          </div>
          <div className={styles.statTitle}>Aktif Trial</div>
          <div className={styles.statValue}>{stats.activeTrials}</div>
          <div className={styles.statHint}>{stats.expiredTrials} işletmenin süresi doldu</div>
        </div>

        {/* AKTİF MENÜ */}
        <div className={styles.statCard}>
          <div className={styles.statCardTop}>
            <div className={`${styles.statIcon} bg-indigo-500/20 text-indigo-400 border border-indigo-500/30`}>
              🍽️
            </div>
            <span className={styles.badgeInfo}>Menü</span>
          </div>
          <div className={styles.statTitle}>Yayındaki Menü</div>
          <div className={styles.statValue}>{stats.activeMenus}</div>
          <div className={styles.statHint}>
            {stats.totalProducts} ürün · {stats.totalCategories} kategori
          </div>
        </div>
      </div>

      {/* 2. NOTICE BANNER */}
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
              Platformda gerçek ödeme ağ geçidi (Iyzico / Stripe) entegrasyonu henüz bağlanmamıştır. Bu nedenle sahte gelir rakamı üretilmemektedir. Mevcut tüm işletmeler 15 günlük ücretsiz deneme süresi dahilinde çalışmaktadır.
            </p>
          </div>
          <Link href="/admin/subscriptions" className={styles.btnSecondary}>
            Abonelikleri İncele →
          </Link>
        </div>
      </div>

      {/* 3. RECENT REGISTERED USERS */}
      <div className={styles.adminCard}>
        <div className={styles.adminCardHeader}>
          <div>
            <h2 className={styles.adminCardTitle}>
              <span>👥</span> Son Kayıt Olan Kullanıcılar
            </h2>
            <p className={styles.adminCardDesc}>
              Platforma son katılan tüm kullanıcılar ve işletme durumları.
            </p>
          </div>
          <Link href="/admin/customers" className={styles.btnSecondary}>
            Tüm Kullanıcıları Gör ({stats.totalUsers}) →
          </Link>
        </div>

        {stats.recentUsers.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            Henüz kayıtlı kullanıcı bulunmuyor.
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Kullanıcı</th>
                  <th>Rol</th>
                  <th>İşletme</th>
                  <th>Menü Durumu</th>
                  <th>Trial</th>
                  <th>Kayıt Tarihi</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentUsers.map((u) => {
                  const dateStr = new Date(u.createdAt).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });

                  const primaryBiz = u.primaryBusiness;
                  const letter = (u.fullName[0] || u.email[0] || 'U').toUpperCase();

                  return (
                    <tr key={u.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-slate-800 to-indigo-900 border border-white/10 font-bold text-white text-xs">
                            {letter}
                          </div>
                          <div>
                            <strong className="block text-white text-xs">{u.fullName}</strong>
                            <span className="text-[11px] text-slate-400">{u.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            u.role === 'admin' ? styles.badgeWarning : styles.badgeInfo
                          }`}
                        >
                          {u.role === 'admin' ? '👑 Yönetici' : '👤 Müşteri'}
                        </span>
                      </td>
                      <td>
                        {primaryBiz ? (
                          <div className="flex items-center gap-2">
                            <div className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5 font-bold text-orange-400 text-xs">
                              {primaryBiz.logoUrl ? (
                                <Image
                                  src={primaryBiz.logoUrl}
                                  alt={primaryBiz.name}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              ) : (
                                primaryBiz.name[0]?.toUpperCase() || 'P'
                              )}
                            </div>
                            <span className="text-xs font-semibold text-white">{primaryBiz.name}</span>
                          </div>
                        ) : (
                          <span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                            ⭕ İşletme Yok
                          </span>
                        )}
                      </td>
                      <td>
                        {primaryBiz ? (
                          <span
                            className={`${styles.statusBadge} ${
                              primaryBiz.menuActive ? styles.badgeSuccess : styles.badgeNeutral
                            }`}
                          >
                            {primaryBiz.menuActive ? '✓ Yayında' : '○ Taslak'}
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-500">-</span>
                        )}
                      </td>
                      <td>
                        {primaryBiz ? (
                          <span
                            className={`${styles.statusBadge} ${
                              primaryBiz.trial.isExpired ? styles.badgeDanger : styles.badgeWarning
                            }`}
                          >
                            {primaryBiz.trial.isExpired ? 'Süresi Doldu' : `${primaryBiz.trial.daysLeft} Gün`}
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-500">-</span>
                        )}
                      </td>
                      <td>
                        <span className="text-xs text-slate-400">{dateStr}</span>
                      </td>
                      <td>
                        <Link
                          href={`/admin/customers/${u.id}`}
                          className={styles.btnSecondary}
                        >
                          Detay →
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
