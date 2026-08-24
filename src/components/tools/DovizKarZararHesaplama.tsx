'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function DovizKarZararHesaplama() {
  const [currencyCode, setCurrencyCode] = useState<string>('USD');
  const [amountStr, setAmountStr] = useState<string>('2.000'); // Döviz tutarı
  const [buyRateStr, setBuyRateStr] = useState<string>('32,50'); // Alış Kuru TL
  const [sellRateStr, setSellRateStr] = useState<string>('38,20'); // Satış/Güncel Kur TL

  const [result, setResult] = useState<{
    currencyCode: number | string;
    amount: number;
    buyRate: number;
    sellRate: number;
    totalBuyCostTL: number;
    totalSellValueTL: number;
    profitLossTL: number;
    profitPercentage: number;
    isProfit: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const amount = parseTurkishNumber(amountStr);
    const buyRate = parseTurkishNumber(buyRateStr);
    const sellRate = parseTurkishNumber(sellRateStr);

    if (isNaN(amount) || amount <= 0) {
      setError('Lütfen geçerli bir döviz miktarı giriniz.');
      return;
    }
    if (isNaN(buyRate) || buyRate <= 0) {
      setError('Lütfen geçerli bir alış kuru giriniz.');
      return;
    }
    if (isNaN(sellRate) || sellRate <= 0) {
      setError('Lütfen geçerli bir satış/güncel kur giriniz.');
      return;
    }

    const totalBuyCostTL = amount * buyRate;
    const totalSellValueTL = amount * sellRate;
    const profitLossTL = totalSellValueTL - totalBuyCostTL;
    const profitPercentage = ((totalSellValueTL - totalBuyCostTL) / totalBuyCostTL) * 100;
    const isProfit = profitLossTL >= 0;

    setResult({
      currencyCode,
      amount,
      buyRate,
      sellRate,
      totalBuyCostTL,
      totalSellValueTL,
      profitLossTL,
      profitPercentage,
      isProfit,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">
                  Döviz Birimi
                </label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  value={currencyCode}
                  onChange={(e) => setCurrencyCode(e.target.value)}
                >
                  <option value="USD">Amerikan Doları (USD $)</option>
                  <option value="EUR">Euro (EUR €)</option>
                  <option value="GBP">İngiliz Sterlini (GBP £)</option>
                  <option value="CHF">İsviçre Frangı (CHF)</option>
                  <option value="Diger">Diğer Döviz</option>
                </select>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium mb-1 text-foreground">
                  Döviz Tutarı <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="amount"
                  placeholder="Örn: 2.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={amountStr}
                  onChange={(e) => setAmountStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="buyRate" className="block text-sm font-medium mb-1 text-foreground">
                  Alış Kuru (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="buyRate"
                    placeholder="Örn: 32,50"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={buyRateStr}
                    onChange={(e) => setBuyRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL</div>
                </div>
              </div>

              <div>
                <label htmlFor="sellRate" className="block text-sm font-medium mb-1 text-foreground">
                  Satış / Güncel Kur (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="sellRate"
                    placeholder="Örn: 38,20"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={sellRateStr}
                    onChange={(e) => setSellRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL</div>
                </div>
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
              Döviz Kâr / Zararını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Döviz Getiri Özeti
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">{result.isProfit ? 'Toplam Net TL Kârı' : 'Toplam Net TL Zararı'}</span>
                  <span className={`font-extrabold text-3xl sm:text-4xl tracking-tight ${
                    result.isProfit ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'
                  }`}>
                    {result.isProfit ? `+${formatCurrency(result.profitLossTL)}` : formatCurrency(result.profitLossTL)}
                  </span>
                  <span className={`text-xs font-semibold mt-1.5 px-2.5 py-1 rounded-md border ${
                    result.isProfit 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                      : 'bg-destructive/10 text-destructive border-destructive/20'
                  }`}>
                    {result.isProfit ? `+%{formatNumber(result.profitPercentage, 2)} Getiri` : `%{formatNumber(result.profitPercentage, 2)} Zarar`}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Alış Maliyeti (TL):</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.totalBuyCostTL)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Güncel Portföy Değeri (TL):</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.totalSellValueTL)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/altin-kar-zarar-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Altın kâr/zarar hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Döviz miktarı, alış kuru ve güncel kuru girerek TL bazındaki kârınızı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Döviz Kâr ve Getiri Oranı Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Döviz kârı, elinizdeki dövizin güncel kur karşılığı toplam TL değerinden satın aldığınız zamanki toplam TL maliyetinin çıkarılmasıyla bulunur.
        </p>
      </div>
    </div>
  );
}
