'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function VekaletUcretiHesaplama() {
  const [claimStr, setClaimStr] = useState('250000'); // Dava konusu değer

  const [result, setResult] = useState<{
    fee: number;
    vat: number;
    total: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const claim = parseTurkishNumber(claimStr);
    if (isNaN(claim) || claim <= 0) return;

    // AAÜT 3. Kısım Nispi Ücret Dilimleri
    // İlk 400.000 TL için %16 (Maktu asgari ücretin altına düşemez ~30.000 TL)
    let fee = 0;
    if (claim <= 400000) {
      fee = claim * 0.16;
    } else if (claim <= 800000) {
      fee = 400000 * 0.16 + (claim - 400000) * 0.15;
    } else if (claim <= 1800000) {
      fee = 400000 * 0.16 + 400000 * 0.15 + (claim - 800000) * 0.14;
    } else {
      fee = 400000 * 0.16 + 400000 * 0.15 + 1000000 * 0.14 + (claim - 1800000) * 0.11;
    }

    // Maktu alt sınır kontrolü
    fee = Math.max(30000, fee);
    const vat = fee * 0.20;
    const total = fee + vat;

    setResult({
      fee: Math.round(fee * 100) / 100,
      vat: Math.round(vat * 100) / 100,
      total: Math.round(total * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="max-w-md">
            <label htmlFor="clm" className="block text-sm font-medium text-foreground mb-1">
              Dava Değeri / Müddeabih (TL)
            </label>
            <input
              id="clm"
              type="text"
              value={claimStr}
              onChange={(e) => setClaimStr(sanitizeNumericInput(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              placeholder="Örn: 250.000"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            AAÜT Vekalet Ücretini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Vekalet Ücreti Sonucu (AAÜT)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">KDV Dahil Toplam Vekalet Ücreti</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.total)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Net Vekalet Ücreti</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.fee)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">%20 KDV Tutarı</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.vat)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
