'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber } from '@/lib/utils';

const TO_SQM: Record<string, number> = {
  m2: 1,
  donum: 1000,
  ha: 10000,
  km2: 1000000,
  sqft: 0.09290304,
};

const UNIT_NAMES: Record<string, string> = {
  m2: 'Metrekare (m²)',
  donum: 'Dönüm / Dekar',
  ha: 'Hektar (ha)',
  km2: 'Kilometrekare (km²)',
  sqft: 'Fitkare (sq ft)',
};

export default function AlanDonusturucu() {
  const [valStr, setValStr] = useState<string>('1');
  const [unit, setUnit] = useState<string>('donum');

  const valNum = parseTurkishNumber(valStr);
  const isValid = !isNaN(valNum) && valNum >= 0;
  const inSqm = isValid ? valNum * TO_SQM[unit] : 0;

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="aVal" className="block text-sm font-medium mb-2 text-foreground">
              Miktar
            </label>
            <input
              type="text"
              inputMode="decimal"
              id="aVal"
              placeholder="Örn: 1"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
              value={valStr}
              onChange={(e) => setValStr(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="aUnit" className="block text-sm font-medium mb-2 text-foreground">
              Birim
            </label>
            <select
              id="aUnit"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              {Object.entries(UNIT_NAMES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isValid ? (
          <div className="border-t border-border/60 pt-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Tüm Alan Karşılıkları
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.keys(TO_SQM).map((k) => {
                const converted = inSqm / TO_SQM[k];
                return (
                  <div key={k} className="p-3 bg-muted/20 rounded-lg border border-border">
                    <span className="text-xs text-muted-foreground block mb-0.5">{UNIT_NAMES[k]}</span>
                    <span className="font-bold text-base text-foreground">
                      {formatNumber(converted)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-sm text-destructive">Lütfen geçerli bir sayı girin.</p>
        )}
      </div>
    </div>
  );
}
