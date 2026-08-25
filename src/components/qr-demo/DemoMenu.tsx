'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeRenderer from '@/lib/themes/ThemeRenderer';
import type { MenuThemeId } from '@/lib/themes/types';
import { THEME_LIST, THEME_REGISTRY } from '@/lib/themes/registry';
import { demoCategories, demoProducts } from '@/lib/qr-demo-data';
import type { BusinessData, CategoryData, ProductData } from '@/components/panel/PanelDashboardOverview';

export default function DemoMenu() {
  const [currentTheme, setCurrentTheme] = useState<MenuThemeId>('elegant');
  const [showIntroScreen, setShowIntroScreen] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  // Unified Demo Business
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
    show_menu_intro: showIntroScreen,
    welcome_message: 'LUNA COFFEE & KITCHEN',
    slogan: 'Kahve, mutfak ve iyi anlar.',
    working_hours: '08:00 – 23:00',
    default_lang: 'tr',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Demo Categories
  const categories: CategoryData[] = demoCategories.map((c, idx) => ({
    id: c.id,
    business_id: 'demo-luna-coffee',
    menu_id: 'demo-menu',
    name: c.name.tr,
    position: idx,
    is_active: true,
  }));

  // Demo Products
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

  // Demo Category Translations
  const categoryTranslations: Array<{ category_id: string; lang_code: string; name: string }> = [];
  demoCategories.forEach((c) => {
    categoryTranslations.push({ category_id: c.id, lang_code: 'en', name: c.name.en });
    categoryTranslations.push({ category_id: c.id, lang_code: 'de', name: c.name.de });
    categoryTranslations.push({ category_id: c.id, lang_code: 'ru', name: c.name.ru });
  });

  // Demo Product Translations
  const productTranslations: Array<{ product_id: string; lang_code: string; name: string; description: string }> = [];
  demoProducts.forEach((p) => {
    productTranslations.push({ product_id: p.id, lang_code: 'en', name: p.name.en, description: p.description.en });
    productTranslations.push({ product_id: p.id, lang_code: 'de', name: p.name.de, description: p.description.de });
    productTranslations.push({ product_id: p.id, lang_code: 'ru', name: p.name.ru, description: p.description.ru });
  });

  const handleSelectTheme = (themeId: MenuThemeId) => {
    setCurrentTheme(themeId);
    setResetKey((k) => k + 1);
  };

  const handleToggleView = (intro: boolean) => {
    setShowIntroScreen(intro);
    setResetKey((k) => k + 1);
  };

  const activeThemeMeta = THEME_REGISTRY[currentTheme];

  const themeHighlights: Record<MenuThemeId, { vibe: string; font: string; bestFor: string; accentColor: string; bgStyle: string }> = {
    elegant: {
      vibe: 'Fine Dining • Otel • Premium Restoran',
      font: 'Playfair Display Serif & Altın Vurgular',
      bestFor: 'Seçkin restoranlar, şarap evleri, otel lounge ve fine-dining mekanlar.',
      accentColor: '#c5a880',
      bgStyle: 'from-[#121110] to-[#1c1917]',
    },
    modern: {
      vibe: 'Cafe • Bistro • 3rd Wave Coffee',
      font: 'Plus Jakarta Sans & Mor/İndigo Rozetler',
      bestFor: 'Yeni nesil kahveciler, modern bistro ve şehir kafeleri.',
      accentColor: '#818cf8',
      bgStyle: 'from-[#0b0f19] to-[#111827]',
    },
    classic: {
      vibe: 'Restoran • Kebap • Geleneksel Mutfak',
      font: 'Merriweather & Sıcak Terracotta Çizgiler',
      bestFor: 'Geleneksel lokantalar, kebapçılar, ocakbaşı ve et restoranları.',
      accentColor: '#ea580c',
      bgStyle: 'from-[#1c1410] to-[#261c16]',
    },
    minimal: {
      vibe: 'Bakery • Artisan Cafe • Tasarım Stüdyo',
      font: 'Inter & Monokrom Minimalist Hatlar',
      bestFor: 'Fırınlar, tatlıcılar, artisan kafeler ve sade mekanlar.',
      accentColor: '#94a3b8',
      bgStyle: 'from-[#0f172a] to-[#1e293b]',
    },
    bold: {
      vibe: 'Burger • Street Food • Beach Club',
      font: 'Syne & Dinamik Canlı Neon Vurgular',
      bestFor: 'Burgerciler, kokteyl barlar, sokak lezzetleri ve beach clublar.',
      accentColor: '#f43f5e',
      bgStyle: 'from-[#18080e] to-[#250d18]',
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
      {/* TOP GLOBAL NAVBAR */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-slate-950/90 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/qr-menu" className="flex items-center gap-2 text-white font-extrabold text-base tracking-tight hover:opacity-90">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-sm">✦</span>
            <span>Pratika QR</span>
          </Link>
          <span className="hidden rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-bold text-blue-400 border border-blue-500/20 sm:inline-block">
            Canlı İnteraktif Demo
          </span>
        </div>

        {/* TOP CTA BUTTONS */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/qr-menu#fiyatlar"
            className="hidden sm:inline-flex rounded-xl bg-white/5 border border-white/10 px-3.5 py-1.5 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition"
          >
            Paketleri İncele
          </Link>
          <Link
            href="/login?mode=signup"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 transition"
          >
            15 Gün Ücretsiz Başla →
          </Link>
        </div>
      </header>

      {/* DUAL-COLUMN DEMO WORKSPACE */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* LEFT COLUMN: THEME PICKER & CONTROLS */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 mb-2.5">
                <span>🎨</span>
                <span>5 Farklı Tasarım Sistemi</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Mekanınıza Özel Menü Deneyimi
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Her tema; restoran, kafe veya otelinizin konseptine uygun özgün tipografi, karşılama ekranı ve kart yerleşimiyle sıfırdan tasarlandı.
              </p>
            </div>

            {/* VIEW MODE TOGGLE (GİRİŞ EKRANI vs DİREKT MENÜ) */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-3">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                📱 Ekran Görünümü Modu:
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleView(true)}
                  className={`rounded-xl py-2 px-3 text-xs font-bold transition flex items-center justify-center gap-2 ${
                    showIntroScreen
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>✨</span>
                  <span>Karşılama / Giriş Ekranı</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleView(false)}
                  className={`rounded-xl py-2 px-3 text-xs font-bold transition flex items-center justify-center gap-2 ${
                    !showIntroScreen
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>🍽️</span>
                  <span>Direkt Ürün Menüsü</span>
                </button>
              </div>
            </div>

            {/* 5 THEME SELECTION CARDS */}
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Temayı Seçin (Anında Önizleyin):
              </div>

              {THEME_LIST.map((t) => {
                const isSelected = currentTheme === t.id;
                const highlight = themeHighlights[t.id];

                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelectTheme(t.id)}
                    className={`w-full text-left rounded-2xl border p-4 transition-all ${
                      isSelected
                        ? 'border-blue-500/80 bg-slate-900/90 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/50'
                        : 'border-white/10 bg-slate-900/30 hover:border-white/20 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{t.badge}</span>
                        <strong className="text-sm font-extrabold text-white">{t.name}</strong>
                      </div>
                      <span
                        className="h-3 w-3 rounded-full border border-white/20"
                        style={{ backgroundColor: highlight.accentColor }}
                      />
                    </div>

                    <div className="text-xs font-semibold text-blue-400 mb-1">
                      {highlight.vibe}
                    </div>

                    <p className="text-[11px] text-slate-400 leading-snug">
                      {highlight.bestFor}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-slate-500">
                      <span>{highlight.font}</span>
                      <span className={`font-bold ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {isSelected ? '● Aktif Önizleme' : 'İncele →'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* QUICK ONBOARDING CALLOUT */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-200">
              <div className="flex items-center gap-2 font-bold text-xs text-white mb-1">
                <span>⚡</span>
                <span>QR Kodunuz Asla Değişmez</span>
              </div>
              <p className="text-[11px] text-emerald-300/80 leading-relaxed">
                Panelden temayı, fiyatları, ürünleri veya giriş ekranı ayarlarını dilediğiniz zaman değiştirebilirsiniz. Masalardaki baskılı QR kodlarınızı yenilemeniz gerekmez.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: REALISTIC SMARTPHONE MOCKUP FRAME */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            {/* ACTIVE THEME BANNER BAR */}
            <div className="mb-3 flex items-center justify-between w-full max-w-[420px] px-2 text-xs">
              <span className="text-slate-400 font-medium">
                Önizleme: <strong className="text-white">{activeThemeMeta.name}</strong>
              </span>
              <span className="text-[11px] text-slate-400">
                {showIntroScreen ? '✨ Karşılama Ekranı' : '🍽️ Ürünler'} · 🇹🇷 / 🇬🇧 / 🇩🇪 / 🇷🇺
              </span>
            </div>

            {/* PHONE FRAME */}
            <div className="relative w-full max-w-[420px] rounded-[44px] border-[10px] border-slate-800 bg-slate-900 p-2 shadow-2xl shadow-black/90 ring-1 ring-white/10">
              
              {/* TOP SPEAKER / CAMERA NOTCH */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex h-4 w-28 items-center justify-center rounded-full bg-slate-950">
                <span className="h-2 w-2 rounded-full bg-slate-800" />
              </div>

              {/* PHONE SCREEN CONTENT */}
              <div className="relative min-h-[720px] max-h-[820px] overflow-y-auto rounded-[32px] bg-slate-950">
                <div key={`${currentTheme}-${showIntroScreen}-${resetKey}`}>
                  <ThemeRenderer
                    business={demoBusiness}
                    isMenuActive={true}
                    categories={categories}
                    products={products}
                    categoryTranslations={categoryTranslations}
                    productTranslations={productTranslations}
                    forcedTheme={currentTheme}
                    forceShowIntro={showIntroScreen}
                    onThemeChangePreview={handleSelectTheme}
                  />
                </div>
              </div>
            </div>

            <p className="mt-3 text-center text-[11px] text-slate-500">
              Gerçek müşteri deneyimi. Yukarıdaki menüde ürünlere tıklayabilir, detayları inceleyebilir ve dil değiştirebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
