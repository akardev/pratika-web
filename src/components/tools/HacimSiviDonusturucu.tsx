'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

type VolumeUnit = 'L' | 'mL' | 'm3' | 'cm3' | 'gal_us' | 'gal_uk' | 'floz_us' | 'barrel';

const LITERS_PER_UNIT: Record<VolumeUnit, number> = {
  L: 1,
  mL: 0.001,
  m3: 1000,
  cm3: 0.001,
  gal_us: 3.78541,
  gal_uk: 4.54609,
  floz_us: 0.0295735,
  barrel: 158.987, // Petrol varili
};

export default function HacimSiviDonusturucu() {
  const [valStr, setValStr] = useState<string>('5');
  const [unit, setUnit] = useState<VolumeUnit>('L');

  const [result, setResult] = useState<{
    L: number;
    mL: number;
    m3: number;
    cm3: number;
    gal_us: number;
    gal_uk: number;
    floz_us: number;
    barrel: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const val = parseTurkishNumber(valStr);
    if (isNaN(val) || val < 0) {
      setError('Lütfen geçerli bir hacim miktarı giriniz.');
      return;
    }

    const totalLiters = val * LITERS_PER_UNIT[unit];

    setResult({
      L: totalLiters,
      mL: totalLiters / LITERS_PER_UNIT.mL,
      m3: totalLiters / LITERS_PER_UNIT.m3,
      cm3: totalLiters / LITERS_PER_UNIT.cm3,
      gal_us: totalLiters / LITERS_PER_UNIT.gal_us,
      gal_uk: totalLiters / LITERS_PER_UNIT.gal_uk,
      floz_us: totalLiters / LITERS_PER_UNIT.floz_us,
      barrel: totalLiters / LITERS_PER_UNIT.barrel,
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
                  Hacim Değeri <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="val"
                  placeholder="Örn: 5"
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
                  onChange={(e) => setUnit(e.target.value as VolumeUnit)}
                >
                  <option value="L">Litre (L)</option>
                  <option value="mL">Mililitre (mL)</option>
                  <option value="m3">Metreküp (m³)</option>
                  <option value="cm3">Santimetreküp (cm³ / cc)</option>
                  <option value="gal_us">ABD Galon (US Gal)</option>
                  <option value="gal_uk">İngiliz Galon (UK Gal)</option>
                  <option value="floz_us">Sıvı Ons (fl oz US)</option>
                  <option value="barrel">Varil (Oil Barrel bbl)</option>
                </select>
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
              Hacimleri Dönüştür
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hacim Eşdeğerleri
                </h3>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Litre (L):</span>
                    <span className="font-bold text-primary font-mono">{formatNumber(result.L, 4)} L</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Mililitre (mL / cc):</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.mL, 2)} mL</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Metreküp (m³):</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.m3, 6)} m³</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">ABD Galonu (US Gal):</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.gal_us, 4)} gal</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Sıvı Ons (fl oz):</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.floz_us, 2)} fl oz</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/mutfak-olcubirim-donusturucu"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Mutfak ölçü birimleri (su bardağı, kaşık) dönüştürücüsüne gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Sıvı veya katı hacim miktarını girerek Litre, m³, Galon ve Ons birimlerine çevirin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Hacim ve Sıvı Ölçü Birimleri</h2>
        <p className="mb-4 text-muted-foreground">
          1 metreküp (m³) = 1.000 Litre = 1.000.000 santimetreküptür (cm³). 1 ABD Galonu yaklaşık 3.785 Litre, 1 İngiliz Galonu ise yaklaşık 4.546 Litreye karşılık gelir.
        </p>
      </div>
    </div>
  );
}
