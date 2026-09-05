'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function RepoGunlukGetiriHesaplama() {
  const [principalStr, setPrincipalStr] = useState('250000');
  const [annualRateStr, setAnnualRateStr] = useState('48.00'); // Yıllık repo / PPF faizi %
  const [daysStr, setDaysStr] = useState('3'); // Hafta sonu bağlama ör. 3 gün
  const [taxRateStr, setTaxRateStr] = useState('10.00'); // Stopaj %

  const [result, setResult] = useState<{
    grossInterest: number;
    stopaj: number;
    netInterest: number;
    finalBalance: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const principal = parseTurkishNumber(principalStr);
    const annualRate = parseTurkishNumber(annualRateStr);
    const days = parseInt(daysStr, 10);
    const taxRate = parseTurkishNumber(taxRateStr) || 10;

    if (isNaN(principal) || isNaN(annualRate) || isNaN(days) || principal <= 0 || days <= 0) return;

    // Brüt faiz = Anapara * (Yıllık Faiz / 100) * (Gün / 365)
    const grossInterest = principal * (annualRate / 100) * (days / 365);
    const stopaj = grossInterest * (taxRate / 100);
    const netInterest = grossInterest - stopaj;
    const finalBalance = principal + netInterest;

    setResult({
      grossInterest: Math.round(grossInterest * 100) / 100,
      stopaj: Math.round(stopaj * 100) / 100,
      netInterest: Math.round(netInterest * 100) / 100,
      finalBalance: Math.round(finalBalance * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="p" className="block text-sm font-medium text-foreground mb-1">Yatırılan Para (TL)</label>
              <input
                id="p"
                type="text"
                value={principalStr}
                onChange={(e) => setPrincipalStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="ar" className="block text-sm font-medium text-foreground mb-1">Yıllık Repo / Fon Faizi (%)</label>
              <input
                id="ar"
                type="text"
                value={annualRateStr}
                onChange={(e) => setAnnualRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="d" className="block text-sm font-medium text-foreground mb-1">Gün Sayısı (Vade)</label>
              <input
                id="d"
                type="number"
                min="1"
                max="365"
                value={daysStr}
                onChange={(e) => setDaysStr(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
              <span className="text-xs text-muted-foreground mt-1 block">Hafta sonu cuma-pazartesi için 3 gün girin.</span>
            </div>
            <div>
              <label htmlFor="tr" className="block text-sm font-medium text-foreground mb-1">Stopaj Oranı (%)</label>
              <input
                id="tr"
                type="text"
                value={taxRateStr}
                onChange={(e) => setTaxRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Günlük Net Faizi Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Günlük Net Getiri</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Cebinize Geçen Net Kâr</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.netInterest)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Vade Sonu Toplam Para</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.finalBalance)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Kesilen Stopaj Vergisi</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.stopaj)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
