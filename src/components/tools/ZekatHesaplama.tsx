'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function ZekatHesaplama() {
  const [cashStr, setCashStr] = useState('150000');
  const [goldGramStr, setGoldGramStr] = useState('50');
  const [goldPriceStr, setGoldPriceStr] = useState('3100'); // 1 gram altın TL
  const [tradeGoodsStr, setTradeGoodsStr] = useState('0');
  const [debtsStr, setDebtsStr] = useState('20000'); // Borçlar

  const [result, setResult] = useState<{
    totalAssets: number;
    netAssets: number;
    nisapAmount: number;
    isObligated: boolean;
    zakatDue: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const cash = parseTurkishNumber(cashStr) || 0;
    const goldGram = parseTurkishNumber(goldGramStr) || 0;
    const goldPrice = parseTurkishNumber(goldPriceStr) || 3100;
    const tradeGoods = parseTurkishNumber(tradeGoodsStr) || 0;
    const debts = parseTurkishNumber(debtsStr) || 0;

    const goldValue = goldGram * goldPrice;
    const totalAssets = cash + goldValue + tradeGoods;
    const netAssets = Math.max(0, totalAssets - debts);

    // Nisap miktarı = 80.18 gram altın değeri
    const nisapAmount = 80.18 * goldPrice;
    const isObligated = netAssets >= nisapAmount;
    // Zekat = 1/40 (%2.5)
    const zakatDue = isObligated ? netAssets * 0.025 : 0;

    setResult({
      totalAssets: Math.round(totalAssets),
      netAssets: Math.round(netAssets),
      nisapAmount: Math.round(nisapAmount),
      isObligated,
      zakatDue: Math.round(zakatDue),
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="cash" className="block text-sm font-medium text-foreground mb-1">Nakit Para & Banka Mevduatı (TL)</label>
              <input
                id="cash"
                type="text"
                value={cashStr}
                onChange={(e) => setCashStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="gold" className="block text-sm font-medium text-foreground mb-1">Altın Miktarı (Gram)</label>
              <input
                id="gold"
                type="text"
                value={goldGramStr}
                onChange={(e) => setGoldGramStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="gp" className="block text-sm font-medium text-foreground mb-1">Gram Altın Fiyatı (TL)</label>
              <input
                id="gp"
                type="text"
                value={goldPriceStr}
                onChange={(e) => setGoldPriceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="trade" className="block text-sm font-medium text-foreground mb-1">Ticari Mallar / Alacaklar (TL)</label>
              <input
                id="trade"
                type="text"
                value={tradeGoodsStr}
                onChange={(e) => setTradeGoodsStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="debts" className="block text-sm font-medium text-foreground mb-1">Düşülecek Borçlar (TL)</label>
              <input
                id="debts"
                type="text"
                value={debtsStr}
                onChange={(e) => setDebtsStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Zekat Borcunu Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Zekat Hesap Sonucu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <span className="text-xs text-muted-foreground block mb-1">Verilmesi Gereken Zekat (%2.5)</span>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{formatNumber(result.zakatDue)} ₺</span>
                <span className="text-xs text-muted-foreground block mt-1">
                  {result.isObligated ? 'Zekat farzdır (Nisap miktarı aşıldı).' : 'Mal varlığı nisap miktarının altındadır.'}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Zekata Tabi Net Varlık</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.netAssets)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Güncel Nisap Sınırı (80.18g Altın)</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.nisapAmount)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
