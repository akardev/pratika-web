'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sanitizeNumericInput } from '@/lib/utils';

export default function KombinasyonPermutasyonHesaplama() {
  const [calcType, setCalcType] = useState<'kombinasyon' | 'permutasyon'>('kombinasyon');
  const [nStr, setNStr] = useState<string>('8');
  const [rStr, setRStr] = useState<string>('3');

  const [result, setResult] = useState<{
    n: number;
    r: number;
    calcType: 'kombinasyon' | 'permutasyon';
    value: string;
    formula: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const bigFactorial = (num: number): bigint => {
    let res = BigInt(1);
    for (let i = 2; i <= num; i++) {
      res *= BigInt(i);
    }
    return res;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const n = parseInt(nStr, 10);
    const r = parseInt(rStr, 10);

    if (isNaN(n) || isNaN(r) || n < 0 || r < 0) {
      setError('Lütfen pozitif tam sayılar giriniz.');
      return;
    }
    if (r > n) {
      setError('r değeri n değerinden büyük olamaz (r ≤ n olmalıdır).');
      return;
    }
    if (n > 100) {
      setError('n değeri en fazla 100 olabilir.');
      return;
    }

    let calculatedValue = BigInt(0);
    let formula = '';

    if (calcType === 'kombinasyon') {
      // C(n, r) = n! / (r! * (n - r)!)
      const nFact = bigFactorial(n);
      const rFact = bigFactorial(r);
      const nMinusRFact = bigFactorial(n - r);
      calculatedValue = nFact / (rFact * nMinusRFact);
      formula = `C(${n}, ${r}) = ${n}! / (${r}! × (${n} - ${r})!)`;
    } else {
      // P(n, r) = n! / (n - r)!
      const nFact = bigFactorial(n);
      const nMinusRFact = bigFactorial(n - r);
      calculatedValue = nFact / nMinusRFact;
      formula = `P(${n}, ${r}) = ${n}! / (${n} - ${r})!`;
    }

    setResult({
      n,
      r,
      calcType,
      value: calculatedValue.toString(),
      formula,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Hesaplama Türü
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCalcType('kombinasyon')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    calcType === 'kombinasyon'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Kombinasyon C(n, r)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcType('permutasyon')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    calcType === 'permutasyon'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Permütasyon P(n, r)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="nInput" className="block text-sm font-medium mb-1 text-foreground">
                  Eleman Sayısı (n) <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  id="nInput"
                  placeholder="Örn: 8"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={nStr}
                  onChange={(e) => setNStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
              </div>

              <div>
                <label htmlFor="rInput" className="block text-sm font-medium mb-1 text-foreground">
                  Seçim Sayısı (r) <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  id="rInput"
                  placeholder="Örn: 3"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={rStr}
                  onChange={(e) => setRStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
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
              {calcType === 'kombinasyon' ? 'Kombinasyonu Hesapla' : 'Permütasyonu Hesapla'}
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  {result.calcType === 'kombinasyon' ? 'Kombinasyon Değeri' : 'Permütasyon Değeri'}
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">
                    {result.calcType === 'kombinasyon' ? `C(${result.n}, ${result.r})` : `P(${result.n}, ${result.r})`}
                  </span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight font-mono">
                    {result.value}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 text-center text-xs text-muted-foreground font-mono">
                  <p>{result.formula}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/faktoriyel-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Faktöriyel hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">n ve r değerlerini girerek kombinasyon veya permütasyon sonucunu hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Kombinasyon ile Permütasyon Arasındaki Fark</h2>
        <p className="mb-4 text-muted-foreground">
          <strong>Kombinasyon (Seçim):</strong> Sıralamanın önemli olmadığı grup seçimleridir. Örn: Bir takımdan 3 oyuncu seçmek.<br />
          <strong>Permütasyon (Sıralama):</strong> Sıralamanın ve dizilişin önemli olduğu durumdur. Örn: 3 kişinin yan yana dizilmesi veya şifre kombinasyonları.
        </p>
      </div>
    </div>
  );
}
