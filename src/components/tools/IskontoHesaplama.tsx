'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function IskontoHesaplama() {
  const [basePriceStr, setBasePriceStr] = useState<string>('1.000');
  const [discountRate1Str, setDiscountRate1Str] = useState<string>('20');
  const [discountRate2Str, setDiscountRate2Str] = useState<string>('10');
  const [discountRate3Str, setDiscountRate3Str] = useState<string>('0');

  const [result, setResult] = useState<{
    basePrice: number;
    priceAfter1: number;
    priceAfter2: number;
    finalPrice: number;
    totalDiscountAmount: number;
    effectiveTotalRate: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const base = parseTurkishNumber(basePriceStr);
    const d1 = parseTurkishNumber(discountRate1Str) || 0;
    const d2 = parseTurkishNumber(discountRate2Str) || 0;
    const d3 = parseTurkishNumber(discountRate3Str) || 0;

    if (isNaN(base) || base <= 0) {
      setError('Lütfen geçerli bir liste fiyatı giriniz.');
      return;
    }
    if (d1 < 0 || d1 > 100 || d2 < 0 || d2 > 100 || d3 < 0 || d3 > 100) {
      setError('İskonto oranları %0 ile %100 arasında olmalıdır.');
      return;
    }

    const priceAfter1 = base * (1 - d1 / 100);
    const priceAfter2 = priceAfter1 * (1 - d2 / 100);
    const finalPrice = priceAfter2 * (1 - d3 / 100);

    const totalDiscountAmount = base - finalPrice;
    const effectiveTotalRate = ((base - finalPrice) / base) * 100;

    setResult({
      basePrice: base,
      priceAfter1,
      priceAfter2,
      finalPrice,
      totalDiscountAmount,
      effectiveTotalRate,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="basePrice" className="block text-sm font-medium mb-1 text-foreground">
                Liste / Etiket Fiyatı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="basePrice"
                  placeholder="Örn: 1.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={basePriceStr}
                  onChange={(e) => setBasePriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label htmlFor="d1" className="block text-xs font-medium mb-1 text-foreground">
                  1. İskonto (%) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="d1"
                    placeholder="Örn: 20"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 pr-7 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
                    value={discountRate1Str}
                    onChange={(e) => setDiscountRate1Str(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">%</div>
                </div>
              </div>

              <div>
                <label htmlFor="d2" className="block text-xs font-medium mb-1 text-foreground">
                  2. İskonto (%)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="d2"
                    placeholder="Örn: 10"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 pr-7 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
                    value={discountRate2Str}
                    onChange={(e) => setDiscountRate2Str(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">%</div>
                </div>
              </div>

              <div>
                <label htmlFor="d3" className="block text-xs font-medium mb-1 text-foreground">
                  3. İskonto (%)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="d3"
                    placeholder="Örn: 0"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 pr-7 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
                    value={discountRate3Str}
                    onChange={(e) => setDiscountRate3Str(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">%</div>
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
              İskontolu Fiyatı Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  İskonto Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Nihai İskontolu Fiyat</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.finalPrice)}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    Toplam -{formatCurrency(result.totalDiscountAmount)} İndirim (Efektif %{formatNumber(result.effectiveTotalRate, 2)})
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Orijinal Liste Fiyatı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.basePrice)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">1. İskonto Sonrası Fiyat:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.priceAfter1)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/indirim-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Tekli indirim hesaplama aracına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Fiyat ve zincirleme iskonto oranlarını girerek net tutarı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Kademeli (Zincirleme) İskonto Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          Toptan ve ticari satışlarda sıkça kullanılan zincirleme iskonto (örn: %20 + %10), oranların düz toplanması (%30) anlamına gelmez. İkinci indirim, ilk indirim düşüldükten sonra kalan ara fiyat üzerinden hesaplanır.
        </p>
      </div>
    </div>
  );
}
