'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber } from '@/lib/utils';

export default function SaatUcretiHesaplama() {
  const [salaryStr, setSalaryStr] = useState<string>('30.000');
  const [hoursType, setHoursType] = useState<'standard' | 'custom'>('standard');
  const [customHoursStr, setCustomHoursStr] = useState<string>('225');

  const [result, setResult] = useState<{
    monthlySalary: number;
    hourlyWage: number;
    dailyWage: number;
    monthlyHours: number;
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

    let monthlyHours = 225; // 4857 sayılı İş Kanunu standardı
    if (hoursType === 'custom') {
      const h = parseTurkishNumber(customHoursStr);
      if (isNaN(h) || h <= 0) {
        setError('Aylık çalışma saati 0\'dan büyük olmalıdır.');
        return;
      }
      monthlyHours = h;
    }

    const hourlyWage = salary / monthlyHours;
    const dailyWage = salary / 30;

    setResult({
      monthlySalary: salary,
      hourlyWage,
      dailyWage,
      monthlyHours,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="sal" className="block text-sm font-medium mb-2 text-foreground">
                Aylık Maaş Tutarı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="sal"
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

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Aylık Çalışma Saati Esası
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setHoursType('standard')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    hoursType === 'standard'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Yasal Standart (225 Saat)
                </button>
                <button
                  type="button"
                  onClick={() => setHoursType('custom')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    hoursType === 'custom'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Özel Çalışma Saati
                </button>
              </div>

              {hoursType === 'custom' && (
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Örn: 180"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground text-sm mt-2"
                  value={customHoursStr}
                  onChange={(e) => setCustomHoursStr(e.target.value)}
                />
              )}
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
              Saatlik Ücreti Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Yasal Saat Ücretiniz</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.hourlyWage)} / saat
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Aylık {result.monthlyHours} Saat Esas Alındı
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Günlük Yevmiye (30 Günlük):</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.dailyWage)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/fazla-mesai-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Fazla mesai hak edişinizi hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Maaş tutarını girip saatlik ücretinizi hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Maaş Saat Ücreti Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          4857 sayılı Türk İş Kanunu uyarınca haftalık normal çalışma süresi en çok 45 saattir. 
          Aylık çalışma saati katsayısı ise yasal olarak <strong>225 saat</strong> kabul edilir.
        </p>

        <div className="p-5 rounded-xl border border-border/80 bg-muted/30 font-mono text-xs sm:text-sm text-foreground mb-8 space-y-1.5">
          <p className="font-sans font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-1">
            Yasal Formül:
          </p>
          <p className="font-semibold">Saatlik Ücret = Aylık Maaş / 225</p>
        </div>
      </div>
    </div>
  );
}
