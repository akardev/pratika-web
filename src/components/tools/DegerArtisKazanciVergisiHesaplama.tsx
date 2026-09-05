'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function DegerArtisKazanciVergisiHesaplama() {
  const [buyPriceStr, setBuyPriceStr] = useState('1500000');
  const [sellPriceStr, setSellPriceStr] = useState('3500000');
  const [inflationRateStr, setInflationRateStr] = useState('85'); // Yİ-ÜFE artış oranı %
  const [costsStr, setCostsStr] = useState('140000'); // Tapu harçları ve masraflar

  const [result, setResult] = useState<{
    indexedBuyPrice: number;
    rawProfit: number;
    exemption: number;
    taxBase: number;
    taxDue: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const buyPrice = parseTurkishNumber(buyPriceStr);
    const sellPrice = parseTurkishNumber(sellPriceStr);
    const inflation = parseTurkishNumber(inflationRateStr) || 0;
    const costs = parseTurkishNumber(costsStr) || 0;

    if (isNaN(buyPrice) || isNaN(sellPrice) || buyPrice <= 0 || sellPrice <= 0) return;

    // Yİ-ÜFE endekslemesi (%10 üzeri artış varsa uygulanır)
    const indexedBuyPrice = inflation >= 10 ? buyPrice * (1 + inflation / 100) : buyPrice;
    const rawProfit = sellPrice - indexedBuyPrice - costs;

    // 2026 Yıllık Değer Artış Kazancı İstisnası yaklaşık 120.000 TL
    const exemption = 120000;
    const taxBase = Math.max(0, rawProfit - exemption);

    // Kademeli gelir vergisi dilimleri tahmini (%15, %20, %27...)
    let taxDue = 0;
    if (taxBase > 0) {
      if (taxBase <= 158000) taxDue = taxBase * 0.15;
      else if (taxBase <= 330000) taxDue = 158000 * 0.15 + (taxBase - 158000) * 0.20;
      else taxDue = 158000 * 0.15 + (330000 - 158000) * 0.20 + (taxBase - 330000) * 0.27;
    }

    setResult({
      indexedBuyPrice: Math.round(indexedBuyPrice),
      rawProfit: Math.round(rawProfit),
      exemption,
      taxBase: Math.round(taxBase),
      taxDue: Math.round(taxDue),
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="buy" className="block text-sm font-medium text-foreground mb-1">Alış Bedeli (TL)</label>
              <input
                id="buy"
                type="text"
                value={buyPriceStr}
                onChange={(e) => setBuyPriceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="sell" className="block text-sm font-medium text-foreground mb-1">Satış Bedeli (TL)</label>
              <input
                id="sell"
                type="text"
                value={sellPriceStr}
                onChange={(e) => setSellPriceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="inf" className="block text-sm font-medium text-foreground mb-1">Dönem Yİ-ÜFE Artışı (%)</label>
              <input
                id="inf"
                type="text"
                value={inflationRateStr}
                onChange={(e) => setInflationRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="cst" className="block text-sm font-medium text-foreground mb-1">Tapu Harçları ve Giderler (TL)</label>
              <input
                id="cst"
                type="text"
                value={costsStr}
                onChange={(e) => setCostsStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Değer Artış Kazancı Vergisini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Vergi Hesaplama Dökümü</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <span className="text-xs text-muted-foreground block mb-1">Ödenecek Gelir Vergisi</span>
                <span className="text-2xl font-bold text-destructive">{formatNumber(result.taxDue)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Endekslenmiş Alış Maliyeti</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.indexedBuyPrice)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Yasal İstisna Tutarı</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.exemption)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Vergiye Tabi Net Matrah</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.taxBase)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
