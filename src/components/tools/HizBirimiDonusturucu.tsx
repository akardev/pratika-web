'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

// Standart baz: m/s (metre/saniye)
const SPEED_UNITS: Record<string, { name: string; toBase: number }> = {
  kmh: { name: 'Kilometre / Saat (km/h)', toBase: 1 / 3.6 },
  ms: { name: 'Metre / Saniye (m/s)', toBase: 1 },
  mph: { name: 'Mil / Saat (mph)', toBase: 0.44704 },
  knot: { name: 'Knot (Deniz Mili/Saat)', toBase: 0.514444 },
  fps: { name: 'Fit / Saniye (ft/s)', toBase: 0.3048 },
  mach: { name: 'Mach (Deniz Seviyesi Ses Hızı)', toBase: 340.29 },
};

export default function HizBirimiDonusturucu() {
  const [valStr, setValStr] = useState<string>('120'); // 120 km/h otoyol
  const [fromUnit, setFromUnit] = useState<string>('kmh');

  const val = parseTurkishNumber(valStr) || 0;
  const inMs = val * (SPEED_UNITS[fromUnit]?.toBase || 1);

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="sinput" className="block text-sm font-medium text-foreground mb-1">Dönüştürülecek Sürat</label>
            <input
              id="sinput"
              type="text"
              value={valStr}
              onChange={(e) => setValStr(sanitizeNumericInput(e.target.value))}
              placeholder="Örn: 120"
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
          <div>
            <label htmlFor="sunit" className="block text-sm font-medium text-foreground mb-1">Giriş Birimi</label>
            <select
              id="sunit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              {Object.entries(SPEED_UNITS).map(([k, u]) => (
                <option key={k} value={k}>{u.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Eşdeğer Sürat Değerleri</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(SPEED_UNITS).map(([k, u]) => {
              const converted = inMs / u.toBase;
              const formatted = formatNumber(Math.round(converted * 1000) / 1000);
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
