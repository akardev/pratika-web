'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function GunlukYemekYolUcretiHesaplama() {
  const [workDaysStr, setWorkDaysStr] = useState<string>('22');
  const [dailyFoodStr, setDailyFoodStr] = useState<string>('240'); // Günlük yemek bedeli TL
  const [dailyTransportStr, setDailyTransportStr] = useState<string>('120'); // Günlük yol bedeli TL

  const [result, setResult] = useState<{
    workDays: number;
    dailyFood: number;
    dailyTransport: number;
    monthlyFood: number;
    monthlyTransport: number;
    totalMonthlyAllowance: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const workDays = parseTurkishNumber(workDaysStr);
    const dailyFood = parseTurkishNumber(dailyFoodStr) || 0;
    const dailyTransport = parseTurkishNumber(dailyTransportStr) || 0;

    if (isNaN(workDays) || workDays <= 0 || workDays > 31) {
      setError('Lütfen 1 ile 31 arasında geçerli bir fiili çalışma gün sayısı giriniz.');
      return;
    }
    if (dailyFood <= 0 && dailyTransport <= 0) {
      setError('Lütfen en az bir yemek veya yol bedeli giriniz.');
      return;
    }

    const monthlyFood = workDays * dailyFood;
    const monthlyTransport = workDays * dailyTransport;
    const totalMonthlyAllowance = monthlyFood + monthlyTransport;

    setResult({
      workDays,
      dailyFood,
      dailyTransport,
      monthlyFood,
      monthlyTransport,
      totalMonthlyAllowance,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="workDays" className="block text-sm font-medium mb-1 text-foreground">
                Aylık Fiili Çalışılan Gün Sayısı <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  id="workDays"
                  placeholder="Örn: 22"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-16 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={workDaysStr}
                  onChange={(e) => setWorkDaysStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">Gün</div>
              </div>
            </div>

            <div>
              <label htmlFor="dailyFood" className="block text-sm font-medium mb-1 text-foreground">
                Günlük Yemek Yardımı Tutarı (TL)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="dailyFood"
                  placeholder="Örn: 240"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={dailyFoodStr}
                  onChange={(e) => setDailyFoodStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div>
              <label htmlFor="dailyTransport" className="block text-sm font-medium mb-1 text-foreground">
                Günlük Yol / Ulaşım Yardımı (TL)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="dailyTransport"
                  placeholder="Örn: 120"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={dailyTransportStr}
                  onChange={(e) => setDailyTransportStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
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
              Yemek & Yol Ücretini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Aylık Yemek ve Yol Hak Edişi
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Toplam Aylık Yan Hak</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.totalMonthlyAllowance)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    {result.workDays} İş Günü Esas Alındı
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Aylık Yemek Bedeli:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.monthlyFood)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Aylık Yol / Ulaşım Bedeli:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.monthlyTransport)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/gunluk-ucret-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Günlük çıplak yevmiyenizi hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Çalışılan gün sayısı ve günlük tutarları girerek aylık yan hak tutarını hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Yemek ve Yol Yardımı Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Yemek ve yol yardımları iş sözleşmesi veya işyeri uygulaması gereği çalışanın fiilen işe gittiği günler için ödenir. 
          Gelir Vergisi Kanunu her yıl güncellenen günlük tutarlara kadar olan yemek ve yol ödemelerini gelir vergisinden ve SGK priminden istisna tutmaktadır.
        </p>
      </div>
    </div>
  );
}
