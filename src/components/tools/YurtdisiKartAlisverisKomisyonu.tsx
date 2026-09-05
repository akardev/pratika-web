'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function YurtdisiKartAlisverisKomisyonu() {
  const [foreignAmountStr, setForeignAmountStr] = useState('100'); // USD harcama
  const [fxRateStr, setFxRateStr] = useState('36.50'); // TCMB gösterge kuru
  const [bankSpreadStr, setBankSpreadStr] = useState('2.5'); // Banka kur marjı %
  const [feePercentStr, setFeePercentStr] = useState('1.5'); // Yurt dışı işlem komisyonu %

  const [result, setResult] = useState<{
    baseTry: number;
    spreadCost: number;
    feeCost: number;
    totalTry: number;
    effectiveRate: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseTurkishNumber(foreignAmountStr);
    const fx = parseTurkishNumber(fxRateStr);
    const spread = (parseTurkishNumber(bankSpreadStr) || 0) / 100;
    const fee = (parseTurkishNumber(feePercentStr) || 0) / 100;

    if (isNaN(amount) || isNaN(fx) || amount <= 0 || fx <= 0) return;

    const baseTry = amount * fx;
    const spreadCost = baseTry * spread;
    const feeCost = baseTry * fee;
    const totalTry = baseTry + spreadCost + feeCost;
    const effectiveRate = totalTry / amount;

    setResult({
      baseTry: Math.round(baseTry * 100) / 100,
      spreadCost: Math.round(spreadCost * 100) / 100,
      feeCost: Math.round(feeCost * 100) / 100,
      totalTry: Math.round(totalTry * 100) / 100,
      effectiveRate: Math.round(effectiveRate * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="fa" className="block text-sm font-medium text-foreground mb-1">Döviz Tutarı ($ veya €)</label>
              <input
                id="fa"
                type="text"
                value={foreignAmountStr}
                onChange={(e) => setForeignAmountStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="fx" className="block text-sm font-medium text-foreground mb-1">Piyasa Gösterge Kuru (TL)</label>
              <input
                id="fx"
                type="text"
                value={fxRateStr}
                onChange={(e) => setFxRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="sp" className="block text-sm font-medium text-foreground mb-1">Banka Kur Marjı / Makas (%)</label>
              <input
                id="sp"
                type="text"
                value={bankSpreadStr}
                onChange={(e) => setBankSpreadStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="fee" className="block text-sm font-medium text-foreground mb-1">Yurtdışı İşlem Komisyonu (%)</label>
              <input
                id="fee"
                type="text"
                value={feePercentStr}
                onChange={(e) => setFeePercentStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Ekstreye Yansıyacak TL&apos;yi Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Kredi Kartı Ekstre Maliyeti</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Ekstreye Yansıyacak Tahmini TL</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.totalTry)} ₺</span>
                <span className="text-xs text-muted-foreground block mt-1">Efektif Kur: {result.effectiveRate} TL</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Saf Piyasa Karşılığı</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.baseTry)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <span className="text-xs text-muted-foreground block mb-1">Banka Komisyon & Kur Farkı</span>
                <span className="text-xl font-bold text-destructive">+{formatNumber(result.spreadCost + result.feeCost)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
