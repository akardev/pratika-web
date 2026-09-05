'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function BorsaKomisyonHesaplama() {
  const [buyPriceStr, setBuyPriceStr] = useState('50.00');
  const [sellPriceStr, setSellPriceStr] = useState('55.00');
  const [lotStr, setLotStr] = useState('500');
  const [rateTenThousandStr, setRateTenThousandStr] = useState('20'); // On binde 20 (binde 2)

  const [result, setResult] = useState<{
    buyTotal: number;
    sellTotal: number;
    totalCommission: number;
    bsmv: number;
    netProfit: number;
    profitPercent: number;
    breakEvenPrice: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const buyPrice = parseTurkishNumber(buyPriceStr);
    const sellPrice = parseTurkishNumber(sellPriceStr);
    const lot = parseTurkishNumber(lotStr);
    const commRate = (parseTurkishNumber(rateTenThousandStr) || 20) / 10000;

    if (isNaN(buyPrice) || isNaN(sellPrice) || isNaN(lot) || buyPrice <= 0 || lot <= 0) return;

    const buyTotal = buyPrice * lot;
    const sellTotal = sellPrice * lot;

    const buyComm = buyTotal * commRate;
    const sellComm = sellTotal * commRate;
    const totalComm = buyComm + sellComm;
    const bsmv = totalComm * 0.05; // Komisyon üzerinden %5 BSMV

    const totalCosts = totalComm + bsmv;
    const netProfit = (sellTotal - buyTotal) - totalCosts;
    const profitPercent = (netProfit / (buyTotal + buyComm)) * 100;

    // Başabaş fiyatı (komisyonları sıfırlayan satış fiyatı)
    const breakEvenPrice = (buyTotal + (buyTotal * commRate * 1.05)) / (lot * (1 - (commRate * 1.05)));

    setResult({
      buyTotal: Math.round(buyTotal),
      sellTotal: Math.round(sellTotal),
      totalCommission: Math.round(totalComm * 100) / 100,
      bsmv: Math.round(bsmv * 100) / 100,
      netProfit: Math.round(netProfit * 100) / 100,
      profitPercent: Math.round(profitPercent * 100) / 100,
      breakEvenPrice: Math.round(breakEvenPrice * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="bp" className="block text-sm font-medium text-foreground mb-1">Alış Fiyatı (TL)</label>
              <input
                id="bp"
                type="text"
                value={buyPriceStr}
                onChange={(e) => setBuyPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="sp" className="block text-sm font-medium text-foreground mb-1">Satış Fiyatı (TL)</label>
              <input
                id="sp"
                type="text"
                value={sellPriceStr}
                onChange={(e) => setSellPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="lot" className="block text-sm font-medium text-foreground mb-1">Lot Adedi</label>
              <input
                id="lot"
                type="text"
                value={lotStr}
                onChange={(e) => setLotStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="cr" className="block text-sm font-medium text-foreground mb-1">Komisyon Oranı (Onbinde)</label>
              <input
                id="cr"
                type="text"
                value={rateTenThousandStr}
                onChange={(e) => setRateTenThousandStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
                placeholder="Örn: 20 (On binde 20)"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Net Kâr ve Komisyonu Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">İşlem ve Kâr Özeti</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className={`p-4 rounded-lg border ${result.netProfit >= 0 ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-destructive/10 border-destructive/20'}`}>
                <span className="text-xs text-muted-foreground block mb-1">Net Kâr / Zarar</span>
                <span className={`text-2xl font-bold ${result.netProfit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
                  {formatNumber(result.netProfit)} ₺
                </span>
                <span className="text-xs text-muted-foreground block mt-1">Getiri: %{result.profitPercent}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Ödenen Komisyon + BSMV</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.totalCommission + result.bsmv)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Başabaş Satış Fiyatı</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.breakEvenPrice)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Toplam İşlem Hacmi</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.buyTotal + result.sellTotal)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
