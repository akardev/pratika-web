'use client';

import { useState } from 'react';
import { parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function ModuloKalanBulmaHesaplayici() {
  const [dividendStr, setDividendStr] = useState<string>('125');
  const [divisorStr, setDivisorStr] = useState<string>('7');
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    remainder: number; // kalan
    quotient: number;  // bölüm
    isDivisible: boolean;
    formulaExplanation: string;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const a = parseTurkishNumber(dividendStr);
    const b = parseTurkishNumber(divisorStr);

    if (isNaN(a) || isNaN(b)) {
      setError('Lütfen geçerli tam sayılar girin.');
      return;
    }

    if (b === 0) {
      setError('Sıfıra bölme yapılamaz (Bölen 0 olamaz).');
      return;
    }

    // A mod B
    const rem = ((a % b) + b) % b; // negatif sayılarda pozitif mod
    const quotient = Math.floor((a - rem) / b);
    const isDivisible = rem === 0;

    setResult({
      remainder: rem,
      quotient,
      isDivisible,
      formulaExplanation: `${a} = (${b} × ${quotient}) + ${rem}`,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="div" className="block text-sm font-medium text-foreground mb-1">Bölünen Sayı (A)</label>
              <input
                id="div"
                type="text"
                value={dividendStr}
                onChange={(e) => setDividendStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="dvs" className="block text-sm font-medium text-foreground mb-1">Bölen Sayı (B)</label>
              <input
                id="dvs"
                type="text"
                value={divisorStr}
                onChange={(e) => setDivisorStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Mod (Kalan) Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Bölme & Kalan Sonucu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Kalan (A mod B)</span>
                <span className="text-3xl font-bold text-primary">{result.remainder}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Tam Bölüm</span>
                <span className="text-2xl font-bold text-foreground">{result.quotient}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Bölünebilirlik</span>
                <span className="text-base font-bold text-foreground">
                  {result.isDivisible ? '✓ Tam Bölünür (Kalan 0)' : '✕ Kalanlı Bölme'}
                </span>
                <span className="text-xs text-muted-foreground block mt-1">{result.formulaExplanation}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
