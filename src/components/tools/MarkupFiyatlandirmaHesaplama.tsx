'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function MarkupFiyatlandirmaHesaplama() {
  const [costPriceStr, setCostPriceStr] = useState<string>('200'); // Maliyet TL
  const [markupRateStr, setMarkupRateStr] = useState<string>('50'); // Markup (Maliyet Üzerine Eklenen Kâr) %

  const [result, setResult] = useState<{
    costPrice: number;
    markupRate: number;
    profitAmount: number;
    sellingPrice: number;
    grossMarginRate: number; // Kâr Marjı % (Kâr / Satış Fiyatı)
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const cost = parseTurkishNumber(costPriceStr);
    const markup = parseTurkishNumber(markupRateStr);

    if (isNaN(cost) || cost <= 0) {
      setError('Lütfen geçerli bir maliyet tutarı giriniz.');
      return;
    }
    if (isNaN(markup) || markup < 0) {
      setError('Lütfen geçerli bir markup oranı giriniz.');
      return;
    }

    const profitAmount = (cost * markup) / 100;
    const sellingPrice = cost + profitAmount;
    const grossMarginRate = (profitAmount / sellingPrice) * 100;

    setResult({
      costPrice: cost,
      markupRate: markup,
      profitAmount,
      sellingPrice,
      grossMarginRate,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="costPrice" className="block text-sm font-medium mb-1 text-foreground">
                Ürün Maliyeti (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="costPrice"
                  placeholder="Örn: 200"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={costPriceStr}
                  onChange={(e) => setCostPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div>
              <label htmlFor="markupRate" className="block text-sm font-medium mb-1 text-foreground">
                Hedeflenen Markup Oranı (%) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="markupRate"
                  placeholder="Örn: 50"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={markupRateStr}
                  onChange={(e) => setMarkupRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">%</div>
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
              Satış Fiyatını ve Marjı Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Fiyatlandırma Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Tavsiye Edilen Satış Fiyatı</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.sellingPrice)}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    Birim Kâr: +{formatCurrency(result.profitAmount)}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Maliyet:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.costPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Markup Oranı (Maliyet Üzerine Ek):</span>
                    <span className="font-semibold text-foreground">%{formatNumber(result.markupRate, 1)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Eşdeğer Brüt Kâr Marjı:</span>
                    <span className="font-semibold text-primary">%{formatNumber(result.grossMarginRate, 1)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kar-marji-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Kâr marjı hesaplama aracına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Maliyet ve markup oranını girerek hedef satış fiyatını hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Markup ile Kâr Marjı Arasındaki Fark Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          <strong>Markup</strong>, maliyetin üzerine eklenen kâr yüzdesidir: <code>(Kâr / Maliyet) × 100</code>. 
          <strong>Kâr Marjı</strong> ise elde edilen kârın toplam satış fiyatına oranıdır: <code>(Kâr / Satış Fiyatı) × 100</code>. Örneğin 100 TL&apos;lik bir ürüne %50 markup eklendiğinde satış fiyatı 150 TL olur, ancak kâr marjı %33.3&apos;tür.
        </p>
      </div>
    </div>
  );
}
