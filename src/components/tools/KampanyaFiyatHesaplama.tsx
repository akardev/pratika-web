'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KampanyaFiyatHesaplama() {
  const [campaignType, setCampaignType] = useState<'3al2ode' | 'ikinciyeYuzde' | 'sepetIndirimi'>('3al2ode');
  const [unitPriceStr, setUnitPriceStr] = useState<string>('300'); // Birim Liste Fiyatı TL
  const [itemCountStr, setItemCountStr] = useState<string>('3'); // Adet
  const [secondDiscountPercentStr, setSecondDiscountPercentStr] = useState<string>('50'); // 2. ürüne indirim %
  const [cartThresholdStr, setCartThresholdStr] = useState<string>('1000'); // Sepet alt limiti TL
  const [cartDiscountAmountStr, setCartDiscountAmountStr] = useState<string>('200'); // Sepet indirim tutarı TL

  const [result, setResult] = useState<{
    originalTotal: number;
    finalTotal: number;
    effectiveUnitPrice: number;
    totalSavings: number;
    effectiveDiscountRate: number;
    itemCount: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const unitPrice = parseTurkishNumber(unitPriceStr);
    let count = parseTurkishNumber(itemCountStr);

    if (isNaN(unitPrice) || unitPrice <= 0) {
      setError('Lütfen geçerli bir ürün birim fiyatı giriniz.');
      return;
    }

    let originalTotal = 0;
    let finalTotal = 0;

    if (campaignType === '3al2ode') {
      count = Math.max(3, Math.floor(count) || 3);
      originalTotal = count * unitPrice;
      const freeItems = Math.floor(count / 3);
      finalTotal = (count - freeItems) * unitPrice;
    } else if (campaignType === 'ikinciyeYuzde') {
      count = Math.max(2, Math.floor(count) || 2);
      const discountRate = parseTurkishNumber(secondDiscountPercentStr) || 50;
      originalTotal = count * unitPrice;
      const pairs = Math.floor(count / 2);
      const singleRemaining = count % 2;
      const pairCost = unitPrice + (unitPrice * (1 - discountRate / 100));
      finalTotal = (pairs * pairCost) + (singleRemaining * unitPrice);
    } else {
      // Sepet İndirimi
      count = Math.max(1, Math.floor(count) || 1);
      const threshold = parseTurkishNumber(cartThresholdStr) || 0;
      const discount = parseTurkishNumber(cartDiscountAmountStr) || 0;
      originalTotal = count * unitPrice;
      if (originalTotal >= threshold) {
        finalTotal = Math.max(0, originalTotal - discount);
      } else {
        finalTotal = originalTotal;
      }
    }

    const totalSavings = originalTotal - finalTotal;
    const effectiveDiscountRate = ((originalTotal - finalTotal) / originalTotal) * 100;
    const effectiveUnitPrice = finalTotal / count;

    setResult({
      originalTotal,
      finalTotal,
      effectiveUnitPrice,
      totalSavings,
      effectiveDiscountRate,
      itemCount: count,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Kampanya Türü
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCampaignType('3al2ode')}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                    campaignType === '3al2ode'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  3 Al 2 Öde (1 Bedava)
                </button>
                <button
                  type="button"
                  onClick={() => setCampaignType('ikinciyeYuzde')}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                    campaignType === 'ikinciyeYuzde'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  2. Ürüne % İndirim
                </button>
                <button
                  type="button"
                  onClick={() => setCampaignType('sepetIndirimi')}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                    campaignType === 'sepetIndirimi'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Sepette TL İndirimi
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="unitPrice" className="block text-sm font-medium mb-1 text-foreground">
                  Ürün Birim Fiyatı (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="unitPrice"
                    placeholder="Örn: 300"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={unitPriceStr}
                    onChange={(e) => setUnitPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL</div>
                </div>
              </div>

              <div>
                <label htmlFor="itemCount" className="block text-sm font-medium mb-1 text-foreground">
                  Alınacak Adet <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="itemCount"
                    placeholder="Örn: 3"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={itemCountStr}
                    onChange={(e) => setItemCountStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">Adet</div>
                </div>
              </div>
            </div>

            {campaignType === 'ikinciyeYuzde' && (
              <div>
                <label htmlFor="secondDiscount" className="block text-sm font-medium mb-1 text-foreground">
                  2. Ürüne Uygulanan İndirim Oranı (%)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="secondDiscount"
                  placeholder="Örn: 50"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={secondDiscountPercentStr}
                  onChange={(e) => setSecondDiscountPercentStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
            )}

            {campaignType === 'sepetIndirimi' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="threshold" className="block text-sm font-medium mb-1 text-foreground">
                    Sepet Alt Limiti (TL)
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    id="threshold"
                    placeholder="Örn: 1000"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={cartThresholdStr}
                    onChange={(e) => setCartThresholdStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                </div>
                <div>
                  <label htmlFor="discountAmount" className="block text-sm font-medium mb-1 text-foreground">
                    İndirim Tutarı (TL)
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    id="discountAmount"
                    placeholder="Örn: 200"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={cartDiscountAmountStr}
                    onChange={(e) => setCartDiscountAmountStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Kampanya Fiyatını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Kampanya Net Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Toplam Ödenecek Tutar</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.finalTotal)}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    Birim Başına: {formatCurrency(result.effectiveUnitPrice)} (Efektif %{formatNumber(result.effectiveDiscountRate, 1)} İndirim)
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Normal Toplam Fiyat ({result.itemCount} Adet):</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.originalTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Toplam Tasarrufunuz:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(result.totalSavings)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/indirim-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Standart indirim hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Kampanya türü ve ürün fiyatını girerek birim başına net indirim oranını hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Kampanyaların Gerçek İndirim Oranı Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          Örneğin <strong>3 Al 2 Öde</strong> kampanyasında 3 ürün için 2 ürün parası ödersiniz. Bu durum sepet genelinde net <strong>%33.3 indirim</strong> anlamına gelir. <strong>2. Ürüne %50 İndirim</strong> ise sepet geneline <strong>%25 indirim</strong> olarak yansır.
        </p>
      </div>
    </div>
  );
}
