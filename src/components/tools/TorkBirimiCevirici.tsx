'use client';

import { useState } from 'react';
import { formatNumber } from '@/lib/utils';

export default function TorkBirimiCevirici() {
  const [val, setVal] = useState(250);
  const [unit, setUnit] = useState<'nm' | 'lbft' | 'kgfm'>('nm');

  // Nm cinsine dönüştür
  let inNm = val;
  if (unit === 'lbft') inNm = val * 1.355818;
  else if (unit === 'kgfm') inNm = val * 9.80665;

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tval" className="block text-sm font-medium text-foreground mb-1">Tork Değeri</label>
            <input
              id="tval"
              type="number"
              value={val}
              onChange={(e) => setVal(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
          <div>
            <label htmlFor="tunt" className="block text-sm font-medium text-foreground mb-1">Birim</label>
            <select
              id="tunt"
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'nm' | 'lbft' | 'kgfm')}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              <option value="nm">Newton Metre (Nm - SI)</option>
              <option value="lbft">Pound-Foot (lb-ft - İngiliz/Amerikan)</option>
              <option value="kgfm">Kilogram-Kuvvet Metre (kgf-m)</option>
            </select>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tork Karşılıkları</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-xs text-muted-foreground block mb-1">Newton Metre (Nm)</span>
              <span className="text-2xl font-bold text-primary">{formatNumber(Math.round(inNm * 100) / 100)} Nm</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">Pound-Foot (lb-ft)</span>
              <span className="text-xl font-bold text-foreground">{formatNumber(Math.round((inNm / 1.355818) * 100) / 100)} lb-ft</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">Kilogram-Kuvvet Metre (kgf-m)</span>
              <span className="text-xl font-bold text-foreground">{formatNumber(Math.round((inNm / 9.80665) * 100) / 100)} kgf-m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
