'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function TemettuVerimiHesaplama() {
  const [stockPriceStr, setStockPriceStr] = useState<string>('85,00'); // Hisse Fiyatı TL
  const [dpsStr, setDpsStr] = useState<string>('6,80'); // Hisse Başı Net Temettü (DPS) TL
  const [shareCountStr, setShareCountStr] = useState<string>('1.500'); // Sahip olunan hisse adedi

  const [result, setResult] = useState<{
    stockPrice: number;
    dps: number;
    shareCount: number;
    dividendYield: number;
    totalPortfolioValue: number;
    totalDividendIncome: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const price = parseTurkishNumber(stockPriceStr);
    const dps = parseTurkishNumber(dpsStr);
    const shares = parseTurkishNumber(shareCountStr) || 0;

    if (isNaN(price) || price <= 0) {
      setError('Lütfen geçerli bir hisse fiyatı giriniz.');
      return;
    }
    if (isNaN(dps) || dps <= 0) {
      setError('Lütfen hisse başına temettü tutarını giriniz.');
      return;
    }

    const dividendYield = (dps / price) * 100;
    const totalPortfolioValue = shares * price;
    const totalDividendIncome = shares * dps;

    setResult({
      stockPrice: price,
      dps,
      shareCount: shares,
      dividendYield,
      totalPortfolioValue,
      totalDividendIncome,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="stockPrice" className="block text-sm font-medium mb-1 text-foreground">
                  Hisse Güncel Fiyatı (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="stockPrice"
                    placeholder="Örn: 85,00"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={stockPriceStr}
                    onChange={(e) => setStockPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL</div>
                </div>
              </div>

              <div>
                <label htmlFor="dps" className="block text-sm font-medium mb-1 text-foreground">
                  Hisse Başı Net Temettü (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="dps"
                    placeholder="Örn: 6,80"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={dpsStr}
                    onChange={(e) => setDpsStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL</div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="shares" className="block text-sm font-medium mb-1 text-foreground">
                Sahip Olunan Hisse / Pay Adedi (Opsiyonel)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="shares"
                  placeholder="Örn: 1.500"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={shareCountStr}
                  onChange={(e) => setShareCountStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">Lot / Adet</div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Temettü Verimini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Temettü Verimi Analizi
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Yıllık Temettü Verimi Oranı</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    %{formatNumber(result.dividendYield, 2)}
                  </span>
                  {result.totalDividendIncome > 0 && (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                      Toplam Nakit Temettü: {formatCurrency(result.totalDividendIncome)}
                    </span>
                  )}
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Hisse Fiyatı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.stockPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Hisse Başına Temettü:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.dps)}</span>
                  </div>
                  {result.shareCount > 0 && (
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-muted-foreground">Toplam Hisse Değeri:</span>
                      <span className="font-semibold text-foreground">{formatCurrency(result.totalPortfolioValue)}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kar-payi-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Kâr payı hesaplama aracına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Hisse fiyatı ve hisse başı temettü miktarını girerek verim oranını hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Temettü Verimi (Dividend Yield) Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          Temettü verimi, bir hisse senedinin yatırımcısına yıllık olarak dağıttığı kâr payının hisse fiyatına oranıdır. Formülü: <strong>(Hisse Başına Yıllık Temettü / Hisse Fiyatı) × 100</strong>
        </p>
      </div>
    </div>
  );
}
