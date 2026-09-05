'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function TaksitErtelemeFarkiHesaplama() {
  const [cashPriceStr, setCashPriceStr] = useState('25000');
  const [deferredPriceStr, setDeferredPriceStr] = useState('28500');
  const [deferMonthsStr, setDeferMonthsStr] = useState('3');

  const [result, setResult] = useState<{
    diffAmount: number;
    diffPercent: number;
    monthlyInterestEquivalent: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const cash = parseTurkishNumber(cashPriceStr);
    const deferred = parseTurkishNumber(deferredPriceStr);
    const deferMonths = parseInt(deferMonthsStr, 10) || 1;

    if (isNaN(cash) || isNaN(deferred) || cash <= 0) return;

    const diffAmount = deferred - cash;
    const diffPercent = (diffAmount / cash) * 100;
    const monthlyEquivalent = diffPercent / deferMonths;

    setResult({
      diffAmount: Math.round(diffAmount * 100) / 100,
      diffPercent: Math.round(diffPercent * 100) / 100,
      monthlyInterestEquivalent: Math.round(monthlyEquivalent * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="cp" className="block text-sm font-medium text-foreground mb-1">Peşin / Normal Fiyat (TL)</label>
              <input
                id="cp"
                type="text"
                value={cashPriceStr}
                onChange={(e) => setCashPriceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="dp" className="block text-sm font-medium text-foreground mb-1">Ertelemeli Toplam Fiyat (TL)</label>
              <input
                id="dp"
                type="text"
                value={deferredPriceStr}
                onChange={(e) => setDeferredPriceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="dm" className="block text-sm font-medium text-foreground mb-1">Erteleme Süresi (Ay)</label>
              <input
                id="dm"
                type="number"
                min="1"
                max="12"
                value={deferMonthsStr}
                onChange={(e) => setDeferMonthsStr(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Vade Farkını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Erteleme Maliyet Analizi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <span className="text-xs text-muted-foreground block mb-1">Fazladan Ödenen Tutar</span>
                <span className="text-2xl font-bold text-destructive">{formatNumber(result.diffAmount)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Maliyet Artışı</span>
                <span className="text-xl font-bold text-foreground">%{result.diffPercent}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Aylık Eşdeğer Faiz Maliyeti</span>
                <span className="text-xl font-bold text-foreground">Aylık ~%{result.monthlyInterestEquivalent}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
