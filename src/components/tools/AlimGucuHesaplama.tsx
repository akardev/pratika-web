'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function AlimGucuHesaplama() {
  const [currentAmountStr, setCurrentAmountStr] = useState<string>('50.000');
  const [inflationRateStr, setInflationRateStr] = useState<string>('40'); // Yıllık Enflasyon Oranı %
  const [yearsStr, setYearsStr] = useState<string>('3'); // Süre (Yıl)

  const [result, setResult] = useState<{
    currentAmount: number;
    inflationRate: number;
    years: number;
    futureEquivalentCost: number; // Bugün 50.000 TL olan malın gelecekteki fiyatı
    futurePurchasingPower: number; // Bugün kenarda duran 50.000 TL&apos;nin gelecekteki bugünkü karşılığı alım gücü
    lossPercentage: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const amount = parseTurkishNumber(currentAmountStr);
    const inflation = parseTurkishNumber(inflationRateStr);
    const years = parseTurkishNumber(yearsStr);

    if (isNaN(amount) || amount <= 0) {
      setError('Lütfen geçerli bir tutar giriniz.');
      return;
    }
    if (isNaN(inflation) || inflation < 0) {
      setError('Lütfen geçerli bir enflasyon oranı giriniz.');
      return;
    }
    if (isNaN(years) || years <= 0 || years > 40) {
      setError('Lütfen 1 ile 40 arasında bir yıl giriniz.');
      return;
    }

    const cumulativeFactor = Math.pow(1 + inflation / 100, years);
    const futureEquivalentCost = amount * cumulativeFactor;
    const futurePurchasingPower = amount / cumulativeFactor;
    const lossPercentage = ((amount - futurePurchasingPower) / amount) * 100;

    setResult({
      currentAmount: amount,
      inflationRate: inflation,
      years,
      futureEquivalentCost,
      futurePurchasingPower,
      lossPercentage,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-1 text-foreground">
                Bugünkü Para Tutarı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="amount"
                  placeholder="Örn: 50.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={currentAmountStr}
                  onChange={(e) => setCurrentAmountStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="inflation" className="block text-sm font-medium mb-1 text-foreground">
                  Yıllık Ortalama Enflasyon (%) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="inflation"
                    placeholder="Örn: 40"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={inflationRateStr}
                    onChange={(e) => setInflationRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">%</div>
                </div>
              </div>

              <div>
                <label htmlFor="years" className="block text-sm font-medium mb-1 text-foreground">
                  Geçecek Süre (Yıl) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="years"
                    placeholder="Örn: 3"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={yearsStr}
                    onChange={(e) => setYearsStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">Yıl</div>
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
              Alım Gücü Kaybını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Alım Gücü Analizi
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">{result.years} Yıl Sonraki Reel Karşılığı</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.futurePurchasingPower)}
                  </span>
                  <span className="text-xs font-semibold text-destructive mt-1.5 bg-destructive/10 px-2.5 py-1 rounded-md border border-destructive/20">
                    -%{formatNumber(result.lossPercentage, 1)} Reel Alım Gücü Kaybı
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Bugün {formatCurrency(result.currentAmount)} olan malın {result.years} yıl sonraki fiyatı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.futureEquivalentCost)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/enflasyon-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Enflasyon değer kaybı aracına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Tutar ve enflasyon oranını girerek paranın gelecekteki reel alım gücünü görün.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Satın Alma Gücü ve Enflasyon İlişkisi</h2>
        <p className="mb-4 text-muted-foreground">
          Enflasyon, genel fiyat düzeyinin sürekli artmasıdır. Bu durum paranın nominal değeri aynı kalsa dahi reel olarak satın alabildiği mal ve hizmet miktarının azalmasına yol açar.
        </p>
      </div>
    </div>
  );
}
