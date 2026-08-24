'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function PartTimeUcretHesaplama() {
  const [weeklyHoursStr, setWeeklyHoursStr] = useState<string>('20');
  const [hourlyWageStr, setHourlyWageStr] = useState<string>('200');

  const [result, setResult] = useState<{
    weeklyHours: number;
    hourlyWage: number;
    monthlyHours: number;
    monthlyGrossWage: number;
    sgkDays: number;
    weeklyWage: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const weeklyHours = parseTurkishNumber(weeklyHoursStr);
    const hourlyWage = parseTurkishNumber(hourlyWageStr);

    if (isNaN(weeklyHours) || weeklyHours <= 0 || weeklyHours > 30) {
      setError('Part-time haftalık çalışma süresi 0 ile 30 saat arasında olmalıdır.');
      return;
    }
    if (isNaN(hourlyWage) || hourlyWage <= 0) {
      setError('Lütfen geçerli bir saatlik ücret giriniz.');
      return;
    }

    // 4857 sayılı Kanuna göre aylık çalışma saati = Haftalık saat × (30 / 7) ≈ Haftalık saat × 4.2857
    const monthlyHours = (weeklyHours * 30) / 7;
    const monthlyGrossWage = monthlyHours * hourlyWage;
    const weeklyWage = weeklyHours * hourlyWage;
    
    // SGK Prim Gün Sayısı = Aylık çalışma saati / 7.5 (Küsurlar yukarı tamamlanır)
    const sgkDays = Math.min(30, Math.ceil(monthlyHours / 7.5));

    setResult({
      weeklyHours,
      hourlyWage,
      monthlyHours,
      monthlyGrossWage,
      sgkDays,
      weeklyWage,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="weeklyHours" className="block text-sm font-medium mb-2 text-foreground">
                Haftalık Çalışma Saati <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="weeklyHours"
                  placeholder="Örn: 20"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-16 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={weeklyHoursStr}
                  onChange={(e) => setWeeklyHoursStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  Saat/Hafta
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Yasal olarak tam süreli çalışmanın (45 saat) 2/3&apos;ünü (en çok 30 saati) aşamaz.
              </p>
            </div>

            <div>
              <label htmlFor="hourlyWage" className="block text-sm font-medium mb-2 text-foreground">
                Saatlik Brüt Ücret (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="hourlyWage"
                  placeholder="Örn: 200"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={hourlyWageStr}
                  onChange={(e) => setHourlyWageStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL/Saat
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
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Part-Time Ücret ve SGK Gününü Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Part-Time Kazanç ve SGK Özeti
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Aylık Brüt Kazanç</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.monthlyGrossWage)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Aylık SGK Prim Günü: {result.sgkDays} Gün
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Haftalık Kazanç:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.weeklyWage)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Aylık Toplam Çalışma:</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.monthlyHours, 1)} Saat</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Eksik SGK Gün Sayısı:</span>
                    <span className="font-semibold text-muted-foreground">{30 - result.sgkDays} Gün (GSS kapsamı)</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/saat-ucreti-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Tam zamanlı saat ücreti standartlarını inceleyin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Haftalık çalışma saati ve saat ücretini girerek aylık kazanç ve prim gününü hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Kısmi Süreli (Part-Time) Çalışma ve SGK Günü Hesabı</h2>
        <p className="mb-4 text-muted-foreground">
          İş Kanunu md. 13 uyarınca haftalık çalışma süresi emsal tam süreli çalışmanın en çok 2/3&apos;ü (yani azami 30 saat) olan sözleşmeler kısmi süreli kabul edilir. 
          SGK prim gün sayısı ise aylık toplam çalışma saatinin yasal günlük iş süresi olan <strong>7.5 saate</strong> bölünmesiyle bulunur. Kalan kesirli saatler 1 tam gün kabul edilir.
        </p>
      </div>
    </div>
  );
}
