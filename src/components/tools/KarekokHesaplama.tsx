'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KarekokHesaplama() {
  const [numberStr, setNumberStr] = useState<string>('144');
  const [degreeStr, setDegreeStr] = useState<string>('2');
  const [result, setResult] = useState<{ root: number; square: number; cube: number; isPerfect: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!numberStr.trim()) {
      setError('Lütfen bir sayı girin.');
      return;
    }

    const n = parseTurkishNumber(numberStr);
    if (isNaN(n)) {
      setError('Lütfen geçerli bir sayı girin.');
      return;
    }

    const degree = parseTurkishNumber(degreeStr);
    if (isNaN(degree) || degree <= 0) {
      setError('Kök derecesi 0\'dan büyük olmalıdır.');
      return;
    }

    if (n < 0 && degree % 2 === 0) {
      setError('Çift dereceli köklerde negatif sayıların reel kökü yoktur.');
      return;
    }

    let root: number;
    if (n < 0) {
      root = -Math.pow(-n, 1 / degree);
    } else {
      root = Math.pow(n, 1 / degree);
    }

    const isPerfect = Number.isInteger(parseFloat(root.toFixed(6)));

    setResult({
      root,
      square: Math.pow(n, 2),
      cube: Math.pow(n, 3),
      isPerfect,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="num" className="block text-sm font-medium mb-2 text-foreground">
                Sayı <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="num"
                placeholder="Örn: 144"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                value={numberStr}
                onChange={(e) => setNumberStr(sanitizeNumericInput(e.target.value, { allowDecimal: true, allowNegative: true }))}
              />
            </div>

            <div>
              <label htmlFor="degree" className="block text-sm font-medium mb-2 text-foreground">
                Kök Derecesi (2 = Karekök, 3 = Küpkök)
              </label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setDegreeStr('2')}
                  className={`py-2 text-xs font-semibold rounded-lg border ${degreeStr === '2' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground'}`}
                >
                  Karekök (&radic;)
                </button>
                <button
                  type="button"
                  onClick={() => setDegreeStr('3')}
                  className={`py-2 text-xs font-semibold rounded-lg border ${degreeStr === '3' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground'}`}
                >
                  Küpkök (&sup3;&radic;)
                </button>
                <button
                  type="button"
                  onClick={() => setDegreeStr('4')}
                  className={`py-2 text-xs font-semibold rounded-lg border ${degreeStr === '4' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground'}`}
                >
                  4. Derece
                </button>
              </div>
              <input
                type="text"
                inputMode="numeric"
                id="degree"
                placeholder="2"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
                value={degreeStr}
                onChange={(e) => setDegreeStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
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
              Kök Değerini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">{degreeStr}. Dereceden Kök Sonucu</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatNumber(result.root)}
                  </span>
                  {result.isPerfect && (
                    <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                      Tam Kare / Tam Kök Değeri
                    </span>
                  )}
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Sayının Karesi (N&sup2;):</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.square)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Sayının Küpü (N&sup3;):</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.cube)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Sayıyı girip kök değerini hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
