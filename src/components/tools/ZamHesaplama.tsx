'use client';

import { useState } from 'react';
import { formatCurrency, formatNumber, parseTurkishNumber } from '@/lib/utils';

type CalcMode = 'forward' | 'reverse';

interface ZamResult {
  mode: CalcMode;
  basePrice: number;
  rate: number;
  increaseAmount: number;
  finalPrice: number;
}

const PRESET_RATES = [5, 10, 15, 20, 25];

export default function ZamHesaplama() {
  const [mode, setMode] = useState<CalcMode>('forward');
  const [priceStr, setPriceStr] = useState<string>('');
  const [rateStr, setRateStr] = useState<string>('');
  const [result, setResult] = useState<ZamResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleModeChange = (newMode: CalcMode) => {
    setMode(newMode);
    setError(null);
    setResult(null);
  };

  const handlePresetRate = (rate: number) => {
    setRateStr(rate.toString());
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    // 1. Fiyat Kontrolü
    if (!priceStr.trim()) {
      setError('Fiyat boş bırakılamaz.');
      return;
    }

    const priceNum = parseTurkishNumber(priceStr);
    if (isNaN(priceNum)) {
      setError('Geçerli bir tutar girin.');
      return;
    }

    if (priceNum < 0) {
      setError('Fiyat negatif olamaz.');
      return;
    }

    // 2. Zam Oranı Kontrolü
    if (!rateStr.trim()) {
      setError('Zam oranı boş bırakılamaz.');
      return;
    }

    const rateNum = parseTurkishNumber(rateStr);
    if (isNaN(rateNum)) {
      setError('Geçerli bir zam oranı girin.');
      return;
    }

    if (rateNum < 0) {
      setError('Zam oranı negatif olamaz.');
      return;
    }

    if (mode === 'forward') {
      // Mod 1: Zamlı Fiyatı Hesapla
      const increaseAmount = priceNum * (rateNum / 100);
      const finalPrice = priceNum + increaseAmount;

      setResult({
        mode,
        basePrice: priceNum,
        rate: rateNum,
        increaseAmount,
        finalPrice,
      });
    } else {
      // Mod 2: Zam Öncesi Fiyatı Bul
      const oldPrice = priceNum / (1 + rateNum / 100);
      const increaseAmount = priceNum - oldPrice;

      setResult({
        mode,
        basePrice: oldPrice,
        rate: rateNum,
        increaseAmount,
        finalPrice: priceNum,
      });
    }
  };

  return (
    <div className="w-full">
      {/* Hesaplama Kartı */}
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        {/* İşlem Modu Seçimi (Tabs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 p-1 bg-muted/40 rounded-xl border border-border/60 mb-8 max-w-lg">
          <button
            type="button"
            onClick={() => handleModeChange('forward')}
            className={`py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              mode === 'forward'
                ? 'bg-card text-foreground shadow-xs border border-border/80'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Zamlı Fiyatı Hesapla
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('reverse')}
            className={`py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              mode === 'reverse'
                ? 'bg-card text-foreground shadow-xs border border-border/80'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Zam Öncesi Fiyatı Bul
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Sol Kolon: Form */}
          <form onSubmit={handleCalculate} noValidate className="space-y-5">
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-2 text-foreground">
                {mode === 'forward' ? 'Mevcut Fiyat (TL)' : 'Zamlı Fiyat (TL)'}{' '}
                <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="price"
                  placeholder={mode === 'forward' ? 'Örn: 10.000,00' : 'Örn: 12.500,00'}
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                  value={priceStr}
                  onChange={(e) => setPriceStr(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="rate" className="block text-sm font-medium text-foreground">
                  Zam Oranı (%) <span className="text-destructive">*</span>
                </label>
              </div>

              {/* Hızlı Oran Seçimi */}
              <div className="grid grid-cols-5 gap-2 mb-3">
                {PRESET_RATES.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handlePresetRate(preset)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      rateStr === preset.toString()
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
                  id="rate"
                  placeholder="Örn: 25"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                  value={rateStr}
                  onChange={(e) => setRateStr(e.target.value)}
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

                <div className="flex flex-col items-center justify-center mb-4">
                  <span className="text-xs text-muted-foreground mb-1">
                    {result.mode === 'forward' ? 'Zamlı Yeni Fiyat' : 'Zam Öncesi Fiyat'}
                  </span>
                  <span className="font-extrabold text-3xl sm:text-4xl tracking-tight text-primary">
                    {result.mode === 'forward'
                      ? formatCurrency(result.finalPrice)
                      : formatCurrency(result.basePrice)}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-4 space-y-2 text-xs sm:text-sm">
                  {result.mode === 'forward' ? (
                    <>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">Mevcut Fiyat:</span>
                        <span className="font-semibold text-foreground">
                          {formatCurrency(result.basePrice)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">Zam Oranı:</span>
                        <span className="font-semibold text-foreground">
                          %{formatNumber(result.rate, 2)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">Zam Tutarı:</span>
                        <span className="font-semibold text-foreground">
                          {formatCurrency(result.increaseAmount)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                        <span className="font-medium text-foreground">Zamlı Yeni Fiyat:</span>
                        <span className="font-bold text-foreground">
                          {formatCurrency(result.finalPrice)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">Zamlı Fiyat:</span>
                        <span className="font-semibold text-foreground">
                          {formatCurrency(result.finalPrice)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">Uygulanan Zam Oranı:</span>
                        <span className="font-semibold text-foreground">
                          %{formatNumber(result.rate, 2)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">Zam Tutarı:</span>
                        <span className="font-semibold text-foreground">
                          {formatCurrency(result.increaseAmount)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                        <span className="font-medium text-foreground">Zam Öncesi Fiyat:</span>
                        <span className="font-bold text-foreground">
                          {formatCurrency(result.basePrice)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">
                  {mode === 'forward'
                    ? 'Mevcut fiyatı ve zam oranını girip "Hesapla" butonuna basın.'
                    : 'Zamlı fiyatı ve zam oranını girip "Hesapla" butonuna basın.'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Zam tutarı ve nihai fiyat detayları burada görüntülenecektir.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO ve Bilgilendirme İçeriği */}
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Zam Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Zam hesaplama, bir ürünün, hizmetin veya maaşın mevcut tutarına belirli bir yüzde artış eklenerek yeni fiyatın bulunması işlemidir.
        </p>

        {/* Ters Zam Uyarısı */}
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 mb-8 text-sm text-foreground">
          <strong className="font-semibold text-primary block mb-1">
            Önemli Matematiksel Kural: Ters Zam Hesabı
          </strong>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Bir fiyata %25 zam yapıldıktan sonra, zamlı fiyattan doğrudan %25 çıkarmak eski fiyatı <strong>vermez</strong>. Örneğin 10.000 TL&apos;ye %25 zam yapıldığında fiyat 12.500 TL olur. Ancak 12.500 TL&apos;den %25 düşülürse 9.375 TL bulunur. Doğru zam öncesi fiyat hesabı bölme işlemi ile yapılır: <strong>12.500 / 1,25 = 10.000 TL</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">Örnek 1: %25 Zam</h3>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Mevcut:</strong> 10.000 TL
            </p>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Zam:</strong> 10.000 &times; 0,25 = <strong>2.500 TL</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Zamlı Fiyat:</strong> <strong>12.500 TL</strong>
            </p>
          </div>

          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">Örnek 2: %25 Ters Zam</h3>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Zamlı:</strong> 12.500 TL
            </p>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Formül:</strong> 12.500 / 1,25
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Eski Fiyat:</strong> <strong>10.000 TL</strong>
            </p>
          </div>

          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">Örnek 3: %10 Zam</h3>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Mevcut:</strong> 50.000 TL
            </p>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Zam:</strong> 50.000 &times; 0,10 = <strong>5.000 TL</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Zamlı Fiyat:</strong> <strong>55.000 TL</strong>
            </p>
          </div>
        </div>

        {/* Sıkça Sorulan Sorular (SSS) */}
        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">Zam nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Zam tutarı, mevcut fiyatın zam oranıyla çarpılıp 100&apos;e bölünmesiyle bulunur. Zamlı fiyat ise mevcut fiyata bu zam tutarının eklenmesiyle elde edilir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Zamlı fiyat nasıl bulunur?</h4>
            <p className="text-muted-foreground mt-2">
              Zamlı fiyatı tek işlemde bulmak için mevcut fiyatı (1 + Zam Oranı / 100) katsayısıyla çarpabilirsiniz. Örneğin %20 zam için fiyatı doğrudan 1,20 ile çarpabilirsiniz.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Zam öncesi fiyat nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Zamlı fiyattan eski fiyatı bulmak için zamlı tutar (1 + Zam Oranı / 100) katsayısına bölünür. Örneğin %25 zamlı 12.500 TL&apos;lik fiyat 1,25&apos;e bölünerek 10.000 TL zam öncesi tutara ulaşılır.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Zamlı fiyattan zam oranı nasıl çıkarılır?</h4>
            <p className="text-muted-foreground mt-2">
              Zamlı fiyattan doğrudan aynı yüzdeyi çıkarmak matematiksel olarak hatalı sonuç verir. Doğru yöntem bölme işlemi ile katsayıya bölmektir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">%25 zam nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Mevcut tutar 4&apos;e bölünerek %25 zam tutarı bulunur ve mevcut fiyata eklenir veya mevcut tutar doğrudan 1,25 ile çarpılır.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Zam ile indirim arasındaki fark nedir?</h4>
            <p className="text-muted-foreground mt-2">
              Zam fiyata eklenen artışı, indirim ise fiyattan düşülen eksilişi ifade eder. Her iki işlemde de baz alınan tutar başlangıç fiyatıdır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
