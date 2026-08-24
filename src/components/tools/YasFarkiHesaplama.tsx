'use client';

import { useState } from 'react';
import DatePicker from '@/components/ui/DatePicker';
import { formatNumber } from '@/lib/utils';

export default function YasFarkiHesaplama() {
  const [firstDateStr, setFirstDateStr] = useState<string>('1995-04-12');
  const [secondDateStr, setSecondDateStr] = useState<string>('1998-09-25');

  const [result, setResult] = useState<{
    olderPerson: string;
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalHours: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!firstDateStr || !secondDateStr) {
      setError('Lütfen her iki tarihi de seçiniz.');
      return;
    }

    const d1 = new Date(firstDateStr + 'T00:00:00');
    const d2 = new Date(secondDateStr + 'T00:00:00');

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      setError('Geçerli tarihler giriniz.');
      return;
    }

    let earlier = d1;
    let later = d2;
    let olderPerson = '1. Tarih / 1. Kişi daha büyük';

    if (d1.getTime() > d2.getTime()) {
      earlier = d2;
      later = d1;
      olderPerson = '2. Tarih / 2. Kişi daha büyük';
    } else if (d1.getTime() === d2.getTime()) {
      olderPerson = 'İki tarih / kişi tamamen aynı yaşta';
    }

    let years = later.getFullYear() - earlier.getFullYear();
    let months = later.getMonth() - earlier.getMonth();
    let days = later.getDate() - earlier.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(later.getFullYear(), later.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;

    setResult({
      olderPerson,
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <form onSubmit={handleCalculate} noValidate className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstDate" className="block text-xs font-medium text-foreground mb-1.5">
                1. Kişi Doğum Tarihi (veya 1. Tarih)
              </label>
              <DatePicker
                id="firstDate"
                value={firstDateStr}
                onChange={setFirstDateStr}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="secondDate" className="block text-xs font-medium text-foreground mb-1.5">
                2. Kişi Doğum Tarihi (veya 2. Tarih)
              </label>
              <DatePicker
                id="secondDate"
                value={secondDateStr}
                onChange={setSecondDateStr}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground text-sm font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-all"
          >
            İki Tarih / Yaş Arasındaki Farkı Hesapla
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
                {result.olderPerson}
              </span>
              <span className="font-extrabold text-3xl sm:text-5xl text-primary tracking-tight">
                {result.years} Yıl, {result.months} Ay, {result.days} Gün
              </span>
              <span className="text-xs font-medium text-muted-foreground block mt-2">
                Aralarındaki Net Yaş Farkı
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-background rounded-lg border border-border text-center">
                <span className="text-xs text-muted-foreground block">Toplam Gün Farkı</span>
                <span className="text-base font-bold text-foreground">{formatNumber(result.totalDays)} Gün</span>
              </div>
              <div className="p-3 bg-background rounded-lg border border-border text-center">
                <span className="text-xs text-muted-foreground block">Toplam Hafta Farkı</span>
                <span className="text-base font-bold text-foreground">{formatNumber(result.totalWeeks)} Hafta</span>
              </div>
              <div className="p-3 bg-background rounded-lg border border-border text-center">
                <span className="text-xs text-muted-foreground block">Toplam Saat Farkı</span>
                <span className="text-base font-bold text-foreground">~{formatNumber(result.totalHours)} Saat</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Yaş Farkı Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          İki tarih arasındaki gün, ay ve yıl farkı takvim günleri ve artık yıllar hesaba katılarak tam hassasiyetle hesaplanır.
        </p>
      </div>
    </div>
  );
}
