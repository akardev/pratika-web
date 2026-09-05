'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function EngelliOtvMuafiyetHesaplama() {
  const [listPriceStr, setListPriceStr] = useState('1800000'); // Normal bayi satış fiyatı
  const [otvRatePercent, setOtvRatePercent] = useState(80); // Standart araç ÖTV %

  const [result, setResult] = useState<{
    exemptPrice: number;
    discountAmount: number;
    exceedsLimit: boolean;
    limit: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const listPrice = parseTurkishNumber(listPriceStr);
    if (isNaN(listPrice) || listPrice <= 0) return;

    // 2026 Engelli Araç Alım Üst Limiti (vergiler dahil) yaklaşık 2.290.000 TL
    const limit = 2290000;
    const exceedsLimit = listPrice > limit;

    // Liste Fiyatı = Matrah * (1 + ÖTV) * 1.20
    // Muafiyetli Fiyat = Matrah * 1.20 = Liste Fiyatı / (1 + ÖTV)
    const otvMultiplier = 1 + (otvRatePercent / 100);
    const exemptPrice = listPrice / otvMultiplier;
    const discountAmount = listPrice - exemptPrice;

    setResult({
      exemptPrice: Math.round(exemptPrice),
      discountAmount: Math.round(discountAmount),
      exceedsLimit,
      limit,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lp" className="block text-sm font-medium text-foreground mb-1">
                Normal Bayi Liste Satış Fiyatı (TL)
              </label>
              <input
                id="lp"
                type="text"
                value={listPriceStr}
                onChange={(e) => setListPriceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="otv" className="block text-sm font-medium text-foreground mb-1">
                Normal ÖTV Dilimi
              </label>
              <select
                id="otv"
                value={otvRatePercent}
                onChange={(e) => setOtvRatePercent(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value={80}>%80 ÖTV (Standart Binek)</option>
                <option value={70}>%70 ÖTV</option>
                <option value={60}>%60 ÖTV</option>
                <option value={50}>%50 ÖTV</option>
                <option value={10}>%10 ÖTV (Elektrikli)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Muafiyetli Fiyatı Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            {result.exceedsLimit && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
                Uyarı: Araç liste fiyatı yasal 2026 ÖTV muafiyet üst limitini ({formatNumber(result.limit)} ₺) aşmaktadır. Muafiyetten yararlanılamaz.
              </div>
            )}
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">İndirimli Fiyat ve Vergi Avantajı</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <span className="text-xs text-muted-foreground block mb-1">ÖTV Muafiyetli Alış Fiyatı</span>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {formatNumber(result.exemptPrice)} ₺
                </span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Elde Edilen Net Vergi İndirimi</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.discountAmount)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
