'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber } from '@/lib/utils';

export default function FazlaMesaiHesaplama() {
  const [salaryStr, setSalaryStr] = useState<string>('30.000');
  const [hoursStr, setHoursStr] = useState<string>('10');
  const [overtimeType, setOvertimeType] = useState<'weekday' | 'holiday'>('weekday');

  const [result, setResult] = useState<{
    hourlyWage: number;
    hours: number;
    rateMultiplier: number;
    overtimePay: number;
    totalPay: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!salaryStr.trim() || !hoursStr.trim()) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    const salary = parseTurkishNumber(salaryStr);
    const hours = parseTurkishNumber(hoursStr);

    if (isNaN(salary) || salary <= 0) {
      setError('Maaş tutarı 0\'dan büyük olmalıdır.');
      return;
    }

    if (isNaN(hours) || hours <= 0) {
      setError('Mesai saati 0\'dan büyük olmalıdır.');
      return;
    }

    const hourlyWage = salary / 225; // 4857 Sayılı Kanun
    const rateMultiplier = overtimeType === 'weekday' ? 1.5 : 2.0;
    const overtimePay = hourlyWage * rateMultiplier * hours;
    const totalPay = salary + overtimePay;

    setResult({
      hourlyWage,
      hours,
      rateMultiplier,
      overtimePay,
      totalPay,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="ovSal" className="block text-sm font-medium mb-2 text-foreground">
                Aylık Maaş Tutarı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="ovSal"
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
              <label htmlFor="ovHours" className="block text-sm font-medium mb-2 text-foreground">
                Yapılan Fazla Mesai Süresi (Saat) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="ovHours"
                  placeholder="Örn: 10"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-14 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  value={hoursStr}
                  onChange={(e) => setHoursStr(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  Saat
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Mesai Türü (Yasal Katsayı)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOvertimeType('weekday')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    overtimeType === 'weekday'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Normal Fazla Mesai (%50 Zamlı)
                </button>
                <button
                  type="button"
                  onClick={() => setOvertimeType('holiday')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    overtimeType === 'holiday'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Resmi / Genel Tatil (%100 Zamlı)
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
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Fazla Mesaiyi Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Toplam Mesai Hak Edişi</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.overtimePay)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    {result.hours} Saat &times; {formatCurrency(result.hourlyWage * result.rateMultiplier)}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Normal Saat Ücreti:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.hourlyWage)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                    <span className="font-medium text-foreground">Mesai Dahil Toplam Maaş:</span>
                    <span className="font-bold text-foreground text-sm sm:text-base">{formatCurrency(result.totalPay)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/saat-ucreti-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Yasal saatlik ücret detayınızı görün &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Maaş ve mesai saatini girip hak edişi hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
