'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

const TO_KG: Record<string, number> = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  t: 1000,
  lbs: 0.45359237,
  oz: 0.028349523125,
};

const UNIT_NAMES: Record<string, string> = {
  kg: 'Kilogram (kg)',
  g: 'Gram (g)',
  mg: 'Miligram (mg)',
  t: 'Metrik Ton (t)',
  lbs: 'Pound / Libre (lbs)',
  oz: 'Ons (oz)',
};

export default function AgirlikDonusturucu() {
  const [valStr, setValStr] = useState<string>('1');
  const [unit, setUnit] = useState<string>('kg');

  const valNum = parseTurkishNumber(valStr);
  const isValid = !isNaN(valNum) && valNum >= 0;
  const inKg = isValid ? valNum * TO_KG[unit] : 0;

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="wVal" className="block text-sm font-medium mb-2 text-foreground">
              Miktar
            </label>
            <input
              type="text"
              inputMode="decimal"
              id="wVal"
              placeholder="Örn: 1"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
              value={valStr}
              onChange={(e) => setValStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
            />
          </div>

          <div>
            <label htmlFor="wUnit" className="block text-sm font-medium mb-2 text-foreground">
              Birim
            </label>
            <select
              id="wUnit"
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
              Tüm Ağırlık Karşılıkları
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.keys(TO_KG).map((k) => {
                const converted = inKg / TO_KG[k];
                return (
                  <div key={k} className="p-3 bg-muted/20 rounded-lg border border-border">
                    <span className="text-xs text-muted-foreground block mb-0.5">{UNIT_NAMES[k]}</span>
                    <span className="font-bold text-base text-foreground">
                      {formatNumber(converted)} {k}
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
