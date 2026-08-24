'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sanitizeNumericInput } from '@/lib/utils';

export default function FaktoriyelHesaplama() {
  const [nStr, setNStr] = useState<string>('6');

  const [result, setResult] = useState<{
    n: number;
    factorialExact: string;
    stepFormula: string;
    digitCount: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const n = parseInt(nStr, 10);
    if (isNaN(n) || n < 0 || n > 200) {
      setError('Lütfen 0 ile 200 arasında bir tam sayı giriniz.');
      return;
    }

    let factorial = BigInt(1);
    for (let i = 2; i <= n; i++) {
      factorial *= BigInt(i);
    }

    const factorialExact = factorial.toString();
    const digitCount = factorialExact.length;

    let stepFormula = `${n}! = `;
    if (n === 0 || n === 1) {
      stepFormula += '1';
    } else if (n <= 8) {
      const steps = [];
      for (let i = n; i >= 1; i--) steps.push(i);
      stepFormula += steps.join(' × ');
    } else {
      stepFormula += `${n} × ${n - 1} × ${n - 2} × ... × 1`;
    }

    setResult({
      n,
      factorialExact,
      stepFormula,
      digitCount,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="nInput" className="block text-sm font-medium mb-1 text-foreground">
                Sayı (n) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  id="nInput"
                  placeholder="Örn: 6"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={nStr}
                  onChange={(e) => setNStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold font-mono">!</div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">0 ile 200 arasında tam sayı giriniz.</p>
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
              Faktöriyeli Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Faktöriyel Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">{result.n}! Değeri</span>
                  <span className="font-extrabold text-2xl sm:text-3xl text-primary tracking-tight font-mono break-all max-h-36 overflow-y-auto px-2">
                    {result.factorialExact}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-2 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Basamak Sayısı: {result.digitCount}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1 text-xs text-center text-muted-foreground">
                  <p className="font-mono">{result.stepFormula}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kombinasyon-permutasyon-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Kombinasyon ve permütasyon hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Sayıyı girerek n! faktöriyel sonucunu tam basamaklarıyla hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Faktöriyel (n!) Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          Faktöriyel, 1&apos;den n&apos;ye kadar olan tüm pozitif tam sayıların ardışık çarpımıdır. Matematiksel kabul gereği <strong>0! = 1</strong> olarak tanımlanmıştır.
        </p>
      </div>
    </div>
  );
}
