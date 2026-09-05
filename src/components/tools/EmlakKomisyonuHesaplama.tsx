'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function EmlakKomisyonuHesaplama() {
  const [type, setType] = useState<'sale' | 'rent'>('sale');
  const [amountStr, setAmountStr] = useState('4000000');

  const [result, setResult] = useState<{
    buyerCommission: number;
    sellerCommission: number;
    totalVat: number;
    totalWithVat: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseTurkishNumber(amountStr);
    if (isNaN(amount) || amount <= 0) return;

    let buyerBase = 0;
    let sellerBase = 0;

    if (type === 'sale') {
      // Yasal azami: Alıcı %2 + KDV (%20), Satıcı %2 + KDV (%20)
      buyerBase = amount * 0.02;
      sellerBase = amount * 0.02;
    } else {
      // Kiralama: 1 aylık kira bedeli + %20 KDV (genelde kiracı öder)
      buyerBase = amount;
      sellerBase = 0;
    }

    const totalBase = buyerBase + sellerBase;
    const totalVat = totalBase * 0.20;
    const totalWithVat = totalBase + totalVat;

    setResult({
      buyerCommission: Math.round((buyerBase * 1.20) * 100) / 100,
      sellerCommission: Math.round((sellerBase * 1.20) * 100) / 100,
      totalVat: Math.round(totalVat * 100) / 100,
      totalWithVat: Math.round(totalWithVat * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tp" className="block text-sm font-medium text-foreground mb-1">İşlem Türü</label>
              <select
                id="tp"
                value={type}
                onChange={(e) => {
                  const t = e.target.value as 'sale' | 'rent';
                  setType(t);
                  setAmountStr(t === 'sale' ? '4000000' : '25000');
                }}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="sale">Gayrimenkul Satışı (%2 + KDV)</option>
                <option value="rent">Gayrimenkul Kiralaması (1 Aylık Kira + KDV)</option>
              </select>
            </div>
            <div>
              <label htmlFor="amt" className="block text-sm font-medium text-foreground mb-1">
                {type === 'sale' ? 'Satış Bedeli (TL)' : 'Aylık Kira Bedeli (TL)'}
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

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Yasal Komisyonu Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Komisyon ve KDV Sonuçları</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">
                  {type === 'sale' ? 'Alıcı Komisyonu (KDV Dahil)' : 'Kiracı Hizmet Bedeli (KDV Dahil)'}
                </span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.buyerCommission)} ₺</span>
              </div>
              {type === 'sale' && (
                <div className="p-4 rounded-lg bg-muted/30 border border-border">
                  <span className="text-xs text-muted-foreground block mb-1">Satıcı Komisyonu (KDV Dahil)</span>
                  <span className="text-xl font-bold text-foreground">{formatNumber(result.sellerCommission)} ₺</span>
                </div>
              )}
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Ödenen %20 KDV Tutarı</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.totalVat)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
