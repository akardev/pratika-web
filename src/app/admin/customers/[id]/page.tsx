import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { requireAdmin, getAdminCustomerDetail } from '@/lib/admin';
import styles from '@/components/admin/admin.module.css';

interface CustomerDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminCustomerDetailPage({ params }: CustomerDetailPageProps) {
  await requireAdmin();
  const { id } = await params;

  const data = await getAdminCustomerDetail(id);

  if (!data) {
    notFound();
  }

  const { customer, business, categories, products, productTranslations, trial } = data;

  const dateStr = new Date(customer.createdAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const businessLetter = (business.name[0] || 'P').toUpperCase();

  return (
    <div>
      {/* TOP HEADER */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/customers" className={styles.btnSecondary}>
            ← Müşteriler
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {business.name}
            </h1>
            <p className="text-xs text-slate-400">
              Müşteri ID: <code className="font-mono text-slate-300">{customer.userId}</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`/m/${business.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            <span>🔗</span>
            <span>Public Menüyü Aç ↗</span>
          </a>
          <a
            href={`/qr/${business.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            <span>📱</span>
            <span>QR Ekranı ↗</span>
          </a>
        </div>
      </div>

      {/* GRID OVERVIEW */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        {/* 1. HESAP & İŞLETME BİLGİSİ */}
        <div className={styles.adminCard}>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
            👤 Müşteri &amp; İşletme
          </h2>

          <div className="flex items-center gap-4 mb-5">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 font-serif text-2xl font-bold text-orange-400">
              {business.logo_url ? (
                <Image
                  src={business.logo_url}
                  alt={business.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                businessLetter
              )}
            </div>
            <div>
              <strong className="block text-white text-base">{business.name}</strong>
              <span className="text-xs text-slate-400">{business.business_type || 'Kafe'}</span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Kayıt Tarihi:</span>
              <span className="text-slate-200 font-semibold">{dateStr}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Menü Slug:</span>
              <span className="text-blue-400 font-mono">/m/{business.slug}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Telefon:</span>
              <span className="text-slate-200">{business.phone || 'Belirtilmedi'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Adres / Şehir:</span>
              <span className="text-slate-200">{business.address || 'Belirtilmedi'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Instagram:</span>
              <span className="text-slate-200">{business.instagram || 'Belirtilmedi'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Aktif Tema:</span>
              <span className="text-indigo-400 uppercase font-bold">{business.theme}</span>
            </div>
          </div>
        </div>

        {/* 2. TRIAL & ABONELİK */}
        <div className={styles.adminCard}>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
            💳 Trial &amp; Abonelik Durumu
          </h2>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300">Abonelik Planı</span>
              <span
                className={`${styles.statusBadge} ${
                  trial.isExpired ? styles.badgeDanger : styles.badgeSuccess
                }`}
              >
                {trial.isExpired ? 'Süresi Doldu' : 'Aktif Deneme'}
              </span>
            </div>
            <div className="text-lg font-extrabold text-white">{trial.planName}</div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Trial Başlangıç:</span>
              <span className="text-slate-200">{trial.startDateFormatted}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Trial Bitiş:</span>
              <span className="text-slate-200">{trial.endDateFormatted}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Kalan Gün:</span>
              <span className="text-amber-400 font-extrabold">{trial.daysLeft} Gün</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Ödeme Durumu:</span>
              <span className="text-slate-400">Ödeme ağ geçidi henüz bağlanmadı</span>
            </div>
          </div>
        </div>

        {/* 3. DİL & ÇEVİRİ DURUMU */}
        <div className={styles.adminCard}>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
            🌐 Menü Dilleri &amp; Çeviriler
          </h2>

          <div className="space-y-3 text-xs">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
              <span>🇹🇷 TR — Türkçe (Ana Dil)</span>
              <span className="font-bold text-emerald-400">Kaynak Dil</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
              <span>🇬🇧 EN — English</span>
              <span className="font-bold text-blue-400">
                {productTranslations.filter((t: { lang_code: string }) => t.lang_code === 'en').length} Çeviri
              </span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
              <span>🇩🇪 DE — Deutsch</span>
              <span className="font-bold text-blue-400">
                {productTranslations.filter((t: { lang_code: string }) => t.lang_code === 'de').length} Çeviri
              </span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
              <span>🇷🇺 RU — Русский</span>
              <span className="font-bold text-blue-400">
                {productTranslations.filter((t: { lang_code: string }) => t.lang_code === 'ru').length} Çeviri
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MENÜ ÜRÜN VE KATEGORİLERİ */}
      <div className={styles.adminCard}>
        <div className={styles.adminCardHeader}>
          <div>
            <h2 className={styles.adminCardTitle}>
              <span>🍽️</span> Menü İçeriği ({products.length} Ürün · {categories.length} Kategori)
            </h2>
            <p className={styles.adminCardDesc}>
              İşletmenin dijital QR menüsündeki tüm kategori ve ürünlerin anlık listesi.
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            Bu işletmeye ait henüz ürün bulunmuyor.
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Ürün Adı</th>
                  <th>Kategori</th>
                  <th>Fiyat</th>
                  <th>Durum</th>
                  <th>Açıklama</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => {
                  const cat = categories.find((c) => c.id === p.category_id);
                  return (
                    <tr key={p.id}>
                      <td>
                        <strong className="text-white text-sm">{p.name}</strong>
                      </td>
                      <td>
                        <span className="text-xs font-semibold text-slate-300">
                          {cat?.name || 'Genel'}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs font-extrabold text-amber-400">
                          ₺{p.price}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            p.is_active ? styles.badgeSuccess : styles.badgeNeutral
                          }`}
                        >
                          {p.is_active ? '✓ Menüde' : '○ Gizli'}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs text-slate-400 max-w-xs truncate block">
                          {p.description || '-'}
                        </span>
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
