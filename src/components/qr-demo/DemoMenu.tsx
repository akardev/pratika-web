'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeRenderer from '@/lib/themes/ThemeRenderer';
import type { MenuThemeId } from '@/lib/themes/types';
import { THEME_LIST } from '@/lib/themes/registry';
import { demoCategories, demoProducts } from '@/lib/qr-demo-data';
import type { BusinessData, CategoryData, ProductData } from '@/components/panel/PanelDashboardOverview';

export default function DemoMenu() {
  const [currentTheme, setCurrentTheme] = useState<MenuThemeId>('elegant');
  const [resetIntroKey, setResetIntroKey] = useState(0);

  // 1. Build unified Business Data for Demo
  const demoBusiness: BusinessData = {
    id: 'demo-luna-coffee',
    name: 'Luna Coffee & Kitchen',
    slug: 'luna-coffee',
    business_type: 'Specialty Coffee & Kitchen',
    phone: '+90 242 123 45 67',
    address: 'Antalya',
    instagram: '@lunacoffee',
    logo_url: null,
    menu_theme: currentTheme,
    show_menu_intro: true,
    welcome_message: 'LUNA COFFEE & KITCHEN',
    slogan: 'Kahve, mutfak ve iyi anlar.',
    working_hours: '08:00 – 23:00',
    default_lang: 'tr',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // 2. Build CategoryData array
  const categories: CategoryData[] = demoCategories.map((c, idx) => ({
    id: c.id,
    business_id: 'demo-luna-coffee',
    menu_id: 'demo-menu',
    name: c.name.tr,
    position: idx,
    is_active: true,
  }));

  // 3. Build ProductData array
  const products: ProductData[] = demoProducts.map((p, idx) => ({
    id: p.id,
    business_id: 'demo-luna-coffee',
    menu_id: 'demo-menu',
    category_id: p.categoryId,
    name: p.name.tr,
    description: p.description.tr,
    price: p.price,
    image_url: p.image,
    is_active: true,
    position: idx,
  }));

  // 4. Build Category Translations
  const categoryTranslations: Array<{ category_id: string; lang_code: string; name: string }> = [];
  demoCategories.forEach((c) => {
    categoryTranslations.push({ category_id: c.id, lang_code: 'en', name: c.name.en });
    categoryTranslations.push({ category_id: c.id, lang_code: 'de', name: c.name.de });
    categoryTranslations.push({ category_id: c.id, lang_code: 'ru', name: c.name.ru });
  });

  // 5. Build Product Translations
  const productTranslations: Array<{ product_id: string; lang_code: string; name: string; description: string }> = [];
  demoProducts.forEach((p) => {
    productTranslations.push({ product_id: p.id, lang_code: 'en', name: p.name.en, description: p.description.en });
    productTranslations.push({ product_id: p.id, lang_code: 'de', name: p.name.de, description: p.description.de });
    productTranslations.push({ product_id: p.id, lang_code: 'ru', name: p.name.ru, description: p.description.ru });
  });

  const handleThemeSelect = (themeId: MenuThemeId) => {
    setCurrentTheme(themeId);
    setResetIntroKey((k) => k + 1);
  };

  return (
    <div className="relative min-h-screen bg-slate-950">
      {/* FLOATING TOP DEMO CONTROLS BAR */}
      <aside
        aria-label="Demo tema seçimi"
        className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-900/90 px-4 py-2.5 backdrop-blur-md text-white shadow-xl"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-300">
            Canlı Demo:
          </span>
          <span className="text-xs font-bold text-white">Luna Coffee &amp; Kitchen</span>
        </div>

        {/* THEME PICKER PILLS */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {THEME_LIST.map((theme) => {
            const isSelected = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleThemeSelect(theme.id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{theme.badge}</span>
                <span>{theme.name}</span>
              </button>
            );
          })}
        </div>

        {/* CTA TO CREATE MENU */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setResetIntroKey((k) => k + 1)}
            className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-bold text-slate-300 hover:bg-white/10 hover:text-white transition"
            title="Giriş / Karşılama Ekranına Dön"
          >
            🏠 Giriş Ekranı
          </button>
          <Link
            href="/login?mode=signup"
            className="rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-3 py-1 text-xs font-bold text-white shadow-sm hover:from-emerald-600 hover:to-teal-700 transition"
          >
            Ücretsiz Başla →
          </Link>
        </div>
      </aside>

      {/* UNIFIED THEME RENDERER WITH INTERACTIVE STATE */}
      <div key={`${currentTheme}-${resetIntroKey}`}>
        <ThemeRenderer
          business={demoBusiness}
          isMenuActive={true}
          categories={categories}
          products={products}
          categoryTranslations={categoryTranslations}
          productTranslations={productTranslations}
          forcedTheme={currentTheme}
          forceShowIntro={true}
          onThemeChangePreview={handleThemeSelect}
        />
      </div>
    </div>
  );
}
