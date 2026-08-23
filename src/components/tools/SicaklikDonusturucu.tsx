'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function SicaklikDonusturucu() {
  const [valStr, setValStr] = useState<string>('25');
  const [unit, setUnit] = useState<'C' | 'F' | 'K'>('C');

  const valNum = parseTurkishNumber(valStr);
  const isValid = !isNaN(valNum);

  // Convert to Celsius first
  let c = 0;
  if (isValid) {
    if (unit === 'C') c = valNum;
    else if (unit === 'F') c = (valNum - 32) * (5 / 9);
    else if (unit === 'K') c = valNum - 273.15;
  }

  const f = c * (9 / 5) + 32;
  const k = c + 273.15;

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="tempVal" className="block text-sm font-medium mb-2 text-foreground">
              Derece
            </label>
            <input
              type="text"
              inputMode="decimal"
              id="tempVal"
              placeholder="Örn: 25"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
              value={valStr}
              onChange={(e) => setValStr(sanitizeNumericInput(e.target.value, { allowDecimal: true, allowNegative: true }))}
            />
          </div>

          <div>
            <label htmlFor="tempUnit" className="block text-sm font-medium mb-2 text-foreground">
              Birim
            </label>
            <select
              id="tempUnit"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'C' | 'F' | 'K')}
            >
              <option value="C">Santigrat (°C)</option>
              <option value="F">Fahrenhayt (°F)</option>
              <option value="K">Kelvin (K)</option>
            </select>
          </div>
        </div>

        {isValid ? (
          <div className="border-t border-border/60 pt-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Tüm Sıcaklık Karşılıkları
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-muted/20 rounded-lg border border-border">
                <span className="text-xs text-muted-foreground block mb-0.5">Santigrat (Celsius)</span>
                <span className="font-bold text-base text-foreground">{formatNumber(c)} °C</span>
              </div>
              <div className="p-3 bg-muted/20 rounded-lg border border-border">
                <span className="text-xs text-muted-foreground block mb-0.5">Fahrenhayt (Fahrenheit)</span>
                <span className="font-bold text-base text-foreground">{formatNumber(f)} °F</span>
              </div>
              <div className="p-3 bg-muted/20 rounded-lg border border-border">
                <span className="text-xs text-muted-foreground block mb-0.5">Kelvin</span>
                <span className="font-bold text-base text-foreground">{formatNumber(k)} K</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-destructive">Lütfen geçerli bir sayı girin.</p>
        )}
      </div>
    </div>
  );
}
