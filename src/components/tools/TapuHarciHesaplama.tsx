'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function TapuHarciHesaplama() {
  const [priceStr, setPriceStr] = useState('3000000');
  const [isBigCity, setIsBigCity] = useState(true);

  const [result, setResult] = useState<{
    buyerTax: number;
    sellerTax: number;
    totalTax: number;
    revolvingFund: number;
    grandTotal: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseTurkishNumber(priceStr);
    if (isNaN(price) || price <= 0) return;

    // Alıcı %2, Satıcı %2 -> Toplam %4
    const buyerTax = price * 0.02;
    const sellerTax = price * 0.02;
    const totalTax = buyerTax + sellerTax;

    // 2026 Döner sermaye yaklaşık: Büyükşehir ~2.600 TL, Diğer ~1.300 TL
    const revolvingFund = isBigCity ? 2600 : 1300;
    const grandTotal = totalTax + revolvingFund;

    setResult({
      buyerTax: Math.round(buyerTax * 100) / 100,
      sellerTax: Math.round(sellerTax * 100) / 100,
      totalTax: Math.round(totalTax * 100) / 100,
      revolvingFund,
      grandTotal: Math.round(grandTotal * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-foreground mb-1">
                Gayrimenkul Satış Bedeli (TL)
              </label>
              <input
                id="price"
                type="text"
                value={priceStr}
                onChange={(e) => setPriceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-foreground mb-1">
                İl Türü (Döner Sermaye İçin)
              </label>
              <select
                id="city"
                value={isBigCity ? 'big' : 'other'}
                onChange={(e) => setIsBigCity(e.target.value === 'big')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="big">Büyükşehir Belediyesi (İstanbul, Ankara, İzmir vb.)</option>
                <option value="other">Diğer İller</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Tapu Masraflarını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tapu Harç ve Gider Dökümü</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Genel Toplam Masraf</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.grandTotal)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Alıcı Payı (%2)</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.buyerTax)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Satıcı Payı (%2)</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.sellerTax)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Döner Sermaye Bedeli</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.revolvingFund)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
