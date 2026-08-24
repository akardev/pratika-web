'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function VucutYagOraniHesaplama() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [heightStr, setHeightStr] = useState<string>('178'); // cm
  const [weightStr, setWeightStr] = useState<string>('76'); // kg
  const [neckStr, setNeckStr] = useState<string>('38'); // Boyun cm
  const [waistStr, setWaistStr] = useState<string>('84'); // Bel cm
  const [hipStr, setHipStr] = useState<string>('98'); // Kalça cm (kadınlar için)

  const [result, setResult] = useState<{
    bodyFatPercent: number;
    fatMassKg: number;
    leanMassKg: number;
    category: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const height = parseTurkishNumber(heightStr);
    const weight = parseTurkishNumber(weightStr);
    const neck = parseTurkishNumber(neckStr);
    const waist = parseTurkishNumber(waistStr);
    const hip = parseTurkishNumber(hipStr);

    if (isNaN(height) || isNaN(weight) || isNaN(neck) || isNaN(waist) || height <= 0 || weight <= 0 || neck <= 0 || waist <= 0) {
      setError('Lütfen tüm ölçümleri geçerli olarak giriniz.');
      return;
    }

    // US Navy Formülleri (log10 tabanlı)
    let bodyFatPercent = 0;
    if (gender === 'male') {
      if (waist <= neck) {
        setError('Bel çevresi boyun çevresinden büyük olmalıdır.');
        return;
      }
      bodyFatPercent = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      if (isNaN(hip) || hip <= 0) {
        setError('Kadınlar için kalça çevresi ölçümü zorunludur.');
        return;
      }
      if (waist + hip <= neck) {
        setError('Lütfen geçerli ölçüm değerleri giriniz.');
        return;
      }
      bodyFatPercent = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }

    bodyFatPercent = Math.max(3, Math.min(60, bodyFatPercent));
    const fatMassKg = weight * (bodyFatPercent / 100);
    const leanMassKg = weight - fatMassKg;

    let category = 'Normal';
    if (gender === 'male') {
      if (bodyFatPercent < 6) category = 'Temel Yağ Düzeyi';
      else if (bodyFatPercent < 14) category = 'Sporcu / Atletik';
      else if (bodyFatPercent < 18) category = 'Fit / İdeal';
      else if (bodyFatPercent < 25) category = 'Normal';
      else category = 'Yüksek / Obezite';
    } else {
      if (bodyFatPercent < 14) category = 'Temel Yağ Düzeyi';
      else if (bodyFatPercent < 21) category = 'Sporcu / Atletik';
      else if (bodyFatPercent < 25) category = 'Fit / İdeal';
      else if (bodyFatPercent < 32) category = 'Normal';
      else category = 'Yüksek / Obezite';
    }

    setResult({
      bodyFatPercent,
      fatMassKg,
      leanMassKg,
      category,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Cinsiyet
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    gender === 'male' ? 'bg-primary text-primary-foreground border-primary shadow-xs' : 'bg-background border-border'
                  }`}
                >
                  Erkek
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    gender === 'female' ? 'bg-primary text-primary-foreground border-primary shadow-xs' : 'bg-background border-border'
                  }`}
                >
                  Kadın
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="height" className="block text-xs font-medium mb-1 text-foreground">Boy (cm)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="height"
                  placeholder="178"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground font-mono text-sm"
                  value={heightStr}
                  onChange={(e) => setHeightStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
              <div>
                <label htmlFor="weight" className="block text-xs font-medium mb-1 text-foreground">Kilo (kg)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="weight"
                  placeholder="76"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground font-mono text-sm"
                  value={weightStr}
                  onChange={(e) => setWeightStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
            </div>

            <div className={`grid ${gender === 'female' ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
              <div>
                <label htmlFor="neck" className="block text-xs font-medium mb-1 text-foreground">Boyun (cm)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="neck"
                  placeholder="38"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground font-mono text-sm"
                  value={neckStr}
                  onChange={(e) => setNeckStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
              <div>
                <label htmlFor="waist" className="block text-xs font-medium mb-1 text-foreground">Bel (cm)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="waist"
                  placeholder="84"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground font-mono text-sm"
                  value={waistStr}
                  onChange={(e) => setWaistStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
              {gender === 'female' && (
                <div>
                  <label htmlFor="hip" className="block text-xs font-medium mb-1 text-foreground">Kalça (cm)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    id="hip"
                    placeholder="98"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground font-mono text-sm"
                    value={hipStr}
                    onChange={(e) => setHipStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
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
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Vücut Yağ Oranını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200 text-center">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Vücut Yağ Oranınız
                </h3>

                <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight font-mono">
                  %{formatNumber(result.bodyFatPercent, 1)}
                </span>
                <span className="text-xs font-semibold text-foreground mt-2 inline-block bg-background px-3 py-1.5 rounded-md border border-border/80">
                  Kategori: {result.category}
                </span>

                <div className="border-t border-border/60 pt-3 mt-4 space-y-1.5 text-xs sm:text-sm text-left">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Yağ Kütlesi:</span>
                    <span className="font-semibold text-foreground font-mono">{formatNumber(result.fatMassKg, 1)} kg</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Yağsız Kas Kütlesi:</span>
                    <span className="font-semibold text-foreground font-mono">{formatNumber(result.leanMassKg, 1)} kg</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/bel-kalca-orani-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Bel-kalça oranı hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Mezura ile boyun, bel ve kalça ölçülerinizi girerek yağ oranınızı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">US Navy Vücut Yağ Oranı Yöntemi</h2>
        <p className="mb-4 text-muted-foreground">
          Amerikan Deniz Kuvvetleri (US Navy) tarafından geliştirilen bu formül, kaliper veya pahalı cihazlara ihtiyaç duymadan mezura ile vücut yağ oranını ve yağsız kas kütlesini yüksek doğrulukla tahmin eder.
        </p>
      </div>
    </div>
  );
}
