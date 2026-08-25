import Link from 'next/link';
import Image from 'next/image';
import { requireAdmin, getAdminCustomersList } from '@/lib/admin';
import styles from '@/components/admin/admin.module.css';

interface BusinessesPageProps {
  searchParams: Promise<{
    q?: string;
    filter?: string;
  }>;
}

export default async function AdminBusinessesPage({ searchParams }: BusinessesPageProps) {
  await requireAdmin();
  const { q, filter } = await searchParams;

  const businesses = await getAdminCustomersList({
    search: q,
    filter,
  });

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            🏪 Tüm İşletmeler
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Pratika QR menü kullanan kayıtlı tüm işletmelerin genel listesi ve durumları.
          </p>
        </div>

        <div className="text-xs text-slate-400">
          Toplam <strong>{businesses.length}</strong> işletme listeleniyor
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className={styles.filterBar}>
        <form method="GET" action="/admin/businesses" className="flex items-center gap-2">
          <input
            type="text"
            name="q"
            defaultValue={q || ''}
            placeholder="İşletme adı, slug, telefon ara..."
            className={styles.searchInput}
          />
          {filter && <input type="hidden" name="filter" value={filter} />}
          <button type="submit" className={styles.btnSecondary}>
            🔍 Ara
          </button>
          {q && (
            <Link href="/admin/businesses" className="text-xs text-slate-400 hover:text-white">
              ✕ Temizle
            </Link>
          )}
        </form>

        <div className={styles.filterPills}>
          <Link
            href={`/admin/businesses${q ? `?q=${encodeURIComponent(q)}` : ''}`}
            className={`${styles.filterPill} ${!filter ? styles.filterPillActive : ''}`}
          >
            Tümü
          </Link>
          <Link
            href={`/admin/businesses?filter=active${q ? `&q=${encodeURIComponent(q)}` : ''}`}
            className={`${styles.filterPill} ${filter === 'active' ? styles.filterPillActive : ''}`}
          >
            ✓ Yayında
          </Link>
          <Link
            href={`/admin/businesses?filter=trial${q ? `&q=${encodeURIComponent(q)}` : ''}`}
            className={`${styles.filterPill} ${filter === 'trial' ? styles.filterPillActive : ''}`}
          >
            ⏳ Trial
          </Link>
          <Link
            href={`/admin/businesses?filter=expired${q ? `&q=${encodeURIComponent(q)}` : ''}`}
            className={`${styles.filterPill} ${filter === 'expired' ? styles.filterPillActive : ''}`}
          >
            🔴 Süresi Dolanlar
          </Link>
        </div>
      </div>

      {/* BUSINESSES TABLE */}
      <div className={styles.adminCard}>
        {businesses.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            Arama kriterlerinize uygun işletme bulunamadı.
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>İşletme</th>
                  <th>Tür &amp; Şehir</th>
                  <th>Menü Durumu</th>
                  <th>Tema</th>
                  <th>İçerik</th>
                  <th>Trial</th>
                  <th>Oluşturulma</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {businesses.map((b) => {
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
                            <span className="text-[11px] text-slate-400 font-mono">
                              /m/{b.slug}
                            </span>
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
                        <span
                          className={`${styles.statusBadge} ${
                            b.menuActive ? styles.badgeSuccess : styles.badgeNeutral
                          }`}
                        >
                          {b.menuActive ? '✓ Yayında' : '○ Taslak'}
                        </span>
                      </td>
                      <td>
                        <span className="rounded-md bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-indigo-400 border border-indigo-500/30">
                          {b.theme}
                        </span>
                      </td>
                      <td>
                        <div className="text-xs text-slate-300">
                          {b.productCount} ürün · {b.categoryCount} kat.
                        </div>
                      </td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            b.trial.isExpired ? styles.badgeDanger : styles.badgeWarning
                          }`}
                        >
                          {b.trial.isExpired ? 'Süresi Doldu' : `${b.trial.daysLeft} Gün`}
                        </span>
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
                            title="Menüyü Aç"
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
