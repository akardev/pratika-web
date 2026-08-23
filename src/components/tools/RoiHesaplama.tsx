'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

interface RoiResult {
  cost: number;
  revenue: number;
  netProfit: number;
  roiPercentage: number;
}

export default function RoiHesaplama() {
  const [costStr, setCostStr] = useState<string>('');
  const [revenueStr, setRevenueStr] = useState<string>('');

  const [result, setResult] = useState<RoiResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!costStr.trim()) {
      setError('Yatırım maliyeti 0\'dan büyük olmalıdır.');
      return;
    }

    const cost = parseTurkishNumber(costStr);
    if (isNaN(cost) || cost <= 0) {
      setError('Yatırım maliyeti 0\'dan büyük olmalıdır.');
      return;
    }

    if (!revenueStr.trim()) {
      setError('Toplam getiri / kazanç tutarı boş olamaz.');
      return;
    }

    const revenue = parseTurkishNumber(revenueStr);
    if (isNaN(revenue) || revenue < 0) {
      setError('Geçerli bir toplam getiri tutarı girin.');
      return;
    }

    const netProfit = revenue - cost;
    const roiPercentage = (netProfit / cost) * 100;

    setResult({
      cost,
      revenue,
      netProfit,
      roiPercentage,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="cost" className="block text-sm font-medium mb-2 text-foreground">
                Yatırım Maliyeti (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="cost"
                  placeholder="Örn: 50.000"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                  value={costStr}
                  onChange={(e) => setCostStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="revenue" className="block text-sm font-medium mb-2 text-foreground">
                Elde Edilen Toplam Getiri / Değer (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="revenue"
                  placeholder="Örn: 75.000"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                  value={revenueStr}
                  onChange={(e) => setRevenueStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL
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
              ROI Getirisini Hesapla
            </button>
          </form>

          {/* Sağ Kolon: Sonuç */}
          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Yatırım Getirisi Oranı (ROI)</span>
                  <span className={`font-extrabold text-3xl sm:text-4xl tracking-tight ${result.roiPercentage >= 0 ? 'text-primary' : 'text-destructive'}`}>
                    %{formatNumber(result.roiPercentage)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Net Kazanç: <strong>{formatCurrency(result.netProfit)}</strong>
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Yatırım Maliyeti:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.cost)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Toplam Getiri:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.revenue)}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                    <span className="font-medium text-foreground">Net Kâr / Zarar:</span>
                    <span className={`font-bold text-sm sm:text-base ${result.netProfit >= 0 ? 'text-foreground' : 'text-destructive'}`}>
                      {formatCurrency(result.netProfit)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kar-zarar-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Ürün kâr ve zararınızı hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Yatırım maliyeti ve toplam getiriyi girip hesaplayın.</p>
                <p className="text-xs text-muted-foreground mt-1">Yatırım getirisi oranı (ROI) ve net kâr burada görüntülenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">ROI (Yatırım Getirisi) Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          ROI (Return on Investment), yapılan bir yatırımın maliyetine kıyasla ne kadar verimli ve kârlı olduğunu gösteren finansal performans ölçütüdür.
        </p>

        <div className="p-5 rounded-xl border border-border/80 bg-muted/30 font-mono text-xs sm:text-sm text-foreground mb-8 space-y-1.5">
          <p className="font-sans font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-1">
            ROI Formülü:
          </p>
          <p className="font-semibold">Net Kâr = Toplam Getiri - Yatırım Maliyeti</p>
          <p className="font-semibold">ROI (%) = (Net Kâr / Yatırım Maliyeti) &times; 100</p>
        </div>

        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">ROI nedir?</h4>
            <p className="text-muted-foreground mt-2">
              ROI (Yatırımın Getirisi), bir projeye veya varlığa yatırılan paranın yüzde kaç oranında kâr sağladığını gösterir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">ROI negatif çıkarsa ne anlama gelir?</h4>
            <p className="text-muted-foreground mt-2">
              Negatif bir ROI oranı, yapılan yatırımın getirisinin başlangıç maliyetini karşılayamadığını ve yatırımın zararla sonuçlandığını gösterir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">İyi bir ROI oranı kaç olmalıdır?</h4>
            <p className="text-muted-foreground mt-2">
              İyi bir ROI oranı sektöre, enflasyon ortamına ve risksiz mevduat getirisine göre değişir. Genel olarak risksiz faiz oranının üzerindeki ROI başarılı kabul edilir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
