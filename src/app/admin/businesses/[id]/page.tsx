import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { requireAdmin, getAdminCustomerDetail } from '@/lib/admin';
import { updateBusinessStatusByAdminAction } from '@/app/admin/actions';
import styles from '@/components/admin/admin.module.css';

interface BusinessDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminBusinessDetailPage({ params }: BusinessDetailPageProps) {
  await requireAdmin();
  const { id } = await params;

  const data = await getAdminCustomerDetail(id);

  if (!data || !data.business) {
    notFound();
  }

  const { business, menu, categories, products, productTranslations } = data;
  const { calculateTrialInfo } = await import('@/lib/trial');
  const trial = data.trial || calculateTrialInfo(business.created_at);

  const isMenuActive = menu ? menu.is_active : true;
  const businessLetter = (business.name[0] || 'P').toUpperCase();

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/businesses" className={styles.btnSecondary}>
            ← İşletmeler
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {business.name}
            </h1>
            <p className="text-xs text-slate-400">
              İşletme ID: <code className="font-mono text-slate-300">{business.id}</code>
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

      {/* THREE CARDS SUMMARY */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        {/* 1. İŞLETME PROFİLİ */}
        <div className={styles.adminCard}>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
            🏢 Profil &amp; İletişim
          </h2>

          <div className="flex items-center gap-4 mb-4">
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

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Telefon:</span>
              <span className="text-slate-200">{business.phone || 'Belirtilmedi'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Adres:</span>
              <span className="text-slate-200">{business.address || 'Belirtilmedi'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Instagram:</span>
              <span className="text-slate-200">{business.instagram || 'Belirtilmedi'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Slogan:</span>
              <span className="text-slate-200">{business.settings.slogan || 'Belirtilmedi'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Çalışma Saatleri:</span>
              <span className="text-slate-200">{business.settings.working_hours || 'Belirtilmedi'}</span>
            </div>
          </div>
        </div>

        {/* 2. MENÜ & TEMA AYARLARI */}
        <div className={styles.adminCard}>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
            🎨 Menü &amp; Tema Yapılandırması
          </h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5">
              <div>
                <span className="block font-bold text-slate-200">Menü Yayında Durumu</span>
                <span className="text-[11px] text-slate-400">
                  {isMenuActive ? 'Menü ziyaretçilere açık' : 'Menü şu anda gizli'}
                </span>
              </div>
              <form
                action={async () => {
                  'use server';
                  await updateBusinessStatusByAdminAction(business.id, !isMenuActive);
                }}
              >
                <button
                  type="submit"
                  className={`${styles.statusBadge} ${
                    isMenuActive ? styles.badgeSuccess : styles.badgeDanger
                  } cursor-pointer hover:opacity-80`}
                  title="Durumu değiştirmek için tıklayın"
                >
                  {isMenuActive ? '✓ Açık (Değiştir)' : '✕ Kapalı (Aç)'}
                </button>
              </form>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5">
              <div>
                <span className="block font-bold text-slate-200">Aktif Tema</span>
                <span className="text-[11px] text-slate-400">Seçili QR Menü Görsel Tasarımı</span>
              </div>
              <span className="rounded-md bg-indigo-500/20 px-2.5 py-1 text-xs font-bold uppercase text-indigo-300 border border-indigo-500/30">
                {business.theme}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5">
              <div>
                <span className="block font-bold text-slate-200">Giriş / Hoş Geldiniz Ekranı</span>
                <span className="text-[11px] text-slate-400">QR okutulduğunda ilk gösterilen ekran</span>
              </div>
              <span
                className={`${styles.statusBadge} ${
                  business.show_menu_intro ? styles.badgeInfo : styles.badgeNeutral
                }`}
              >
                {business.show_menu_intro ? 'Açık' : 'Kapalı (Direkt Menü)'}
              </span>
            </div>
          </div>
        </div>

        {/* 3. DİL & TRİAL DURUMU */}
        <div className={styles.adminCard}>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
            🌐 Diller &amp; Trial Durumu
          </h2>

          <div className="space-y-3 text-xs mb-4">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Trial Süresi:</span>
              <span
                className={`${styles.statusBadge} ${
                  trial.isExpired ? styles.badgeDanger : styles.badgeWarning
                }`}
              >
                {trial.isExpired ? 'Süresi Doldu' : `${trial.daysLeft} Gün Kaldı`}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Bitiş Tarihi:</span>
              <span className="text-slate-200">{trial.endDateFormatted}</span>
            </div>
          </div>

          <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
            Yabancı Dil Çevirileri
          </div>
          <div className="space-y-2 text-xs">
            <div className="rounded-lg bg-white/5 p-2 flex justify-between">
              <span>🇬🇧 English</span>
              <span className="font-bold text-blue-400">
                {productTranslations.filter((t: { lang_code: string }) => t.lang_code === 'en').length} Çeviri
              </span>
            </div>
            <div className="rounded-lg bg-white/5 p-2 flex justify-between">
              <span>🇩🇪 Deutsch</span>
              <span className="font-bold text-blue-400">
                {productTranslations.filter((t: { lang_code: string }) => t.lang_code === 'de').length} Çeviri
              </span>
            </div>
            <div className="rounded-lg bg-white/5 p-2 flex justify-between">
              <span>🇷🇺 Русский</span>
              <span className="font-bold text-blue-400">
                {productTranslations.filter((t: { lang_code: string }) => t.lang_code === 'ru').length} Çeviri
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS & CATEGORIES SECTION */}
      <div className={styles.adminCard}>
        <div className={styles.adminCardHeader}>
          <div>
            <h2 className={styles.adminCardTitle}>
              <span>🍽️</span> Menü Ürünleri ({products.length} Ürün · {categories.length} Kategori)
            </h2>
            <p className={styles.adminCardDesc}>
              İşletmenin tüm kategorileri ve aktif ürün listesi.
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
                  <th>Ürün</th>
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
