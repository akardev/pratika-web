'use client';

import { useState } from 'react';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

type KdvMode = 'haric-to-dahil' | 'dahil-to-haric';

interface KdvResult {
  mode: KdvMode;
  kdvHaric: number;
  kdvAmount: number;
  kdvDahil: number;
  kdvRate: number;
}

export default function KdvHesaplama() {
  const [mode, setMode] = useState<KdvMode>('haric-to-dahil');
  const [amountStr, setAmountStr] = useState<string>('');
  const [selectedRateType, setSelectedRateType] = useState<string>('20');
  const [customRate, setCustomRate] = useState<string>('');
  const [result, setResult] = useState<KdvResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleModeChange = (newMode: KdvMode) => {
    setMode(newMode);
    setError(null);
    setResult(null);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!amountStr.trim()) {
      setError('Tutar boş bırakılamaz.');
      return;
    }

    const amountNum = parseTurkishNumber(amountStr);
    if (isNaN(amountNum)) {
      setError('Geçerli bir tutar girin.');
      return;
    }

    if (amountNum < 0) {
      setError('Tutar negatif olamaz.');
      return;
    }

    let rateNum: number;
    if (selectedRateType === 'custom') {
      if (!customRate.trim()) {
        setError('KDV oranı boş bırakılamaz.');
        return;
      }
      rateNum = parseTurkishNumber(customRate);
      if (isNaN(rateNum)) {
        setError('Geçerli bir KDV oranı girin.');
        return;
      }
      if (rateNum < 0) {
        setError('KDV oranı negatif olamaz.');
        return;
      }
      if (rateNum > 100) {
        setError('KDV oranı 0 ile 100 arasında olmalıdır.');
        return;
      }
    } else {
      rateNum = parseFloat(selectedRateType);
    }

    let kdvHaric: number;
    let kdvAmount: number;
    let kdvDahil: number;

    if (mode === 'haric-to-dahil') {
      kdvHaric = amountNum;
      kdvAmount = (amountNum * rateNum) / 100;
      kdvDahil = amountNum + kdvAmount;
    } else {
      kdvDahil = amountNum;
      kdvHaric = amountNum / (1 + rateNum / 100);
      kdvAmount = amountNum - kdvHaric;
    }

    setResult({
      mode,
      kdvHaric,
      kdvAmount,
      kdvDahil,
      kdvRate: rateNum,
    });
  };

  return (
    <div className="w-full">
      {/* Hesaplama Kartı */}
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        {/* İşlem Türü Seçimi (Tabs) */}
        <div className="grid grid-cols-2 p-1 bg-muted/40 rounded-xl border border-border/60 mb-8 max-w-md">
          <button
            type="button"
            onClick={() => handleModeChange('haric-to-dahil')}
            className={`py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              mode === 'haric-to-dahil'
                ? 'bg-card text-foreground shadow-xs border border-border/80'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            KDV Hariç Fiyattan
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('dahil-to-haric')}
            className={`py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              mode === 'dahil-to-haric'
                ? 'bg-card text-foreground shadow-xs border border-border/80'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            KDV Dahil Fiyattan
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Sol Kolon: Form */}
          <form onSubmit={handleCalculate} noValidate className="space-y-5">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-2 text-foreground">
                {mode === 'haric-to-dahil' ? 'KDV Hariç Tutar (TL)' : 'KDV Dahil Tutar (TL)'}{' '}
                <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="amount"
                  placeholder="Örn: 1.000,00"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                  value={amountStr}
                  onChange={(e) => setAmountStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                KDV Oranı (%) <span className="text-destructive">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['1', '10', '20'].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => {
                      setSelectedRateType(rate);
                      setCustomRate('');
                      setError(null);
                    }}
                    className={`py-2.5 px-3 text-sm font-semibold rounded-lg border transition-all ${
                      selectedRateType === rate
                        ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                        : 'bg-background text-foreground border-border hover:bg-muted/40'
                    }`}
                  >
                    %{rate}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRateType('custom');
                    setError(null);
                  }}
                  className={`py-2.5 px-3 text-sm font-semibold rounded-lg border transition-all ${
                    selectedRateType === 'custom'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border hover:bg-muted/40'
                  }`}
                >
                  Özel
                </button>
              </div>

              {selectedRateType === 'custom' && (
                <div className="relative mt-2">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Örn: 8"
                    value={customRate}
                    onChange={(e) => setCustomRate(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    %
                  </span>
                </div>
              )}
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
                    {result.mode === 'haric-to-dahil' ? 'KDV Dahil Toplam Tutar' : 'KDV Hariç Net Tutar'}
                  </span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {result.mode === 'haric-to-dahil'
                      ? formatCurrency(result.kdvDahil)
                      : formatCurrency(result.kdvHaric)}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-4 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">KDV Hariç Tutar:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.kdvHaric)}</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">KDV Oranı:</span>
                    <span className="font-semibold text-foreground">%{formatNumber(result.kdvRate)}</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Hesaplanan KDV:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.kdvAmount)}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                    <span className="font-medium text-foreground">KDV Dahil Tutar:</span>
                    <span className="font-bold text-foreground text-sm sm:text-base">{formatCurrency(result.kdvDahil)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Tutar ve KDV oranını seçip &ldquo;Hesapla&rdquo; butonuna basın.</p>
                <p className="text-xs text-muted-foreground mt-1">KDV tutarı, KDV hariç ve KDV dahil fiyatlar burada görüntülenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO ve Bilgilendirme İçeriği */}
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">KDV Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Katma Değer Vergisi (KDV), tüketim harcamaları üzerinden alınan dolaylı bir vergidir. 
          Hesaplama işlemi fiyata KDV ekleme (KDV Hariçten KDV Dahile) veya fiyattan KDV ayırma (KDV Dahilden KDV Harice) şeklinde iki farklı yöntemle yapılır.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">1. KDV Ekleme (KDV Hariçten Dahile):</h3>
            <p className="text-xs text-muted-foreground mb-2">
              <strong>Formül:</strong> KDV Dahil = KDV Hariç &times; (1 + KDV Oranı / 100)
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Örnek:</strong> 1.000 TL KDV hariç tutarın %20 KDV dahil fiyatı: 1.000 &times; 1,20 = <strong>1.200,00 TL</strong> (KDV: 200,00 TL).
            </p>
          </div>

          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">2. KDV Ayırma (KDV Dahilden Harice):</h3>
            <p className="text-xs text-muted-foreground mb-2">
              <strong>Formül:</strong> KDV Hariç = KDV Dahil / (1 + KDV Oranı / 100)
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Örnek:</strong> 1.200 TL KDV dahil tutarın %20 KDV hariç fiyatı: 1.200 / 1,20 = <strong>1.000,00 TL</strong> (KDV: 200,00 TL).
            </p>
          </div>
        </div>

        {/* Sıkça Sorulan Sorular (SSS) */}
        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">KDV nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              KDV tutarını bulmak için vergisiz (net) tutar geçerli KDV oranı ile çarpılıp 100&apos;e bölünür. Bulunan vergi tutarı net fiyata eklenerek KDV dahil toplam satış fiyatı elde edilir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">KDV dahil fiyattan KDV nasıl çıkarılır?</h4>
            <p className="text-muted-foreground mt-2">
              KDV dahil fiyatı (1 + KDV Oranı / 100) bölenine bölerek net KDV hariç fiyata ulaşabilirsiniz. Örneğin %20 KDV dahil tutar 1,20&apos;ye; %10 KDV dahil tutar 1,10&apos;a; %1 KDV dahil tutar ise 1,01&apos;e bölünür.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">1.000 TL&apos;nin %20 KDV&apos;si ne kadardır?</h4>
            <p className="text-muted-foreground mt-2">
              1.000 TL KDV hariç tutarın %20 KDV&apos;si 200 TL&apos;dir; KDV dahil toplam tutar 1.200 TL olur. 1.000 TL KDV dahil tutarın içindeki %20 KDV ise yaklaşık 166,67 TL&apos;dir (Net: 833,33 TL).
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">KDV dahil ve KDV hariç arasındaki fark nedir?</h4>
            <p className="text-muted-foreground mt-2">
              KDV hariç fiyat ürünün veya hizmetin vergisiz ana bedelidir. KDV dahil fiyat ise bu bedele yasal katma değer vergisinin eklenmiş nihai tüketici satış fiyatıdır.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Türkiye&apos;de geçerli KDV oranları nelerdir?</h4>
            <p className="text-muted-foreground mt-2">
              Mevzuata göre genel olarak %1 (temel gıda, tohum vb.), %10 (gıda ürünleri, konaklama, tekstil vb.) ve %20 (genel standart KDV oranı) uygulanmaktadır. Yasal düzenlemelerle oranlar dönemsel olarak güncellenebilir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">KDV ayırırken neden doğrudan yüzde çıkarılmaz?</h4>
            <p className="text-muted-foreground mt-2">
              Çünkü KDV tutarı küçük olan vergisiz matrah üzerinden hesaplanmıştır. 1.200 TL&apos;den doğrudan %20 (240 TL) çıkarırsanız 960 TL kalır ve bu matematiksel olarak hatalıdır. Doğru yöntem 1,20&apos;ye bölmektir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">KDV tutarı nasıl bulunur?</h4>
            <p className="text-muted-foreground mt-2">
              KDV tutarı, KDV dahil toplam tutardan KDV hariç net tutar çıkarılarak bulunur (KDV Tutarı = KDV Dahil - KDV Hariç).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
