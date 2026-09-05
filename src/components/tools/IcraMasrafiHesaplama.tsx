'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function IcraMasrafiHesaplama() {
  const [debtStr, setDebtStr] = useState('75000');

  const [result, setResult] = useState<{
    pesinHarc: number;
    basvurmaHarci: number;
    tebligatGideri: number;
    baroVekaletHarci: number;
    totalInitialCost: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const debt = parseTurkishNumber(debtStr);
    if (isNaN(debt) || debt <= 0) return;

    // İlamsız takip peşin harcı: Alacağın binde 5'i (%0.5)
    const pesinHarc = debt * 0.005;
    const basvurmaHarci = 427.60; // 2026 maktu takip başvurma harcı
    const tebligatGideri = 250.00; // PTT elektronik/fiziki tebligat gideri
    const baroVekaletHarci = 95.00; // Baro pulu ve vekalet harcı
    const totalInitialCost = pesinHarc + basvurmaHarci + tebligatGideri + baroVekaletHarci;

    setResult({
      pesinHarc: Math.round(pesinHarc * 100) / 100,
      basvurmaHarci,
      tebligatGideri,
      baroVekaletHarci,
      totalInitialCost: Math.round(totalInitialCost * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="max-w-md">
            <label htmlFor="d" className="block text-sm font-medium text-foreground mb-1">Takip Edilecek Asıl Alacak Tutarı (TL)</label>
            <input
              id="d"
              type="text"
              value={debtStr}
              onChange={(e) => setDebtStr(sanitizeNumericInput(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            İcra Açılış Masraflarını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">İcra Dairesi Açılış Masrafı</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Peşin Başvuru Gideri</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.totalInitialCost)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Peşin Harç (Binde 5)</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.pesinHarc)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Maktu Harçlar + Tebligat</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.basvurmaHarci + result.tebligatGideri + result.baroVekaletHarci)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
