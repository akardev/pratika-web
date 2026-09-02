'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KiraStopajiHesaplama() {
  const [calcMode, setCalcMode] = useState<'net-to-gross' | 'gross-to-net'>('net-to-gross');
  const [amountStr, setAmountStr] = useState<string>('20000');
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    netRent: number;
    grossRent: number;
    withholdingTax: number; // %20 Stopaj
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const val = parseTurkishNumber(amountStr);
    if (isNaN(val) || val <= 0) {
      setError('Lütfen geçerli bir kira bedeli girin.');
      return;
    }

    let net = 0;
    let gross = 0;
    let tax = 0;

    if (calcMode === 'net-to-gross') {
      // Brüt = Net / 0.80
      net = val;
      gross = net / 0.8;
      tax = gross - net;
    } else {
      // Net = Brüt * 0.80
      gross = val;
      tax = gross * 0.2;
      net = gross - tax;
    }

    setResult({
      netRent: Math.round(net * 100) / 100,
      grossRent: Math.round(gross * 100) / 100,
      withholdingTax: Math.round(tax * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="mode" className="block text-sm font-medium text-foreground mb-1">Hesaplama Yönü</label>
              <select
                id="mode"
                value={calcMode}
                onChange={(e) => setCalcMode(e.target.value as 'net-to-gross' | 'gross-to-net')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="net-to-gross">Net Kiradan Brüt ve Stopajı Bul</option>
                <option value="gross-to-net">Brüt Kiradan Net ve Stopajı Bul</option>
              </select>
            </div>
            <div>
              <label htmlFor="amt" className="block text-sm font-medium text-foreground mb-1">
                {calcMode === 'net-to-gross' ? 'Mülk Sahibine Ödenen Net Kira (TL)' : 'Sözleşmedeki Brüt Kira (TL)'}
              </label>
              <input
                id="amt"
                type="text"
                value={amountStr}
                onChange={(e) => setAmountStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Stopajı Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Kira ve Vergi Dökümü</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Mülk Sahibine Net Kira</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.netRent)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Vergi Dairesine Stopaj (%20)</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.withholdingTax)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Brüt Kira Bedeli</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.grossRent)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">İşyeri Kira Stopajı Kuralı:</p>
        <p>Gelir Vergisi Kanunu 94. maddesi gereğince ticari işletmeler tarafından kiralanan işyerlerinde brüt kira üzerinden %20 oranında gelir vergisi stopajı kesilerek muhtasar beyanname ile devlete ödenir.</p>
      </div>
    </div>
  );
}
