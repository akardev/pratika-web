'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { DemoLocale, DemoProduct } from '@/lib/qr-demo-data';
import { demoCategories, demoCopy, demoProducts } from '@/lib/qr-demo-data';
import DemoCategoryNav from './DemoCategoryNav';
import DemoLanguageSwitcher from './DemoLanguageSwitcher';
import DemoMenuHeader from './DemoMenuHeader';
import DemoProductCard from './DemoProductCard';
import DemoProductModal from './DemoProductModal';
import styles from './demo-menu.module.css';

export default function DemoMenu() {
  const [locale, setLocale] = useState<DemoLocale>('tr');
  const [showMenu, setShowMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState(demoCategories[0].id);
  const [selectedProduct, setSelectedProduct] = useState<DemoProduct | null>(null);
  const copy = demoCopy[locale];

  const productsByCategory = useMemo(
    () => demoCategories.map((category) => ({
      ...category,
      products: demoProducts.filter((product) => product.categoryId === category.id),
    })),
    [],
  );

  const handleLocaleChange = (nextLocale: DemoLocale) => setLocale(nextLocale);

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    document.getElementById(`category-${categoryId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!showMenu) {
    return (
      <div className={`${styles.page} qr-demo-page`}>
        <div className={styles.introGlow} aria-hidden="true" />
        <main className={styles.welcomeScreen}>
          <div className={styles.welcomeTopbar}>
            <span className={styles.demoPill}><span className={styles.liveDot} /> TASARIM 01 — ELEGANT</span>
            <DemoLanguageSwitcher locale={locale} onChange={handleLocaleChange} />
          </div>

          <section className={styles.welcomeHero}>
            <div className={styles.logoMark} aria-hidden="true"><span>L</span></div>
            <p className={styles.welcomeEyebrow}>{copy.eyebrow}</p>
            <h1 className={styles.restaurantName}>LUNA <em>COFFEE</em><br />&amp; KITCHEN</h1>
            <div className={styles.heroRule}><span /><i>✦</i><span /></div>
            <p className={styles.welcomeText}>{copy.welcome}</p>
            <p className={styles.welcomeMeta}>Specialty Coffee · Breakfast · Dessert<br /><span>Antalya · 08:00 – 23:00</span></p>
            <p className={styles.welcomeIntro}>{copy.intro}</p>
            <button type="button" className={styles.viewMenuButton} onClick={() => setShowMenu(true)}>
              <span>{copy.viewMenu}</span>
              <span className={styles.buttonArrow}>↗</span>
            </button>
          </section>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Link
              href="/panel"
              style={{
                fontSize: '12px',
                fontWeight: '700',
                color: '#fae392',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid #d4af37',
                padding: '6px 16px',
                borderRadius: '9999px',
                textDecoration: 'none',
              }}
            >
              ✨ Bu Tasarımı İşletmende Kullan →
            </Link>
            <p className={styles.demoNote}>{copy.demoNote}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`${styles.page} qr-demo-page`}>
      <div className={styles.menuShell}>
        <DemoMenuHeader
          locale={locale}
          onLocaleChange={handleLocaleChange}
          onBackToWelcome={() => setShowMenu(false)}
          menuLabel={copy.menu}
          openMenuLabel={copy.openMenu}
        />
        <div className={styles.menuIntro}>
          <div>
            <p className={styles.menuEyebrow}>{copy.discover}</p>
            <h1>Luna Coffee <em>&amp; Kitchen</em></h1>
          </div>
          <span className={styles.menuOrnament}>✦</span>
        </div>
        <DemoCategoryNav
          categories={demoCategories}
          locale={locale}
          activeCategory={activeCategory}
          onSelect={handleCategorySelect}
        />
        <main className={styles.menuContent}>
          {productsByCategory.map((category) => (
            <section key={category.id} className={styles.categorySection} id={`category-${category.id}`}>
              <div className={styles.categoryHeading}>
                <h2>{category.name[locale]}</h2>
                <span>{String(category.products.length).padStart(2, '0')}</span>
              </div>
              <div className={styles.productGrid}>
                {category.products.map((product) => (
                  <DemoProductCard key={product.id} product={product} locale={locale} onSelect={setSelectedProduct} />
                ))}
              </div>
            </section>
          ))}

          <footer className={styles.demoCta}>
            <div className={styles.ctaLogo}>P<span>·</span></div>
            <p>{copy.createdWith}</p>
            <strong>{copy.createYourMenu}</strong>
            <Link href="/qr-menu" className={styles.createCta}>{copy.createCta}<span>↗</span></Link>
            <small>LUNA COFFEE &amp; KITCHEN · PRATIKA QR</small>
          </footer>
        </main>
      </div>

      {selectedProduct && (
        <DemoProductModal
          product={selectedProduct}
          locale={locale}
          closeLabel={copy.close}
          detailLabel={copy.details}
          allergensLabel={copy.allergens}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
