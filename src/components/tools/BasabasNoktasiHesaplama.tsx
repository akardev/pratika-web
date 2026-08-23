'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber } from '@/lib/utils';

interface BreakEvenResult {
  fixedCosts: number;
  salePrice: number;
  variableCost: number;
  contributionMargin: number;
  contributionRate: number;
  breakEvenUnits: number;
  breakEvenRevenue: number;
}

export default function BasabasNoktasiHesaplama() {
  const [fixedCostsStr, setFixedCostsStr] = useState<string>('');
  const [salePriceStr, setSalePriceStr] = useState<string>('');
  const [variableCostStr, setVariableCostStr] = useState<string>('');

  const [result, setResult] = useState<BreakEvenResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!fixedCostsStr.trim()) {
      setError('Toplam sabit giderler 0\'dan büyük olmalıdır.');
      return;
    }

    const fixedCosts = parseTurkishNumber(fixedCostsStr);
    if (isNaN(fixedCosts) || fixedCosts <= 0) {
      setError('Toplam sabit giderler 0\'dan büyük olmalıdır.');
      return;
    }

    if (!salePriceStr.trim()) {
      setError('Birim satış fiyatı 0\'dan büyük olmalıdır.');
      return;
    }

    const salePrice = parseTurkishNumber(salePriceStr);
    if (isNaN(salePrice) || salePrice <= 0) {
      setError('Birim satış fiyatı 0\'dan büyük olmalıdır.');
      return;
    }

    let variableCost = 0;
    if (variableCostStr.trim()) {
      variableCost = parseTurkishNumber(variableCostStr);
      if (isNaN(variableCost) || variableCost < 0) {
        setError('Geçerli bir birim değişken maliyet girin.');
        return;
      }
    }

    if (variableCost >= salePrice) {
      setError('Birim değişken maliyet satış fiyatına eşit veya daha büyük olamaz.');
      return;
    }

    const contributionMargin = salePrice - variableCost;
    const contributionRate = (contributionMargin / salePrice) * 100;
    const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
    const breakEvenRevenue = breakEvenUnits * salePrice;

    setResult({
      fixedCosts,
      salePrice,
      variableCost,
      contributionMargin,
      contributionRate,
      breakEvenUnits,
      breakEvenRevenue,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="fixedCosts" className="block text-sm font-medium mb-2 text-foreground">
                Toplam Sabit Giderler (Kira, Maaş vb.) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="fixedCosts"
                  placeholder="Örn: 50.000"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                  value={fixedCostsStr}
                  onChange={(e) => setFixedCostsStr(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="salePrice" className="block text-sm font-medium mb-2 text-foreground">
                  Birim Satış Fiyatı <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="salePrice"
                    placeholder="Örn: 500"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                    value={salePriceStr}
                    onChange={(e) => setSalePriceStr(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    TL
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="variableCost" className="block text-sm font-medium mb-2 text-foreground">
                  Birim Değişken Maliyet
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="variableCost"
                    placeholder="Örn: 200"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                    value={variableCostStr}
                    onChange={(e) => setVariableCostStr(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    TL
                  </div>
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
              Başabaş Noktasını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Kâra Geçiş İçin Gereken Satış</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatNumber(result.breakEvenUnits)} Adet
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Gereken Ciro: <strong>{formatCurrency(result.breakEvenRevenue)}</strong>
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Sabit Giderler Toplamı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.fixedCosts)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Birim Katkı Payı (Kâr Payı):</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.contributionMargin)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Katkı Marjı Oranı:</span>
                    <span className="font-semibold text-foreground">%{formatNumber(result.contributionRate)}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                    <span className="font-medium text-foreground">Başabaş Satış Hasılatı:</span>
                    <span className="font-bold text-foreground text-sm sm:text-base">{formatCurrency(result.breakEvenRevenue)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/maliyet-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Birim ürün maliyetinizi detaylandırın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Sabit giderler, satış fiyatı ve değişken maliyeti girin.</p>
                <p className="text-xs text-muted-foreground mt-1">Sıfır kâr/zarar başabaş noktası satış adedi burada görüntülenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Başabaş Noktası (Break-Even Point) Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Başabaş noktası, toplam satış gelirlerinin toplam maliyetlere eşit olduğu, kârın ve zararın sıfır olduğu işletme üretim ve satış hacmidir.
        </p>

        <div className="p-5 rounded-xl border border-border/80 bg-muted/30 font-mono text-xs sm:text-sm text-foreground mb-8 space-y-1.5">
          <p className="font-sans font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-1">
            Başabaş Formülleri:
          </p>
          <p className="font-semibold">Birim Katkı Payı = Satış Fiyatı - Değişken Maliyet</p>
          <p className="font-semibold">Başabaş Satış Adedi = Toplam Sabit Giderler / Birim Katkı Payı</p>
          <p className="font-semibold">Başabaş Cirosu = Başabaş Adedi &times; Satış Fiyatı</p>
        </div>

        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">Sabit gider ile değişken gider farkı nedir?</h4>
            <p className="text-muted-foreground mt-2">
              Kira, idari maaşlar ve lisanslar satıştan bağımsız sabit giderdir; hammadde, kargo ve paketleme ise satılan ürün adedine göre değişen giderdir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Başabaş noktasının üzerinde satış yapılırsa ne olur?</h4>
            <p className="text-muted-foreground mt-2">
              Başabaş adedinin üzerindeki her bir adet satış, birim katkı payı tutarı kadar doğrudan işletmenin net kâr hanesine yazılır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
