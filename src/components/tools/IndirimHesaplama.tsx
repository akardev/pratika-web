'use client';

import { useState } from 'react';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

interface DiscountResult {
  originalPrice: number;
  discountRate: number;
  discountAmount: number;
  finalPrice: number;
}

const PRESET_DISCOUNTS = [10, 20, 30, 50];

export default function IndirimHesaplama() {
  const [priceStr, setPriceStr] = useState<string>('');
  const [discountStr, setDiscountStr] = useState<string>('');
  const [result, setResult] = useState<DiscountResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePresetDiscount = (rate: number) => {
    setDiscountStr(rate.toString());
    setError(null);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    // 1. Fiyat Kontrolü
    if (!priceStr.trim()) {
      setError('Ürün fiyatı boş bırakılamaz.');
      return;
    }

    const priceNum = parseTurkishNumber(priceStr);
    if (isNaN(priceNum)) {
      setError('Geçerli bir ürün fiyatı girin.');
      return;
    }

    if (priceNum < 0) {
      setError('Ürün fiyatı negatif olamaz.');
      return;
    }

    // 2. İndirim Oranı Kontrolü
    if (!discountStr.trim()) {
      setError('İndirim oranı boş bırakılamaz.');
      return;
    }

    const discountNum = parseTurkishNumber(discountStr);
    if (isNaN(discountNum)) {
      setError('Geçerli bir indirim oranı girin.');
      return;
    }

    if (discountNum < 0) {
      setError('İndirim oranı negatif olamaz.');
      return;
    }

    if (discountNum > 100) {
      setError('İndirim oranı %100\'den büyük olamaz.');
      return;
    }

    const discountAmount = (priceNum * discountNum) / 100;
    const finalPrice = priceNum - discountAmount;

    setResult({
      originalPrice: priceNum,
      discountRate: discountNum,
      discountAmount,
      finalPrice,
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
              <label htmlFor="price" className="block text-sm font-medium mb-2 text-foreground">
                Ürün Fiyatı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="price"
                  placeholder="Örn: 1.500,00"
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

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="discount" className="block text-sm font-medium text-foreground">
                  İndirim Oranı (%) <span className="text-destructive">*</span>
                </label>
              </div>

              {/* Hızlı Oran Seçimi */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {PRESET_DISCOUNTS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handlePresetDiscount(preset)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      discountStr === preset.toString()
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/40'
                    }`}
                  >
                    %{preset}
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="discount"
                  placeholder="Örn: 20"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                  value={discountStr}
                  onChange={(e) => setDiscountStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  %
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

                {/* Ana Sonuç (Hero) */}
                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-1">Ödenecek İndirimli Fiyat</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.finalPrice)}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                    -{formatCurrency(result.discountAmount)} Tasarruf
                  </span>
                </div>

                {/* Detay Tablosu */}
                <div className="border-t border-border/60 pt-4 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Normal Fiyat:</span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(result.originalPrice)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">İndirim Oranı:</span>
                    <span className="font-semibold text-foreground">
                      %{formatNumber(result.discountRate, 2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">İndirim Tutarı (Kazanç):</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      -{formatCurrency(result.discountAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                    <span className="font-medium text-foreground">Son Fiyat:</span>
                    <span className="font-bold text-foreground text-sm sm:text-base">
                      {formatCurrency(result.finalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">
                  Ürün fiyatını ve indirim oranını girip &ldquo;Hesapla&rdquo; butonuna basın.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  İndirimli fiyat ve tasarruf tutarınız burada görüntülenecektir.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO ve Bilgilendirme İçeriği */}
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">İndirim Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          İndirim hesaplama, ürünün etiket fiyatından yapılan yüzde indirimin parasal karşılığını (indirim tutarını) ve kasada ödenecek nihai indirimli fiyatı bulma işlemidir.
        </p>

        {/* Gerçek Örnekler */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">Örnek 1: %20 İndirim</h3>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Normal Fiyat:</strong> 1.500 TL
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-1">
              İndirim: 300,00 TL
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Ödenecek:</strong> 1.200,00 TL
            </p>
          </div>

          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">Örnek 2: %30 İndirim</h3>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Normal Fiyat:</strong> 500 TL
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-1">
              İndirim: 150,00 TL
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Ödenecek:</strong> 350,00 TL
            </p>
          </div>

          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">Örnek 3: %50 İndirim</h3>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Normal Fiyat:</strong> 2.000 TL
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-1">
              İndirim: 1.000,00 TL
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Ödenecek:</strong> 1.000,00 TL
            </p>
          </div>
        </div>

        {/* Sıkça Sorulan Sorular (SSS) */}
        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">İndirim nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Normal fiyatı indirim oranı ile çarpıp 100&apos;e bölerek indirim tutarını bulabilirsiniz. Ardından bu tutarı ilk fiyattan çıkardığınızda ödenecek indirimli fiyata ulaşırsınız.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">İndirimli fiyat tek işlemde nasıl bulunur?</h4>
            <p className="text-muted-foreground mt-2">
              İndirimli fiyatı doğrudan bulmak için (1 - İndirim Oranı / 100) katsayısını kullanabilirsiniz. Örneğin %20 indirimli fiyat için etiketi doğrudan 0,80 ile; %30 indirim için 0,70 ile çarpmanız yeterlidir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">%20 indirim nasıl pratik hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Bir fiyatın %20 indirimini zihinden bulmak için fiyatı 5&apos;e bölüp (beşte biri) ilk fiyattan çıkarabilirsiniz. Örneğin 100 TL / 5 = 20 TL indirim; 100 - 20 = 80 TL ödenecek tutar.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Art arda iki indirim (%50 + %20) neden %70 indirim yapmaz?</h4>
            <p className="text-muted-foreground mt-2">
              İkinci indirim ilk etiket fiyatı üzerinden değil, ilk indirim uygulandıktan sonraki ara fiyat üzerinden hesaplanır. Örneğin 100 TL&apos;ye önce %50 indirim (50 TL) ve ardından kalan 50 TL&apos;ye %20 indirim (10 TL) uygulandığında toplam ödenen 40 TL olur; bu da %60 net indirim demektir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">İndirim ile zam arasındaki fark nedir?</h4>
            <p className="text-muted-foreground mt-2">
              İndirim, başlangıç fiyatından yapılan parasal eksilişi ifade ederken; zam, başlangıç fiyatına yapılan parasal artışı ifade eder.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">İndirimli fiyattan indirimsiz ilk fiyat nasıl bulunur?</h4>
            <p className="text-muted-foreground mt-2">
              İndirimli fiyatı (1 - İndirim Oranı / 100) değerine bölerek eski etiket fiyatına ulaşabilirsiniz. Örneğin %20 indirimli 800 TL&apos;lik ürünün orijinal fiyatı: 800 / 0,80 = 1.000 TL&apos;dir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
