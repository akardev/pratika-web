'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sanitizeNumericInput } from '@/lib/utils';

export default function AsalSayiKontrolu() {
  const [numStr, setNumStr] = useState<string>('97');

  const [result, setResult] = useState<{
    num: number;
    isPrime: boolean;
    divisors: number[];
    nextPrime: number;
    prevPrime: number | null;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkIsPrime = (n: number) => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const n = parseInt(numStr, 10);
    if (isNaN(n) || n < 1) {
      setError('Lütfen 1 veya daha büyük bir pozitif tam sayı giriniz.');
      return;
    }
    if (n > 10000000) {
      setError('Performans açısından en fazla 10.000.000 değeri girilebilir.');
      return;
    }

    const isPrime = checkIsPrime(n);
    const divisors: number[] = [];

    // Bölenleri bul
    for (let i = 1; i <= Math.min(n, 10000); i++) {
      if (n % i === 0) {
        divisors.push(i);
      }
    }

    // Sonraki asal
    let nextPrime = n + 1;
    while (!checkIsPrime(nextPrime)) {
      nextPrime++;
    }

    // Önceki asal
    let prevPrime: number | null = null;
    if (n > 2) {
      let candidate = n - 1;
      while (candidate >= 2) {
        if (checkIsPrime(candidate)) {
          prevPrime = candidate;
          break;
        }
        candidate--;
      }
    }

    setResult({
      num: n,
      isPrime,
      divisors,
      nextPrime,
      prevPrime,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="numInput" className="block text-sm font-medium mb-1 text-foreground">
                Kontrol Edilecek Sayı <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                id="numInput"
                placeholder="Örn: 97"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                value={numStr}
                onChange={(e) => setNumStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
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
              Asallığı Kontrol Et
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Sonuç
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">{result.num} Sayısı</span>
                  <span className={`font-extrabold text-3xl sm:text-4xl tracking-tight ${
                    result.isPrime ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {result.isPrime ? 'ASAL SAYIDIR' : 'ASAL DEĞİLDİR'}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    {result.isPrime ? 'Sadece 1 ve kendisine bölünür' : `${result.divisors.length} adet pozitif böleni var`}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  {!result.isPrime && result.divisors.length > 0 && (
                    <div className="py-0.5">
                      <span className="text-muted-foreground">Bölenleri (Çarpanları): </span>
                      <span className="font-semibold text-foreground font-mono">{result.divisors.join(', ')}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Bir Sonraki Asal:</span>
                    <span className="font-semibold text-primary font-mono">{result.nextPrime}</span>
                  </div>
                  {result.prevPrime && (
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-muted-foreground">Bir Önceki Asal:</span>
                      <span className="font-semibold text-foreground font-mono">{result.prevPrime}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/ebob-ekok-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    EBOB ve EKOK hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Bir sayı girerek asal olup olmadığını ve bölenlerini kontrol edin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Asal Sayı Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          Asal sayılar, 1&apos;den büyük olan ve yalnızca 1&apos;e ve kendisine kalansız bölünebilen pozitif tam sayılardır. En küçük asal sayı ve tek çift asal sayı <strong>2</strong>&apos;dir.
        </p>
      </div>
    </div>
  );
}
