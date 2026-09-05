'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

const getSnapshot = () => localStorage.getItem('pratika_cookie_consent') || 'none';
const getServerSnapshot = () => 'dismissed';

export default function CookieBanner() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [closed, setClosed] = useState(false);

  if (consent !== 'none' || closed) return null;

  const handleAccept = () => {
    localStorage.setItem('pratika_cookie_consent', 'accepted');
    setClosed(true);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('pratika_cookie_consent', 'essential');
    setClosed(true);
  };

  return (
    <aside
      aria-label="Çerez Tercihleri"
      role="dialog"
      aria-modal="false"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md p-5 shadow-xl space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="space-y-1.5">
            <h2 className="text-sm font-semibold text-foreground">
              Çerez Tercihleriniz
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Pratika, temel site fonksiyonlarını sunmak ve deneyiminizi iyileştirmek için teknik çerezler kullanır. Detaylı bilgi için{' '}
              <Link
                href="/cerez-politikasi"
                className="text-primary hover:underline font-medium"
              >
                Çerez Politikası
              </Link>
              &apos;nı inceleyebilirsiniz.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-1">
          <button
            type="button"
            onClick={handleEssentialOnly}
            className="px-3.5 py-2 text-xs font-medium rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Yalnızca Zorunlular
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-colors cursor-pointer"
          >
            Çerezleri Kabul Et
          </button>
        </div>
      </div>
    </aside>
  );
}
