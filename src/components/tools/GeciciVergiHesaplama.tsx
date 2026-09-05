'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function GeciciVergiHesaplama() {
  const [profitStr, setProfitStr] = useState('800000');
  const [previousPaidStr, setPreviousPaidStr] = useState('120000');
  const [entityType, setEntityType] = useState<'corporate' | 'individual'>('corporate');

  const [result, setResult] = useState<{
    calculatedTax: number;
    previousPaid: number;
    payableTax: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const profit = parseTurkishNumber(profitStr);
    const previous = parseTurkishNumber(previousPaidStr) || 0;

    if (isNaN(profit) || profit < 0) return;

    // Kurumlar için %25, Gelir vergisi mükellefi şahıslar için %15 geçici vergi oranı
    const rate = entityType === 'corporate' ? 0.25 : 0.15;
    const calculatedTax = profit * rate;
    const payableTax = Math.max(0, calculatedTax - previous);

    setResult({
      calculatedTax: Math.round(calculatedTax),
      previousPaid: Math.round(previous),
      payableTax: Math.round(payableTax),
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="et" className="block text-sm font-medium text-foreground mb-1">Mükellefiyet Türü</label>
              <select
                id="et"
                value={entityType}
                onChange={(e) => setEntityType(e.target.value as 'corporate' | 'individual')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="corporate">Sermaye Şirketi (LTD/A.Ş. - %25)</option>
                <option value="individual">Ticari Kazanç Şahıs Firması (%15)</option>
              </select>
            </div>
            <div>
              <label htmlFor="p" className="block text-sm font-medium text-foreground mb-1">Dönem Kümülatif Kazancı (TL)</label>
              <input
                id="p"
                type="text"
                value={profitStr}
                onChange={(e) => setProfitStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="prev" className="block text-sm font-medium text-foreground mb-1">Önceki Dönemlerde Ödenen (TL)</label>
              <input
                id="prev"
                type="text"
                value={previousPaidStr}
                onChange={(e) => setPreviousPaidStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Geçici Vergiyi Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Dönem Geçici Vergi Sonucu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Bu Dönem Ödenecek Net Vergi</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.payableTax)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Hesaplanan Kümülatif Vergi</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.calculatedTax)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Mahsup Edilen Önceki Vergi</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.previousPaid)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
