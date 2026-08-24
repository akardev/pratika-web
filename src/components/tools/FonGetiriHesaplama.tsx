'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function FonGetiriHesaplama() {
  const [shareCountStr, setShareCountStr] = useState<string>('5.000'); // Pay adedi
  const [buyPriceStr, setBuyPriceStr] = useState<string>('4,50'); // Alış Pay Fiyatı TL
  const [sellPriceStr, setSellPriceStr] = useState<string>('6,20'); // Satış Pay Fiyatı TL
  const [stopageRate, setStopageRate] = useState<number>(10); // %0 (Hisse fonları) veya %10 / %7.5

  const [result, setResult] = useState<{
    shareCount: number;
    buyPrice: number;
    sellPrice: number;
    totalInvested: number;
    totalGrossValue: number;
    grossProfit: number;
    stopageTax: number;
    netProfit: number;
    netReturnRate: number;
    isProfit: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const count = parseTurkishNumber(shareCountStr);
    const buyPrice = parseTurkishNumber(buyPriceStr);
    const sellPrice = parseTurkishNumber(sellPriceStr);

    if (isNaN(count) || count <= 0) {
      setError('Lütfen geçerli bir pay adedi giriniz.');
      return;
    }
    if (isNaN(buyPrice) || buyPrice <= 0) {
      setError('Lütfen geçerli bir pay alış fiyatı giriniz.');
      return;
    }
    if (isNaN(sellPrice) || sellPrice <= 0) {
      setError('Lütfen geçerli bir pay satış fiyatı giriniz.');
      return;
    }

    const totalInvested = count * buyPrice;
    const totalGrossValue = count * sellPrice;
    const grossProfit = totalGrossValue - totalInvested;
    const isProfit = grossProfit >= 0;

    let stopageTax = 0;
    if (isProfit && stopageRate > 0) {
      stopageTax = (grossProfit * stopageRate) / 100;
    }

    const netProfit = grossProfit - stopageTax;
    const netReturnRate = (netProfit / totalInvested) * 100;

    setResult({
      shareCount: count,
      buyPrice,
      sellPrice,
      totalInvested,
      totalGrossValue,
      grossProfit,
      stopageTax,
      netProfit,
      netReturnRate,
      isProfit,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="shareCount" className="block text-sm font-medium mb-1 text-foreground">
                Fon Pay Adedi <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="shareCount"
                  placeholder="Örn: 5.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={shareCountStr}
                  onChange={(e) => setShareCountStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">Adet</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="buyPrice" className="block text-sm font-medium mb-1 text-foreground">
                  Alış Pay Fiyatı (TL) <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="buyPrice"
                  placeholder="Örn: 4,50"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={buyPriceStr}
                  onChange={(e) => setBuyPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>

              <div>
                <label htmlFor="sellPrice" className="block text-sm font-medium mb-1 text-foreground">
                  Satış / Güncel Fiyat (TL) <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="sellPrice"
                  placeholder="Örn: 6,20"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={sellPriceStr}
                  onChange={(e) => setSellPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-foreground">
                Fon Türü / Stopaj Oranı
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStopageRate(0)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    stopageRate === 0
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  %0 Stopaj (Hisse Yoğun Fonlar)
                </button>
                <button
                  type="button"
                  onClick={() => setStopageRate(10)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    stopageRate === 10
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  %10 Stopaj (Borçlanma / Para Piyasası)
                </button>
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
              Fon Kâr ve Getirisini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Fon Getiri Özeti
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">{result.isProfit ? 'Net Kâr' : 'Net Zarar'}</span>
                  <span className={`font-extrabold text-3xl sm:text-4xl tracking-tight ${
                    result.isProfit ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'
                  }`}>
                    {result.isProfit ? `+${formatCurrency(result.netProfit)}` : formatCurrency(result.netProfit)}
                  </span>
                  <span className={`text-xs font-semibold mt-1.5 px-2.5 py-1 rounded-md border ${
                    result.isProfit 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                      : 'bg-destructive/10 text-destructive border-destructive/20'
                  }`}>
                    {result.isProfit ? `+%{formatNumber(result.netReturnRate, 2)} Net Getiri` : `%{formatNumber(result.netReturnRate, 2)} Zarar`}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Yatırılan Anapara:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.totalInvested)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Satış Portföy Değeri:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.totalGrossValue)}</span>
                  </div>
                  {result.stopageTax > 0 && (
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-muted-foreground">Stopaj Kesintisi:</span>
                      <span className="font-semibold text-destructive">-{formatCurrency(result.stopageTax)}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/roi-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Genel yatırım getirisi (ROI) hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Pay adedi ve birim fiyatları girerek fon kazancınızı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">TEFAS Yatırım Fonu Kazancı Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Yatırım fonlarında kazanç, satış fiyatı ile alış fiyatı arasındaki farkın pay adediyle çarpılmasıyla bulunur. Portföyünün en az %80&apos;i BIST hisse senetlerinden oluşan yerli hisse senedi yoğun fonlarda stopaj vergisi %0&apos;dır.
        </p>
      </div>
    </div>
  );
}
