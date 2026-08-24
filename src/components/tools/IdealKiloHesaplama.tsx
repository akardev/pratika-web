'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function IdealKiloHesaplama() {
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [heightStr, setHeightStr] = useState<string>('168');
  const [weightStr, setWeightStr] = useState<string>('62');

  const [result, setResult] = useState<{
    devine: number;
    robinson: number;
    hamwi: number;
    miller: number;
    averageIdeal: number;
    minHealthy: number; // BMI 18.5
    maxHealthy: number; // BMI 24.9
    currentBmi: number;
    difference: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const height = parseTurkishNumber(heightStr);
    const weight = parseTurkishNumber(weightStr);

    if (isNaN(height) || height < 120 || height > 230) {
      setError('Lütfen 120 - 230 cm arasında geçerli bir boy giriniz.');
      return;
    }

    if (isNaN(weight) || weight < 30 || weight > 250) {
      setError('Lütfen 30 - 250 kg arasında geçerli bir kilo giriniz.');
      return;
    }

    const heightInches = height / 2.54;
    const over5Feet = Math.max(0, heightInches - 60);

    let devine = 0;
    let robinson = 0;
    let hamwi = 0;
    let miller = 0;

    if (gender === 'male') {
      devine = 50.0 + (2.3 * over5Feet);
      robinson = 52.0 + (1.9 * over5Feet);
      hamwi = 48.0 + (2.7 * over5Feet);
      miller = 56.2 + (1.41 * over5Feet);
    } else {
      devine = 45.5 + (2.3 * over5Feet);
      robinson = 49.0 + (1.7 * over5Feet);
      hamwi = 45.5 + (2.2 * over5Feet);
      miller = 53.1 + (1.36 * over5Feet);
    }

    const averageIdeal = (devine + robinson + hamwi + miller) / 4;
    const heightM = height / 100;
    const currentBmi = weight / (heightM * heightM);
    const minHealthy = 18.5 * (heightM * heightM);
    const maxHealthy = 24.9 * (heightM * heightM);
    const difference = weight - averageIdeal;

    setResult({
      devine,
      robinson,
      hamwi,
      miller,
      averageIdeal,
      minHealthy,
      maxHealthy,
      currentBmi,
      difference,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <form onSubmit={handleCalculate} noValidate className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Cinsiyet
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  gender === 'female'
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-background text-foreground border-border'
                }`}
              >
                Kadın
              </button>
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  gender === 'male'
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-background text-foreground border-border'
                }`}
              >
                Erkek
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="height" className="block text-xs font-medium text-foreground mb-1.5">
                Boy (cm)
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="height"
                placeholder="Örn: 168"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                value={heightStr}
                onChange={(e) => setHeightStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
              />
            </div>

            <div>
              <label htmlFor="weight" className="block text-xs font-medium text-foreground mb-1.5">
                Mevcut Kilo (kg)
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="weight"
                placeholder="Örn: 62"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                value={weightStr}
                onChange={(e) => setWeightStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground text-sm font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-all"
          >
            İdeal Kilo ve Sağlıklı Kilo Aralığını Hesapla
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 bg-muted/20 rounded-xl border border-border text-center">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                Ortalama İdeal Kilonuz
              </span>
              <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight">
                {formatNumber(result.averageIdeal, 1)} kg
              </span>
              <div className="mt-2 text-xs text-muted-foreground">
                Mevcut Kilonuz: <strong className="text-foreground">{weightStr} kg</strong> (
                {result.difference > 0 ? (
                  <span className="text-amber-600 font-semibold">+{formatNumber(result.difference, 1)} kg fazlanız var</span>
                ) : result.difference < 0 ? (
                  <span className="text-blue-600 font-semibold">{formatNumber(Math.abs(result.difference), 1)} kg almanız önerilir</span>
                ) : (
                  <span className="text-emerald-600 font-semibold">Tam ideal kilodasınız</span>
                )}
                )
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-background rounded-lg border border-border text-center">
                <span className="text-xs text-muted-foreground block">Devine Formülü</span>
                <span className="text-sm font-bold text-foreground">{formatNumber(result.devine, 1)} kg</span>
              </div>
              <div className="p-3 bg-background rounded-lg border border-border text-center">
                <span className="text-xs text-muted-foreground block">Robinson Formülü</span>
                <span className="text-sm font-bold text-foreground">{formatNumber(result.robinson, 1)} kg</span>
              </div>
              <div className="p-3 bg-background rounded-lg border border-border text-center">
                <span className="text-xs text-muted-foreground block">Hamwi Formülü</span>
                <span className="text-sm font-bold text-foreground">{formatNumber(result.hamwi, 1)} kg</span>
              </div>
              <div className="p-3 bg-background rounded-lg border border-border text-center">
                <span className="text-xs text-muted-foreground block">Miller Formülü</span>
                <span className="text-sm font-bold text-foreground">{formatNumber(result.miller, 1)} kg</span>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-xl border border-border/70 flex justify-between items-center text-xs sm:text-sm">
              <span className="text-muted-foreground">WHO Sağlıklı BMI (18.5 - 24.9) Kilo Aralığı:</span>
              <span className="font-bold text-foreground">
                {formatNumber(result.minHealthy, 1)} kg - {formatNumber(result.maxHealthy, 1)} kg
              </span>
            </div>

            <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 rounded-lg text-xs text-blue-800 dark:text-blue-300">
              ℹ️ <strong>Önemli Sağlık Bilgilendirmesi:</strong> İdeal kilo hesaplamaları istatistiki tıp formüllerine dayanır. Kas kütlesi, kemik yoğunluğu ve bireysel vücut yapısına göre değişiklik gösterebilir. Tıbbi teşhis yerine geçmez.
            </div>
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">İdeal Kilo Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          İdeal kilo hesaplamalarında tıp dünyasında kabul gören Devine, Robinson, Hamwi ve Miller formülleri kullanılır. Bu formüller kişinin cinsiyetine ve 5 fit (152.4 cm) üzerindeki boy uzunluğuna göre baz ağırlık hesaplar.
        </p>
      </div>
    </div>
  );
}
