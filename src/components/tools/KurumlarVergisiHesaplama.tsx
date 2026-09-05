'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KurumlarVergisiHesaplama() {
  const [profitStr, setProfitStr] = useState('2000000'); // Ticari bilanço kârı
  const [kkegStr, setKkegStr] = useState('150000'); // Kanunen kabul edilmeyen giderler
  const [exemptionsStr, setExemptionsStr] = useState('50000'); // İstisna ve indirimler

  const [result, setResult] = useState<{
    taxBase: number;
    taxDue: number;
    effectiveRate: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const profit = parseTurkishNumber(profitStr);
    const kkeg = parseTurkishNumber(kkegStr) || 0;
    const exemptions = parseTurkishNumber(exemptionsStr) || 0;

    if (isNaN(profit) || profit < 0) return;

    // Matrah = Ticari Kâr + KKEG - İstisnalar
    const taxBase = Math.max(0, profit + kkeg - exemptions);
    // 2026 Genel Kurumlar Vergisi oranı %25
    const taxDue = taxBase * 0.25;
    const effectiveRate = profit > 0 ? (taxDue / profit) * 100 : 25;

    setResult({
      taxBase: Math.round(taxBase),
      taxDue: Math.round(taxDue),
      effectiveRate: Math.round(effectiveRate * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="prof" className="block text-sm font-medium text-foreground mb-1">Ticari Bilanço Kârı (TL)</label>
              <input
                id="prof"
                type="text"
                value={profitStr}
                onChange={(e) => setProfitStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="kkeg" className="block text-sm font-medium text-foreground mb-1">KKEG Tutarı (TL)</label>
              <input
                id="kkeg"
                type="text"
                value={kkegStr}
                onChange={(e) => setKkegStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="ex" className="block text-sm font-medium text-foreground mb-1">Vergi İstisna & İndirimler (TL)</label>
              <input
                id="ex"
                type="text"
                value={exemptionsStr}
                onChange={(e) => setExemptionsStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Kurumlar Vergisini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Kurumlar Vergisi Sonuçları</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Ödenecek Kurumlar Vergisi (%25)</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.taxDue)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Mali Kâr (Vergi Matrahı)</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.taxBase)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Efektif Vergi Yükü</span>
                <span className="text-xl font-bold text-foreground">%{result.effectiveRate}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
