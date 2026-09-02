'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function HipotenusDikUcgenHesaplama() {
  const [sideAStr, setSideAStr] = useState<string>('3');
  const [sideBStr, setSideBStr] = useState<string>('4');
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    hypotenuse: number;
    area: number;
    perimeter: number;
    angleA: number; // derece
    angleB: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const a = parseTurkishNumber(sideAStr);
    const b = parseTurkishNumber(sideBStr);

    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      setError('Lütfen dik kenar uzunluklarını pozitif sayılar olarak girin.');
      return;
    }

    // Pisagor: c = sqrt(a² + b²)
    const c = Math.sqrt(a * a + b * b);
    const area = (a * b) / 2;
    const perimeter = a + b + c;

    // Açı: tan(A) = a / b => A = atan(a/b) * 180 / PI
    const angleA = Math.atan(a / b) * (180 / Math.PI);
    const angleB = 90 - angleA;

    setResult({
      hypotenuse: Math.round(c * 1000) / 1000,
      area: Math.round(area * 100) / 100,
      perimeter: Math.round(perimeter * 100) / 100,
      angleA: Math.round(angleA * 10) / 10,
      angleB: Math.round(angleB * 10) / 10,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sa" className="block text-sm font-medium text-foreground mb-1">1. Dik Kenar (a)</label>
              <input
                id="sa"
                type="text"
                value={sideAStr}
                onChange={(e) => setSideAStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="sb" className="block text-sm font-medium text-foreground mb-1">2. Dik Kenar (b)</label>
              <input
                id="sb"
                type="text"
                value={sideBStr}
                onChange={(e) => setSideBStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Hipotenüsü Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Dik Üçgen Geometrik Sonuçları</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Hipotenüs Uzunluğu (c)</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.hypotenuse)}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Üçgenin Alanı</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.area)} birim²</span>
                <span className="text-xs text-muted-foreground block mt-1">Çevre: {formatNumber(result.perimeter)} birim</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Dar Açılar</span>
                <span className="text-base font-bold text-foreground">{result.angleA}° ve {result.angleB}°</span>
                <span className="text-xs text-muted-foreground block mt-1">(Toplam 90°)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">Pisagor Teoremi:</p>
        <p>Bir dik üçgende dik kenarların karelerinin toplamı hipotenüsün karesine eşittir: <code>c² = a² + b²</code>.</p>
      </div>
    </div>
  );
}
