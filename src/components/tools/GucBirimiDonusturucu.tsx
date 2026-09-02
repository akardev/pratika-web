'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

// Standart baz: Watt (W)
const POWER_UNITS: Record<string, { name: string; toBase: number }> = {
  kw: { name: 'Kilowatt (kW)', toBase: 1000 },
  hp: { name: 'Beygir Gücü (HP / Mekanik)', toBase: 745.699872 },
  ps: { name: 'Metrik Beygir (PS / BG)', toBase: 735.49875 },
  w: { name: 'Watt (W)', toBase: 1 },
  mw: { name: 'Megawatt (MW)', toBase: 1000000 },
  btuh: { name: 'BTU / Saat (BTU/h)', toBase: 0.293071 },
};

export default function GucBirimiDonusturucu() {
  const [valStr, setValStr] = useState<string>('150'); // 150 BG araç
  const [fromUnit, setFromUnit] = useState<string>('ps');

  const val = parseTurkishNumber(valStr) || 0;
  const inWatts = val * (POWER_UNITS[fromUnit]?.toBase || 1);

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="pwinput" className="block text-sm font-medium text-foreground mb-1">Güç Değeri</label>
            <input
              id="pwinput"
              type="text"
              value={valStr}
              onChange={(e) => setValStr(sanitizeNumericInput(e.target.value))}
              placeholder="Örn: 150"
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
          <div>
            <label htmlFor="pwunit" className="block text-sm font-medium text-foreground mb-1">Giriş Birimi</label>
            <select
              id="pwunit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              {Object.entries(POWER_UNITS).map(([k, u]) => (
                <option key={k} value={k}>{u.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Eşdeğer Güç Değerleri</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(POWER_UNITS).map(([k, u]) => {
              const converted = inWatts / u.toBase;
              const formatted = formatNumber(Math.round(converted * 100) / 100);
              return (
                <div key={k} className="p-3.5 rounded-lg border border-border bg-muted/20">
                  <span className="text-xs text-muted-foreground block">{u.name}</span>
                  <span className="text-lg font-bold text-foreground mt-0.5 block">{formatted}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
