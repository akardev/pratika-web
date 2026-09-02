'use client';

import { useState } from 'react';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

type InterestType = 'simple' | 'compound';
type DurationUnit = 'year' | 'month';

interface CompoundFrequency {
  id: string;
  name: string;
  n: number; // Yıldaki bileşikleşme sayısı
}

const COMPOUND_FREQUENCIES: CompoundFrequency[] = [
  { id: '1', name: 'Yıllık (Yılda 1 kez)', n: 1 },
  { id: '2', name: '6 Aylık (Yılda 2 kez)', n: 2 },
  { id: '4', name: '3 Aylık (Yılda 4 kez)', n: 4 },
  { id: '12', name: 'Aylık (Yılda 12 kez)', n: 12 },
];

interface FaizResult {
  type: InterestType;
  principal: number;
  rate: number;
  duration: number;
  durationUnit: DurationUnit;
  frequencyName?: string;
  interestAmount: number;
  totalAmount: number;
}

export default function FaizHesaplama() {
  const [interestType, setInterestType] = useState<InterestType>('simple');
  const [principalStr, setPrincipalStr] = useState<string>('');
  const [rateStr, setRateStr] = useState<string>('');
  const [durationStr, setDurationStr] = useState<string>('1');
  const [durationUnit, setDurationUnit] = useState<DurationUnit>('year');
  const [frequencyN, setFrequencyN] = useState<number>(1);

  const [result, setResult] = useState<FaizResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTypeChange = (type: InterestType) => {
    setInterestType(type);
    setError(null);
    setResult(null);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    // 1. Anapara Kontrolü
    if (!principalStr.trim()) {
      setError('Anapara boş bırakılamaz.');
      return;
    }

    const principalNum = parseTurkishNumber(principalStr);
    if (isNaN(principalNum)) {
      setError('Geçerli bir tutar girin.');
      return;
    }

    if (principalNum < 0) {
      setError('Anapara negatif olamaz.');
      return;
    }

    // 2. Faiz Oranı Kontrolü
    if (!rateStr.trim()) {
      setError('Faiz oranı boş bırakılamaz.');
      return;
    }

    const rateNum = parseTurkishNumber(rateStr);
    if (isNaN(rateNum)) {
      setError('Geçerli bir faiz oranı girin.');
      return;
    }

    if (rateNum < 0) {
      setError('Faiz oranı negatif olamaz.');
      return;
    }

    // 3. Süre Kontrolü
    if (!durationStr.trim()) {
      setError('Süre boş bırakılamaz.');
      return;
    }

    const durationNum = parseTurkishNumber(durationStr);
    if (isNaN(durationNum)) {
      setError('Geçerli bir süre girin.');
      return;
    }

    if (durationNum <= 0) {
      setError("Süre 0&apos;dan büyük olmalıdır.");
      return;
    }

    // Yıl cinsinden süre hesabı
    const tYears = durationUnit === 'month' ? durationNum / 12 : durationNum;
    const rDecimal = rateNum / 100;

    if (interestType === 'simple') {
      // Basit Faiz Formülü: I = P * r * t
      const interestAmount = principalNum * rDecimal * tYears;
      const totalAmount = principalNum + interestAmount;

      setResult({
        type: 'simple',
        principal: principalNum,
        rate: rateNum,
        duration: durationNum,
        durationUnit,
        interestAmount,
        totalAmount,
      });
    } else {
      // Bileşik Faiz Formülü: A = P * (1 + r/n)^(n*t)
      const n = frequencyN;
      const totalAmount = principalNum * Math.pow(1 + rDecimal / n, n * tYears);
      const interestAmount = totalAmount - principalNum;
      const freqObj = COMPOUND_FREQUENCIES.find((f) => f.n === n);

      setResult({
        type: 'compound',
        principal: principalNum,
        rate: rateNum,
        duration: durationNum,
        durationUnit,
        frequencyName: freqObj?.name,
        interestAmount,
        totalAmount,
      });
    }
  };

  return (
    <div className="w-full">
      {/* Hesaplama Kartı */}
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        {/* İşlem Türü Seçimi (Tabs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 p-1 bg-muted/40 rounded-xl border border-border/60 mb-8 max-w-lg">
          <button
            type="button"
            onClick={() => handleTypeChange('simple')}
            className={`py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              interestType === 'simple'
                ? 'bg-card text-foreground shadow-xs border border-border/80'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Basit Faiz
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('compound')}
            className={`py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              interestType === 'compound'
                ? 'bg-card text-foreground shadow-xs border border-border/80'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Bileşik Faiz
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Sol Kolon: Form */}
          <form onSubmit={handleCalculate} noValidate className="space-y-5">
            {/* Anapara */}
            <div>
              <label htmlFor="principal" className="block text-sm font-medium mb-2 text-foreground">
                Anapara (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="principal"
                  placeholder="Örn: 10.000,00"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                  value={principalStr}
                  onChange={(e) => setPrincipalStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL
                </div>
              </div>
            </div>

            {/* Faiz Oranı */}
            <div>
              <label htmlFor="rate" className="block text-sm font-medium mb-2 text-foreground">
                Yıllık Faiz Oranı (%) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="rate"
                  placeholder="Örn: 20"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                  value={rateStr}
                  onChange={(e) => setRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  %
                </div>
              </div>
            </div>

            {/* Süre ve Birim */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium mb-2 text-foreground">
                Vade / Süre <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="decimal"
                  id="duration"
                  placeholder="Örn: 1"
                  autoComplete="off"
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                  value={durationStr}
                  onChange={(e) => setDurationStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <select
                  value={durationUnit}
                  onChange={(e) => setDurationUnit(e.target.value as DurationUnit)}
                  className="w-28 rounded-lg border border-border bg-background px-3 py-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  aria-label="Süre Birimi"
                >
                  <option value="year">Yıl</option>
                  <option value="month">Ay</option>
                </select>
              </div>
            </div>

            {/* Bileşik Faiz Sıklığı (Yalnızca Bileşik Faizde) */}
            {interestType === 'compound' && (
              <div>
                <label htmlFor="frequency" className="block text-sm font-medium mb-2 text-foreground">
                  Bileşikleşme Sıklığı <span className="text-destructive">*</span>
                </label>
                <select
                  id="frequency"
                  value={frequencyN}
                  onChange={(e) => setFrequencyN(Number(e.target.value))}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {COMPOUND_FREQUENCIES.map((freq) => (
                    <option key={freq.id} value={freq.n}>
                      {freq.name}
                    </option>
                  ))}
                </select>
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
              Faiz Hesapla
            </button>
          </form>

          {/* Sağ Kolon: Sonuç Paneli */}
          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu ({result.type === 'simple' ? 'Basit Faiz' : 'Bileşik Faiz'})
                </h3>

                {/* Ana Sonuç (Hero) */}
                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-1">
                    Vade Sonu Toplam Tutar
                  </span>
                  <span className="font-extrabold text-3xl sm:text-4xl tracking-tight text-primary">
                    {formatCurrency(result.totalAmount)}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                    +{formatCurrency(result.interestAmount)} Faiz Getirisi
                  </span>
                </div>

                {/* Detay Tablosu */}
                <div className="border-t border-border/60 pt-4 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Anapara:</span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(result.principal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Faiz Tutarı:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      +{formatCurrency(result.interestAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Yıllık Faiz Oranı:</span>
                    <span className="font-semibold text-foreground">
                      %{formatNumber(result.rate, 2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Süre:</span>
                    <span className="font-semibold text-foreground">
                      {result.duration} {result.durationUnit === 'year' ? 'Yıl' : 'Ay'}
                    </span>
                  </div>

                  {result.type === 'compound' && result.frequencyName && (
                    <div className="flex justify-between items-center py-1">
                      <span className="text-muted-foreground">Bileşikleşme:</span>
                      <span className="font-semibold text-foreground">
                        {result.frequencyName}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                    <span className="font-medium text-foreground">Toplam Tutar:</span>
                    <span className="font-bold text-foreground text-sm sm:text-base">
                      {formatCurrency(result.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">
                  Anapara, faiz oranı ve süreyi girip &ldquo;Faiz Hesapla&rdquo; butonuna basın.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Faiz getirisi ve toplam birikim detayları burada görüntülenecektir.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO ve Bilgilendirme İçeriği */}
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Faiz Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Faiz hesabı, bir anaparanın belirli bir faiz oranı ve vade süresi boyunca elde ettiği getiriyi bulma işlemidir. Finansal işlemlerde genel olarak <strong>Basit Faiz</strong> ve <strong>Bileşik Faiz</strong> olmak üzere iki temel yöntem uygulanır.
        </p>

        {/* Karşılaştırma Kutusu */}
        <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 mb-8 text-sm text-foreground space-y-2">
          <strong className="font-semibold text-primary block text-base">
            Basit Faiz ile Bileşik Faiz Arasındaki Temel Fark
          </strong>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            <strong>Basit Faiz:</strong> Getiri her dönem yalnızca başlangıçtaki <em>anapara</em> üzerinden hesaplanır. Önceki dönemlerde kazanılan faiz anaparaya eklenmez.
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            <strong>Bileşik Faiz:</strong> Her dönem elde edilen faiz anaparaya eklenir ve bir sonraki dönemin faizi bu <em>büyüyen toplam tutar</em> üzerinden hesaplanır (&ldquo;faizin faizi&rdquo; prensibi).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">Örnek 1: Basit Faiz (1 Yıl)</h3>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Anapara:</strong> 10.000 TL | <strong>Oran:</strong> %20
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-1">
              Faiz: 2.000,00 TL
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Toplam:</strong> 12.000,00 TL
            </p>
          </div>

          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">Örnek 2: Basit Faiz (6 Ay)</h3>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Anapara:</strong> 10.000 TL | <strong>Oran:</strong> %20
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-1">
              Faiz: 1.000,00 TL
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Toplam:</strong> 11.000,00 TL
            </p>
          </div>

          <div className="bg-muted/30 p-5 rounded-xl border border-border/60">
            <h3 className="text-base font-semibold mb-2 text-foreground">Örnek 3: Bileşik Faiz (2 Yıl)</h3>
            <p className="text-xs text-muted-foreground mb-1">
              <strong>Anapara:</strong> 10.000 TL | <strong>Oran:</strong> %10
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-1">
              Faiz: 2.100,00 TL
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Toplam:</strong> 12.100,00 TL
            </p>
          </div>
        </div>

        {/* Sıkça Sorulan Sorular (SSS) */}
        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">Basit faiz nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Basit faiz, anapara &times; yıllık faiz oranı &times; yıl formülüyle hesaplanır. Aylık vadelerde süre 12&apos;ye bölünerek yıla çevrilir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Bileşik faiz nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Bileşik faiz formülü: A = P &times; (1 + r/n)^(n&times;t). Burada P anapara, r yıllık faiz oranı, n yıldaki bileşikleşme sıklığı ve t yıl cinsinden süredir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Aylık bileşikleşme nedir?</h4>
            <p className="text-muted-foreground mt-2">
              Her ayın sonunda elde edilen faizin anaparaya eklenmesi ve sonraki ayın faizinin yeni toplam üzerinden hesaplanmasıdır. Yılda 12 kez bileşikleşme gerçekleşir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Bileşik faiz neden basit faizden daha çok kazandırır?</h4>
            <p className="text-muted-foreground mt-2">
              Çünkü bileşik faizde sadece anapara değil, geçmiş dönemlerde kazanılan faizler de faiz getirisi üretmeye devam eder (&ldquo;kartopu etkisi&rdquo;).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
