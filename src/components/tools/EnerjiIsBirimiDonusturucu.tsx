'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

// Standart baz: Joule (J)
const ENERGY_UNITS: Record<string, { name: string; toBase: number }> = {
  j: { name: 'Joule (J)', toBase: 1 },
  kj: { name: 'Kilojoule (kJ)', toBase: 1000 },
  cal: { name: 'Kalori (cal)', toBase: 4.184 },
  kcal: { name: 'Kilokalori (Besin kcal)', toBase: 4184 },
  kwh: { name: 'Kilowatt-saat (kWh)', toBase: 3600000 },
  btu: { name: 'British Thermal Unit (BTU)', toBase: 1055.06 },
  ev: { name: 'Elektronvolt (eV)', toBase: 1.602176634e-19 },
};

export default function EnerjiIsBirimiDonusturucu() {
  const [valStr, setValStr] = useState<string>('500'); // 500 kcal
  const [fromUnit, setFromUnit] = useState<string>('kcal');

  const val = parseTurkishNumber(valStr) || 0;
  const inJoule = val * (ENERGY_UNITS[fromUnit]?.toBase || 1);

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="einput" className="block text-sm font-medium text-foreground mb-1">Enerji Değeri</label>
            <input
              id="einput"
              type="text"
              value={valStr}
              onChange={(e) => setValStr(sanitizeNumericInput(e.target.value))}
              placeholder="Örn: 500"
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
          <div>
            <label htmlFor="eunit" className="block text-sm font-medium text-foreground mb-1">Giriş Birimi</label>
            <select
              id="eunit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              {Object.entries(ENERGY_UNITS).map(([k, u]) => (
                <option key={k} value={k}>{u.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Eşdeğer Enerji Değerleri</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(ENERGY_UNITS).map(([k, u]) => {
              const converted = inJoule / u.toBase;
              const formatted = converted > 1e9 || (converted < 0.0001 && converted > 0)
                ? converted.toExponential(4)
                : formatNumber(Math.round(converted * 1000) / 1000);
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
