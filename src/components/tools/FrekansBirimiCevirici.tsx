'use client';

import { useState } from 'react';
import { formatNumber } from '@/lib/utils';

export default function FrekansBirimiCevirici() {
  const [val, setVal] = useState(1000);
  const [unit, setUnit] = useState<'hz' | 'khz' | 'mhz' | 'ghz' | 'rpm'>('mhz');

  // Hz cinsine çevir
  let inHz = val;
  if (unit === 'khz') inHz = val * 1e3;
  else if (unit === 'mhz') inHz = val * 1e6;
  else if (unit === 'ghz') inHz = val * 1e9;
  else if (unit === 'rpm') inHz = val / 60;

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fval" className="block text-sm font-medium text-foreground mb-1">Değer</label>
            <input
              id="fval"
              type="number"
              value={val}
              onChange={(e) => setVal(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
          <div>
            <label htmlFor="funt" className="block text-sm font-medium text-foreground mb-1">Birim</label>
            <select
              id="funt"
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'hz' | 'khz' | 'mhz' | 'ghz' | 'rpm')}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              <option value="hz">Hertz (Hz)</option>
              <option value="khz">Kilohertz (kHz)</option>
              <option value="mhz">Megahertz (MHz)</option>
              <option value="ghz">Gigahertz (GHz)</option>
              <option value="rpm">Devir / Dakika (RPM)</option>
            </select>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Eşdeğer Frekans Değerleri</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3 rounded-lg bg-muted/20 border border-border text-center">
              <span className="text-xs text-muted-foreground block mb-1">Hertz (Hz)</span>
              <span className="text-sm font-bold text-foreground">{formatNumber(inHz)} Hz</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/20 border border-border text-center">
              <span className="text-xs text-muted-foreground block mb-1">Kilohertz (kHz)</span>
              <span className="text-sm font-bold text-foreground">{formatNumber(inHz / 1e3)} kHz</span>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
              <span className="text-xs text-muted-foreground block mb-1">Megahertz (MHz)</span>
              <span className="text-sm font-bold text-primary">{formatNumber(inHz / 1e6)} MHz</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/20 border border-border text-center">
              <span className="text-xs text-muted-foreground block mb-1">Gigahertz (GHz)</span>
              <span className="text-sm font-bold text-foreground">{(inHz / 1e9).toFixed(3)} GHz</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/20 border border-border text-center">
              <span className="text-xs text-muted-foreground block mb-1">RPM (Devir)</span>
              <span className="text-sm font-bold text-foreground">{formatNumber(inHz * 60)} RPM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
