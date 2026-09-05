'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function BedelliBedelsizSermayeArtirimiHesaplama() {
  const [stockPriceStr, setStockPriceStr] = useState('45.50');
  const [lotStr, setLotStr] = useState('1000');
  const [paidRateStr, setPaidRateStr] = useState('100'); // % Bedelli
  const [unpaidRateStr, setUnpaidRateStr] = useState('150'); // % Bedelsiz
  const [ruchanPriceStr, setRuchanPriceStr] = useState('1.00'); // Nominal rüçhan fiyatı

  const [result, setResult] = useState<{
    newStockPrice: number;
    newTotalLot: number;
    ruchanCost: number;
    totalPortfolioValue: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseTurkishNumber(stockPriceStr);
    const lot = parseTurkishNumber(lotStr);
    const paidRate = parseTurkishNumber(paidRateStr) || 0;
    const unpaidRate = parseTurkishNumber(unpaidRateStr) || 0;
    const ruchanPrice = parseTurkishNumber(ruchanPriceStr) || 1.0;

    if (isNaN(p) || isNaN(lot) || p <= 0 || lot <= 0) return;

    // Formül: Yeni Fiyat = (Eski Fiyat + (Bedelli Oranı * Rüçhan Fiyatı)) / (1 + Bedelli Oranı + Bedelsiz Oranı)
    const B = paidRate / 100;
    const BD = unpaidRate / 100;
    const newPrice = (p + (B * ruchanPrice)) / (1 + B + BD);

    // Yeni lot adedi
    const newLot = lot * (1 + B + BD);
    const ruchanCost = lot * B * ruchanPrice;
    const totalPortfolio = newLot * newPrice;

    setResult({
      newStockPrice: Math.round(newPrice * 100) / 100,
      newTotalLot: Math.round(newLot),
      ruchanCost: Math.round(ruchanCost),
      totalPortfolioValue: Math.round(totalPortfolio),
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label htmlFor="p" className="block text-sm font-medium text-foreground mb-1">Mevcut Hisse Fiyatı (TL)</label>
              <input
                id="p"
                type="text"
                value={stockPriceStr}
                onChange={(e) => setStockPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="lot" className="block text-sm font-medium text-foreground mb-1">Elinizdeki Lot Sayısı</label>
              <input
                id="lot"
                type="text"
                value={lotStr}
                onChange={(e) => setLotStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="b" className="block text-sm font-medium text-foreground mb-1">Bedelli Artırım Oranı (%)</label>
              <input
                id="b"
                type="text"
                value={paidRateStr}
                onChange={(e) => setPaidRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="bd" className="block text-sm font-medium text-foreground mb-1">Bedelsiz Artırım Oranı (%)</label>
              <input
                id="bd"
                type="text"
                value={unpaidRateStr}
                onChange={(e) => setUnpaidRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="rp" className="block text-sm font-medium text-foreground mb-1">Rüçhan Fiyatı (TL)</label>
              <input
                id="rp"
                type="text"
                value={ruchanPriceStr}
                onChange={(e) => setRuchanPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Bölünme Sonrasını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Bölünme Sonrası Yeni Durum</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Yeni Düzeltilmiş Hisse Fiyatı</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.newStockPrice)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Hesabınızdaki Yeni Lot Sayısı</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.newTotalLot)} Lot</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Ödenmesi Gereken Rüçhan Bedeli</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.ruchanCost)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Portföy Değeri</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.totalPortfolioValue)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
