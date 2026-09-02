'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function CagrBilesikBuyumeHesaplama() {
  const [startValStr, setStartValStr] = useState<string>('100000');
  const [endValStr, setEndValStr] = useState<string>('350000');
  const [yearsCountStr, setYearsCountStr] = useState<string>('3');
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    cagrPercent: number;
    totalGrowthPercent: number;
    totalProfit: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const s = parseTurkishNumber(startValStr);
    const end = parseTurkishNumber(endValStr);
    const y = parseTurkishNumber(yearsCountStr);

    if (isNaN(s) || isNaN(end) || isNaN(y) || s <= 0 || end <= 0 || y <= 0) {
      setError('Lütfen başlangıç, bitiş ve yıl değerlerini pozitif sayılar olarak girin.');
      return;
    }

    // CAGR = (End / Start)^(1 / n) - 1
    const cagr = (Math.pow(end / s, 1 / y) - 1) * 100;
    const totalGrowth = ((end - s) / s) * 100;
    const totalProfit = end - s;

    setResult({
      cagrPercent: Math.round(cagr * 100) / 100,
      totalGrowthPercent: Math.round(totalGrowth * 100) / 100,
      totalProfit: Math.round(totalProfit),
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="s" className="block text-sm font-medium text-foreground mb-1">Başlangıç Portföy Değeri (TL)</label>
              <input
                id="s"
                type="text"
                value={startValStr}
                onChange={(e) => setStartValStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="e" className="block text-sm font-medium text-foreground mb-1">Bitiş Portföy Değeri (TL)</label>
              <input
                id="e"
                type="text"
                value={endValStr}
                onChange={(e) => setEndValStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="y" className="block text-sm font-medium text-foreground mb-1">Geçen Süre (Yıl)</label>
              <input
                id="y"
                type="text"
                value={yearsCountStr}
                onChange={(e) => setYearsCountStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            CAGR Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Bileşik Büyüme Raporu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Yıllık Bileşik Büyüme (CAGR)</span>
                <span className="text-2xl font-bold text-primary">%{result.cagrPercent} / yıl</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Kümülatif Getiri</span>
                <span className="text-xl font-bold text-foreground">%{result.totalGrowthPercent}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Nominal Kâr</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.totalProfit)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">CAGR (Bileşik Yıllık Büyüme Oranı) Nedir?</p>
        <p>Yatırımların piyasa dalgalanmalarından arındırılarak her yıl sabit bir oranda büyüdüğü varsayıldığında ulaşılan geometrik ortalama yıllık getiri hızıdır.</p>
      </div>
    </div>
  );
}
