'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber } from '@/lib/utils';

export default function StandartSapmaHesaplama() {
  const [numbersStr, setNumbersStr] = useState<string>('10, 12, 23, 23, 16, 23, 21, 16');

  const [result, setResult] = useState<{
    count: number;
    mean: number;
    sampleStdDev: number; // s (n - 1)
    popStdDev: number; // σ (n)
    sampleVariance: number;
    popVariance: number;
    sumOfSquares: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const parts = numbersStr
      .split(/[\s,;]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const nums: number[] = [];
    for (const p of parts) {
      const parsed = parseFloat(p.replace(',', '.'));
      if (isNaN(parsed)) {
        setError(`Geçersiz sayı: "${p}"`);
        return;
      }
      nums.push(parsed);
    }

    if (nums.length < 2) {
      setError('Standart sapma hesaplamak için en az 2 sayı girmelisiniz.');
      return;
    }

    const count = nums.length;
    const mean = nums.reduce((acc, curr) => acc + curr, 0) / count;

    let sumOfSquares = 0;
    nums.forEach((n) => {
      sumOfSquares += Math.pow(n - mean, 2);
    });

    const sampleVariance = sumOfSquares / (count - 1);
    const popVariance = sumOfSquares / count;
    const sampleStdDev = Math.sqrt(sampleVariance);
    const popStdDev = Math.sqrt(popVariance);

    setResult({
      count,
      mean,
      sampleStdDev,
      popStdDev,
      sampleVariance,
      popVariance,
      sumOfSquares,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="numbers" className="block text-sm font-medium mb-1 text-foreground">
                Sayı Dizisi (Virgül veya Boşlukla Ayrılmış) <span className="text-destructive">*</span>
              </label>
              <textarea
                id="numbers"
                rows={4}
                placeholder="Örn: 10, 12, 23, 23, 16, 23, 21, 16"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono leading-relaxed"
                value={numbersStr}
                onChange={(e) => setNumbersStr(e.target.value)}
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Standart Sapmayı Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Standart Sapma Sonuçları
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Örneklem Standart Sapması (s)</span>
                  <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight font-mono">
                    {formatNumber(result.sampleStdDev, 4)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Popülasyon Sapması (σ): {formatNumber(result.popStdDev, 4)}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Aritmetik Ortalama (x̄):</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.mean, 4)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Örneklem Varyansı (s²):</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.sampleVariance, 4)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Veri Sayısı (n):</span>
                    <span className="font-semibold text-foreground">{result.count}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/medyan-mod-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Medyan ve mod hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Sayı dizisini girerek örneklem ve popülasyon standart sapmasını hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Standart Sapma ve Varyans Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          Standart sapma, verilerin aritmetik ortalamadan ne kadar uzaklaştığını (dağılım genişliğini) ölçen temel istatistiksel parametredir. Düşük standart sapma verilerin ortalamaya yakın kümelendiğini gösterir.
        </p>
      </div>
    </div>
  );
}
