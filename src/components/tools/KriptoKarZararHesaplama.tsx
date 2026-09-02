'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KriptoKarZararHesaplama() {
  const [entryPriceStr, setEntryPriceStr] = useState<string>('65000');
  const [exitPriceStr, setExitPriceStr] = useState<string>('71500');
  const [quantityStr, setQuantityStr] = useState<string>('0.5');
  const [feeRateStr, setFeeRateStr] = useState<string>('0.1'); // %0.1 borsa komisyonu
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    entryTotal: number;
    exitTotal: number;
    totalFee: number;
    netProfit: number;
    returnPercent: number;
    breakEvenPrice: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const entry = parseTurkishNumber(entryPriceStr);
    const exit = parseTurkishNumber(exitPriceStr);
    const qty = parseTurkishNumber(quantityStr);
    const feeRate = parseTurkishNumber(feeRateStr) || 0;

    if (isNaN(entry) || isNaN(exit) || isNaN(qty) || entry <= 0 || exit <= 0 || qty <= 0) {
      setError('Lütfen alış, satış fiyatlarını ve miktarı pozitif sayılar olarak girin.');
      return;
    }

    const entryTotal = entry * qty;
    const exitTotal = exit * qty;
    const entryFee = entryTotal * (feeRate / 100);
    const exitFee = exitTotal * (feeRate / 100);
    const totalFee = entryFee + exitFee;
    const netProfit = (exitTotal - entryTotal) - totalFee;
    const returnPercent = (netProfit / entryTotal) * 100;

    // Başabaş fiyatı: çıkışta komisyon ödendiğinde sıfır kâr bırakan satış fiyatı
    // (Exit * Qty) * (1 - fee) = EntryTotal + EntryFee
    const breakEven = (entryTotal + entryFee) / (qty * (1 - feeRate / 100));

    setResult({
      entryTotal: Math.round(entryTotal * 100) / 100,
      exitTotal: Math.round(exitTotal * 100) / 100,
      totalFee: Math.round(totalFee * 100) / 100,
      netProfit: Math.round(netProfit * 100) / 100,
      returnPercent: Math.round(returnPercent * 100) / 100,
      breakEvenPrice: Math.round(breakEven * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label htmlFor="ep" className="block text-sm font-medium text-foreground mb-1">Giriş / Alış Fiyatı</label>
              <input
                id="ep"
                type="text"
                value={entryPriceStr}
                onChange={(e) => setEntryPriceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="xp" className="block text-sm font-medium text-foreground mb-1">Çıkış / Satış Fiyatı</label>
              <input
                id="xp"
                type="text"
                value={exitPriceStr}
                onChange={(e) => setExitPriceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="q" className="block text-sm font-medium text-foreground mb-1">Miktar / Coin Adedi</label>
              <input
                id="q"
                type="text"
                value={quantityStr}
                onChange={(e) => setQuantityStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="f" className="block text-sm font-medium text-foreground mb-1">Borsa Komisyonu (%)</label>
              <input
                id="f"
                type="text"
                value={feeRateStr}
                onChange={(e) => setFeeRateStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Net Kârı Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">İşlem Net Sonucu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg border ${result.netProfit >= 0 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400' : 'bg-destructive/10 border-destructive/30 text-destructive'}`}>
                <span className="text-xs block mb-1">Net Kâr / Zarar</span>
                <span className="text-2xl font-bold">
                  {result.netProfit >= 0 ? `+${formatNumber(result.netProfit)}` : formatNumber(result.netProfit)}
                </span>
                <span className="text-xs block mt-1">({result.returnPercent >= 0 ? `+${result.returnPercent}` : result.returnPercent}%)</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Ödenen Toplam Komisyon</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.totalFee)}</span>
                <span className="text-xs text-muted-foreground block mt-1">Alış + Satış Komisyonu</span>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Kâra Geçiş Başabaş Fiyatı</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.breakEvenPrice)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">Kripto ve Spot İşlem Notu:</p>
        <p>Borsa komisyonları hem alış hem satış yönünde bakiyeden düşüldüğü için net kazanç brüt farktan daha düşüktür. Başabaş fiyatı, sıfır zararla işlemden çıkabileceğiniz minimum fiyat seviyesini gösterir.</p>
      </div>
    </div>
  );
}
