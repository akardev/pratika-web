'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

type ShapeType = 'cylinder' | 'sphere' | 'cone' | 'cube' | 'rectangular-prism';

export default function GeometrikCisimlerHacimHesaplayici() {
  const [shape, setShape] = useState<ShapeType>('cylinder');
  const [rStr, setRStr] = useState<string>('4');
  const [hStr, setHStr] = useState<string>('10');
  const [wStr, setWStr] = useState<string>('5');
  const [lStr, setLStr] = useState<string>('8');
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    volume: number;
    surfaceArea: number;
    shapeName: string;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const r = parseTurkishNumber(rStr);
    const h = parseTurkishNumber(hStr);
    const w = parseTurkishNumber(wStr);
    const l = parseTurkishNumber(lStr);

    let v = 0;
    let sa = 0;
    let name = '';

    if (shape === 'cylinder') {
      if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) {
        setError('Lütfen yarıçap ve yükseklik değerlerini pozitif sayılar olarak girin.');
        return;
      }
      name = 'Silindir';
      v = Math.PI * r * r * h;
      sa = (2 * Math.PI * r * h) + (2 * Math.PI * r * r);
    } else if (shape === 'sphere') {
      if (isNaN(r) || r <= 0) {
        setError('Lütfen yarıçap değerini pozitif sayı olarak girin.');
        return;
      }
      name = 'Küre';
      v = (4 / 3) * Math.PI * Math.pow(r, 3);
      sa = 4 * Math.PI * r * r;
    } else if (shape === 'cone') {
      if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) {
        setError('Lütfen yarıçap ve yükseklik değerlerini pozitif sayılar olarak girin.');
        return;
      }
      name = 'Koni';
      v = (1 / 3) * Math.PI * r * r * h;
      const s = Math.sqrt(r * r + h * h);
      sa = Math.PI * r * (r + s);
    } else if (shape === 'cube') {
      if (isNaN(w) || w <= 0) {
        setError('Lütfen bir kenar uzunluğunu pozitif sayı olarak girin.');
        return;
      }
      name = 'Küp';
      v = Math.pow(w, 3);
      sa = 6 * w * w;
    } else if (shape === 'rectangular-prism') {
      if (isNaN(w) || isNaN(l) || isNaN(h) || w <= 0 || l <= 0 || h <= 0) {
        setError('Lütfen en, boy ve yükseklik değerlerini pozitif sayılar olarak girin.');
        return;
      }
      name = 'Dikdörtgenler Prizması';
      v = w * l * h;
      sa = 2 * (w * l + w * h + l * h);
    }

    setResult({
      volume: Math.round(v * 100) / 100,
      surfaceArea: Math.round(sa * 100) / 100,
      shapeName: name,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <label htmlFor="st" className="block text-sm font-medium text-foreground mb-1">Geometrik Cisim Seçin</label>
            <select
              id="st"
              value={shape}
              onChange={(e) => {
                setShape(e.target.value as ShapeType);
                setResult(null);
              }}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              <option value="cylinder">Silindir</option>
              <option value="sphere">Küre</option>
              <option value="cone">Koni</option>
              <option value="cube">Küp</option>
              <option value="rectangular-prism">Dikdörtgenler Prizması</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(shape === 'cylinder' || shape === 'sphere' || shape === 'cone') && (
              <div>
                <label htmlFor="r" className="block text-sm font-medium text-foreground mb-1">Yarıçap (r)</label>
                <input
                  id="r"
                  type="text"
                  value={rStr}
                  onChange={(e) => setRStr(sanitizeNumericInput(e.target.value))}
                  className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
                />
              </div>
            )}
            {(shape === 'cylinder' || shape === 'cone' || shape === 'rectangular-prism') && (
              <div>
                <label htmlFor="h" className="block text-sm font-medium text-foreground mb-1">Yükseklik (h)</label>
                <input
                  id="h"
                  type="text"
                  value={hStr}
                  onChange={(e) => setHStr(sanitizeNumericInput(e.target.value))}
                  className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
                />
              </div>
            )}
            {(shape === 'cube' || shape === 'rectangular-prism') && (
              <div>
                <label htmlFor="w" className="block text-sm font-medium text-foreground mb-1">
                  {shape === 'cube' ? 'Kenar Uzunluğu (a)' : 'Genişlik (w)'}
                </label>
                <input
                  id="w"
                  type="text"
                  value={wStr}
                  onChange={(e) => setWStr(sanitizeNumericInput(e.target.value))}
                  className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
                />
              </div>
            )}
            {shape === 'rectangular-prism' && (
              <div>
                <label htmlFor="l" className="block text-sm font-medium text-foreground mb-1">Derinlik / Boy (l)</label>
                <input
                  id="l"
                  type="text"
                  value={lStr}
                  onChange={(e) => setLStr(sanitizeNumericInput(e.target.value))}
                  className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
                />
              </div>
            )}
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Hacim ve Alanı Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{result.shapeName} Ölçüleri</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Hacim (Volume)</span>
                <span className="text-3xl font-bold text-primary">{formatNumber(result.volume)} birim³</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Yüzey Alanı</span>
                <span className="text-2xl font-bold text-foreground">{formatNumber(result.surfaceArea)} birim²</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
