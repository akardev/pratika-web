'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signout } from '@/app/login/actions';
import type { BusinessData, CategoryData, ProductData } from './PanelDashboardOverview';
import PanelCategoryManager from './PanelCategoryManager';
import PanelDashboardOverview from './PanelDashboardOverview';
import PanelLanguageManager from './PanelLanguageManager';
import PanelMenuManager from './PanelMenuManager';
import PanelQrManager from './PanelQrManager';
import PanelSettingsManager from './PanelSettingsManager';
import PanelSubscriptionManager from './PanelSubscriptionManager';
import PanelAccountManager from './PanelAccountManager';
import PanelThemeManager from './PanelThemeManager';
import { calculateTrialInfo } from '@/lib/trial';
import styles from './panel.module.css';

export default function PanelLayout({
  userEmail,
  business,
  menuId,
  isMenuActive = true,
  categories,
  products,
}: {
  userEmail: string;
  business: BusinessData;
  menuId: string;
  isMenuActive?: boolean;
  categories: CategoryData[];
  products: ProductData[];
}) {
  const [activeTab, setActiveTab] = useState<string>('genel');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const trial = calculateTrialInfo(business.created_at);

  const navItems = [
    { id: 'genel', label: 'Genel Bakış', icon: '📊' },
    { id: 'menu', label: 'Menü & Ürünler', icon: '🍽️', badge: String(products.length) },
    { id: 'kategoriler', label: 'Kategoriler', icon: '📁', badge: String(categories.length) },
    { id: 'tasarim', label: 'Menü Tasarımı', icon: '🎨', badge: '5 Tema' },
    { id: 'qr', label: 'QR Kod & Yayın', icon: '⌗' },
    { id: 'diller', label: 'Menü Dilleri', icon: '文', badge: '4' },
    { id: 'abonelik', label: 'Abonelik & Planlar', icon: '💳' },
    { id: 'ayarlar', label: 'İşletme Ayarları', icon: '⚙️' },
    { id: 'hesap', label: 'Hesabım', icon: '👤' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  return (
    <div className={styles.panelWrapper}>
      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brandIcon}>
            <Image src="/brand/pratika-qr-icon.svg" alt="" width={20} height={20} />
          </div>
          <div className={styles.brandTitles}>
            <span className={styles.brandTitle}>Pratika QR</span>
            <span className={styles.brandSubtitle}>İşletme Paneli</span>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`${styles.navItem} ${activeTab === item.id ? styles.navItemActive : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link
            href={`/m/${business.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewLiveLink}
          >
            <span>Canlı Menüyü Gör</span>
            <span>↗</span>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className={styles.mainContainer}>
        {/* TOP HEADER */}
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={styles.mobileMenuBtn}
              aria-label="Menüyü aç/kapat"
            >
              ☰
            </button>
            <div className={styles.businessPill}>
              <span className={styles.liveStatusDot} />
              <span>{business.name}</span>
            </div>
            <button
              type="button"
              onClick={() => handleNavClick('abonelik')}
              className="hidden items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 border border-blue-200 transition hover:bg-blue-100 sm:inline-flex"
            >
              <span>🕒</span>
              <span>{trial.daysLeft} gün deneme kaldı</span>
            </button>
          </div>

          <div className={styles.headerRight}>
            <button
              type="button"
              onClick={() => handleNavClick('hesap')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              {userEmail}
            </button>
            <form action={signout}>
              <button type="submit" className={styles.logoutBtn}>
                Çıkış
              </button>
            </form>
          </div>
        </header>

        {/* CONTENT AREA */}
        <main className={styles.contentArea}>
          {activeTab === 'genel' && (
            <PanelDashboardOverview
              business={business}
              menuId={menuId}
              isMenuActive={isMenuActive}
              categories={categories}
              products={products}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'menu' && (
            <PanelMenuManager
              business={business}
              menuId={menuId}
              categories={categories}
              products={products}
            />
          )}

          {activeTab === 'kategoriler' && (
            <PanelCategoryManager
              business={business}
              menuId={menuId}
              categories={categories}
              products={products}
            />
          )}

          {activeTab === 'tasarim' && (
            <PanelThemeManager
              business={business}
              menuId={menuId}
              categories={categories}
              products={products}
            />
          )}

          {activeTab === 'qr' && (
            <PanelQrManager business={business} />
          )}

          {activeTab === 'diller' && (
            <PanelLanguageManager
              business={business}
              categories={categories}
              products={products}
            />
          )}

          {activeTab === 'abonelik' && (
            <PanelSubscriptionManager business={business} />
          )}

          {activeTab === 'ayarlar' && (
            <PanelSettingsManager business={business} />
          )}

          {activeTab === 'hesap' && (
            <PanelAccountManager
              userEmail={userEmail}
              business={business}
            />
          )}
        </main>
      </div>
    </div>
  );
}
