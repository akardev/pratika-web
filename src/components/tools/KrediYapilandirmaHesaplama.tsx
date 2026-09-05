'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KrediYapilandirmaHesaplama() {
  const [balanceStr, setBalanceStr] = useState('200000');
  const [oldMonthlyStr, setOldMonthlyStr] = useState('12500');
  const [remainingMonthsStr, setRemainingMonthsStr] = useState('24');
  const [newRateStr, setNewRateStr] = useState('2.80');
  const [newMonthsStr, setNewMonthsStr] = useState('24');
  const [feeStr, setFeeStr] = useState('2000');

  const [result, setResult] = useState<{
    oldTotalRemaining: number;
    newMonthly: number;
    newTotal: number;
    netSavings: number;
    isAdvantageous: boolean;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const balance = parseTurkishNumber(balanceStr);
    const oldMonthly = parseTurkishNumber(oldMonthlyStr);
    const remainingMonths = parseInt(remainingMonthsStr, 10);
    const newRate = parseTurkishNumber(newRateStr);
    const newMonths = parseInt(newMonthsStr, 10);
    const fee = parseTurkishNumber(feeStr) || 0;

    if (isNaN(balance) || isNaN(oldMonthly) || isNaN(remainingMonths) || isNaN(newRate) || isNaN(newMonths)) return;

    const oldTotalRemaining = oldMonthly * remainingMonths;

    // Yeni kredi taksit hesabı (%15 KKDF ve %5 BSMV dahil)
    const effectiveRate = (newRate * 1.20) / 100;
    const num = effectiveRate * Math.pow(1 + effectiveRate, newMonths);
    const den = Math.pow(1 + effectiveRate, newMonths) - 1;
    const newMonthly = balance * (num / den);
    const newTotal = (newMonthly * newMonths) + fee;
    const netSavings = oldTotalRemaining - newTotal;

    setResult({
      oldTotalRemaining: Math.round(oldTotalRemaining),
      newMonthly: Math.round(newMonthly * 100) / 100,
      newTotal: Math.round(newTotal),
      netSavings: Math.round(netSavings),
      isAdvantageous: netSavings > 0,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="bal" className="block text-sm font-medium text-foreground mb-1">Kalan Anapara Borcu (TL)</label>
              <input
                id="bal"
                type="text"
                value={balanceStr}
                onChange={(e) => setBalanceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="oldm" className="block text-sm font-medium text-foreground mb-1">Mevcut Aylık Taksit (TL)</label>
              <input
                id="oldm"
                type="text"
                value={oldMonthlyStr}
                onChange={(e) => setOldMonthlyStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="remm" className="block text-sm font-medium text-foreground mb-1">Kalan Taksit Sayısı (Ay)</label>
              <input
                id="remm"
                type="number"
                value={remainingMonthsStr}
                onChange={(e) => setRemainingMonthsStr(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="newr" className="block text-sm font-medium text-foreground mb-1">Yeni Teklif Faiz Oranı (%)</label>
              <input
                id="newr"
                type="text"
                value={newRateStr}
                onChange={(e) => setNewRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="newm" className="block text-sm font-medium text-foreground mb-1">Yeni Vade (Ay)</label>
              <input
                id="newm"
                type="number"
                value={newMonthsStr}
                onChange={(e) => setNewMonthsStr(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="fee" className="block text-sm font-medium text-foreground mb-1">Yapılandırma & Dosya Masrafı (TL)</label>
              <input
                id="fee"
                type="text"
                value={feeStr}
                onChange={(e) => setFeeStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Yapılandırma Kârlılığını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Kıyaslama ve Tasarruf Analizi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg border ${result.isAdvantageous ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-destructive/10 border-destructive/20'}`}>
                <span className="text-xs text-muted-foreground block mb-1">Net Finansal {result.isAdvantageous ? 'Tasarruf' : 'Zarar'}</span>
                <span className={`text-2xl font-bold ${result.isAdvantageous ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
                  {formatNumber(Math.abs(result.netSavings))} ₺
                </span>
                <span className="text-xs text-muted-foreground block mt-1">
                  {result.isAdvantageous ? 'Yapılandırma avantajlıdır.' : 'Eski planda kalmak daha mantıklıdır.'}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Yeni Aylık Taksit</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.newMonthly)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Eski Kalan Toplam Ödeme</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.oldTotalRemaining)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
