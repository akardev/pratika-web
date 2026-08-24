'use client';

import { useState } from 'react';
import Link from 'next/link';
import DatePicker from '@/components/ui/DatePicker';

export default function HaftaninGunuBulma() {
  const [selectedDate, setSelectedDate] = useState<string>('2023-10-29');

  const [result, setResult] = useState<{
    dateFormatted: string;
    dayName: string;
    isWeekend: boolean;
    dayOfYear: number;
    weekNumber: number;
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

    const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const dayOfWeekIdx = date.getDay();
    const dayName = dayNames[dayOfWeekIdx];
    const isWeekend = dayOfWeekIdx === 0 || dayOfWeekIdx === 6;

    // Yılın kaçıncı günü
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    // Hafta numarası
    const weekNumber = Math.ceil(dayOfYear / 7);

    const dateFormatted = date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    setResult({
      dateFormatted,
      dayName,
      isWeekend,
      dayOfYear,
      weekNumber,
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
                label="Öğrenmek İstediğiniz Tarih"
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
              Hangi Güne Denk Geldiğini Bul
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Haftanın Günü
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">{result.dateFormatted}</span>
                  <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight">
                    {result.dayName}
                  </span>
                  <span className={`text-xs font-semibold mt-2 px-2.5 py-1 rounded-md border ${
                    result.isWeekend 
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20' 
                      : 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20'
                  }`}>
                    {result.isWeekend ? 'Hafta Sonu' : 'Hafta İçi'}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Yılın Kaçıncı Günü:</span>
                    <span className="font-semibold text-foreground">{result.dayOfYear}. Gün</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Yılın Kaçıncı Haftası:</span>
                    <span className="font-semibold text-foreground">{result.weekNumber}. Hafta</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/yas-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Yaş hesaplama aracına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Doğum gününüzün veya tarihi bir olayın haftanın hangi gününe geldiğini öğrenin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Haftanın Günü Nasıl Bulunur?</h2>
        <p className="mb-4 text-muted-foreground">
          Gregoryen takvim algoritması kullanılarak miladi tarihlerdeki her günün 7 günlük döngü içerisindeki tam günü (Pazartesi - Pazar) kesin olarak tespit edilir.
        </p>
      </div>
    </div>
  );
}
