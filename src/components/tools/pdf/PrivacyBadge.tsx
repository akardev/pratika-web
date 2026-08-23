import React from 'react';

export default function PrivacyBadge() {
  return (
    <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300">
      <svg className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <span>
        <strong>Gizlilik Güvencesi:</strong> Dosyalarınız %100 tarayıcınızda (cihazınızda) yerel olarak işlenir ve hiçbir sunucuya yüklenmez veya kaydedilmez.
      </span>
    </div>
  );
}
