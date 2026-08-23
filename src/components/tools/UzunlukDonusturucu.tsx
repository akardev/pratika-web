'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

const TO_METERS: Record<string, number> = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  mi: 1609.344,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
};

const UNIT_NAMES: Record<string, string> = {
  m: 'Metre (m)',
  km: 'Kilometre (km)',
  cm: 'Santimetre (cm)',
  mm: 'Milimetre (mm)',
  mi: 'Mil (mi)',
  in: 'İnç (in)',
  ft: 'Fit (ft)',
  yd: 'Yarda (yd)',
};

export default function UzunlukDonusturucu() {
  const [valStr, setValStr] = useState<string>('1');
  const [unit, setUnit] = useState<string>('m');

  const valNum = parseTurkishNumber(valStr);
  const isValid = !isNaN(valNum) && valNum >= 0;
  const inMeters = isValid ? valNum * TO_METERS[unit] : 0;

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="lenVal" className="block text-sm font-medium mb-2 text-foreground">
              Miktar
            </label>
            <input
              type="text"
              inputMode="decimal"
              id="lenVal"
              placeholder="Örn: 10"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
              value={valStr}
              onChange={(e) => setValStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
            />
          </div>

          <div>
            <label htmlFor="lenUnit" className="block text-sm font-medium mb-2 text-foreground">
              Birim
            </label>
            <select
              id="lenUnit"
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
              Tüm Birimlerdeki Karşılıkları
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {Object.keys(TO_METERS).map((k) => {
                const converted = inMeters / TO_METERS[k];
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
