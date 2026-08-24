'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function OtvHesaplama() {
  const [basePriceStr, setBasePriceStr] = useState<string>('500.000'); // Vergisiz Ham Fiyat (Matrah)
  const [otvRateStr, setOtvRateStr] = useState<string>('80'); // ÖTV Oranı %
  const [vatRate] = useState<number>(20); // KDV %20

  const [result, setResult] = useState<{
    basePrice: number;
    otvRate: number;
    otvAmount: number;
    priceWithOtv: number;
    vatAmount: number;
    totalFinalPrice: number;
    totalTaxAmount: number;
    effectiveTaxRate: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const basePrice = parseTurkishNumber(basePriceStr);
    const otvRate = parseTurkishNumber(otvRateStr);

    if (isNaN(basePrice) || basePrice <= 0) {
      setError('Lütfen geçerli bir vergisiz matrah tutarı giriniz.');
      return;
    }
    if (isNaN(otvRate) || otvRate < 0) {
      setError('Lütfen geçerli bir ÖTV oranı giriniz.');
      return;
    }

    const otvAmount = (basePrice * otvRate) / 100;
    const priceWithOtv = basePrice + otvAmount;
    
    // Türkiye'de KDV, ÖTV'li tutar üzerinden (%20) hesaplanır (Verginin vergisi)
    const vatAmount = (priceWithOtv * vatRate) / 100;
    const totalFinalPrice = priceWithOtv + vatAmount;
    const totalTaxAmount = otvAmount + vatAmount;
    const effectiveTaxRate = (totalTaxAmount / basePrice) * 100;

    setResult({
      basePrice,
      otvRate,
      otvAmount,
      priceWithOtv,
      vatAmount,
      totalFinalPrice,
      totalTaxAmount,
      effectiveTaxRate,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="basePrice" className="block text-sm font-medium mb-1 text-foreground">
                Vergisiz Ham Fiyat / Matrah (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="basePrice"
                  placeholder="Örn: 500.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={basePriceStr}
                  onChange={(e) => setBasePriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div>
              <label htmlFor="otvRate" className="block text-sm font-medium mb-1 text-foreground">
                ÖTV Oranı (%) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="otvRate"
                  placeholder="Örn: 80"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={otvRateStr}
                  onChange={(e) => setOtvRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">%</div>
              </div>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {[45, 50, 60, 70, 80, 150, 220].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setOtvRateStr(rate.toString())}
                    className="px-2 py-1 text-xs font-medium rounded bg-muted hover:bg-muted/80 text-foreground border border-border/50"
                  >
                    %{rate}
                  </button>
                ))}
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
              ÖTV ve KDV Dahil Fiyatı Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Toplam Satış Fiyatı ve Vergiler
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Nihai Tüketici Fiyatı</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.totalFinalPrice)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Toplam Vergi Yükü: {formatCurrency(result.totalTaxAmount)} (%{formatNumber(result.effectiveTaxRate, 1)})
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Vergisiz Matrah:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.basePrice)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Hesaplanan ÖTV (%{result.otvRate}):</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.otvAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Hesaplanan KDV (%20):</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.vatAmount)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kdv-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    KDV dahil/hariç hesaplama aracına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Vergisiz fiyat ve ÖTV oranını girerek KDV dahil toplam tutarı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">ÖTV ve KDV Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Özel Tüketim Vergisi (ÖTV), vergisiz çıplak fiyat üzerinden hesaplanır. Katma Değer Vergisi (KDV) ise, <strong>(Vergisiz Fiyat + ÖTV Tutarı)</strong> toplam matrahı üzerinden %20 olarak hesaplanır.
        </p>
      </div>
    </div>
  );
}
