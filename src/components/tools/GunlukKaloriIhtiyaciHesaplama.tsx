'use client';

import { useState } from 'react';
import Link from 'next/link';
import { parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function GunlukKaloriIhtiyaciHesaplama() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [ageStr, setAgeStr] = useState<string>('26');
  const [heightStr, setHeightStr] = useState<string>('175');
  const [weightStr, setWeightStr] = useState<string>('72');
  const [activityLevel, setActivityLevel] = useState<number>(1.375); // 1.2, 1.375, 1.55, 1.725
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('lose');

  const [result, setResult] = useState<{
    tdee: number;
    targetCalories: number;
    proteinGrams: number;
    carbGrams: number;
    fatGrams: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const age = parseTurkishNumber(ageStr);
    const height = parseTurkishNumber(heightStr);
    const weight = parseTurkishNumber(weightStr);

    if (isNaN(age) || isNaN(height) || isNaN(weight) || age <= 0 || height <= 0 || weight <= 0) {
      setError('Lütfen tüm değerleri geçerli olarak giriniz.');
      return;
    }

    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (gender === 'male') bmr += 5;
    else bmr -= 161;

    const tdee = bmr * activityLevel;
    let targetCalories = tdee;

    if (goal === 'lose') {
      targetCalories = tdee - 500; // Haftada ~0.5 kg kilo verme
    } else if (goal === 'gain') {
      targetCalories = tdee + 400; // Kilo alma
    }

    // Makro Besin Dağılımı (%30 Protein, %45 Karbonhidrat, %25 Yağ)
    const proteinCalories = targetCalories * 0.30;
    const carbCalories = targetCalories * 0.45;
    const fatCalories = targetCalories * 0.25;

    const proteinGrams = proteinCalories / 4;
    const carbGrams = carbCalories / 4;
    const fatGrams = fatCalories / 9;

    setResult({
      tdee,
      targetCalories: Math.round(targetCalories),
      proteinGrams: Math.round(proteinGrams),
      carbGrams: Math.round(carbGrams),
      fatGrams: Math.round(fatGrams),
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-1.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  gender === 'male' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                }`}
              >
                Erkek
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-1.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  gender === 'female' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                }`}
              >
                Kadın
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">Yaş</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="26"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-xs font-mono"
                  value={ageStr}
                  onChange={(e) => setAgeStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">Boy (cm)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="175"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-xs font-mono"
                  value={heightStr}
                  onChange={(e) => setHeightStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">Kilo (kg)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="72"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-xs font-mono"
                  value={weightStr}
                  onChange={(e) => setWeightStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1 text-foreground">Aktivite Seviyesi</label>
              <select
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                value={activityLevel}
                onChange={(e) => setActivityLevel(Number(e.target.value))}
              >
                <option value={1.2}>Masa Başı / Hareketsiz</option>
                <option value={1.375}>Hafif Egzersiz (Haftada 1-3 Gün)</option>
                <option value={1.55}>Orta Egzersiz (Haftada 3-5 Gün)</option>
                <option value={1.725}>Ağır Spor / Yoğun Antrenman (6-7 Gün)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-foreground">Hedefiniz</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setGoal('lose')}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                    goal === 'lose' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                  }`}
                >
                  Kilo Ver (-500)
                </button>
                <button
                  type="button"
                  onClick={() => setGoal('maintain')}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                    goal === 'maintain' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                  }`}
                >
                  Kiloyu Koru
                </button>
                <button
                  type="button"
                  onClick={() => setGoal('gain')}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                    goal === 'gain' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                  }`}
                >
                  Kilo Al (+400)
                </button>
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
              Hedef Kalori İhtiyacını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Günlük Hedef Kalori (TDEE)
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Almanız Gereken Günlük Enerji</span>
                  <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight font-mono">
                    {result.targetCalories} kcal
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-background rounded-lg border border-border/60">
                    <span className="text-muted-foreground block text-[11px]">Protein (%30)</span>
                    <span className="font-bold text-foreground">{result.proteinGrams} g</span>
                  </div>
                  <div className="p-2 bg-background rounded-lg border border-border/60">
                    <span className="text-muted-foreground block text-[11px]">Karb (%45)</span>
                    <span className="font-bold text-foreground">{result.carbGrams} g</span>
                  </div>
                  <div className="p-2 bg-background rounded-lg border border-border/60">
                    <span className="text-muted-foreground block text-[11px]">Yağ (%25)</span>
                    <span className="font-bold text-foreground">{result.fatGrams} g</span>
                  </div>
                </div>

                <div className="mt-3.5 p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 rounded-lg text-xs text-blue-800 dark:text-blue-300 text-left">
                  ℹ️ <strong>Sağlık Notu:</strong> Kalori ve makro değerleri genel kılavuz niteliğindedir. Bireysel sağlık durumunuz, kronik rahatsızlıklarınız ve beslenme programınız için bir diyetisyene veya doktora danışınız.
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/bmr-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    BMR metabolizma hızına bakın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Fiziksel özelliklerinizi ve hedefinizi girerek günlük kalori ve makro ihtiyacınızı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">TDEE ve Kalori Açığı Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          TDEE (Total Daily Energy Expenditure), gün boyu harcadığınız toplam kaloridir. Sağlıklı ve kalıcı kilo vermek için günlük TDEE değerinizden 400-500 kalori daha az tüketerek kalori açığı (kalori defisiti) oluşturmanız tavsiye edilir.
        </p>
      </div>
    </div>
  );
}
