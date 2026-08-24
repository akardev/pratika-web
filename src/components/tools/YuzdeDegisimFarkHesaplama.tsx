'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function YuzdeDegisimFarkHesaplama() {
  const [val1Str, setVal1Str] = useState<string>('80');
  const [val2Str, setVal2Str] = useState<string>('120');

  const [result, setResult] = useState<{
    val1: number;
    val2: number;
    absoluteDifference: number;
    percentageChange: number;
    isIncrease: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const v1 = parseTurkishNumber(val1Str);
    const v2 = parseTurkishNumber(val2Str);

    if (isNaN(v1) || isNaN(v2)) {
      setError('Lütfen her iki sayıyı da geçerli olarak giriniz.');
      return;
    }
    if (v1 === 0) {
      setError('İlk değer 0 olduğunda yüzde değişim hesaplanamaz (sıfıra bölme hatası).');
      return;
    }

    const absoluteDifference = Math.abs(v2 - v1);
    const percentageChange = ((v2 - v1) / Math.abs(v1)) * 100;
    const isIncrease = percentageChange >= 0;

    setResult({
      val1: v1,
      val2: v2,
      absoluteDifference,
      percentageChange,
      isIncrease,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="v1" className="block text-sm font-medium mb-1 text-foreground">
                Başlangıç / İlk Değer <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="v1"
                placeholder="Örn: 80"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                value={val1Str}
                onChange={(e) => setVal1Str(sanitizeNumericInput(e.target.value, { allowDecimal: true, allowNegative: true }))}
              />
            </div>

            <div>
              <label htmlFor="v2" className="block text-sm font-medium mb-1 text-foreground">
                Son / İkinci Değer <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="v2"
                placeholder="Örn: 120"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                value={val2Str}
                onChange={(e) => setVal2Str(sanitizeNumericInput(e.target.value, { allowDecimal: true, allowNegative: true }))}
              />
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
              Yüzde Değişimi Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Yüzdesel Değişim Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">{result.isIncrease ? 'Artış Oranı' : 'Azalış Oranı'}</span>
                  <span className={`font-extrabold text-4xl sm:text-5xl tracking-tight ${
                    result.isIncrease ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'
                  }`}>
                    {result.isIncrease ? `+%{formatNumber(result.percentageChange, 2)}` : `-%{formatNumber(Math.abs(result.percentageChange), 2)}`}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Mutlak Sayısal Fark: {formatNumber(result.absoluteDifference, 2)}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">İlk Değer:</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.val1, 2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">İkinci Değer:</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.val2, 2)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/yuzde-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Standart yüzde hesaplama araçlarına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">İki sayı girerek aralarındaki yüzdesel artış veya azalışı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Yüzde Değişim Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Yüzde değişim formülü: <strong>[(İkinci Değer - İlk Değer) / |İlk Değer|] × 100</strong>. Sonuç pozitifse artış, negatifse azalış gerçekleştiğini gösterir.
        </p>
      </div>
    </div>
  );
}
