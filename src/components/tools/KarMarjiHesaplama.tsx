'use client';

import { useState } from 'react';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

type MarginMode = 'margin-calc' | 'target-price';

interface MarginResult {
  mode: MarginMode;
  cost: number;
  revenue: number;
  profit: number;
  marginRate: number | null;
  markupRate: number | null;
}

export default function KarMarjiHesaplama() {
  const [mode, setMode] = useState<MarginMode>('margin-calc');
  const [costStr, setCostStr] = useState<string>('');
  const [revenueStr, setRevenueStr] = useState<string>('');
  const [targetMarginStr, setTargetMarginStr] = useState<string>('');
  const [result, setResult] = useState<MarginResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleModeChange = (newMode: MarginMode) => {
    setMode(newMode);
    setError(null);
    setResult(null);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    // 1. Maliyet Kontrolü
    if (!costStr.trim()) {
      setError('Maliyet boş bırakılamaz.');
      return;
    }

    const costNum = parseTurkishNumber(costStr);
    if (isNaN(costNum)) {
      setError('Geçerli bir maliyet tutarı girin.');
      return;
    }

    if (costNum < 0) {
      setError('Maliyet negatif olamaz.');
      return;
    }

    if (mode === 'margin-calc') {
      // 2. Satış Fiyatı Kontrolü
      if (!revenueStr.trim()) {
        setError('Satış fiyatı boş bırakılamaz.');
        return;
      }

      const revenueNum = parseTurkishNumber(revenueStr);
      if (isNaN(revenueNum)) {
        setError('Geçerli bir satış fiyatı girin.');
        return;
      }

      if (revenueNum < 0) {
        setError('Satış fiyatı negatif olamaz.');
        return;
      }

      const profit = revenueNum - costNum;
      const marginRate = revenueNum === 0 ? null : (profit / revenueNum) * 100;
      const markupRate = costNum === 0 ? null : (profit / costNum) * 100;

      setResult({
        mode,
        cost: costNum,
        revenue: revenueNum,
        profit,
        marginRate,
        markupRate,
      });
    } else {
      // 3. Hedef Kâr Marjı Kontrolü
      if (!targetMarginStr.trim()) {
        setError('Hedef kâr marjı boş bırakılamaz.');
        return;
      }

      const targetMarginNum = parseTurkishNumber(targetMarginStr);
      if (isNaN(targetMarginNum)) {
        setError('Geçerli bir kâr marjı girin.');
        return;
      }

      if (targetMarginNum < 0) {
        setError('Kâr marjı negatif olamaz.');
        return;
      }

      if (targetMarginNum >= 100) {
        setError('Hedef kâr marjı %100 veya daha fazla olamaz.');
        return;
      }

      const revenue = costNum / (1 - targetMarginNum / 100);
      const profit = revenue - costNum;
      const markupRate = costNum === 0 ? null : (profit / costNum) * 100;

      setResult({
        mode,
        cost: costNum,
        revenue,
        profit,
        marginRate: targetMarginNum,
        markupRate,
      });
    }
  };

  const formatPercentage = (val: number | null): string => {
    if (val === null) return 'Hesaplanamaz';
    if (val < 0) {
      return `-%${formatNumber(Math.abs(val), 2)}`;
    }
    return `%${formatNumber(val, 2)}`;
  };

  return (
    <div className="w-full">
      {/* Hesaplama Kartı */}
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        {/* İşlem Türü Seçimi (Tabs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 p-1 bg-muted/40 rounded-xl border border-border/60 mb-8 max-w-lg">
          <button
            type="button"
            onClick={() => handleModeChange('margin-calc')}
            className={`py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              mode === 'margin-calc'
                ? 'bg-card text-foreground shadow-xs border border-border/80'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Kâr Marjı Hesapla
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('target-price')}
            className={`py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              mode === 'target-price'
                ? 'bg-card text-foreground shadow-xs border border-border/80'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Hedef Marja Göre Satış Fiyatı
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Sol Kolon: Form */}
          <form onSubmit={handleCalculate} noValidate className="space-y-5">
            <div>
              <label htmlFor="cost" className="block text-sm font-medium mb-2 text-foreground">
                Maliyet Tutarı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="cost"
                  placeholder="Örn: 800,00"
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

            {mode === 'margin-calc' ? (
              <div>
                <label htmlFor="revenue" className="block text-sm font-medium mb-2 text-foreground">
                  Satış Fiyatı (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="revenue"
                    placeholder="Örn: 1.000,00"
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
            ) : (
              <div>
                <label htmlFor="targetMargin" className="block text-sm font-medium mb-2 text-foreground">
                  Hedef Kâr Marjı (%) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="targetMargin"
                    placeholder="Örn: 20"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                    value={targetMarginStr}
                    onChange={(e) => setTargetMarginStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    %
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Hesapla
            </button>
          </form>

          {/* Sağ Kolon: Sonuç Paneli */}
          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-4">
                  <span className="text-xs text-muted-foreground mb-1">
                    {result.mode === 'margin-calc'
                      ? result.profit >= 0
                        ? 'Net Kâr'
                        : 'Net Zarar'
                      : 'Gerekli Satış Fiyatı'}
                  </span>
                  <span
                    className={`font-extrabold text-3xl sm:text-4xl tracking-tight ${
                      result.mode === 'margin-calc' && result.profit < 0
                        ? 'text-destructive'
                        : 'text-primary'
                    }`}
                  >
                    {result.mode === 'margin-calc'
                      ? formatCurrency(result.profit)
                      : formatCurrency(result.revenue)}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-4 space-y-2 text-xs sm:text-sm">
                  {result.mode === 'margin-calc' ? (
                    <>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">Maliyet:</span>
                        <span className="font-semibold text-foreground">
                          {formatCurrency(result.cost)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">Satış Fiyatı:</span>
                        <span className="font-semibold text-foreground">
                          {formatCurrency(result.revenue)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                        <span className="font-medium text-foreground">Kâr Marjı:</span>
                        <span className="font-bold text-foreground">
                          {formatPercentage(result.marginRate)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">Maliyet Üzerinden Kâr:</span>
                        <span className="font-semibold text-foreground">
                          {formatPercentage(result.markupRate)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">Maliyet:</span>
                        <span className="font-semibold text-foreground">
                          {formatCurrency(result.cost)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">Hedef Kâr Marjı:</span>
                        <span className="font-semibold text-foreground">
                          {formatPercentage(result.marginRate)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">Gerekli Kâr:</span>
                        <span className="font-semibold text-foreground">
                          {formatCurrency(result.profit)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                        <span className="font-medium text-foreground">Satış Fiyatı:</span>
                        <span className="font-bold text-foreground">
                          {formatCurrency(result.revenue)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">
                  {mode === 'margin-calc'
                    ? 'Maliyet ve satış fiyatını girip "Hesapla" butonuna basın.'
                    : 'Maliyet ve hedef kâr marjını girip "Hesapla" butonuna basın.'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Kâr tutarı, kâr marjı ve ilgili oranlar burada görüntülenecektir.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO ve Bilgilendirme İçeriği */}
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Kâr Marjı Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Kâr marjı, bir ürün veya hizmetin satışından elde edilen net kazancın satış fiyatına oranını ifade eder. 
          Ticarette sıklıkla birbirine karıştırılan <strong>Kâr Marjı</strong> ile <strong>Maliyet Üzerinden Kâr (Markup)</strong> oranları farklı matematiksel temellere dayanır.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">Örnek 1: Kâr Marjı Hesabı</h3>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Maliyet:</strong> 800 TL &mdash; <strong>Satış Fiyatı:</strong> 1.000 TL
            </p>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Kâr:</strong> 1.000 - 800 = <strong>200,00 TL</strong>
            </p>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Kâr Marjı:</strong> (200 / 1.000) &times; 100 = <strong>%20,00</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Maliyet Üzerinden Kâr:</strong> (200 / 800) &times; 100 = <strong>%25,00</strong>
            </p>
          </div>

          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">Örnek 2: Hedef Marj ile Satış Fiyatı</h3>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Maliyet:</strong> 800 TL &mdash; <strong>Hedef Marj:</strong> %20
            </p>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Formül:</strong> Satış Fiyatı = 800 / (1 - 0,20)
            </p>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Gerekli Satış Fiyatı:</strong> 800 / 0,80 = <strong>1.000,00 TL</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Elde Edilecek Kâr:</strong> 1.000 - 800 = <strong>200,00 TL</strong>
            </p>
          </div>
        </div>

        {/* Sıkça Sorulan Sorular (SSS) */}
        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">Kâr marjı nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Kâr marjı, toplam kâr tutarının satış fiyatına bölünmesi ve 100 ile çarpılmasıyla bulunur. Formülü: (Satış Fiyatı - Maliyet) / Satış Fiyatı &times; 100 şeklindedir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Kâr marjı ile kâr oranı arasındaki fark nedir?</h4>
            <p className="text-muted-foreground mt-2">
              Kâr marjı satış fiyatı üzerinden hesaplanırken, maliyet üzerinden kâr oranı (markup) ürünün alış veya üretim maliyeti baz alınarak hesaplanır. Bu nedenle maliyet üzerinden kâr oranı daima kâr marjından daha yüksek çıkar.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Hedef kâr marjına göre satış fiyatı nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Hedeflenen marjı yakalamak için maliyet tutarı (1 - Hedef Marj / 100) değerine bölünür. Örneğin 800 TL maliyetli bir üründen %20 kâr marjı elde etmek için 800 / 0,80 = 1.000 TL satış fiyatı belirlenmelidir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Kâr marjı ile maliyet üzerinden kâr aynı şey midir?</h4>
            <p className="text-muted-foreground mt-2">
              Hayır, aynı şey değildir. Örneğin 800 TL&apos;ye mal edilen ürün 1.000 TL&apos;ye satıldığında elde edilen 200 TL kâr; satış fiyatına göre %20 kâr marjı, maliyete göre ise %25 kâr oranı oluşturur.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Satış fiyatı maliyetten düşükse ne olur?</h4>
            <p className="text-muted-foreground mt-2">
              Satış fiyatı maliyetin altında kaldığında işletme zarar eder. Bu durumda kâr tutarı ve kâr marjı negatif değer alır (örneğin -%25 kâr marjı).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
