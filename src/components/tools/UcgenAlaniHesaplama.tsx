'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function UcgenAlaniHesaplama() {
  const [calcMethod, setCalcMethod] = useState<'base-height' | 'heron'>('base-height');
  
  // Taban - yükseklik
  const [baseStr, setBaseStr] = useState<string>('8');
  const [heightStr, setHeightStr] = useState<string>('6');

  // 3 kenar (Heron)
  const [sideAStr, setSideAStr] = useState<string>('5');
  const [sideBStr, setSideBStr] = useState<string>('6');
  const [sideCStr, setSideCStr] = useState<string>('7');

  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    area: number;
    perimeter: number;
    method: string;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (calcMethod === 'base-height') {
      const b = parseTurkishNumber(baseStr);
      const h = parseTurkishNumber(heightStr);
      if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) {
        setError('Lütfen taban ve yükseklik değerlerini pozitif olarak girin.');
        return;
      }
      const area = (b * h) / 2;
      setResult({
        area: Math.round(area * 100) / 100,
        perimeter: 0,
        method: 'Taban x Yükseklik / 2 Metodu',
      });
    } else {
      const a = parseTurkishNumber(sideAStr);
      const b = parseTurkishNumber(sideBStr);
      const c = parseTurkishNumber(sideCStr);

      if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
        setError('Lütfen üç kenar uzunluğunu da pozitif sayılar olarak girin.');
        return;
      }

      // Üçgen eşitsizliği kontrolü: a+b > c, a+c > b, b+c > a
      if (a + b <= c || a + c <= b || b + c <= a) {
        setError('Girilen kenar uzunlukları bir üçgen oluşturamaz (Herhangi iki kenarın toplamı üçüncüden büyük olmalıdır).');
        return;
      }

      const perimeter = a + b + c;
      const s = perimeter / 2;
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

      setResult({
        area: Math.round(area * 100) / 100,
        perimeter: Math.round(perimeter * 100) / 100,
        method: '3 Kenar Uzunluğu (Heron Formülü)',
      });
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Hesaplama Yöntemi</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="method"
                  checked={calcMethod === 'base-height'}
                  onChange={() => setCalcMethod('base-height')}
                />
                Taban ve Yükseklik
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="method"
                  checked={calcMethod === 'heron'}
                  onChange={() => setCalcMethod('heron')}
                />
                3 Kenar Uzunluğu (Heron)
              </label>
            </div>
          </div>

          {calcMethod === 'base-height' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="b" className="block text-sm font-medium text-foreground mb-1">Taban Uzunluğu</label>
                <input
                  id="b"
                  type="text"
                  value={baseStr}
                  onChange={(e) => setBaseStr(sanitizeNumericInput(e.target.value))}
                  className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
                />
              </div>
              <div>
                <label htmlFor="h" className="block text-sm font-medium text-foreground mb-1">Yükseklik</label>
                <input
                  id="h"
                  type="text"
                  value={heightStr}
                  onChange={(e) => setHeightStr(sanitizeNumericInput(e.target.value))}
                  className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="sa" className="block text-sm font-medium text-foreground mb-1">a Kenarı</label>
                <input
                  id="sa"
                  type="text"
                  value={sideAStr}
                  onChange={(e) => setSideAStr(sanitizeNumericInput(e.target.value))}
                  className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
                />
              </div>
              <div>
                <label htmlFor="sb" className="block text-sm font-medium text-foreground mb-1">b Kenarı</label>
                <input
                  id="sb"
                  type="text"
                  value={sideBStr}
                  onChange={(e) => setSideBStr(sanitizeNumericInput(e.target.value))}
                  className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
                />
              </div>
              <div>
                <label htmlFor="sc" className="block text-sm font-medium text-foreground mb-1">c Kenarı</label>
                <input
                  id="sc"
                  type="text"
                  value={sideCStr}
                  onChange={(e) => setSideCStr(sanitizeNumericInput(e.target.value))}
                  className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
                />
              </div>
            </div>
          )}

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Alanı Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{result.method}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Üçgenin Alanı</span>
                <span className="text-3xl font-bold text-primary">{formatNumber(result.area)} birim²</span>
              </div>
              {result.perimeter > 0 && (
                <div className="p-4 rounded-lg bg-muted/30 border border-border">
                  <span className="text-xs text-muted-foreground block mb-1">Üçgenin Çevresi</span>
                  <span className="text-2xl font-bold text-foreground">{formatNumber(result.perimeter)} birim</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
