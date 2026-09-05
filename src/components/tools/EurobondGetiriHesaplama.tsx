'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function EurobondGetiriHesaplama() {
  const [nominalStr, setNominalStr] = useState('10000'); // Nominal Dolar
  const [couponRateStr, setCouponRateStr] = useState('7.50'); // Yıllık kupon %
  const [pricePercentStr, setPricePercentStr] = useState('98.00'); // Alış temiz fiyat %
  const [usdTryStr, setUsdTryStr] = useState('36.50'); // Dolar kuru

  const [result, setResult] = useState<{
    annualCouponUsd: number;
    annualCouponTry: number;
    purchaseCostUsd: number;
    currentYieldPercent: number;
    exceedsTaxThreshold: boolean;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const nominal = parseTurkishNumber(nominalStr);
    const couponRate = parseTurkishNumber(couponRateStr);
    const pricePercent = parseTurkishNumber(pricePercentStr);
    const usdTry = parseTurkishNumber(usdTryStr);

    if (isNaN(nominal) || isNaN(couponRate) || nominal <= 0) return;

    const purchaseCostUsd = nominal * (pricePercent / 100);
    const annualCouponUsd = nominal * (couponRate / 100);
    const annualCouponTry = annualCouponUsd * usdTry;
    const currentYieldPercent = (annualCouponUsd / purchaseCostUsd) * 100;

    // 2026 Eurobond faiz gelirinde beyan sınırı yaklaşık 330.000 TL
    const exceedsTaxThreshold = annualCouponTry > 330000;

    setResult({
      annualCouponUsd: Math.round(annualCouponUsd * 100) / 100,
      annualCouponTry: Math.round(annualCouponTry),
      purchaseCostUsd: Math.round(purchaseCostUsd * 100) / 100,
      currentYieldPercent: Math.round(currentYieldPercent * 100) / 100,
      exceedsTaxThreshold,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-foreground mb-1">Nominal Tutar ($)</label>
              <input
                id="nom"
                type="text"
                value={nominalStr}
                onChange={(e) => setNominalStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="cr" className="block text-sm font-medium text-foreground mb-1">Yıllık Kupon Faizi (%)</label>
              <input
                id="cr"
                type="text"
                value={couponRateStr}
                onChange={(e) => setCouponRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="prc" className="block text-sm font-medium text-foreground mb-1">Alış Fiyatı (%)</label>
              <input
                id="prc"
                type="text"
                value={pricePercentStr}
                onChange={(e) => setPricePercentStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="fx" className="block text-sm font-medium text-foreground mb-1">USD/TRY Kuru</label>
              <input
                id="fx"
                type="text"
                value={usdTryStr}
                onChange={(e) => setUsdTryStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Kupon ve Getiriyi Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Eurobond Getiri Tablosu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Yıllık Kupon Getirisi (USD)</span>
                <span className="text-2xl font-bold text-primary">USD {formatNumber(result.annualCouponUsd)}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Yıllık TL Karşılığı</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.annualCouponTry)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Cari Getiri Oranı</span>
                <span className="text-xl font-bold text-foreground">%{result.currentYieldPercent}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Vergi Beyan Sınırı</span>
                <span className={`text-sm font-bold block mt-1 ${result.exceedsTaxThreshold ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {result.exceedsTaxThreshold ? 'Beyan Sınırı Aşıldı (Gelir Vergisi Gerekir)' : 'Beyan Sınırı Altında (Muaf)'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
