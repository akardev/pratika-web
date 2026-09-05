'use client';

import { useState } from 'react';
import { parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function ArsaPayiHesaplama() {
  const [totalLandStr, setTotalLandStr] = useState('1200'); // Toplam parsel m2
  const [unitAreaStr, setUnitAreaStr] = useState('110'); // Daire m2
  const [totalUnitsAreaStr, setTotalUnitsAreaStr] = useState('1320'); // Binadaki toplam daireler m2
  const [serefiyeFactor, setSerefiyeFactor] = useState('1.0'); // Şerefiye katsayısı

  const [result, setResult] = useState<{
    shareRatio: string;
    landM2: number;
    sharePercent: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const land = parseTurkishNumber(totalLandStr);
    const unit = parseTurkishNumber(unitAreaStr);
    const totalUnits = parseTurkishNumber(totalUnitsAreaStr);
    const factor = parseFloat(serefiyeFactor) || 1.0;

    if (isNaN(land) || isNaN(unit) || isNaN(totalUnits) || totalUnits <= 0) return;

    const weightedUnit = unit * factor;
    const sharePercent = (weightedUnit / totalUnits) * 100;
    const landM2 = (land * (weightedUnit / totalUnits));

    setResult({
      shareRatio: `${Math.round(weightedUnit)} / ${Math.round(totalUnits)}`,
      landM2: Math.round(landM2 * 100) / 100,
      sharePercent: Math.round(sharePercent * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="land" className="block text-sm font-medium text-foreground mb-1">Toplam Parsel Alanı (m²)</label>
              <input
                id="land"
                type="text"
                value={totalLandStr}
                onChange={(e) => setTotalLandStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-foreground mb-1">Dairenizin Alanı (m²)</label>
              <input
                id="unit"
                type="text"
                value={unitAreaStr}
                onChange={(e) => setUnitAreaStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="tunit" className="block text-sm font-medium text-foreground mb-1">Bina Toplam Bağımsız m²</label>
              <input
                id="tunit"
                type="text"
                value={totalUnitsAreaStr}
                onChange={(e) => setTotalUnitsAreaStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="ser" className="block text-sm font-medium text-foreground mb-1">Kat & Cephe Şerefiyesi</label>
              <select
                id="ser"
                value={serefiyeFactor}
                onChange={(e) => setSerefiyeFactor(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="1.0">Standart (Orta Kat / Normal Cephe - 1.0x)</option>
                <option value="1.15">Yüksek Şerefiye (Üst Kat / Güney / Manzara - 1.15x)</option>
                <option value="0.85">Düşük Şerefiye (Zemin / Bodrum / Kuzey - 0.85x)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Arsa Payını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Mülkiyet ve Arsa Payı</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Daireye Düşen Net Arsa</span>
                <span className="text-2xl font-bold text-primary">{result.landM2} m²</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Arsa Payı Yüzdesi</span>
                <span className="text-xl font-bold text-foreground">%{result.sharePercent}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Tapu Pay / Payda Oranı</span>
                <span className="text-xl font-bold font-mono text-foreground">{result.shareRatio}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
