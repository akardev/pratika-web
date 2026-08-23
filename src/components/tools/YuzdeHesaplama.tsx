'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber } from '@/lib/utils';

type CalcType = 'percentage-of' | 'ratio' | 'increase' | 'decrease';

interface TabOption {
  id: CalcType;
  label: string;
  input1Label: string;
  input1Placeholder: string;
  input1Suffix?: string;
  input2Label: string;
  input2Placeholder: string;
  input2Suffix?: string;
}

const TABS: TabOption[] = [
  {
    id: 'percentage-of',
    label: 'Bir sayının yüzdesi',
    input1Label: 'Sayı',
    input1Placeholder: 'Örn: 500',
    input2Label: 'Yüzde (%)',
    input2Placeholder: 'Örn: 20',
    input2Suffix: '%',
  },
  {
    id: 'ratio',
    label: 'Yüzde oranı',
    input1Label: 'İlk Sayı',
    input1Placeholder: 'Örn: 50',
    input2Label: 'İkinci Sayı (Toplam)',
    input2Placeholder: 'Örn: 200',
  },
  {
    id: 'increase',
    label: 'Yüzde artış',
    input1Label: 'Eski Değer',
    input1Placeholder: 'Örn: 500',
    input2Label: 'Yeni Değer',
    input2Placeholder: 'Örn: 600',
  },
  {
    id: 'decrease',
    label: 'Yüzde azalış',
    input1Label: 'Eski Değer',
    input1Placeholder: 'Örn: 600',
    input2Label: 'Yeni Değer',
    input2Placeholder: 'Örn: 500',
  },
];

export default function YuzdeHesaplama() {
  const [activeTab, setActiveTab] = useState<CalcType>('percentage-of');
  const [input1Str, setInput1Str] = useState<string>('');
  const [input2Str, setInput2Str] = useState<string>('');
  const [result, setResult] = useState<{ value: string; summary: string; title: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

  const handleTabChange = (tabId: CalcType) => {
    setActiveTab(tabId);
    setError(null);
    setResult(null);
    setInput1Str('');
    setInput2Str('');
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!input1Str.trim() || !input2Str.trim()) {
      setError('Lütfen her iki alanı da doldurun.');
      return;
    }

    const val1 = parseTurkishNumber(input1Str);
    const val2 = parseTurkishNumber(input2Str);

    if (isNaN(val1) || isNaN(val2)) {
      setError('Lütfen geçerli sayılar girin.');
      return;
    }

    if (activeTab === 'percentage-of') {
      const calculated = (val1 * val2) / 100;
      setResult({
        title: `${formatNumber(val1)} sayısının %${formatNumber(val2)}'si`,
        value: formatNumber(calculated),
        summary: `${formatNumber(val1)} sayısının %${formatNumber(val2)}'si ${formatNumber(calculated)}'dir.`,
      });
    } else if (activeTab === 'ratio') {
      if (val2 === 0) {
        setError('İkinci sayı (bölünen) 0 olamaz.');
        return;
      }
      const calculated = (val1 / val2) * 100;
      setResult({
        title: `${formatNumber(val1)} sayısının ${formatNumber(val2)} içindeki oranı`,
        value: `%${formatNumber(calculated)}`,
        summary: `${formatNumber(val1)} sayısı, ${formatNumber(val2)} sayısının %${formatNumber(calculated)}'idir.`,
      });
    } else if (activeTab === 'increase') {
      if (val1 === 0) {
        setError('Eski değer 0 olamaz.');
        return;
      }
      const calculated = ((val2 - val1) / val1) * 100;
      setResult({
        title: 'Yüzde Değişim (Artış)',
        value: `%${formatNumber(calculated)} artış`,
        summary: `${formatNumber(val1)} değerinden ${formatNumber(val2)} değerine %${formatNumber(calculated)} artış gerçekleşmiştir.`,
      });
    } else if (activeTab === 'decrease') {
      if (val1 === 0) {
        setError('Eski değer 0 olamaz.');
        return;
      }
      const calculated = ((val1 - val2) / val1) * 100;
      setResult({
        title: 'Yüzde Değişim (Azalış)',
        value: `%${formatNumber(calculated)} azalış`,
        summary: `${formatNumber(val1)} değerinden ${formatNumber(val2)} değerine %${formatNumber(calculated)} azalış gerçekleşmiştir.`,
      });
    }
  };

  return (
    <div className="w-full">
      {/* Sekmeler / Segmented Control */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabChange(tab.id)}
            className={`px-3 py-2.5 rounded-lg text-xs sm:text-sm transition-all text-center ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                : 'bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted font-medium'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hesaplama Kartı */}
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Sol Kolon: Form */}
          <form onSubmit={handleCalculate} noValidate className="flex flex-col justify-between space-y-5">
            <div className="space-y-5">
              <div>
                <label htmlFor="input1" className="block text-sm font-medium mb-2 text-foreground">
                  {currentTab.input1Label} <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="input1"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                    placeholder={currentTab.input1Placeholder}
                    value={input1Str}
                    onChange={(e) => setInput1Str(e.target.value)}
                  />
                  {currentTab.input1Suffix && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                      {currentTab.input1Suffix}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="input2" className="block text-sm font-medium mb-2 text-foreground">
                  {currentTab.input2Label} <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="input2"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                    placeholder={currentTab.input2Placeholder}
                    value={input2Str}
                    onChange={(e) => setInput2Str(e.target.value)}
                  />
                  {currentTab.input2Suffix && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                      {currentTab.input2Suffix}
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                  {error}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Hesapla
            </button>
          </form>

          {/* Sağ Kolon: Sonuç Paneli */}
          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-muted-foreground font-medium mb-1 text-xs sm:text-sm">{result.title}</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {result.value}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-4 text-center">
                  <p className="text-xs sm:text-sm text-foreground font-medium">
                    {result.summary}
                  </p>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Değerleri girip &ldquo;Hesapla&rdquo; butonuna basın.</p>
                <p className="text-xs text-muted-foreground mt-1">Yüzde hesaplama sonucunuz ve açıklaması burada görüntülenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO ve Formül İçeriği */}
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Yüzde Nasıl Hesaplanır?</h2>
        <p className="mb-6 text-muted-foreground">
          Yüzde hesaplamaları, bir büyüklüğün 100 eşit parçaya bölünmüş oranını ifade eder. 
          Günlük hayatta, ticarette ve finansta en sık kullanılan 4 temel yüzde hesaplama yöntemi ve formülleri aşağıdadır:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">1. Bir Sayının Yüzdesi</h3>
            <p className="font-mono text-xs text-primary mb-2">Formül: (Sayı &times; Yüzde) / 100</p>
            <p className="text-sm text-muted-foreground">
              Örnek: 500 sayısının %20&apos;si = 500 &times; (20 / 100) = <strong>100</strong>
            </p>
          </div>

          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">2. Yüzde Oranı (A, B&apos;nin yüzde kaçı?)</h3>
            <p className="font-mono text-xs text-primary mb-2">Formül: (İlk Sayı / Toplam Sayı) &times; 100</p>
            <p className="text-sm text-muted-foreground">
              Örnek: 50 sayısı 200&apos;ün = (50 / 200) &times; 100 = <strong>%25</strong>&apos;idir.
            </p>
          </div>

          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">3. Yüzde Artış</h3>
            <p className="font-mono text-xs text-primary mb-2">Formül: ((Yeni - Eski) / Eski) &times; 100</p>
            <p className="text-sm text-muted-foreground">
              Örnek: 500&apos;den 600&apos;e = ((600 - 500) / 500) &times; 100 = <strong>%20 artış</strong>
            </p>
          </div>

          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">4. Yüzde Azalış</h3>
            <p className="font-mono text-xs text-primary mb-2">Formül: ((Eski - Yeni) / Eski) &times; 100</p>
            <p className="text-sm text-muted-foreground">
              Örnek: 600&apos;den 500&apos;e = ((600 - 500) / 600) &times; 100 = <strong>%16,67 azalış</strong>
            </p>
          </div>
        </div>

        {/* FAQ Bölümü */}
        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">Yüzde nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Bir sayının istenen yüzdesini bulmak için sayıyı yüzde oranı ile çarpıp 100&apos;e bölmeniz yeterlidir. Örneğin 200 sayısının %15&apos;i 200 &times; 15 / 100 = 30&apos;dur.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Bir sayının diğer sayının yüzde kaçı olduğu nasıl bulunur?</h4>
            <p className="text-muted-foreground mt-2">
              İlk sayıyı ikinci sayıya (toplam sayıya) bölüp sonucu 100 ile çarparak yüzde oranına ulaşırsınız. Örneğin 30 / 120 &times; 100 = %25.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Yüzde artış nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Yeni değerden eski değeri çıkarıp oluşan farkı ilk (eski) değere bölün ve 100 ile çarpın. Formül: ((Yeni - Eski) / Eski) &times; 100.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Yüzde azalış nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Eski değerden yeni değeri çıkarıp aradaki farkı ilk değere bölerek 100 ile çarptığınızda azalış oranını bulursunuz.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">%10, %20 ve %25 nasıl pratik hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              %10 için sayının sonundan bir sıfır silin (veya 10&apos;a bölün); %20 için sayıyı 5&apos;e bölün; %25 için sayıyı 4&apos;e bölün (çeyreği).
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Yüzde değişim ile yüzde fark aynı mıdır?</h4>
            <p className="text-muted-foreground mt-2">
              Yüzde değişim zamana bağlı başlangıç değerini (eski değeri) baz alırken; yüzde fark genellikle iki ayrı değer arasındaki bağıl farkı ifade eder.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
