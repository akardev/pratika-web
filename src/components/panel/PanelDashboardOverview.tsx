'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './panel.module.css';
import PanelSupportCard from './PanelSupportCard';
import { calculateTrialInfo } from '@/lib/trial';
import { toggleMenuStatusAction } from '@/app/panel/actions';
import { useOrigin } from '@/lib/useOrigin';

export interface BusinessData {
  id: string;
  name: string;
  slug: string;
  business_type?: string | null;
  phone?: string | null;
  address?: string | null;
  instagram?: string | null;
  description?: string | null;
  welcome_message?: string | null;
  slogan?: string | null;
  working_hours?: string | null;
  logo_url?: string | null;
  default_lang?: string;
  menu_theme?: string | null;
  show_menu_intro?: boolean | null;
  created_at: string;
  updated_at?: string;
}

export interface CategoryData {
  id: string;
  business_id: string;
  menu_id: string;
  name: string;
  description?: string | null;
  position: number;
  is_active: boolean;
}

export interface ProductData {
  id: string;
  business_id: string;
  menu_id: string;
  category_id: string;
  name: string;
  description?: string | null;
  price: number;
  image_url?: string | null;
  position: number;
  is_active: boolean;
  tags?: string[] | string;
}

export default function PanelDashboardOverview({
  business,
  menuId,
  isMenuActive = true,
  categories,
  products,
  onNavigateTab,
}: {
  business: BusinessData;
  menuId: string;
  isMenuActive?: boolean;
  categories: CategoryData[];
  products: ProductData[];
  onNavigateTab: (tab: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [menuActiveState, setMenuActiveState] = useState(isMenuActive);
  const [toggleLoading, setToggleLoading] = useState(false);

  const origin = useOrigin();
  const publicUrl = `${origin}/m/${business.slug}`;

  const trial = calculateTrialInfo(business.created_at);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleToggleMenuStatus = async () => {
    if (!menuId) return;
    setToggleLoading(true);
    const nextState = !menuActiveState;
    const result = await toggleMenuStatusAction(menuId, nextState);
    setToggleLoading(false);
    if (!result.error) {
      setMenuActiveState(nextState);
    }
  };

  const activeCategoriesCount = categories.filter((c) => c.is_active).length;
  const activeProductsCount = products.filter((p) => p.is_active).length;
  const isMenuLive = menuActiveState && activeCategoriesCount > 0 && activeProductsCount > 0;

  // Checklist items
  const checklist = [
    { label: 'İşletme profili oluşturuldu', done: true },
    { label: 'Sabit QR bağlantısı hazırlandı', done: true },
    { label: 'İlk kategori oluşturuldu', done: categories.length > 0, actionTab: 'kategoriler' },
    { label: 'İlk ürün menüye eklendi', done: products.length > 0, actionTab: 'menu' },
    { label: 'Menü yayına alındı', done: menuActiveState },
  ];

  const completedCount = checklist.filter((i) => i.done).length;
  const isSetupComplete = completedCount === checklist.length;

  return (
    <div>
      {/* TRIAL NOTIFICATION BAR */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-slate-50 p-4 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="text-base">🕒</span>
          <div>
            <strong className="text-slate-900">15 Günlük Ücretsiz Deneme:</strong>{' '}
            <span className={trial.isUrgent ? 'font-bold text-amber-700' : 'text-slate-700'}>
              {trial.statusText}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigateTab('abonelik')}
          className="rounded-xl border border-blue-300 bg-white px-3.5 py-1.5 font-bold text-blue-800 shadow-xs transition hover:bg-blue-50"
        >
          Paketleri &amp; Planları İncele →
        </button>
      </div>

      <div className={styles.overviewHeader}>
        <h1>Hoş geldiniz, {business.name} 👋</h1>
        <p>QR Menünüzün durumunu ve menü içeriğinizi buradan anlık olarak yönetebilirsiniz.</p>
      </div>

      {/* SETUP CHECKLIST BANNER (If not 100% complete) */}
      {!isSetupComplete && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-amber-900">📋 Menünüzü Yayına Hazırlayın ({completedCount}/{checklist.length})</h3>
            <span className="text-xs font-bold text-amber-700">%{Math.round((completedCount / checklist.length) * 100)} Tamamlandı</span>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {checklist.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 rounded-xl p-2.5 text-xs font-semibold ${
                  item.done ? 'bg-white/80 text-green-700' : 'bg-white text-slate-700'
                }`}
              >
                <span>{item.done ? '✓' : '○'}</span>
                <span>{item.label}</span>
                {!item.done && item.actionTab && (
                  <button
                    type="button"
                    onClick={() => onNavigateTab(item.actionTab!)}
                    className="ml-auto font-bold text-orange-600 underline"
                  >
                    Yap →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STATS */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Menü Yayında mı?</span>
          <div className="flex items-center justify-between">
            <span className={isMenuLive ? styles.statusActive : styles.statusPassive}>
              {isMenuLive ? '🟢 Yayında & Canlı' : '🟡 Taslak (Gizli)'}
            </span>
            <button
              type="button"
              onClick={handleToggleMenuStatus}
              disabled={toggleLoading}
              className="text-[11px] font-bold text-blue-700 underline"
            >
              {toggleLoading ? '…' : menuActiveState ? 'Taslağa Al' : 'Yayına Al'}
            </button>
          </div>
          <span className={styles.statSubtext}>
            {isMenuLive ? 'Müşterileriniz menüyü görebiliyor' : 'Taslaktayken müşteriler "Güncelleniyor" mesajı görür'}
          </span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Toplam Kategori</span>
          <div className={styles.statValue}>{categories.length}</div>
          <span className={styles.statSubtext}>{activeCategoriesCount} aktif kategori</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Toplam Ürün</span>
          <div className={styles.statValue}>{products.length}</div>
          <span className={styles.statSubtext}>{activeProductsCount} menüde listeleniyor</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Desteklenen Diller</span>
          <div className={styles.statValue}>4</div>
          <span className={styles.statSubtext}>TR · EN · DE · RU</span>
        </div>
      </div>

      {/* LIVE LINK & QR ACCESS BANNER */}
      <div className={styles.liveLinkBanner}>
        <div className={styles.liveLinkLeft}>
          <strong>Sabit QR Menü Bağlantınız</strong>
          <p>Fiyatlar veya ürünler değiştiğinde bu adres ve masadaki QR kodunuz ASLA değişmez.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className={styles.urlPillBox}>
            <span suppressHydrationWarning>{publicUrl}</span>
          </div>
          <button type="button" onClick={handleCopyLink} className={styles.copyUrlBtn}>
            {copied ? '✓ Kopyalandı!' : 'Bağlantıyı Kopyala'}
          </button>
          <Link
            href={`/m/${business.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-white/20"
          >
            Menüyü Aç ↗
          </Link>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Hızlı İşlemler</h3>
        <div className={styles.quickActionsRow}>
          <button type="button" onClick={() => onNavigateTab('menu')} className={styles.actionPrimaryBtn}>
            <span>＋</span> Ürün Ekle / Düzenle
          </button>
          <button type="button" onClick={() => onNavigateTab('tasarim')} className={styles.actionSecondaryBtn}>
            <span>🎨</span> Menü Tasarımı ({business.menu_theme ? business.menu_theme.toUpperCase() : 'ELEGANT'})
          </button>
          <button type="button" onClick={() => onNavigateTab('qr')} className={styles.actionSecondaryBtn}>
            <span>⌗</span> QR Kodu &amp; Vektörel İndir
          </button>
          <button type="button" onClick={() => onNavigateTab('diller')} className={styles.actionSecondaryBtn}>
            <span>文</span> Diller &amp; Çeviriler
          </button>
          <button type="button" onClick={() => onNavigateTab('abonelik')} className={styles.actionSecondaryBtn}>
            <span>💳</span> Abonelik &amp; Planlar
          </button>
          <button type="button" onClick={() => onNavigateTab('ayarlar')} className={styles.actionSecondaryBtn}>
            <span>⚙️</span> İşletme Bilgileri
          </button>
        </div>
      </div>

      {/* RECENT PRODUCTS */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionCardHeader}>
          <h2>Menüdeki Ürünleriniz ({products.length})</h2>
          <button type="button" onClick={() => onNavigateTab('menu')} className={styles.actionPrimaryBtn}>
            Tümünü Yönet →
          </button>
        </div>

        {products.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>🍽️</div>
            <h3>Henüz ürün eklenmemiş</h3>
            <p>Menünüzü oluşturmaya ilk kategorinizi ve lezzetli ürünlerinizi ekleyerek başlayın.</p>
            <button type="button" onClick={() => onNavigateTab('menu')} className={styles.actionPrimaryBtn}>
              İlk Ürünü Ekle
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className={styles.productTable}>
              <thead>
                <tr>
                  <th>Ürün Adı</th>
                  <th>Kategori</th>
                  <th>Fiyat</th>
                  <th>Durum</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 6).map((product) => {
                  const cat = categories.find((c) => c.id === product.category_id);
                  return (
                    <tr key={product.id}>
                      <td className={styles.productTitleCol}>
                        <strong>{product.name}</strong>
                        {product.description && <p>{product.description}</p>}
                      </td>
                      <td>
                        <span className="font-semibold text-slate-700">{cat?.name || 'Genel'}</span>
                      </td>
                      <td>
                        <span className={styles.productPriceTag}>₺{product.price}</span>
                      </td>
                      <td>
                        <span className={product.is_active ? styles.statusActive : styles.statusPassive}>
                          {product.is_active ? 'Menüde Aktif' : 'Gizli'}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => onNavigateTab('menu')}
                          className={styles.iconBtn}
                          title="Düzenle"
                        >
                          Düzenle ✎
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <PanelSupportCard />
    </div>
  );
}
