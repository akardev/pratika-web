'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber } from '@/lib/utils';

export default function GunlukUcretHesaplama() {
  const [salaryStr, setSalaryStr] = useState<string>('30.000');
  const [daysCountStr, setDaysCountStr] = useState<string>('1');

  const [result, setResult] = useState<{
    dailyWage: number;
    hourlyWage: number;
    totalAmount: number;
    days: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!salaryStr.trim()) {
      setError('Aylık maaş 0\'dan büyük olmalıdır.');
      return;
    }

    const salary = parseTurkishNumber(salaryStr);
    if (isNaN(salary) || salary <= 0) {
      setError('Aylık maaş 0\'dan büyük olmalıdır.');
      return;
    }

    let days = 1;
    if (daysCountStr.trim()) {
      const d = parseTurkishNumber(daysCountStr);
      if (isNaN(d) || !Number.isInteger(d) || d <= 0) {
        setError('Gün sayısı pozitif bir tam sayı olmalıdır.');
        return;
      }
      days = d;
    }

    // 4857 sayılı İş Kanununa göre aylık ücretli çalışanlarda 1 günlük ücret = Aylık Ücret / 30
    const dailyWage = salary / 30;
    const hourlyWage = dailyWage / 7.5; // Günlük 7.5 saat çalışma
    const totalAmount = dailyWage * days;

    setResult({
      dailyWage,
      hourlyWage,
      totalAmount,
      days,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="dailySal" className="block text-sm font-medium mb-2 text-foreground">
                Aylık Maaş Tutarı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="dailySal"
                  placeholder="Örn: 30.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  value={salaryStr}
                  onChange={(e) => setSalaryStr(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="daysCount" className="block text-sm font-medium mb-2 text-foreground">
                Hesaplanacak Gün Sayısı (Yevmiye)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  id="daysCount"
                  placeholder="1"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-14 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  value={daysCountStr}
                  onChange={(e) => setDaysCountStr(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  Gün
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
              Günlük Ücreti Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">1 Günlük Yasal Yevmiye</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.dailyWage)}
                  </span>
                  {result.days > 1 && (
                    <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                      {result.days} Günlük Toplam: <strong>{formatCurrency(result.totalAmount)}</strong>
                    </span>
                  )}
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Saatlik Karşılığı (7,5 Saat):</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.hourlyWage)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/saat-ucreti-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Aylık saat ücreti hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Aylık maaşınızı girip günlük yevmiyenizi hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
