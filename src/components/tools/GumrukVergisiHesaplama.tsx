'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function GumrukVergisiHesaplama() {
  const [productPriceStr, setProductPriceStr] = useState<string>('25'); // Euro cinsinden ürün fiyatı
  const [origin, setOrigin] = useState<'eu' | 'non_eu'>('non_eu'); // AB dışı (%60) vs AB (%30)
  const [hasSpecialTax, setHasSpecialTax] = useState<boolean>(false); // ÖTV %20
  const [customsFeeStr] = useState<string>('150'); // Gümrük sunum ve damga pulu (~150 TL)

  const [result, setResult] = useState<{
    productPrice: number;
    customsDutyRate: number;
    customsDutyAmount: number;
    otvAmount: number;
    customsFee: number;
    totalTaxAndFees: number;
    totalLandedCost: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const price = parseTurkishNumber(productPriceStr);
    const fee = parseTurkishNumber(customsFeeStr) || 0;

    if (isNaN(price) || price <= 0) {
      setError('Lütfen geçerli bir ürün fiyatı giriniz.');
      return;
    }

    // Güncel Mevzuat: AB ülkelerinden gelenlerde %30, AB dışından gelenlerde %60
    const customsDutyRate = origin === 'eu' ? 30 : 60;
    const customsDutyAmount = (price * customsDutyRate) / 100;
    
    // ÖTV: Ürün IV Sayılı Liste kapsamındaysa ek %20 ÖTV
    const otvAmount = hasSpecialTax ? (price * 0.20) : 0;
    const totalTaxAndFees = customsDutyAmount + otvAmount + fee;
    const totalLandedCost = price + totalTaxAndFees;

    setResult({
      productPrice: price,
      customsDutyRate,
      customsDutyAmount,
      otvAmount,
      customsFee: fee,
      totalTaxAndFees,
      totalLandedCost,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="productPrice" className="block text-sm font-medium mb-1 text-foreground">
                Ürün Fiyatı (TL Karşılığı) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="productPrice"
                  placeholder="Örn: 800"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={productPriceStr}
                  onChange={(e) => setProductPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-foreground">
                Gönderici Ülke (Menşe)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOrigin('eu')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    origin === 'eu'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Avrupa Birliği (%30 Vergi)
                </button>
                <button
                  type="button"
                  onClick={() => setOrigin('non_eu')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    origin === 'non_eu'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Çin / ABD / Diğer (%60 Vergi)
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="hasSpecialTax"
                checked={hasSpecialTax}
                onChange={(e) => setHasSpecialTax(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="hasSpecialTax" className="text-xs text-foreground font-medium cursor-pointer">
                ÖTV Kapsamında Ürün (Ek %20 ÖTV)
              </label>
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
              Gümrük Vergisini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Gümrük ve Toplam Maliyet
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Kapıda Toplam Maliyet</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.totalLandedCost)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Ödenecek Toplam Vergi: {formatCurrency(result.totalTaxAndFees)}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Ürün Bedeli:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.productPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Gümrük Vergisi (%{result.customsDutyRate}):</span>
                    <span className="font-semibold text-destructive">+{formatCurrency(result.customsDutyAmount)}</span>
                  </div>
                  {result.otvAmount > 0 && (
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-muted-foreground">ÖTV (%20):</span>
                      <span className="font-semibold text-destructive">+{formatCurrency(result.otvAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Gümrük Sunum & Damga Pulu:</span>
                    <span className="font-semibold text-foreground">+{formatCurrency(result.customsFee)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kdv-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    KDV hesaplama aracına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Yurtdışı sipariş tutarını girerek gümrük vergisi ve teslim maliyetini hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Yurtdışı Bireysel Alışveriş Gümrük Vergisi Oranları</h2>
        <p className="mb-4 text-muted-foreground">
          Türkiye&apos;de 4458 sayılı Gümrük Kanunu kararnamesi uyarınca posta veya hızlı kargo ile gelen 30 Euro altındaki bireysel ticari olmayan gönderilerde; Avrupa Birliği ülkelerinden gelenlerde <strong>%30</strong>, diğer ülkelerden (Çin vb.) gelenlerde <strong>%60</strong> tek ve maktu gümrük vergisi uygulanır.
        </p>
      </div>
    </div>
  );
}
