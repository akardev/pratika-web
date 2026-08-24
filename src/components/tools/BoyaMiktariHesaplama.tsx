'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function BoyaMiktariHesaplama() {
  const [widthStr, setWidthStr] = useState<string>('4'); // En (m)
  const [lengthStr, setLengthStr] = useState<string>('5'); // Boy (m)
  const [heightStr, setHeightStr] = useState<string>('2.7'); // Tavan Yüksekliği (m)
  const [doorsCountStr, setDoorsCountStr] = useState<string>('1'); // Kapı sayısı (~1.8 m²)
  const [windowsCountStr, setWindowsCountStr] = useState<string>('2'); // Pencere sayısı (~2.0 m²)
  const [coats, setCoats] = useState<number>(2); // Kat sayısı (2 kat standart)
  const [paintCeiling, setPaintCeiling] = useState<boolean>(false);

  const [result, setResult] = useState<{
    wallAreaNet: number;
    ceilingArea: number;
    totalPaintArea: number;
    litersNeeded: number; // 1 Litre boya ~10-12 m² tek kat
    recommendedCanSize: string; // 2.5L, 7.5L, 15L
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const w = parseTurkishNumber(widthStr);
    const l = parseTurkishNumber(lengthStr);
    const h = parseTurkishNumber(heightStr);
    const doors = parseTurkishNumber(doorsCountStr) || 0;
    const windows = parseTurkishNumber(windowsCountStr) || 0;

    if (isNaN(w) || isNaN(l) || isNaN(h) || w <= 0 || l <= 0 || h <= 0) {
      setError('Lütfen oda boyutlarını geçerli olarak giriniz.');
      return;
    }

    // Duvar Çevre Alanı = 2 * (En + Boy) * Yükseklik
    const grossWallArea = 2 * (w + l) * h;
    const openingsArea = (doors * 1.8) + (windows * 2.0);
    const wallAreaNet = Math.max(0, grossWallArea - openingsArea);
    const ceilingArea = paintCeiling ? (w * l) : 0;

    const totalPaintArea = (wallAreaNet + ceilingArea) * coats;
    
    // 1 Litre iç cephe boyası 2 katta yaklaşık 6 m² alan boyar (veya tek katta 11 m²)
    const coveragePerLiterSingleCoat = 11;
    const litersNeeded = (wallAreaNet + ceilingArea) * coats / coveragePerLiterSingleCoat;

    let recommendedCanSize = '2.5 Litre (Küçük Kutu)';
    if (litersNeeded > 12) recommendedCanSize = '15 Litre (Büyük Boy Kova)';
    else if (litersNeeded > 6) recommendedCanSize = '7.5 Litre veya 10 Litre Kova';
    else if (litersNeeded > 2.5) recommendedCanSize = '7.5 Litre Kutu';

    setResult({
      wallAreaNet,
      ceilingArea,
      totalPaintArea,
      litersNeeded,
      recommendedCanSize,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label htmlFor="w" className="block text-xs font-medium mb-1 text-foreground">Oda Eni (m)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="w"
                  placeholder="4"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  value={widthStr}
                  onChange={(e) => setWidthStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
              <div>
                <label htmlFor="l" className="block text-xs font-medium mb-1 text-foreground">Oda Boyu (m)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="l"
                  placeholder="5"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  value={lengthStr}
                  onChange={(e) => setLengthStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
              <div>
                <label htmlFor="h" className="block text-xs font-medium mb-1 text-foreground">Yükseklik (m)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="h"
                  placeholder="2.7"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  value={heightStr}
                  onChange={(e) => setHeightStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="doors" className="block text-xs font-medium mb-1 text-foreground">Kapı Sayısı</label>
                <input
                  type="text"
                  inputMode="numeric"
                  id="doors"
                  placeholder="1"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  value={doorsCountStr}
                  onChange={(e) => setDoorsCountStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
              </div>
              <div>
                <label htmlFor="windows" className="block text-xs font-medium mb-1 text-foreground">Pencere Sayısı</label>
                <input
                  type="text"
                  inputMode="numeric"
                  id="windows"
                  placeholder="2"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  value={windowsCountStr}
                  onChange={(e) => setWindowsCountStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCoats(1)}
                className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                  coats === 1 ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                }`}
              >
                1 Kat Boya
              </button>
              <button
                type="button"
                onClick={() => setCoats(2)}
                className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                  coats === 2 ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                }`}
              >
                2 Kat Boya (Önerilen)
              </button>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="paintCeil"
                checked={paintCeiling}
                onChange={(e) => setPaintCeiling(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="paintCeil" className="text-xs text-foreground font-medium cursor-pointer">
                Tavan Boyası da Dahil Edilsin (+{parseTurkishNumber(widthStr) * parseTurkishNumber(lengthStr) || 0} m²)
              </label>
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
              Gereken Boya Miktarını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200 text-center">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Gereken Boya Miktarı
                </h3>

                <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight font-mono">
                  {formatNumber(result.litersNeeded, 1)} Litre
                </span>
                <span className="text-xs font-semibold text-foreground mt-2 inline-block bg-background px-3 py-1.5 rounded-md border border-border/80">
                  Tavsiye Edilen Kova: {result.recommendedCanSize}
                </span>

                <div className="border-t border-border/60 pt-3 mt-4 space-y-1.5 text-xs sm:text-sm text-left">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Net Duvar Alanı:</span>
                    <span className="font-semibold text-foreground font-mono">{formatNumber(result.wallAreaNet, 1)} m²</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Toplam Kat Boyama Alanı:</span>
                    <span className="font-semibold text-foreground font-mono">{formatNumber(result.totalPaintArea, 1)} m²</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/duvarkagidi-rulo-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Duvar kağıdı rulo hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Oda ölçülerini girerek kapı-pencere düşümleriyle net boya ihtiyacını hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Ev Boyarken Boya Miktarı Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Oda duvarlarının toplam brüt alanından kapı ve pencere boşlukları çıkarılır. 1 litre kaliteli su bazlı iç cephe boyası 2 katta yaklaşık 5.5 - 6.5 m² alan kapatır.
        </p>
      </div>
    </div>
  );
}
