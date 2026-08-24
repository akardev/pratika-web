'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function GunlukSuIhtiyaciHesaplama() {
  const [weightStr, setWeightStr] = useState<string>('70'); // kg
  const [activityMinutesStr, setActivityMinutesStr] = useState<string>('30'); // dk
  const [isHotWeather, setIsHotWeather] = useState<boolean>(false);

  const [result, setResult] = useState<{
    liters: number;
    glassesCount: number; // 200ml su bardağı
    bottlesCount: number; // 500ml şişe
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const weight = parseTurkishNumber(weightStr);
    const activity = parseTurkishNumber(activityMinutesStr) || 0;

    if (isNaN(weight) || weight <= 20 || weight > 300) {
      setError('Lütfen geçerli bir kilo (kg) giriniz.');
      return;
    }

    // Temel katsayı: Kilo başına 35 ml
    let totalMl = weight * 35;
    // Her 30 dakikalık egzersiz için +350 ml
    totalMl += (activity / 30) * 350;
    // Sıcak hava için +500 ml
    if (isHotWeather) {
      totalMl += 500;
    }

    const liters = totalMl / 1000;
    const glassesCount = Math.round(totalMl / 200);
    const bottlesCount = Math.round(totalMl / 500);

    setResult({
      liters,
      glassesCount,
      bottlesCount,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="weight" className="block text-sm font-medium mb-1 text-foreground">
                  Vücut Ağırlığınız (kg) <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="weight"
                  placeholder="Örn: 70"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  value={weightStr}
                  onChange={(e) => setWeightStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>

              <div>
                <label htmlFor="activity" className="block text-sm font-medium mb-1 text-foreground">
                  Günlük Egzersiz (Dakika)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  id="activity"
                  placeholder="Örn: 30"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  value={activityMinutesStr}
                  onChange={(e) => setActivityMinutesStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="hotWeather"
                checked={isHotWeather}
                onChange={(e) => setIsHotWeather(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="hotWeather" className="text-xs text-foreground font-medium cursor-pointer">
                ☀️ Sıcak Hava / Yoğun Terleme (+500 ml)
              </label>
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
              Günlük Su İhtiyacını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200 text-center">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Tavsiye Edilen Günlük Su Miktarı
                </h3>

                <div className="text-5xl mb-2">💧</div>

                <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight font-mono">
                  {formatNumber(result.liters, 2)} Litre
                </span>
                <span className="text-xs font-semibold text-foreground mt-2 inline-block bg-background px-3 py-1.5 rounded-md border border-border/80">
                  Yaklaşık {result.glassesCount} Su Bardağı (200 ml) · {result.bottlesCount} Küçük Şişe (0.5 L)
                </span>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/bmr-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Bazal metabolizma hızınızı hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Kilonuzu ve aktivite seviyenizi girerek günlük içmeniz gereken su miktarını hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Günlük Ne Kadar Su İçilmeli?</h2>
        <p className="mb-4 text-muted-foreground">
          Dünya Sağlık Örgütü (WHO) kılavuzlarına göre sağlıklı bir yetişkinin kilogram başına günde yaklaşık <strong>30-35 ml</strong> su tüketmesi önerilir. Egzersiz ve sıcak havalarda bu miktar artırılmalıdır.
        </p>
      </div>
    </div>
  );
}
