'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function AltinOranHesaplama() {
  const [baseSizeStr, setBaseSizeStr] = useState('1000');
  const PHI = 1.6180339887;

  const base = parseTurkishNumber(baseSizeStr) || 1000;
  const a = base / PHI;
  const b = base - a;
  const bigger = base * PHI;

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <label htmlFor="b" className="block text-sm font-medium text-foreground mb-1">
            Girdi Değeri (Piksel, cm, genişlik vb.)
          </label>
          <input
            id="b"
            type="text"
            value={baseSizeStr}
            onChange={(e) => setBaseSizeStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
            className="w-full sm:w-80 h-11 px-3 rounded-lg border border-border bg-background text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <span className="text-xs text-muted-foreground block mb-1">Büyük Parça (A Parçası)</span>
            <span className="text-2xl font-bold text-primary">{formatNumber(a)}</span>
            <span className="text-xs text-muted-foreground block mt-1">Toplamın ~%61.8&apos;i</span>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <span className="text-xs text-muted-foreground block mb-1">Küçük Parça (B Parçası)</span>
            <span className="text-xl font-bold text-foreground">{formatNumber(b)}</span>
            <span className="text-xs text-muted-foreground block mt-1">Toplamın ~%38.2&apos;si</span>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <span className="text-xs text-muted-foreground block mb-1">Bir Üst Altın Oran Ölçüsü</span>
            <span className="text-xl font-bold text-foreground">{formatNumber(bigger)}</span>
            <span className="text-xs text-muted-foreground block mt-1">Girdi × 1.618</span>
          </div>
        </div>

        {/* Visual representation */}
        <div className="pt-2">
          <span className="text-xs font-semibold text-muted-foreground block mb-2">Görsel Bölünme:</span>
          <div className="w-full h-12 rounded-lg overflow-hidden flex border border-border text-xs font-bold text-white">
            <div style={{ width: '61.8%' }} className="bg-primary flex items-center justify-center">A: {formatNumber(a)}</div>
            <div style={{ width: '38.2%' }} className="bg-primary/70 flex items-center justify-center">B: {formatNumber(b)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
