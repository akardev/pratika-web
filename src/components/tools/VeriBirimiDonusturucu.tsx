'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber } from '@/lib/utils';

const TO_BYTES: Record<string, number> = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024,
  PB: 1024 * 1024 * 1024 * 1024 * 1024,
};

const UNIT_NAMES: Record<string, string> = {
  B: 'Byte (B)',
  KB: 'Kilobyte (KB)',
  MB: 'Megabyte (MB)',
  GB: 'Gigabyte (GB)',
  TB: 'Terabyte (TB)',
  PB: 'Petabyte (PB)',
};

export default function VeriBirimiDonusturucu() {
  const [valStr, setValStr] = useState<string>('1');
  const [unit, setUnit] = useState<string>('GB');

  const valNum = parseTurkishNumber(valStr);
  const isValid = !isNaN(valNum) && valNum >= 0;
  const inBytes = isValid ? valNum * TO_BYTES[unit] : 0;

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="dataVal" className="block text-sm font-medium mb-2 text-foreground">
              Miktar
            </label>
            <input
              type="text"
              inputMode="decimal"
              id="dataVal"
              placeholder="Örn: 10"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
              value={valStr}
              onChange={(e) => setValStr(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="dataUnit" className="block text-sm font-medium mb-2 text-foreground">
              Birim
            </label>
            <select
              id="dataUnit"
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
              Tüm Dijital Boyut Karşılıkları
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.keys(TO_BYTES).map((k) => {
                const converted = inBytes / TO_BYTES[k];
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
