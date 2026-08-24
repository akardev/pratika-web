'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber } from '@/lib/utils';

export default function MedyanModHesaplama() {
  const [numbersStr, setNumbersStr] = useState<string>('12, 15, 12, 19, 24, 18, 12, 30, 24');

  const [result, setResult] = useState<{
    count: number;
    sortedList: number[];
    mean: number;
    median: number;
    mode: number[];
    range: number;
    min: number;
    max: number;
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
        setError(`Geçersiz sayı girdisi tespit edildi: "${p}"`);
        return;
      }
      nums.push(parsed);
    }

    if (nums.length === 0) {
      setError('Lütfen en az bir sayı giriniz.');
      return;
    }

    const sortedList = [...nums].sort((a, b) => a - b);
    const count = sortedList.length;
    const sum = sortedList.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / count;

    // Medyan
    let median = 0;
    const mid = Math.floor(count / 2);
    if (count % 2 === 0) {
      median = (sortedList[mid - 1] + sortedList[mid]) / 2;
    } else {
      median = sortedList[mid];
    }

    // Mod (En sık tekrarlanan)
    const frequencyMap: Record<number, number> = {};
    let maxFreq = 0;
    sortedList.forEach((n) => {
      frequencyMap[n] = (frequencyMap[n] || 0) + 1;
      if (frequencyMap[n] > maxFreq) {
        maxFreq = frequencyMap[n];
      }
    });

    const mode: number[] = [];
    if (maxFreq > 1) {
      Object.keys(frequencyMap).forEach((k) => {
        const numKey = parseFloat(k);
        if (frequencyMap[numKey] === maxFreq) {
          mode.push(numKey);
        }
      });
    }

    const min = sortedList[0];
    const max = sortedList[count - 1];
    const range = max - min;

    setResult({
      count,
      sortedList,
      mean,
      median,
      mode,
      range,
      min,
      max,
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
                placeholder="Örn: 12, 15, 12, 19, 24, 18, 12, 30"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono leading-relaxed"
                value={numbersStr}
                onChange={(e) => setNumbersStr(e.target.value)}
              />
              <p className="text-[11px] text-muted-foreground mt-1">Sayıları virgül, noktalı virgül veya boşluk ile ayırabilirsiniz.</p>
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
              Medyan ve Modu Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  İstatistiksel Analiz Sonucu
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-4 text-center">
                  <div className="p-3 bg-background rounded-lg border border-border/60">
                    <span className="text-xs text-muted-foreground block mb-0.5">Medyan (Ortanca)</span>
                    <span className="font-extrabold text-2xl text-primary">{formatNumber(result.median, 2)}</span>
                  </div>
                  <div className="p-3 bg-background rounded-lg border border-border/60">
                    <span className="text-xs text-muted-foreground block mb-0.5">Mod (Tepe Değer)</span>
                    <span className="font-extrabold text-2xl text-foreground">
                      {result.mode.length > 0 ? result.mode.join(', ') : 'Yok'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Aritmetik Ortalama:</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.mean, 2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Açıklık (Range):</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.range, 2)} ({result.min} - {result.max})</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Eleman Sayısı (n):</span>
                    <span className="font-semibold text-foreground">{result.count} Adet</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/ortalama-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Aritmetik ve ağırlıklı ortalama aracına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Sayı dizisini girerek medyan, mod, ortalama ve açıklık değerlerini hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Medyan ve Mod Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          <strong>Medyan (Ortanca):</strong> Sayılar küçükten büyüğe sıralandığında tam ortada yer alan değerdir. 
          <strong>Mod (Tepe Değer):</strong> Bir veri grubunda en çok tekrar eden sayıdır.
        </p>
      </div>
    </div>
  );
}
