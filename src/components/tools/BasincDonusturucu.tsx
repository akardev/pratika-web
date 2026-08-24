'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

type PressureUnit = 'bar' | 'psi' | 'atm' | 'kpa' | 'pa' | 'mmhg';

const PASCAL_PER_UNIT: Record<PressureUnit, number> = {
  pa: 1,
  kpa: 1000,
  bar: 100000,
  atm: 101325,
  psi: 6894.76,
  mmhg: 133.322,
};

export default function BasincDonusturucu() {
  const [valStr, setValStr] = useState<string>('32'); // 32 PSI tipik lastik basıncı
  const [unit, setUnit] = useState<PressureUnit>('psi');

  const [result, setResult] = useState<{
    bar: number;
    psi: number;
    atm: number;
    kpa: number;
    pa: number;
    mmhg: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const val = parseTurkishNumber(valStr);
    if (isNaN(val) || val < 0) {
      setError('Lütfen geçerli bir basınç değeri giriniz.');
      return;
    }

    const totalPascals = val * PASCAL_PER_UNIT[unit];

    setResult({
      bar: totalPascals / PASCAL_PER_UNIT.bar,
      psi: totalPascals / PASCAL_PER_UNIT.psi,
      atm: totalPascals / PASCAL_PER_UNIT.atm,
      kpa: totalPascals / PASCAL_PER_UNIT.kpa,
      pa: totalPascals / PASCAL_PER_UNIT.pa,
      mmhg: totalPascals / PASCAL_PER_UNIT.mmhg,
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
                  Basınç Değeri <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="val"
                  placeholder="Örn: 32"
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
                  onChange={(e) => setUnit(e.target.value as PressureUnit)}
                >
                  <option value="psi">PSI (Pound/in² - Lastik)</option>
                  <option value="bar">Bar</option>
                  <option value="atm">Atmosfer (atm)</option>
                  <option value="kpa">Kilopascal (kPa)</option>
                  <option value="pa">Pascal (Pa)</option>
                  <option value="mmhg">mmHg (Torr - Tansiyon/Cıva)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-1.5 flex-wrap">
              {[
                { label: '32 PSI (Oto Lastik)', v: '32', u: 'psi' },
                { label: '2.2 Bar', v: '2.2', u: 'bar' },
                { label: '1 atm (Deniz Seviyesi)', v: '1', u: 'atm' },
                { label: '120 mmHg (Tansiyon)', v: '120', u: 'mmhg' },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => { setValStr(p.v); setUnit(p.u as never); }}
                  className="px-2 py-1 text-xs font-medium rounded bg-muted hover:bg-muted/80 text-foreground border border-border/50"
                >
                  {p.label}
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
              Basınçları Dönüştür
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Basınç Eşdeğerleri
                </h3>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">PSI (Lastik Basıncı):</span>
                    <span className="font-bold text-primary font-mono">{formatNumber(result.psi, 2)} PSI</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Bar:</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.bar, 3)} bar</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Atmosfer (atm):</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.atm, 4)} atm</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Kilopascal (kPa):</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.kpa, 2)} kPa</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">mmHg (Cıva / Torr):</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.mmhg, 1)} mmHg</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/sicaklik-donusturucu"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Sıcaklık dönüştürücüsüne gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Bar veya PSI araç lastik basıncını girerek diğer birimlere çevirin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">PSI ile Bar Arasındaki Fark Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          <strong>1 Bar ≈ 14.5038 PSI</strong>&apos;dır. Araç lastiklerinde Türkiye&apos;de genellikle 30-34 PSI (yaklaşık 2.1 - 2.35 Bar) basınç kullanılır.
        </p>
      </div>
    </div>
  );
}
