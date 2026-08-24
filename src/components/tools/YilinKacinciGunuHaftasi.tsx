'use client';

import { useState } from 'react';
import Link from 'next/link';
import DatePicker from '@/components/ui/DatePicker';
import { formatNumber } from '@/lib/utils';

export default function YilinKacinciGunuHaftasi() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const [result, setResult] = useState<{
    year: number;
    dayOfYear: number;
    totalDaysInYear: number;
    remainingDays: number;
    weekNumber: number;
    yearProgressPercent: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!selectedDate) {
      setError('Lütfen bir tarih seçiniz.');
      return;
    }

    const date = new Date(selectedDate);
    if (isNaN(date.getTime())) {
      setError('Geçersiz tarih formatı.');
      return;
    }

    const year = date.getFullYear();
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const totalDaysInYear = isLeap ? 366 : 365;

    const startOfYear = new Date(year, 0, 1);
    const diffTime = date.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const remainingDays = totalDaysInYear - dayOfYear;
    const weekNumber = Math.min(53, Math.ceil(dayOfYear / 7));
    const yearProgressPercent = (dayOfYear / totalDaysInYear) * 100;

    setResult({
      year,
      dayOfYear,
      totalDaysInYear,
      remainingDays,
      weekNumber,
      yearProgressPercent,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <DatePicker
                id="targetDate"
                label="Tarih Seçin"
                value={selectedDate}
                onChange={setSelectedDate}
                required
              />
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
              Yıl İlerlemesini ve Hafta Sayısını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  {result.year} Yılı Takvim Bilgisi
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Yılın Kaçıncı Günü?</span>
                  <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight">
                    {result.dayOfYear}. Gün
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-2 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    {result.weekNumber}. Hafta (Yılın %{formatNumber(result.yearProgressPercent, 1)}&apos;i tamamlandı)
                  </span>
                </div>

                <div className="w-full bg-muted rounded-full h-2.5 mb-3 overflow-hidden">
                  <div
                    className="bg-primary h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(0, result.yearProgressPercent))}%` }}
                  ></div>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Yılın Toplam Gün Sayısı:</span>
                    <span className="font-semibold text-foreground">{result.totalDaysInYear} Gün</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Yılın Bitimine Kalan Gün:</span>
                    <span className="font-semibold text-foreground">{result.remainingDays} Gün</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/haftanin-gunu-bulma"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Hangi gün olduğunu öğrenin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Tarih seçerek yılın kaçıncı günü ve haftası olduğunu öğrenin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Yılın Günü ve Hafta Numaraları</h2>
        <p className="mb-4 text-muted-foreground">
          Bir yılda artık yıllara bağlı olarak 365 veya 366 gün ve 52-53 hafta bulunur. Proje planlamalarında ve raporlamalarda gün/hafta numarası sıkça kullanılır.
        </p>
      </div>
    </div>
  );
}
