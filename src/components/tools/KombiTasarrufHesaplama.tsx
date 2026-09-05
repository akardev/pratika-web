'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KombiTasarrufHesaplama() {
  const [monthlyBillStr, setMonthlyBillStr] = useState('3500'); // Kış ortalaması aylık doğalgaz faturası
  const [hasThermostat, setHasThermostat] = useState(false);
  const [hasRadiatorFoil, setHasRadiatorFoil] = useState(false);
  const [tempReduction, setTempReduction] = useState(1); // Kaç derece düşürülecek

  const bill = parseTurkishNumber(monthlyBillStr) || 0;
  // Sıcaklık düşürme: Her 1 derece ~%7 tasarruf
  const tempSaveRate = tempReduction * 0.07;
  const thermostatRate = hasThermostat ? 0.00 : 0.08; // Termostat takılırsa %8 tasarruf
  const foilRate = hasRadiatorFoil ? 0.00 : 0.04; // Petek arkası yalıtım levhası %4 tasarruf

  const totalSaveRate = Math.min(0.35, tempSaveRate + thermostatRate + foilRate);
  const monthlySavings = bill * totalSaveRate;
  const winterSeasonSavings = monthlySavings * 5; // 5 aylık kış sezonu

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="bill" className="block text-sm font-medium text-foreground mb-1">
              Ortalama Kış Aylık Doğalgaz Faturası (TL)
            </label>
            <input
              id="bill"
              type="text"
              value={monthlyBillStr}
              onChange={(e) => setMonthlyBillStr(sanitizeNumericInput(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
          <div>
            <label htmlFor="tr" className="block text-sm font-medium text-foreground mb-1">
              Oda Sıcaklığını Düşürme Hedefi
            </label>
            <select
              id="tr"
              value={tempReduction}
              onChange={(e) => setTempReduction(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              <option value={0}>Sıcaklık Değişmeyecek (0°C)</option>
              <option value={1}>1°C Düşür (%7 Tasarruf)</option>
              <option value={2}>2°C Düşür (%14 Tasarruf)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={hasThermostat}
              onChange={(e) => setHasThermostat(e.target.checked)}
              className="rounded border-border"
            />
            Oda Termostatım Zaten Var
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={hasRadiatorFoil}
              onChange={(e) => setHasRadiatorFoil(e.target.checked)}
              className="rounded border-border"
            />
            Petek Arkası Yalıtım Levhalarım Zaten Takılı
          </label>
        </div>

        <div className="mt-8 pt-6 border-t border-border space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tasarruf Potansiyeli</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-xs text-muted-foreground block mb-1">Kış Sezonu Net Tasarruf (5 Ay)</span>
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {formatNumber(Math.round(winterSeasonSavings))} ₺
              </span>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-xs text-muted-foreground block mb-1">Aylık Fatura Tasarrufu</span>
              <span className="text-xl font-bold text-primary">{formatNumber(Math.round(monthlySavings))} ₺ / Ay</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">Toplam Yüzdesel Tasarruf</span>
              <span className="text-xl font-bold text-foreground">%{Math.round(totalSaveRate * 100)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
