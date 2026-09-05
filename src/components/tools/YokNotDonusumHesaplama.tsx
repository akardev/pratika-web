'use client';

import { useState } from 'react';

export default function YokNotDonusumHesaplama() {
  const [gpaStr, setGpaStr] = useState('3.25');

  // YÖK Resmi 4'lük - 100'lük Çeviri Doğrusal Yaklaşımı
  const calcEquivalent = (gpa: number) => {
    // YÖK Tablosu: 4.00 = 100, 3.00 = 76.66, 2.50 = 65.00, 2.00 = 53.33
    if (gpa >= 4.0) return 100;
    if (gpa <= 0) return 0;
    const eq = ((gpa - 1.0) / 3.0) * 70 + 30;
    return Math.min(100, Math.max(0, Math.round(eq * 100) / 100));
  };

  const gpa = parseFloat(gpaStr) || 0;
  const hundredEquivalent = calcEquivalent(gpa);

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="max-w-xs">
          <label htmlFor="gpa" className="block text-sm font-medium text-foreground mb-1">
            4&apos;lük Sistemdeki Notunuz (GPA)
          </label>
          <input
            id="gpa"
            type="number"
            step="0.01"
            min="0"
            max="4"
            value={gpaStr}
            onChange={(e) => setGpaStr(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm font-mono"
          />
        </div>

        <div className="pt-4 border-t border-border">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 inline-block min-w-72">
            <span className="text-xs text-muted-foreground block mb-1">YÖK Resmi 100&apos;lük Sistem Karşılığı</span>
            <span className="text-3xl font-bold text-primary">{hundredEquivalent} / 100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
