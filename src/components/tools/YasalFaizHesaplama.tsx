'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function YasalFaizHesaplama() {
  const [principalStr, setPrincipalStr] = useState('100000');
  const [daysStr, setDaysStr] = useState('180');
  const [faizType, setFaizType] = useState<'legal' | 'commercial'>('legal');

  const [result, setResult] = useState<{
    interestRate: number;
    interestAmount: number;
    totalAmount: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const principal = parseTurkishNumber(principalStr);
    const days = parseInt(daysStr, 10);

    if (isNaN(principal) || isNaN(days) || principal <= 0 || days <= 0) return;

    // 3095 sayılı Kanun: Yasal faiz %24, Ticari temerrüt faizi ~%48
    const interestRate = faizType === 'legal' ? 24 : 48;
    const interestAmount = principal * (interestRate / 100) * (days / 365);
    const totalAmount = principal + interestAmount;

    setResult({
      interestRate,
      interestAmount: Math.round(interestAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="p" className="block text-sm font-medium text-foreground mb-1">Asıl Alacak Tutarı (TL)</label>
              <input
                id="p"
                type="text"
                value={principalStr}
                onChange={(e) => setPrincipalStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="d" className="block text-sm font-medium text-foreground mb-1">Gecikilen Gün Sayısı</label>
              <input
                id="d"
                type="number"
                min="1"
                value={daysStr}
                onChange={(e) => setDaysStr(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="tp" className="block text-sm font-medium text-foreground mb-1">Faiz Türü (3095 Sayılı Kanun)</label>
              <select
                id="tp"
                value={faizType}
                onChange={(e) => setFaizType(e.target.value as 'yasal' | 'ticari')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="legal">Yasal Faiz (%24 Yıllık)</option>
                <option value="commercial">Ticari Temerrüt / Avans Faizi (%48 Yıllık)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Yasal Faizi Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Yasal Faiz Sonucu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">İşleyen Faiz Tutarı</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.interestAmount)} ₺</span>
                <span className="text-xs text-muted-foreground block mt-1">Yıllık Oran: %{result.interestRate}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Faiz Dahil Toplam Alacak</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.totalAmount)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Hesap Kriteri</span>
                <span className="text-sm font-semibold text-foreground">365 Günlük Yasal Temerrüt Faizi</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
