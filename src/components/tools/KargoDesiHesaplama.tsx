'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KargoDesiHesaplama() {
  const [widthStr, setWidthStr] = useState<string>('30');
  const [lengthStr, setLengthStr] = useState<string>('40');
  const [heightStr, setHeightStr] = useState<string>('25');
  const [actualWeightStr, setActualWeightStr] = useState<string>('4');
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    desi: number;
    actualKg: number;
    billableWeight: number;
    billedBy: 'desi' | 'kg';
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const w = parseTurkishNumber(widthStr);
    const l = parseTurkishNumber(lengthStr);
    const h = parseTurkishNumber(heightStr);
    const kg = parseTurkishNumber(actualWeightStr) || 0;

    if (isNaN(w) || isNaN(l) || isNaN(h) || w <= 0 || l <= 0 || h <= 0) {
      setError('Lütfen en, boy ve yükseklik ölçülerini pozitif olarak girin.');
      return;
    }

    // Desi = (En * Boy * Yükseklik) / 3000
    const calculatedDesi = (w * l * h) / 3000;
    const billable = Math.max(calculatedDesi, kg);

    setResult({
      desi: Math.round(calculatedDesi * 100) / 100,
      actualKg: kg,
      billableWeight: Math.round(billable * 100) / 100,
      billedBy: calculatedDesi >= kg ? 'desi' : 'kg',
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label htmlFor="w" className="block text-sm font-medium text-foreground mb-1">En (cm)</label>
              <input
                id="w"
                type="text"
                value={widthStr}
                onChange={(e) => setWidthStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="l" className="block text-sm font-medium text-foreground mb-1">Boy (cm)</label>
              <input
                id="l"
                type="text"
                value={lengthStr}
                onChange={(e) => setLengthStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="h" className="block text-sm font-medium text-foreground mb-1">Yükseklik (cm)</label>
              <input
                id="h"
                type="text"
                value={heightStr}
                onChange={(e) => setHeightStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="kg" className="block text-sm font-medium text-foreground mb-1">Ağırlık (kg)</label>
              <input
                id="kg"
                type="text"
                value={actualWeightStr}
                onChange={(e) => setActualWeightStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Desi Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Kargo Fatura Ağırlığı</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Hesaplanan Desi</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.desi)} Desi</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Gerçek Tartı Ağırlığı</span>
                <span className="text-xl font-semibold text-foreground">{formatNumber(result.actualKg)} kg</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Faturalandırılacak Değer</span>
                <span className="text-xl font-semibold text-foreground">
                  {formatNumber(result.billableWeight)} {result.billedBy.toUpperCase()}
                </span>
                <span className="text-[11px] text-muted-foreground block mt-0.5">
                  ({result.billedBy === 'desi' ? 'Hacim ağırlıktan büyük' : 'Ağırlık hacimden büyük'})
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">Desi Hesaplama Kuralı:</p>
        <p>Türkiye&apos;deki kargo şirketleri (Yurtiçi, Aras, MNG, Sürat vb.) ve IATA standartlarına göre koli hacmi <code>(En x Boy x Yükseklik) / 3000</code> formülüyle hesaplanır. Kargo ücretlendirmesinde gerçek ağırlık ile desi değerinden hangisi büyükse o esas alınır.</p>
      </div>
    </div>
  );
}
