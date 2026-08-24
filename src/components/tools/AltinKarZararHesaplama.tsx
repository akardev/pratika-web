'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function AltinKarZararHesaplama() {
  const [goldType, setGoldType] = useState<string>('gram');
  const [quantityStr, setQuantityStr] = useState<string>('25'); // Gram veya adet
  const [buyPriceStr, setBuyPriceStr] = useState<string>('2.900'); // Birim alış fiyatı TL
  const [sellPriceStr, setSellPriceStr] = useState<string>('3.400'); // Birim satış fiyatı TL

  const [result, setResult] = useState<{
    quantity: number;
    buyPrice: number;
    sellPrice: number;
    totalBuyCost: number;
    totalSellValue: number;
    profitLoss: number;
    profitPercentage: number;
    isProfit: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const qty = parseTurkishNumber(quantityStr);
    const buy = parseTurkishNumber(buyPriceStr);
    const sell = parseTurkishNumber(sellPriceStr);

    if (isNaN(qty) || qty <= 0) {
      setError('Lütfen geçerli bir miktar/adet giriniz.');
      return;
    }
    if (isNaN(buy) || buy <= 0) {
      setError('Lütfen geçerli bir alış fiyatı giriniz.');
      return;
    }
    if (isNaN(sell) || sell <= 0) {
      setError('Lütfen geçerli bir satış/güncel fiyat giriniz.');
      return;
    }

    const totalBuyCost = qty * buy;
    const totalSellValue = qty * sell;
    const profitLoss = totalSellValue - totalBuyCost;
    const profitPercentage = ((totalSellValue - totalBuyCost) / totalBuyCost) * 100;
    const isProfit = profitLoss >= 0;

    setResult({
      quantity: qty,
      buyPrice: buy,
      sellPrice: sell,
      totalBuyCost,
      totalSellValue,
      profitLoss,
      profitPercentage,
      isProfit,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">
                  Altın Türü
                </label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  value={goldType}
                  onChange={(e) => setGoldType(e.target.value)}
                >
                  <option value="gram">Gram Altın (Gram)</option>
                  <option value="ceyrek">Çeyrek Altın (Adet)</option>
                  <option value="yarim">Yarım Altın (Adet)</option>
                  <option value="tam">Tam Altın (Adet)</option>
                  <option value="cumhuriyet">Cumhuriyet / Ata (Adet)</option>
                  <option value="22ayar">22 Ayar Bilezik (Gram)</option>
                </select>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium mb-1 text-foreground">
                  Miktar ({goldType.includes('gram') || goldType.includes('ayar') ? 'Gram' : 'Adet'}) <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="quantity"
                  placeholder="Örn: 25"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={quantityStr}
                  onChange={(e) => setQuantityStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="buyPrice" className="block text-sm font-medium mb-1 text-foreground">
                  Alış Fiyatı (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="buyPrice"
                    placeholder="Örn: 2.900"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={buyPriceStr}
                    onChange={(e) => setBuyPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL</div>
                </div>
              </div>

              <div>
                <label htmlFor="sellPrice" className="block text-sm font-medium mb-1 text-foreground">
                  Satış / Güncel Fiyat (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="sellPrice"
                    placeholder="Örn: 3.400"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={sellPriceStr}
                    onChange={(e) => setSellPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL</div>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Altın Kâr / Zararını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Altın Getiri Özeti
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">{result.isProfit ? 'Toplam Net Kâr' : 'Toplam Net Zarar'}</span>
                  <span className={`font-extrabold text-3xl sm:text-4xl tracking-tight ${
                    result.isProfit ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'
                  }`}>
                    {result.isProfit ? `+${formatCurrency(result.profitLoss)}` : formatCurrency(result.profitLoss)}
                  </span>
                  <span className={`text-xs font-semibold mt-1.5 px-2.5 py-1 rounded-md border ${
                    result.isProfit 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                      : 'bg-destructive/10 text-destructive border-destructive/20'
                  }`}>
                    {result.isProfit ? `+%{formatNumber(result.profitPercentage, 2)} Getiri` : `%{formatNumber(result.profitPercentage, 2)} Zarar`}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Toplam Yatırılan Tutar:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.totalBuyCost)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Güncel / Satış Portföy Değeri:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.totalSellValue)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/doviz-kar-zarar-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Döviz kâr/zarar hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Altın miktarı, alış ve satış fiyatlarını girerek net kârınızı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Altın Yatırımı Kâr/Zarar Hesabı</h2>
        <p className="mb-4 text-muted-foreground">
          Altın yatırımlarında kâr veya zarar, toplam satış hasılatından toplam alış maliyetinin çıkarılmasıyla hesaplanır. Getiri yüzdesi ise elde edilen net kârın toplam anaparaya bölünmesiyle bulunur.
        </p>
      </div>
    </div>
  );
}
