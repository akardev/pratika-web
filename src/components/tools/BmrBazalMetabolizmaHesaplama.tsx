'use client';

import { useState } from 'react';
import Link from 'next/link';
import { parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function BmrBazalMetabolizmaHesaplama() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [ageStr, setAgeStr] = useState<string>('28');
  const [heightStr, setHeightStr] = useState<string>('178'); // cm
  const [weightStr, setWeightStr] = useState<string>('75'); // kg

  const [result, setResult] = useState<{
    bmr: number;
    sedentary: number; // Hareketsiz x1.2
    light: number; // Hafif x1.375
    moderate: number; // Orta x1.55
    active: number; // Çok aktif x1.725
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const age = parseTurkishNumber(ageStr);
    const height = parseTurkishNumber(heightStr);
    const weight = parseTurkishNumber(weightStr);

    if (isNaN(age) || age <= 0 || age > 120) {
      setError('Lütfen geçerli bir yaş giriniz.');
      return;
    }
    if (isNaN(height) || height <= 50 || height > 250) {
      setError('Lütfen geçerli bir boy (cm) giriniz.');
      return;
    }
    if (isNaN(weight) || weight <= 20 || weight > 300) {
      setError('Lütfen geçerli bir kilo (kg) giriniz.');
      return;
    }

    // Mifflin-St Jeor Formülü
    // Erkek: 10 * kg + 6.25 * boy - 5 * yaş + 5
    // Kadın: 10 * kg + 6.25 * boy - 5 * yaş - 161
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    setResult({
      bmr,
      sedentary: bmr * 1.2,
      light: bmr * 1.375,
      moderate: bmr * 1.55,
      active: bmr * 1.725,
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

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label htmlFor="age" className="block text-xs font-medium mb-1 text-foreground">
                  Yaş <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  id="age"
                  placeholder="28"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={ageStr}
                  onChange={(e) => setAgeStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
              </div>

              <div>
                <label htmlFor="height" className="block text-xs font-medium mb-1 text-foreground">
                  Boy (cm) <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="height"
                  placeholder="178"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={heightStr}
                  onChange={(e) => setHeightStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>

              <div>
                <label htmlFor="weight" className="block text-xs font-medium mb-1 text-foreground">
                  Kilo (kg) <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="weight"
                  placeholder="75"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={weightStr}
                  onChange={(e) => setWeightStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
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
              BMR Metabolizma Hızını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Bazal Metabolizma Hızınız (BMR)
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Dinlenme Halinde Yakılan Kalori</span>
                  <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight font-mono">
                    {Math.round(result.bmr)} kcal
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-2 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Vücudunuzun hayati fonksiyonlar için harcadığı asgari enerji
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Masa Başı / Hareketsiz:</span>
                    <span className="font-semibold text-foreground font-mono">{Math.round(result.sedentary)} kcal/gün</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Hafif Egzersiz (1-3 gün):</span>
                    <span className="font-semibold text-foreground font-mono">{Math.round(result.light)} kcal/gün</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Orta Derece Spor (3-5 gün):</span>
                    <span className="font-semibold text-foreground font-mono">{Math.round(result.moderate)} kcal/gün</span>
                  </div>
                </div>

                <div className="mt-3.5 p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 rounded-lg text-xs text-blue-800 dark:text-blue-300 text-left">
                  ℹ️ <strong>Sağlık Notu:</strong> BMR hesaplaması Mifflin-St Jeor formülüyle tahmini enerji ihtiyacını gösterir. Tıbbi teşhis, diyet tedavisi veya klinik rapor yerine geçmez.
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/gunluk-kalori-ihtiyaci-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Hedefli günlük kalori hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Yaş, boy ve kilonuzu girerek bazal metabolizma hızınızı öğrenin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Bazal Metabolizma Hızı (BMR) Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          BMR, vücudun tamamen dinlenme ve açlık halindeyken kalp atışı, nefes alma ve hücre yenilenmesi gibi temel yaşamsal fonksiyonları sürdürmek için harcadığı günlük minimum kalori miktarıdır.
        </p>
      </div>
    </div>
  );
}
