'use client';

import { useState } from 'react';
import { formatNumber } from '@/lib/utils';
import DatePicker from '@/components/ui/DatePicker';

interface DateDiffResult {
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  years: number;
  months: number;
  days: number;
  workDays: number;
  weekendDays: number;
}

export default function TarihFarkiHesaplama() {
  const [startDateStr, setStartDateStr] = useState<string>('2026-01-01');
  const [endDateStr, setEndDateStr] = useState<string>('2026-08-24');
  const [result, setResult] = useState<DateDiffResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!startDateStr || !endDateStr) {
      setError('Lütfen her iki tarihi de seçin veya yazın.');
      return;
    }

    const d1 = new Date(startDateStr + 'T00:00:00');
    const d2 = new Date(endDateStr + 'T00:00:00');

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      setError('Geçerli tarihler seçin.');
      return;
    }

    const isReverse = d1 > d2;
    const start = isReverse ? d2 : d1;
    const end = isReverse ? d1 : d2;

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

    // Yıl, ay, gün detay farkı
    let y = end.getFullYear() - start.getFullYear();
    let m = end.getMonth() - start.getMonth();
    let d = end.getDate() - start.getDate();

    if (d < 0) {
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      d += prevMonth.getDate();
      m -= 1;
    }
    if (m < 0) {
      m += 12;
      y -= 1;
    }

    // İş günü hesabı
    let workDays = 0;
    let weekendDays = 0;
    const cur = new Date(start);
    while (cur < end) {
      const dayOfWeek = cur.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDays++;
      } else {
        workDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }

    setResult({
      totalDays,
      totalWeeks,
      totalMonths,
      years: y,
      months: m,
      days: d,
      workDays,
      weekendDays,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <DatePicker
              id="startDate"
              label="Başlangıç Tarihi"
              required
              value={startDateStr}
              onChange={setStartDateStr}
              placeholder="01.01.2026"
            />

            <DatePicker
              id="endDate"
              label="Bitiş Tarihi"
              required
              value={endDateStr}
              onChange={setEndDateStr}
              placeholder="24.08.2026"
            />

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Tarih Farkını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Toplam Gün Sayısı</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight font-mono">
                    {formatNumber(result.totalDays)} Gün
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80 font-mono">
                    {result.years > 0 ? `${result.years} Yıl ` : ''}{result.months > 0 ? `${result.months} Ay ` : ''}{result.days} Gün
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Hafta Sayısı:</span>
                    <span className="font-semibold text-foreground font-mono">{formatNumber(result.totalWeeks)} Hafta</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Net İş Günü (Pzt-Cum):</span>
                    <span className="font-semibold text-foreground font-mono">{formatNumber(result.workDays)} Gün</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Hafta Sonu Günleri:</span>
                    <span className="font-semibold text-foreground font-mono">{formatNumber(result.weekendDays)} Gün</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">İki tarih seçip veya yazıp farkı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
