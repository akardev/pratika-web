import Link from 'next/link';
import Image from 'next/image';
import { requireAdmin, getAdminCustomersList } from '@/lib/admin';
import styles from '@/components/admin/admin.module.css';

interface CustomersPageProps {
  searchParams: Promise<{
    q?: string;
    filter?: string;
  }>;
}

export default async function AdminCustomersPage({ searchParams }: CustomersPageProps) {
  await requireAdmin();
  const { q, filter } = await searchParams;

  const customers = await getAdminCustomersList({
    search: q,
    filter,
  });

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            👥 Müşteriler &amp; İşletme Sahipleri
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Kayıtlı tüm kullanıcıların işletme profilleri, menü ve trial durumları.
          </p>
        </div>

        <div className="text-xs text-slate-400">
          Toplam <strong>{customers.length}</strong> müşteri listeleniyor
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className={styles.filterBar}>
        <form method="GET" action="/admin/customers" className="flex items-center gap-2">
          <input
            type="text"
            name="q"
            defaultValue={q || ''}
            placeholder="İşletme adı, slug, telefon veya ID ara..."
            className={styles.searchInput}
          />
          {filter && <input type="hidden" name="filter" value={filter} />}
          <button type="submit" className={styles.btnSecondary}>
            🔍 Ara
          </button>
          {q && (
            <Link href="/admin/customers" className="text-xs text-slate-400 hover:text-white">
              ✕ Temizle
            </Link>
          )}
        </form>

        <div className={styles.filterPills}>
          <Link
            href={`/admin/customers${q ? `?q=${encodeURIComponent(q)}` : ''}`}
            className={`${styles.filterPill} ${!filter ? styles.filterPillActive : ''}`}
          >
            Tümü
          </Link>
          <Link
            href={`/admin/customers?filter=trial${q ? `&q=${encodeURIComponent(q)}` : ''}`}
            className={`${styles.filterPill} ${filter === 'trial' ? styles.filterPillActive : ''}`}
          >
            ⏳ Aktif Trial
          </Link>
          <Link
            href={`/admin/customers?filter=expired${q ? `&q=${encodeURIComponent(q)}` : ''}`}
            className={`${styles.filterPill} ${filter === 'expired' ? styles.filterPillActive : ''}`}
          >
            🔴 Süresi Dolanlar
          </Link>
          <Link
            href={`/admin/customers?filter=active${q ? `&q=${encodeURIComponent(q)}` : ''}`}
            className={`${styles.filterPill} ${filter === 'active' ? styles.filterPillActive : ''}`}
          >
            ✓ Yayında
          </Link>
        </div>
      </div>

      {/* CUSTOMERS TABLE */}
      <div className={styles.adminCard}>
        {customers.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            Arama kriterlerinize uygun müşteri bulunamadı.
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Müşteri / İşletme</th>
                  <th>İletişim &amp; Konum</th>
                  <th>Menü Durumu</th>
                  <th>İçerik</th>
                  <th>Trial &amp; Plan</th>
                  <th>Kayıt Tarihi</th>
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
                        <div className="flex items-center gap-3">
                          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 font-serif font-bold text-orange-400">
                            {c.logoUrl ? (
                              <Image
                                src={c.logoUrl}
                                alt={c.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              c.name[0]?.toUpperCase() || 'P'
                            )}
                          </div>
                          <div>
                            <strong className="block text-white text-sm">{c.name}</strong>
                            <span className="text-[11px] text-slate-400 font-mono">
                              ID: {c.userId.slice(0, 8)}...
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-xs space-y-0.5">
                          {c.phone && <div className="text-slate-300">📞 {c.phone}</div>}
                          {c.city && <div className="text-slate-400">📍 {c.city}</div>}
                          {c.instagram && <div className="text-slate-500">📷 {c.instagram}</div>}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            c.menuActive ? styles.badgeSuccess : styles.badgeNeutral
                          }`}
                        >
                          {c.menuActive ? '✓ Yayında' : '○ Taslak'}
                        </span>
                      </td>
                      <td>
                        <div className="text-xs text-slate-300">
                          {c.productCount} ürün · {c.categoryCount} kategori
                        </div>
                      </td>
                      <td>
                        <div className="text-xs">
                          <span
                            className={`${styles.statusBadge} ${
                              c.trial.isExpired ? styles.badgeDanger : styles.badgeWarning
                            }`}
                          >
                            {c.trial.isExpired ? 'Süresi Doldu' : `${c.trial.daysLeft} Gün`}
                          </span>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            Bitiş: {c.trial.endDateFormatted}
                          </p>
                        </div>
                      </td>
                      <td>
                        <span className="text-xs text-slate-400">{dateStr}</span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/customers/${c.userId}`}
                            className={styles.btnSecondary}
                          >
                            Detay →
                          </Link>
                          <a
                            href={`/m/${c.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                            title="Public Menüyü Aç"
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
