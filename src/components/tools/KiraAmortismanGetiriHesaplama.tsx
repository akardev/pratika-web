'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KiraAmortismanGetiriHesaplama() {
  const [propertyPriceStr, setPropertyPriceStr] = useState<string>('3500000');
  const [monthlyRentStr, setMonthlyRentStr] = useState<string>('18000');
  const [yearlyExpensesStr, setYearlyExpensesStr] = useState<string>('20000'); // DASK, emlak vergisi, aidat/onarım
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    grossYieldPercent: number;
    netYieldPercent: number;
    amortizationYears: number;
    monthlyNetIncome: number;
    annualNetRent: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const price = parseTurkishNumber(propertyPriceStr);
    const rent = parseTurkishNumber(monthlyRentStr);
    const expenses = parseTurkishNumber(yearlyExpensesStr) || 0;

    if (isNaN(price) || isNaN(rent) || price <= 0 || rent <= 0) {
      setError('Lütfen konut fiyatı ve aylık kira tutarını geçerli pozitif sayılar olarak girin.');
      return;
    }

    const annualGrossRent = rent * 12;
    const annualNetRent = Math.max(0, annualGrossRent - expenses);
    const grossYield = (annualGrossRent / price) * 100;
    const netYield = (annualNetRent / price) * 100;
    const amortization = annualNetRent > 0 ? price / annualNetRent : 0;

    setResult({
      grossYieldPercent: Math.round(grossYield * 100) / 100,
      netYieldPercent: Math.round(netYield * 100) / 100,
      amortizationYears: Math.round(amortization * 10) / 10,
      monthlyNetIncome: Math.round((annualNetRent / 12) * 100) / 100,
      annualNetRent: Math.round(annualNetRent),
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="pp" className="block text-sm font-medium text-foreground mb-1">Gayrimenkul Satın Alma Fiyatı (TL)</label>
              <input
                id="pp"
                type="text"
                value={propertyPriceStr}
                onChange={(e) => setPropertyPriceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="mr" className="block text-sm font-medium text-foreground mb-1">Aylık Beklenen Kira (TL)</label>
              <input
                id="mr"
                type="text"
                value={monthlyRentStr}
                onChange={(e) => setMonthlyRentStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="ye" className="block text-sm font-medium text-foreground mb-1">Yıllık Masraflar & Vergiler (TL)</label>
              <input
                id="ye"
                type="text"
                value={yearlyExpensesStr}
                onChange={(e) => setYearlyExpensesStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Amortisman ve Getiriyi Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Yatırım Geri Dönüş Analizi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Amortisman (Geri Dönüş) Süresi</span>
                <span className="text-2xl font-bold text-primary">{result.amortizationYears} Yıl</span>
                <span className="text-xs text-muted-foreground block mt-1">({Math.round(result.amortizationYears * 12)} Ay)</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Yıllık Net Kira Getiri Oranı</span>
                <span className="text-xl font-bold text-foreground">%{result.netYieldPercent}</span>
                <span className="text-xs text-muted-foreground block mt-1">Brüt Getiri: %{result.grossYieldPercent}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Yıllık Net Nakit Akışı</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.annualNetRent)} ₺</span>
                <span className="text-xs text-muted-foreground block mt-1">Aylık net: {formatNumber(result.monthlyNetIncome)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">Konut Yatırımı Kriterleri:</p>
        <p>Türkiye genelinde konut yatırımlarında amortisman süresinin 15-20 yıl arasında olması başarılı bir getiri olarak kabul edilir. Süre kısaldıkça gayrimenkulün kira verimliliği yükselir.</p>
      </div>
    </div>
  );
}
