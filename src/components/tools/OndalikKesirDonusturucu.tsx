'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, sanitizeNumericInput } from '@/lib/utils';

export default function OndalikKesirDonusturucu() {
  const [decimalInput, setDecimalInput] = useState<string>('0.75');

  const [result, setResult] = useState<{
    originalDecimal: number;
    numerator: number;
    denominator: number;
    mixedFraction?: string;
    percentage: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const gcd = (a: number, b: number): number => {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x || 1;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const cleanInput = decimalInput.replace(',', '.').trim();
    const val = parseFloat(cleanInput);

    if (isNaN(val)) {
      setError('Lütfen geçerli bir ondalık sayı giriniz (Örn: 0.75 veya 2.4).');
      return;
    }

    const decimalPlaces = (cleanInput.split('.')[1] || '').length;
    const denominatorRaw = Math.pow(10, Math.min(6, decimalPlaces));
    const numeratorRaw = Math.round(val * denominatorRaw);

    const commonDivisor = gcd(numeratorRaw, denominatorRaw);
    const numerator = numeratorRaw / commonDivisor;
    const denominator = denominatorRaw / commonDivisor;

    let mixedFraction: string | undefined = undefined;
    if (Math.abs(numerator) >= denominator && denominator !== 1) {
      const whole = Math.trunc(numerator / denominator);
      const rem = Math.abs(numerator % denominator);
      if (rem > 0) {
        mixedFraction = `${whole} tam ${rem}/${denominator}`;
      }
    }

    setResult({
      originalDecimal: val,
      numerator,
      denominator,
      mixedFraction,
      percentage: val * 100,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="decInput" className="block text-sm font-medium mb-1 text-foreground">
                Ondalık Sayı <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="decInput"
                placeholder="Örn: 0.75"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                value={decimalInput}
                onChange={(e) => setDecimalInput(sanitizeNumericInput(e.target.value, { allowDecimal: true, allowNegative: true }))}
              />
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {['0.125', '0.25', '0.5', '0.75', '1.2', '2.5'].map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => setDecimalInput(example)}
                    className="px-2 py-1 text-xs font-medium rounded bg-muted hover:bg-muted/80 text-foreground border border-border/50"
                  >
                    {example}
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
              Kesre Dönüştür
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Kesir Karşılığı (En Sade Hali)
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="font-extrabold text-4xl text-primary font-mono">
                    {result.denominator === 1 ? (
                      result.numerator
                    ) : (
                      <span className="inline-flex flex-col items-center">
                        <span>{result.numerator}</span>
                        <span className="w-full h-0.5 bg-primary rounded my-0.5"></span>
                        <span>{result.denominator}</span>
                      </span>
                    )}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-3 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Yüzde Karşılığı: %{formatNumber(result.percentage, 2)} {result.mixedFraction && `· (${result.mixedFraction})`}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kesir-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Kesir 4 işlem hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Ondalık sayıyı girerek en sade rasyonel kesir halini bulun.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Ondalık Sayı Kesre Nasıl Çevrilir?</h2>
        <p className="mb-4 text-muted-foreground">
          Virgülden sonraki basamak sayısı kadar payda 10, 100, 1000 gibi onun kuvvetleriyle genişletilir. Ardından pay ve payda en büyük ortak bölenine (EBOB) bölünerek en sade kesir elde edilir.
        </p>
      </div>
    </div>
  );
}
