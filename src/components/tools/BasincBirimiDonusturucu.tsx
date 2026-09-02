'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

// Standart baz: Pascal (Pa)
const PRESSURE_UNITS: Record<string, { name: string; toBase: number }> = {
  bar: { name: 'Bar (bar)', toBase: 100000 },
  psi: { name: 'Pound / İnçkare (PSI)', toBase: 6894.757 },
  pa: { name: 'Pascal (Pa)', toBase: 1 },
  kpa: { name: 'Kilopascal (kPa)', toBase: 1000 },
  mpa: { name: 'Megapascal (MPa)', toBase: 1000000 },
  atm: { name: 'Standart Atmosfer (atm)', toBase: 101325 },
  torr: { name: 'Torr (mmHg)', toBase: 133.322 },
};

export default function BasincBirimiDonusturucu() {
  const [valStr, setValStr] = useState<string>('32'); // 32 psi tipik lastik
  const [fromUnit, setFromUnit] = useState<string>('psi');

  const val = parseTurkishNumber(valStr) || 0;
  const inPa = val * (PRESSURE_UNITS[fromUnit]?.toBase || 1);

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="pinput" className="block text-sm font-medium text-foreground mb-1">Dönüştürülecek Değer</label>
            <input
              id="pinput"
              type="text"
              value={valStr}
              onChange={(e) => setValStr(sanitizeNumericInput(e.target.value))}
              placeholder="Örn: 32"
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
          <div>
            <label htmlFor="punit" className="block text-sm font-medium text-foreground mb-1">Giriş Birimi</label>
            <select
              id="punit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              {Object.entries(PRESSURE_UNITS).map(([k, u]) => (
                <option key={k} value={k}>{u.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Eşdeğer Basınç Değerleri</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(PRESSURE_UNITS).map(([k, u]) => {
              const converted = inPa / u.toBase;
              const formatted = converted < 0.0001 ? converted.toExponential(4) : formatNumber(Math.round(converted * 10000) / 10000);
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
