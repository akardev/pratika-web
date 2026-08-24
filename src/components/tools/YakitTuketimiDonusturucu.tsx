'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

type FuelUnit = 'l100km' | 'mpg_us' | 'mpg_uk' | 'kml';

export default function YakitTuketimiDonusturucu() {
  const [valStr, setValStr] = useState<string>('6.5'); // 6.5 L / 100km
  const [unit, setUnit] = useState<FuelUnit>('l100km');

  const [result, setResult] = useState<{
    l100km: number;
    mpg_us: number;
    mpg_uk: number;
    kml: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const val = parseTurkishNumber(valStr);
    if (isNaN(val) || val <= 0) {
      setError('Lütfen geçerli bir yakıt tüketim değeri giriniz.');
      return;
    }

    // Temel referans: L/100km
    let l100km = 0;
    if (unit === 'l100km') {
      l100km = val;
    } else if (unit === 'kml') {
      l100km = 100 / val;
    } else if (unit === 'mpg_us') {
      l100km = 235.214583 / val;
    } else if (unit === 'mpg_uk') {
      l100km = 282.481 / val;
    }

    const kml = 100 / l100km;
    const mpg_us = 235.214583 / l100km;
    const mpg_uk = 282.481 / l100km;

    setResult({
      l100km,
      mpg_us,
      mpg_uk,
      kml,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="val" className="block text-sm font-medium mb-1 text-foreground">
                  Tüketim Değeri <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="val"
                  placeholder="Örn: 6.5"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  value={valStr}
                  onChange={(e) => setValStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Birim</label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as FuelUnit)}
                >
                  <option value="l100km">Litre / 100 km (L/100km)</option>
                  <option value="mpg_us">Miles Per Gallon (US MPG)</option>
                  <option value="mpg_uk">Miles Per Gallon (UK MPG)</option>
                  <option value="kml">Kilometre / Litre (km/L)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-1.5 flex-wrap">
              {['4.5', '5.5', '6.5', '7.5', '9.0'].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => { setValStr(l); setUnit('l100km'); }}
                  className="px-2 py-1 text-xs font-medium rounded bg-muted hover:bg-muted/80 text-foreground border border-border/50 font-mono"
                >
                  {l} L/100km
                </button>
              ))}
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
              Yakıt Tüketimini Dönüştür
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Yakıt Tüketim Eşdeğerleri
                </h3>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Litre / 100 km:</span>
                    <span className="font-bold text-primary font-mono">{formatNumber(result.l100km, 2)} L/100km</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">ABD Galonu Başına Mil (US MPG):</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.mpg_us, 1)} MPG</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">İngiliz Galonu Başına Mil (UK MPG):</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.mpg_uk, 1)} MPG</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">1 Litre ile Gidilen Mesafe:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{formatNumber(result.kml, 2)} km/L</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/yakit-maliyeti-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Yolculuk yakıt masrafı hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Araç yakıt tüketimini girerek L/100km ve MPG değerlerini dönüştürün.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">L/100km ile MPG Dönüşümü</h2>
        <p className="mb-4 text-muted-foreground">
          Avrupa ve Türkiye&apos;de 100 kilometrede tüketilen litre (L/100km) kullanılırken, ABD ve İngiltere&apos;de bir galon yakıt ile gidilen mil (MPG) esastır. MPG arttıkça araç daha tasarrufludur, L/100km ise azaldıkça tasarrufludur.
        </p>
      </div>
    </div>
  );
}
