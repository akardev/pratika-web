'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { BusinessData, CategoryData, ProductData } from '@/components/panel/PanelDashboardOverview';
import type { MenuThemeId, PublicLocale } from './types';
import { THEME_COPIES } from './registry';
import { parseBusinessSettings } from '@/lib/business-settings';
import styles from './themes.module.css';

export interface ThemeRendererProps {
  business: BusinessData;
  categories: CategoryData[];
  products: ProductData[];
  categoryTranslations?: { category_id: string; lang_code: string; name: string; description?: string | null }[];
  productTranslations?: { product_id: string; lang_code: string; name: string; description?: string | null }[];
  isMenuActive?: boolean;
  forcedTheme?: MenuThemeId;
  forceShowIntro?: boolean;
  onThemeChangePreview?: (theme: MenuThemeId) => void;
}

export function FlagSvg({ locale }: { locale: PublicLocale }) {
  const common = { viewBox: '0 0 24 16', role: 'img' as const, focusable: 'false' as const };
  if (locale === 'tr') {
    return (
      <svg {...common} aria-hidden="true">
        <rect width="24" height="16" fill="#e30a17" />
        <circle cx="10" cy="8" r="4.2" fill="#fff" />
        <circle cx="11.1" cy="8" r="3.35" fill="#e30a17" />
        <path d="m15.8 8 .95.28.4 1.17.4-1.17.95-.28-.95-.28-.4-1.17-.4 1.17z" fill="#fff" />
      </svg>
    );
  }
  if (locale === 'en') {
    return (
      <svg {...common} aria-hidden="true">
        <rect width="24" height="16" fill="#1b3f8f" />
        <path d="M0 0 24 16M24 0 0 16" stroke="#fff" strokeWidth="3.2" />
        <path d="M0 0 24 16M24 0 0 16" stroke="#c8102e" strokeWidth="1.2" />
        <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5" />
        <path d="M12 0v16M0 8h24" stroke="#c8102e" strokeWidth="2.5" />
      </svg>
    );
  }
  if (locale === 'de') {
    return (
      <svg {...common} aria-hidden="true">
        <rect width="24" height="5.34" fill="#161616" />
        <rect y="5.33" width="24" height="5.34" fill="#d71920" />
        <rect y="10.66" width="24" height="5.34" fill="#ffce00" />
      </svg>
    );
  }
  return (
    <svg {...common} aria-hidden="true">
      <rect width="24" height="5.34" fill="#fff" />
      <rect y="5.33" width="24" height="5.34" fill="#2457a6" />
      <rect y="10.66" width="24" height="5.34" fill="#d52b1e" />
    </svg>
  );
}

export function formatThemePrice(price: number, locale: PublicLocale): string {
  const formatted = new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(price);
  return `₺${formatted}`;
}

export default function ThemeRenderer({
  business,
  categories,
  products,
  categoryTranslations = [],
  productTranslations = [],
  isMenuActive = true,
  forcedTheme,
  forceShowIntro,
}: ThemeRendererProps) {
  const [locale, setLocale] = useState<PublicLocale>('tr');

  const settings = parseBusinessSettings(business);
  const activeThemeId: MenuThemeId = forcedTheme || settings.menu_theme;
  
  // Intro screen toggle logic:
  // Default is TRUE (show intro first). If forceShowIntro is provided, prioritize it.
  const shouldShowIntroFirst = forceShowIntro !== undefined ? forceShowIntro : settings.show_menu_intro;
  const [showMenu, setShowMenu] = useState(!shouldShowIntroFirst);

  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const copy = THEME_COPIES[locale];

  const activeCategories = useMemo(() => categories.filter((c) => c.is_active), [categories]);
  const activeProducts = useMemo(() => products.filter((p) => p.is_active), [products]);

  const [activeCategoryId, setActiveCategoryId] = useState<string>(activeCategories[0]?.id || '');

  // Handle escape key and body scroll lock for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  const getCategoryName = useCallback((cat: CategoryData) => {
    if (locale === 'tr') return cat.name;
    const trans = categoryTranslations.find((t) => t.category_id === cat.id && t.lang_code === locale);
    return trans?.name || cat.name;
  }, [locale, categoryTranslations]);

  const getProductName = useCallback((prod: ProductData) => {
    if (locale === 'tr') return prod.name;
    const trans = productTranslations.find((t) => t.product_id === prod.id && t.lang_code === locale);
    return trans?.name || prod.name;
  }, [locale, productTranslations]);

  const getProductDesc = useCallback((prod: ProductData) => {
    if (locale === 'tr') return prod.description || '';
    const trans = productTranslations.find((t) => t.product_id === prod.id && t.lang_code === locale);
    return trans?.description || prod.description || '';
  }, [locale, productTranslations]);

  const parseTags = (tags: unknown): { isFeatured: boolean; pills: string[] } => {
    let list: string[] = [];
    if (Array.isArray(tags)) {
      list = tags.filter((t) => typeof t === 'string');
    } else if (typeof tags === 'string') {
      try {
        const parsed = JSON.parse(tags);
        if (Array.isArray(parsed)) list = parsed.filter((t) => typeof t === 'string');
      } catch {
        list = tags.split(',').map((t) => t.trim()).filter(Boolean);
      }
    }
    const isFeatured = list.includes('featured');
    const pills = list.filter((t) => t !== 'featured');
    return { isFeatured, pills };
  };

  const scrollToCategory = (catId: string) => {
    setActiveCategoryId(catId);
    const el = document.getElementById(`cat-${catId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const businessLetter = (business.name?.trim()[0] || 'P').toUpperCase();

  // Search filter
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return activeProducts;
    return activeProducts.filter((p) => {
      const name = getProductName(p).toLowerCase();
      const desc = getProductDesc(p).toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [activeProducts, searchQuery, getProductName, getProductDesc]);

  // Group products by active categories for standard menu view
  const categorySections = useMemo(() => {
    return activeCategories.map((cat) => ({
      category: cat,
      products: activeProducts.filter((p) => p.category_id === cat.id),
    })).filter((group) => group.products.length > 0);
  }, [activeCategories, activeProducts]);

  const themeClass = styles[`theme_${activeThemeId}`] || styles.theme_elegant;

  // Language switcher component
  const renderLangSwitcher = () => (
    <div className={styles.langSwitcher} role="group" aria-label="Dil Seçimi">
      {(['tr', 'en', 'de', 'ru'] as PublicLocale[]).map((lang) => (
        <button
          key={lang}
          type="button"
          className={`${styles.langBtn} ${locale === lang ? styles.langBtnActive : ''}`}
          onClick={() => setLocale(lang)}
          title={lang.toUpperCase()}
          aria-label={lang.toUpperCase()}
        >
          <span className={styles.langFlag}><FlagSvg locale={lang} /></span>
        </button>
      ))}
    </div>
  );

  // 1. INTRO / WELCOME SCREEN VIEW
  if (!showMenu) {
    return (
      <div className={`${styles.themeWrapper} ${themeClass}`}>
        <div className={styles.deviceShell}>
          <div className={styles.ambientGlow} aria-hidden="true" />
          
          <main className={styles.welcomeScreen}>
            {/* Topbar */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', opacity: 0.7 }}>
                ● {business.business_type || copy.menuKicker}
              </span>
              {renderLangSwitcher()}
            </div>

            {/* Welcome Hero */}
            <div className={styles.welcomeHero}>
              <div className={styles.logoBadge}>
                {activeThemeId === 'modern' ? (
                  <div className={styles.logoInner}>
                    {business.logo_url ? (
                      <Image src={business.logo_url} alt={business.name} fill style={{ objectFit: 'cover' }} unoptimized />
                    ) : (
                      <span>{businessLetter}</span>
                    )}
                  </div>
                ) : (
                  business.logo_url ? (
                    <Image src={business.logo_url} alt={business.name} fill style={{ objectFit: 'cover' }} unoptimized />
                  ) : (
                    <span>{businessLetter}</span>
                  )
                )}
              </div>

              <p className={styles.welcomeEyebrow}>
                {business.welcome_message || copy.welcomeEyebrow}
              </p>

              <h1 className={styles.businessTitle}>
                {business.name}
              </h1>

              {business.slogan && (
                <p className={styles.businessSlogan}>
                  &ldquo;{business.slogan}&rdquo;
                </p>
              )}

              {activeThemeId === 'elegant' && (
                <div className={styles.goldDivider}>
                  <span />✦<span />
                </div>
              )}

              <div className={styles.welcomeMeta}>
                {business.description && (
                  <p style={{ marginBottom: '12px', opacity: 0.85 }}>{business.description}</p>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', opacity: 0.75 }}>
                  {business.address && <span>📍 {business.address}</span>}
                  {business.working_hours && <span>🕒 {business.working_hours}</span>}
                  {business.phone && <span>📞 {business.phone}</span>}
                  {business.instagram && <span>📷 {business.instagram}</span>}
                </div>
              </div>

              <button
                type="button"
                className={styles.primaryBtn}
                onClick={() => setShowMenu(true)}
              >
                <span>{copy.viewMenuBtn}</span>
                <span>{activeThemeId === 'minimal' ? '↓' : '→'}</span>
              </button>
            </div>

            {/* Bottom mini footer */}
            <div style={{ fontSize: '11px', opacity: 0.45, textAlign: 'center', marginTop: '16px' }}>
              {business.name} · Pratika QR
            </div>
          </main>
        </div>
      </div>
    );
  }

  // 2. MAIN MENU VIEW
  return (
    <div className={`${styles.themeWrapper} ${themeClass}`}>
      <div className={styles.deviceShell}>
        <div className={styles.ambientGlow} aria-hidden="true" />

        {/* STICKY HEADER */}
        <header className={styles.stickyHeader}>
          <div
            className={styles.headerBrand}
            onClick={() => setShowMenu(false)}
            title={copy.backToWelcome}
            role="button"
            tabIndex={0}
          >
            <div className={styles.headerLogo}>
              {business.logo_url ? (
                <Image src={business.logo_url} alt={business.name} fill style={{ objectFit: 'cover' }} unoptimized />
              ) : (
                <span>{businessLetter}</span>
              )}
            </div>
            <div>
              <div className={styles.headerName}>{business.name}</div>
              <div style={{ fontSize: '10px', opacity: 0.6 }}>{copy.menuTitle} ↺</div>
            </div>
          </div>

          {renderLangSwitcher()}
        </header>

        {/* DRAFT / INACTIVE CHECK */}
        {!isMenuActive ? (
          <main className={styles.statusScreen}>
            <div className={styles.statusIcon}>⏳</div>
            <h2 className={styles.statusTitle}>{copy.menuUpdatingTitle}</h2>
            <p className={styles.statusDesc}>{copy.menuUpdatingDesc}</p>
          </main>
        ) : (
          <>
            {/* SEARCH INPUT */}
            <div className={styles.searchWrap}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={copy.searchPlaceholder}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className={styles.searchClear}
                  aria-label="Aramayı temizle"
                >
                  ✕
                </button>
              )}
            </div>

            {/* CATEGORY TABS (Hidden when searching) */}
            {!searchQuery && activeCategories.length > 0 && (
              <nav className={styles.categoryTabs} aria-label={copy.exploreCategories}>
                {activeCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`${styles.categoryTab} ${activeCategoryId === cat.id ? styles.categoryTabActive : ''}`}
                    onClick={() => scrollToCategory(cat.id)}
                    aria-pressed={activeCategoryId === cat.id}
                  >
                    {getCategoryName(cat)}
                  </button>
                ))}
              </nav>
            )}

            {/* MENU MAIN CONTENT */}
            <main className={styles.menuContent}>
              {activeCategories.length === 0 ? (
                <div className={styles.statusScreen}>
                  <div className={styles.statusIcon}>🍽️</div>
                  <h2 className={styles.statusTitle}>{copy.noProducts}</h2>
                </div>
              ) : searchQuery ? (
                /* SEARCH RESULTS VIEW */
                <section className={styles.categorySection}>
                  <div className={styles.categoryHeader}>
                    <h2>{copy.searchPlaceholder.slice(0, 12)}: &ldquo;{searchQuery}&rdquo;</h2>
                    <span>{filteredProducts.length}</span>
                  </div>

                  {filteredProducts.length === 0 ? (
                    <p style={{ opacity: 0.6, fontSize: '13px', padding: '12px 0' }}>{copy.noSearchResults}</p>
                  ) : (
                    <div className={styles.productGrid}>
                      {filteredProducts.map((prod) => {
                        const name = getProductName(prod);
                        const desc = getProductDesc(prod);
                        const { isFeatured, pills } = parseTags(prod.tags);

                        return (
                          <div
                            key={prod.id}
                            className={styles.productCard}
                            onClick={() => setSelectedProduct(prod)}
                            role="button"
                            tabIndex={0}
                          >
                            <div className={styles.productThumb}>
                              {prod.image_url ? (
                                <Image
                                  src={prod.image_url}
                                  alt={name}
                                  fill
                                  style={{ objectFit: 'cover' }}
                                  unoptimized
                                />
                              ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.35, fontSize: '20px' }}>
                                  🍽️
                                </div>
                              )}
                            </div>

                            <div className={styles.productContent}>
                              <div className={styles.productTop}>
                                {isFeatured && (
                                  <span className={styles.featuredBadge}>{copy.featured}</span>
                                )}
                                <div className={styles.productName}>{name}</div>
                                {desc && <div className={styles.productDesc}>{desc}</div>}
                              </div>

                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '6px' }}>
                                <div className={styles.productPrice}>{formatThemePrice(prod.price, locale)}</div>
                                {pills.length > 0 && (
                                  <div className={styles.productTags}>
                                    {pills.slice(0, 2).map((t, idx) => (
                                      <span key={idx} className={styles.tagPill}>{t}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              ) : (
                /* CATEGORY SECTIONS VIEW */
                categorySections.map(({ category, products }) => (
                  <section
                    key={category.id}
                    id={`cat-${category.id}`}
                    className={styles.categorySection}
                  >
                    <div className={styles.categoryHeader}>
                      <h2>{getCategoryName(category)}</h2>
                      <span>{String(products.length).padStart(2, '0')}</span>
                    </div>

                    <div className={styles.productGrid}>
                      {products.map((prod) => {
                        const name = getProductName(prod);
                        const desc = getProductDesc(prod);
                        const { isFeatured, pills } = parseTags(prod.tags);

                        return (
                          <div
                            key={prod.id}
                            className={styles.productCard}
                            onClick={() => setSelectedProduct(prod)}
                            role="button"
                            tabIndex={0}
                          >
                            <div className={styles.productThumb}>
                              {prod.image_url ? (
                                <Image
                                  src={prod.image_url}
                                  alt={name}
                                  fill
                                  style={{ objectFit: 'cover' }}
                                  unoptimized
                                />
                              ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.35, fontSize: '20px' }}>
                                  🍽️
                                </div>
                              )}
                            </div>

                            <div className={styles.productContent}>
                              <div className={styles.productTop}>
                                {isFeatured && (
                                  <span className={styles.featuredBadge}>{copy.featured}</span>
                                )}
                                <div className={styles.productName}>{name}</div>
                                {desc && <div className={styles.productDesc}>{desc}</div>}
                              </div>

                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '6px' }}>
                                <div className={styles.productPrice}>{formatThemePrice(prod.price, locale)}</div>
                                {pills.length > 0 && (
                                  <div className={styles.productTags}>
                                    {pills.slice(0, 2).map((t, idx) => (
                                      <span key={idx} className={styles.tagPill}>{t}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ))
              )}

              {/* FOOTER CTA */}
              <footer className={styles.menuFooter}>
                <div className={styles.footerLogo}>
                  Pratika<span>QR</span>
                </div>
                <p style={{ fontSize: '12px', opacity: 0.65 }}>{copy.createdWith}</p>
                <Link href="/qr-menu" className={styles.footerCtaLink}>
                  <span>{copy.createCta}</span>
                  <span>↗</span>
                </Link>
                <div style={{ fontSize: '10px', opacity: 0.35, marginTop: '8px' }}>
                  {business.name.toUpperCase()} · PRATIKA QR PRO
                </div>
              </footer>
            </main>
          </>
        )}

        {/* 3. PRODUCT DETAIL MODAL */}
        {selectedProduct && (
          <div
            className={styles.modalBackdrop}
            onClick={() => setSelectedProduct(null)}
            role="dialog"
            aria-modal="true"
            aria-label={getProductName(selectedProduct)}
          >
            <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setSelectedProduct(null)}
                aria-label={copy.close}
              >
                ✕
              </button>

              {selectedProduct.image_url && (
                <div className={styles.modalImageWrap}>
                  <Image
                    src={selectedProduct.image_url}
                    alt={getProductName(selectedProduct)}
                    fill
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                </div>
              )}

              <div className={styles.modalBody}>
                <div className={styles.modalTitleRow}>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', opacity: 0.6, textTransform: 'uppercase' }}>
                      {copy.details}
                    </span>
                    <h3 className={styles.modalTitle}>{getProductName(selectedProduct)}</h3>
                  </div>
                  <div className={styles.modalPrice}>{formatThemePrice(selectedProduct.price, locale)}</div>
                </div>

                <p className={styles.modalDesc}>
                  {getProductDesc(selectedProduct) || copy.noDesc}
                </p>

                <div className={styles.modalAllergenBox}>
                  ℹ️ {copy.allergensLabel}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
