'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber } from '@/lib/utils';

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

export default function EbobEkokHesaplama() {
  const [inputStr, setInputStr] = useState<string>('24, 36');
  const [result, setResult] = useState<{ ebob: number; ekok: number; numbers: number[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const tokens = inputStr.split(/[\s,;]+/).filter((t) => t.trim() !== '');
    const numbers: number[] = [];

    for (const t of tokens) {
      const num = parseTurkishNumber(t);
      if (isNaN(num) || !Number.isInteger(num) || num <= 0) {
        setError(`"${t}" pozitif bir tam sayı olmalıdır.`);
        return;
      }
      numbers.push(num);
    }

    if (numbers.length < 2) {
      setError('Lütfen en az 2 pozitif tam sayı girin.');
      return;
    }

    let curEbob = numbers[0];
    let curEkok = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
      curEbob = gcd(curEbob, numbers[i]);
      curEkok = lcm(curEkok, numbers[i]);
    }

    setResult({
      ebob: curEbob,
      ekok: curEkok,
      numbers,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="ebobInput" className="block text-sm font-medium mb-2 text-foreground">
                Sayılar (Virgül veya boşlukla ayırın) <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="ebobInput"
                placeholder="Örn: 24, 36"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                value={inputStr}
                onChange={(e) => setInputStr(e.target.value.replace(/[^0-9, .\t]/g, ''))}
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
              EBOB ve EKOK Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="grid grid-cols-2 gap-4 text-center mb-4">
                  <div className="p-3 bg-background rounded-lg border border-border">
                    <span className="text-xs text-muted-foreground block mb-1">EBOB (En Büyük Ortak Bölen)</span>
                    <span className="font-extrabold text-2xl text-primary">{formatNumber(result.ebob)}</span>
                  </div>
                  <div className="p-3 bg-background rounded-lg border border-border">
                    <span className="text-xs text-muted-foreground block mb-1">EKOK (En Küçük Ortak Kat)</span>
                    <span className="font-extrabold text-2xl text-primary">{formatNumber(result.ekok)}</span>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-3 text-center text-xs text-muted-foreground">
                  Girilen Sayılar: {result.numbers.join(', ')}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Sayıları girip EBOB ve EKOK değerlerini bulun.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
