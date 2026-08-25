'use client';

import { useState } from 'react';
import type { BusinessData, CategoryData, ProductData } from './PanelDashboardOverview';
import { parseBusinessSettings } from '@/lib/business-settings';
import { THEME_LIST, THEME_REGISTRY } from '@/lib/themes/registry';
import type { MenuThemeId } from '@/lib/themes/types';
import { toggleMenuIntroAction, updateMenuThemeAction } from '@/app/panel/actions';
import ThemeRenderer from '@/lib/themes/ThemeRenderer';
import styles from './panel.module.css';

export default function PanelThemeManager({
  business,
  menuId,
  categories,
  products,
}: {
  business: BusinessData;
  menuId: string;
  categories: CategoryData[];
  products: ProductData[];
}) {
  const settings = parseBusinessSettings(business);
  const [activeTheme, setActiveTheme] = useState<MenuThemeId>(settings.menu_theme);
  const [showIntro, setShowIntro] = useState<boolean>(settings.show_menu_intro);
  const [loadingTheme, setLoadingTheme] = useState<string | null>(null);
  const [loadingIntro, setLoadingIntro] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<MenuThemeId | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSelectTheme = async (themeId: MenuThemeId) => {
    if (loadingTheme || themeId === activeTheme) return;
    setLoadingTheme(themeId);
    const res = await updateMenuThemeAction(business.id, themeId, menuId);
    setLoadingTheme(null);

    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
    } else {
      setActiveTheme(themeId);
      setFeedback({
        type: 'success',
        text: `✓ Menü tasarımı "${THEME_REGISTRY[themeId].name}" olarak güncellendi. QR kodunuz ve URL adresiniz değişmedi!`,
      });
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const handleToggleIntro = async (nextState: boolean) => {
    setLoadingIntro(true);
    const res = await toggleMenuIntroAction(business.id, nextState, menuId);
    setLoadingIntro(false);

    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
    } else {
      setShowIntro(nextState);
      setFeedback({
        type: 'success',
        text: nextState
          ? '✓ QR Giriş / Karşılama Ekranı AKTİF edildi. Müşterileriniz önce karşılama ekranını görecek.'
          : '✓ QR Giriş Ekranı KAPATILDI. QR okutulduğunda doğrudan menü ürünleri açılacak.',
      });
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  return (
    <div>
      {/* SECTION HEADER */}
      <div className={styles.sectionCardHeader}>
        <div>
          <h2>Menü Tasarımı ve Giriş Ekranı</h2>
          <p className="mt-1 text-xs text-slate-500">
            QR Menünüzün görsel temasını seçin ve karşılama ekranı ayarlarını yapılandırın.
          </p>
        </div>
      </div>

      {feedback && (
        <div
          className={`mb-5 rounded-xl border p-3.5 text-xs font-bold ${
            feedback.type === 'success'
              ? 'border-green-200 bg-green-50 text-green-700'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {feedback.text}
        </div>
      )}

      {/* 1. GİRİŞ EKRANI TOGGLE KARTI */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">✨</span>
              <h3 className="text-sm font-bold text-slate-900">Menü Giriş (Hoş Geldiniz) Ekranı</h3>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  showIntro ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {showIntro ? 'AÇIK (Varsayılan)' : 'KAPALI'}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 max-w-xl">
              {showIntro
                ? 'Müşteri QR kodu okuttuğunda logonuz, sloganınız ve karşılama mesajınızın olduğu şık bir karşılama ekranı açılır. "Menüyü Gör" butonuna tıklayarak menüye geçer.'
                : 'Müşteri QR kodu okuttuğunda karşılama ekranı atlanır ve doğrudan menü ürünleri listelenir.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={loadingIntro}
              onClick={() => handleToggleIntro(!showIntro)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                showIntro ? 'bg-blue-600' : 'bg-slate-300'
              }`}
              role="switch"
              aria-checked={showIntro}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  showIntro ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 2. 5 TEMEL TASARIM KARTLARI */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900">Seçilebilir QR Menü Temaları ({THEME_LIST.length})</h3>
        <span className="text-xs text-slate-500">Tüm temalar menü içeriğinizle otomatik uyumludur</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {THEME_LIST.map((theme) => {
          const isCurrent = activeTheme === theme.id;
          const isLoading = loadingTheme === theme.id;

          return (
            <div
              key={theme.id}
              className={`flex flex-col justify-between rounded-2xl border transition-all duration-200 overflow-hidden bg-white shadow-xs hover:shadow-md ${
                isCurrent ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Preview Thumbnail Banner */}
              <div
                className="relative h-40 w-full p-4 flex flex-col justify-between overflow-hidden"
                style={{ background: theme.previewThumbnail }}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-black/50 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/10">
                    {theme.badge}
                  </span>
                  {isCurrent && (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                      ✓ Aktif Tasarım
                    </span>
                  )}
                </div>

                {/* Decorative Typography Sample */}
                <div className="text-center">
                  <div
                    className="text-2xl font-black tracking-wider uppercase text-white drop-shadow-md"
                    style={{
                      fontFamily:
                        theme.id === 'elegant' || theme.id === 'classic'
                          ? 'serif'
                          : theme.id === 'minimal'
                          ? 'monospace'
                          : 'sans-serif',
                    }}
                  >
                    {theme.name}
                  </div>
                  <div className="text-[11px] text-white/80 font-medium">{theme.tagline}</div>
                </div>

                <div className="flex justify-center gap-1">
                  <span className="h-1.5 w-6 rounded-full" style={{ backgroundColor: theme.accentColor }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-bold text-slate-900">{theme.name}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Ücretsiz / Dahil
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {theme.description}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {theme.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-slate-50 border border-slate-200/80 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setPreviewTheme(theme.id)}
                    className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    👁️ Gerçek Veriyle Önizle
                  </button>

                  {isCurrent ? (
                    <button
                      type="button"
                      disabled
                      className="flex-1 rounded-xl bg-emerald-50 border border-emerald-200 py-2.5 text-xs font-bold text-emerald-700 cursor-default"
                    >
                      ✓ Seçili
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleSelectTheme(theme.id)}
                      className="flex-1 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700 shadow-xs disabled:opacity-50"
                    >
                      {isLoading ? 'Kaydediliyor...' : 'Kullan'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. REAL-DATA INTERACTIVE PREVIEW MODAL */}
      {previewTheme && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setPreviewTheme(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative flex h-[90vh] max-h-[860px] w-full max-w-[480px] flex-col overflow-hidden rounded-3xl bg-slate-950 shadow-2xl border border-white/10 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Topbar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-4 py-3 text-white backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-400">Canlı Önizleme:</span>
                <span className="text-sm font-bold">{THEME_REGISTRY[previewTheme].name}</span>
                <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/70">
                  {business.name} Verileriyle
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewTheme(null)}
                className="rounded-full bg-white/10 p-1.5 text-white/80 hover:bg-white/20 transition"
                aria-label="Kapat"
              >
                ✕
              </button>
            </div>

            {/* Modal Content / Real Renderer */}
            <div className="flex-1 overflow-y-auto">
              <ThemeRenderer
                business={{
                  ...business,
                  menu_theme: previewTheme,
                  show_menu_intro: showIntro,
                }}
                categories={categories}
                products={products}
                forcedTheme={previewTheme}
                forceShowIntro={showIntro}
              />
            </div>

            {/* Modal Bottom CTA */}
            <div className="flex items-center justify-between border-t border-white/10 bg-slate-900 p-3.5 backdrop-blur-md">
              <div className="text-xs text-slate-300">
                Bu tasarımı beğendiniz mi?
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewTheme(null)}
                  className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-xs font-bold text-white hover:bg-white/10 transition"
                >
                  Kapat
                </button>
                {activeTheme === previewTheme ? (
                  <span className="rounded-xl bg-emerald-600/30 border border-emerald-500/40 px-4 py-2 text-xs font-bold text-emerald-400">
                    ✓ Zaten Aktif
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={async () => {
                      await handleSelectTheme(previewTheme);
                      setPreviewTheme(null);
                    }}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 shadow-md transition"
                  >
                    Bu Tasarımı Kullan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
