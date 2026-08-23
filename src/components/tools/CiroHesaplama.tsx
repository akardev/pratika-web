'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

interface RevenueResult {
  quantity: number;
  averagePrice: number;
  totalRevenue: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
}

export default function CiroHesaplama() {
  const [quantityStr, setQuantityStr] = useState<string>('100');
  const [priceStr, setPriceStr] = useState<string>('250');
  const [period, setPeriod] = useState<'daily' | 'monthly'>('monthly');

  const [result, setResult] = useState<RevenueResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!quantityStr.trim()) {
      setError('Satış adedi 0\'dan büyük olmalıdır.');
      return;
    }

    const qty = parseTurkishNumber(quantityStr);
    if (isNaN(qty) || !Number.isInteger(qty) || qty <= 0) {
      setError('Satış adedi pozitif bir tam sayı olmalıdır.');
      return;
    }

    if (!priceStr.trim()) {
      setError('Birim satış fiyatı 0\'dan büyük olmalıdır.');
      return;
    }

    const price = parseTurkishNumber(priceStr);
    if (isNaN(price) || price <= 0) {
      setError('Birim satış fiyatı 0\'dan büyük olmalıdır.');
      return;
    }

    const baseRevenue = qty * price;
    let monthlyRevenue: number;
    let yearlyRevenue: number;

    if (period === 'daily') {
      monthlyRevenue = baseRevenue * 30;
      yearlyRevenue = baseRevenue * 365;
    } else {
      monthlyRevenue = baseRevenue;
      yearlyRevenue = baseRevenue * 12;
    }

    setResult({
      quantity: qty,
      averagePrice: price,
      totalRevenue: baseRevenue,
      monthlyRevenue,
      yearlyRevenue,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-2 p-1 bg-muted/40 rounded-xl border border-border/60 mb-2">
              <button
                type="button"
                onClick={() => setPeriod('daily')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  period === 'daily'
                    ? 'bg-card text-foreground shadow-xs border border-border/80'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Günlük Satış Bazında
              </button>
              <button
                type="button"
                onClick={() => setPeriod('monthly')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  period === 'monthly'
                    ? 'bg-card text-foreground shadow-xs border border-border/80'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Aylık Satış Bazında
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium mb-2 text-foreground">
                  {period === 'daily' ? 'Günlük Satış Adedi' : 'Aylık Satış Adedi'} <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="quantity"
                    placeholder="Örn: 100"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-14 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                    value={quantityStr}
                    onChange={(e) => setQuantityStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    Adet
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-2 text-foreground">
                  Ortalama Birim Fiyat <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="price"
                    placeholder="Örn: 250"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                    value={priceStr}
                    onChange={(e) => setPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
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
              Ciroyu Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Dönemsel Toplam Ciro</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.totalRevenue)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Aylık Projeksiyon: <strong>{formatCurrency(result.monthlyRevenue)}</strong>
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Satış Hacmi:</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.quantity)} Adet &times; {formatCurrency(result.averagePrice)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Aylık Tahmini Ciro:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.monthlyRevenue)}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                    <span className="font-medium text-foreground">Yıllık Tahmini Ciro:</span>
                    <span className="font-bold text-foreground text-sm sm:text-base">{formatCurrency(result.yearlyRevenue)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kar-marji-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Cirodan elde edilen kâr marjını hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Satış adedi ve birim fiyatı girin.</p>
                <p className="text-xs text-muted-foreground mt-1">Dönemsel, aylık ve yıllık ciro projeksiyonunuz burada görüntülenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Ciro (Hasılat) Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Ciro, bir işletmenin belirli bir dönemde mal veya hizmet satışından elde ettiği brüt gelir toplamıdır. Kâr ile karıştırılmamalıdır; giderler düşülmeden önceki toplam satış tutarıdır.
        </p>

        <div className="p-5 rounded-xl border border-border/80 bg-muted/30 font-mono text-xs sm:text-sm text-foreground mb-8 space-y-1.5">
          <p className="font-sans font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-1">
            Ciro Formülü:
          </p>
          <p className="font-semibold">Toplam Ciro = Satılan Ürün Adedi &times; Ortalama Satış Fiyatı</p>
        </div>

        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">Ciro ile kâr arasındaki fark nedir?</h4>
            <p className="text-muted-foreground mt-2">
              Ciro kasaya giren brüt toplam para tutarıdır; kâr ise bu cirodan maliyetler ve vergiler çıkarıldıktan sonra kalan net kazançtır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
