'use client';

import { useState } from 'react';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

interface KarZararResult {
  cost: number;
  sale: number;
  diff: number; // pozitif kâr, negatif zarar
  rate: number | null; // null ise hesaplanamaz (sıfır maliyet)
  marginRate: number | null; // bilgilendirme amaçlı kâr marjı
}

export default function KarZararHesaplama() {
  const [costStr, setCostStr] = useState<string>('');
  const [saleStr, setSaleStr] = useState<string>('');
  const [result, setResult] = useState<KarZararResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      setError('Geçerli bir tutar girin.');
      return;
    }

    if (costNum < 0) {
      setError('Maliyet negatif olamaz.');
      return;
    }

    // 2. Satış Fiyatı Kontrolü
    if (!saleStr.trim()) {
      setError('Satış fiyatı boş bırakılamaz.');
      return;
    }

    const saleNum = parseTurkishNumber(saleStr);
    if (isNaN(saleNum)) {
      setError('Geçerli bir tutar girin.');
      return;
    }

    if (saleNum < 0) {
      setError('Satış fiyatı negatif olamaz.');
      return;
    }

    // 3. Hesaplama
    const diff = saleNum - costNum;

    // Oran hesabı (maliyet 0 ise tanımsız/hesaplanamaz)
    let rate: number | null = null;
    if (costNum > 0) {
      rate = (diff / costNum) * 100;
    } else if (costNum === 0 && saleNum === 0) {
      rate = 0;
    }

    // Kâr marjı (satış 0 ise tanımsız)
    let marginRate: number | null = null;
    if (saleNum > 0) {
      marginRate = (diff / saleNum) * 100;
    }

    setResult({
      cost: costNum,
      sale: saleNum,
      diff,
      rate,
      marginRate,
    });
  };

  return (
    <div className="w-full">
      {/* Hesaplama Kartı */}
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Sol Kolon: Form */}
          <form onSubmit={handleCalculate} noValidate className="space-y-5">
            <div>
              <label htmlFor="cost" className="block text-sm font-medium mb-2 text-foreground">
                Maliyet (TL) <span className="text-destructive">*</span>
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

            <div>
              <label htmlFor="sale" className="block text-sm font-medium mb-2 text-foreground">
                Satış Fiyatı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="sale"
                  placeholder="Örn: 1.000,00"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                  value={saleStr}
                  onChange={(e) => setSaleStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
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
              className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Kâr / Zarar Hesapla
            </button>
          </form>

          {/* Sağ Kolon: Sonuç Paneli */}
          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                {/* Ana Sonuç (Hero) */}
                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 ${
                      result.diff > 0
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                        : result.diff < 0
                        ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {result.diff > 0
                      ? 'KÂR ELDE EDİLDİ'
                      : result.diff < 0
                      ? 'ZARAR EDİLDİ'
                      : 'KÂR / ZARAR YOK (BAŞABAŞ)'}
                  </span>

                  <span
                    className={`font-extrabold text-3xl sm:text-4xl tracking-tight ${
                      result.diff > 0
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : result.diff < 0
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-foreground'
                    }`}
                  >
                    {formatCurrency(Math.abs(result.diff))}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {result.diff > 0 ? 'Net Kâr Tutarı' : result.diff < 0 ? 'Net Zarar Tutarı' : 'Net Fark'}
                  </span>
                </div>

                {/* Detay Tablosu */}
                <div className="border-t border-border/60 pt-4 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Maliyet:</span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(result.cost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Satış Fiyatı:</span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(result.sale)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Kâr / Zarar Tutarı:</span>
                    <span
                      className={`font-bold ${
                        result.diff > 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : result.diff < 0
                          ? 'text-rose-600 dark:text-rose-400'
                          : 'text-foreground'
                      }`}
                    >
                      {result.diff > 0
                        ? `+${formatCurrency(result.diff)}`
                        : result.diff < 0
                        ? `-${formatCurrency(Math.abs(result.diff))}`
                        : '0,00 TL'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                    <span className="font-medium text-foreground">Maliyete Göre Kâr/Zarar Oranı:</span>
                    <span
                      className={`font-bold ${
                        result.diff > 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : result.diff < 0
                          ? 'text-rose-600 dark:text-rose-400'
                          : 'text-foreground'
                      }`}
                    >
                      {result.rate !== null ? `%${formatNumber(result.rate, 2)}` : 'Hesaplanamaz'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">
                  Maliyeti ve satış fiyatını girip &ldquo;Kâr / Zarar Hesapla&rdquo; butonuna basın.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Net kâr/zarar tutarınız ve oranınız burada görüntülenecektir.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO ve Bilgilendirme İçeriği */}
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Kâr ve Zarar Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Kâr ve zarar hesaplama, bir ürünün veya hizmetin satış fiyatından maliyetinin çıkarılmasıyla ne kadar net kazanç veya kayıp oluştuğunu gösteren temel finansal işlemdir.
        </p>

        {/* Kâr Marjı ile Ayrım Kutusu */}
        <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 mb-8 text-sm text-foreground space-y-2">
          <strong className="font-semibold text-primary block text-base">
            Kâr/Zarar Oranı ile Kâr Marjı Arasındaki Fark
          </strong>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            <strong>Kâr/Zarar Oranı (Markup):</strong> Elde edilen kârın ürünün <em>maliyetine</em> bölünmesiyle hesaplanır (Örn: 800 TL maliyetli ürün 1.000 TL&apos;ye satılırsa 200 / 800 = <strong>%25 Kâr Oranı</strong>).
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            <strong>Kâr Marjı (Margin):</strong> Elde edilen kârın ürünün <em>satış fiyatına</em> bölünmesiyle hesaplanır (Örn: 200 / 1.000 = <strong>%20 Kâr Marjı</strong>).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">Örnek 1: Kâr Durumu</h3>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Maliyet:</strong> 800 TL | <strong>Satış:</strong> 1.000 TL
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-1">
              Kâr: +200,00 TL
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Kâr Oranı:</strong> %25,00
            </p>
          </div>

          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">Örnek 2: Zarar Durumu</h3>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Maliyet:</strong> 1.000 TL | <strong>Satış:</strong> 800 TL
            </p>
            <p className="text-xs text-rose-600 dark:text-rose-400 font-bold mb-1">
              Zarar: -200,00 TL
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Zarar Oranı:</strong> -%20,00
            </p>
          </div>

          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">Örnek 3: Başabaş</h3>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Maliyet:</strong> 1.000 TL | <strong>Satış:</strong> 1.000 TL
            </p>
            <p className="text-xs font-bold text-foreground mb-1">
              Fark: 0,00 TL
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Oran:</strong> %0,00
            </p>
          </div>
        </div>

        {/* Sıkça Sorulan Sorular (SSS) */}
        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">Kâr nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Kâr, satış fiyatından maliyetin çıkarılmasıyla bulunur. Satış fiyatı maliyetten büyükse aradaki pozitif fark net kâr tutarıdır.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Zarar nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Satış fiyatı maliyetten küçük olduğunda ortaya çıkan negatif fark zarardır. Maliyetten satış fiyatı çıkarılarak zarar miktarı belirlenir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Kâr/Zarar oranı nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Elde edilen kâr veya zarar tutarı maliyete bölünür ve 100 ile çarpılır. Formül: ((Satış - Maliyet) / Maliyet) &times; 100.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Kâr oranı ile kâr marjı aynı şey midir?</h4>
            <p className="text-muted-foreground mt-2">
              Hayır. Kâr oranı maliyeti referans alırken (kâr / maliyet), kâr marjı satış fiyatını referans alır (kâr / satış). Bu nedenle kâr oranı matematiksel olarak kâr marjından daha büyüktür.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Maliyet sıfır (0 TL) olduğunda kâr oranı neden hesaplanamaz?</h4>
            <p className="text-muted-foreground mt-2">
              Matematikte bir sayının sıfıra bölünmesi tanımsızdır. Bu durumda kâr tutarı tam olarak satış fiyatına eşittir ancak maliyet üzerinden oran hesaplanamaz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
