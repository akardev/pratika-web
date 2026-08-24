'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function PazaryeriKomisyonKarHesaplama() {
  const [salePriceStr, setSalePriceStr] = useState<string>('500'); // KDV Dahil Satış Fiyatı TL
  const [costPriceStr, setCostPriceStr] = useState<string>('220'); // Ürün Alış/Üretim Maliyeti TL
  const [commissionRateStr, setCommissionRateStr] = useState<string>('18'); // Komisyon Oranı %
  const [shippingCostStr, setShippingCostStr] = useState<string>('45'); // Kargo ve Paketleme TL
  const [vatRate] = useState<number>(20); // KDV %20

  const [result, setResult] = useState<{
    salePrice: number;
    costPrice: number;
    commissionAmount: number;
    shippingCost: number;
    vatAmount: number;
    totalDeductions: number;
    netProfit: number;
    profitMargin: number;
    isProfit: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const salePrice = parseTurkishNumber(salePriceStr);
    const costPrice = parseTurkishNumber(costPriceStr) || 0;
    const commissionRate = parseTurkishNumber(commissionRateStr) || 0;
    const shipping = parseTurkishNumber(shippingCostStr) || 0;

    if (isNaN(salePrice) || salePrice <= 0) {
      setError('Lütfen geçerli bir satış fiyatı giriniz.');
      return;
    }

    const commissionAmount = (salePrice * commissionRate) / 100;
    // KDV Dahil Fiyattan hesaplanan KDV payı: Satış - (Satış / (1 + KDV))
    const vatAmount = salePrice - (salePrice / (1 + vatRate / 100));
    
    // Net Kâr = Satış Fiyatı - Ürün Maliyeti - Pazaryeri Komisyonu - Kargo - (Net KDV Farkı tahmini)
    const totalDeductions = costPrice + commissionAmount + shipping;
    const netProfit = salePrice - totalDeductions;
    const profitMargin = (netProfit / salePrice) * 100;
    const isProfit = netProfit >= 0;

    setResult({
      salePrice,
      costPrice,
      commissionAmount,
      shippingCost: shipping,
      vatAmount,
      totalDeductions,
      netProfit,
      profitMargin,
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
                <label htmlFor="salePrice" className="block text-sm font-medium mb-1 text-foreground">
                  Satış Fiyatı (KDV Dahil) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="salePrice"
                    placeholder="Örn: 500"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={salePriceStr}
                    onChange={(e) => setSalePriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL</div>
                </div>
              </div>

              <div>
                <label htmlFor="costPrice" className="block text-sm font-medium mb-1 text-foreground">
                  Ürün Alış Maliyeti (TL)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="costPrice"
                    placeholder="Örn: 220"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={costPriceStr}
                    onChange={(e) => setCostPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="commissionRate" className="block text-sm font-medium mb-1 text-foreground">
                  Pazaryeri Komisyonu (%) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="commissionRate"
                    placeholder="Örn: 18"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={commissionRateStr}
                    onChange={(e) => setCommissionRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">%</div>
                </div>
              </div>

              <div>
                <label htmlFor="shipping" className="block text-sm font-medium mb-1 text-foreground">
                  Kargo & Paketleme (TL)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="shipping"
                    placeholder="Örn: 45"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={shippingCostStr}
                    onChange={(e) => setShippingCostStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
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
              Net Kârı ve Marjı Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Sipariş Başına Net Kâr
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">{result.isProfit ? 'Birim Net Kazanç' : 'Birim Zarar'}</span>
                  <span className={`font-extrabold text-3xl sm:text-4xl tracking-tight ${
                    result.isProfit ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'
                  }`}>
                    {result.isProfit ? `+${formatCurrency(result.netProfit)}` : formatCurrency(result.netProfit)}
                  </span>
                  <span className={`text-xs font-semibold mt-1.5 px-2.5 py-1 rounded-md border ${
                    result.isProfit 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                      : 'bg-destructive/10 text-destructive border-destructive/20'
                  }`}>
                    Net Kâr Marjı: %{formatNumber(result.profitMargin, 1)}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Pazaryeri Komisyonu:</span>
                    <span className="font-semibold text-destructive">-{formatCurrency(result.commissionAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Ürün Alış Maliyeti:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.costPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Kargo Bedeli:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.shippingCost)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/komisyon-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Genel komisyon hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Fiyat, maliyet, komisyon ve kargo giderlerini girerek ürün başı net kârınızı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Pazaryeri Satışlarında Kâr Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          E-ticaret pazaryerlerinde (Trendyol, Hepsiburada vb.) satış yaparken kâr marjınızı belirleyen ana kalemler: ürün alış maliyeti, pazaryerinin kategori bazında kestiği komisyon yüzdesi ve kargo gönderim ücretidir.
        </p>
      </div>
    </div>
  );
}
