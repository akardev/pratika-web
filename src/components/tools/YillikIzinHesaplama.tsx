'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateWorkDuration, calculateAnnualLeave, AnnualLeaveResult, WorkDuration } from '@/lib/laborCalculations';
import DatePicker from '@/components/ui/DatePicker';
import { sanitizeNumericInput } from '@/lib/utils';

export default function YillikIzinHesaplama() {
  const [startDate, setStartDate] = useState<string>('2022-04-10');
  const [calcDate, setCalcDate] = useState<string>('2026-08-24');
  const [ageStr, setAgeStr] = useState<string>('30');

  const [result, setResult] = useState<{
    duration: WorkDuration;
    leave: AnnualLeaveResult;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!startDate || !calcDate) {
      setError('Lütfen işe giriş ve hesaplama tarihlerini girin.');
      return;
    }

    const duration = calculateWorkDuration(startDate, calcDate);
    if (!duration) {
      setError('Hesaplama tarihi işe giriş tarihinden önce olamaz.');
      return;
    }

    const age = ageStr.trim() ? Number(ageStr) : undefined;
    if (age !== undefined && (isNaN(age) || age < 14 || age > 100)) {
      setError('Lütfen geçerli bir yaş değeri girin (14-100).');
      return;
    }

    const leave = calculateAnnualLeave(duration.years, age);
    setResult({ duration, leave });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-2xs mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DatePicker
                id="leaveStart"
                label="İşe Giriş Tarihi"
                required
                value={startDate}
                onChange={setStartDate}
                placeholder="10.04.2022"
              />

              <DatePicker
                id="leaveCalc"
                label="Hesaplama Tarihi"
                required
                value={calcDate}
                onChange={setCalcDate}
                placeholder="24.08.2026"
              />
            </div>

            <div>
              <label htmlFor="workerAge" className="block text-xs font-semibold mb-1.5 text-foreground">
                Çalışanın Yaşı (İsteğe bağlı)
              </label>
              <input
                type="number"
                id="workerAge"
                min={14}
                max={100}
                placeholder="Örn: 30"
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
                value={ageStr}
                onChange={(e) => setAgeStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                4857 SK uyarınca 18 yaş ve altı ile 50 yaş ve üzeri çalışanların yıllık izni 20 günden az olamaz.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-xs rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-11 mt-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
            >
              Yıllık İzin Hakkını Hesapla
            </button>
          </form>

          {/* Sonuç Alanı */}
          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-between p-5 sm:p-6 bg-muted/20 rounded-2xl border border-border/80 shadow-2xs animate-in fade-in zoom-in-95 duration-150">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-border/60 pb-2.5">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Yıllık İzin Hakkı
                    </span>
                    <span className="text-xs font-medium text-foreground bg-background px-2.5 py-0.5 rounded border border-border/60">
                      {result.duration.formattedText}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center my-3 text-center">
                    <span className="text-xs text-muted-foreground mb-0.5">Yasal Hak Edilen İzin Süresi</span>
                    <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight font-mono">
                      {result.leave.leaveDays} <span className="text-xl font-bold">Gün</span>
                    </span>
                    <p className="text-xs text-muted-foreground mt-2 max-w-xs leading-relaxed">
                      {result.leave.ruleExplanation}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 text-center">
                  <Link
                    href="/arac/kullanilmayan-yillik-izin-ucreti-hesaplama"
                    className="text-primary hover:underline font-semibold inline-flex items-center gap-1 text-xs"
                  >
                    Kullanılmayan izinlerin ücretini hesapla &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[240px] flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 p-6 text-center text-muted-foreground bg-muted/5">
                <svg className="w-8 h-8 text-muted-foreground/60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs font-medium text-foreground">İşe giriş ve hesaplama tarihinizi girin.</p>
                <p className="text-[11px] text-muted-foreground mt-1">4857 Sayılı İş Kanunu Madde 53 esas alınır.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-5 rounded-xl border border-border/60 bg-card text-xs text-muted-foreground leading-relaxed space-y-3">
          <h3 className="font-bold text-sm text-foreground">Yıllık Ücretli İzin Yasal Kademeleri</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
              <span className="font-bold text-foreground block mb-1">1 - 5 Yıl:</span>
              <span>En az <strong>14 gün</strong></span>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
              <span className="font-bold text-foreground block mb-1">5 - 15 Yıl:</span>
              <span>En az <strong>20 gün</strong></span>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
              <span className="font-bold text-foreground block mb-1">15 Yıl ve Üzeri:</span>
              <span>En az <strong>26 gün</strong></span>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground">
            * Yer altı işlerinde çalışan işçilerin yıllık ücretli izin süreleri dörder gün arttırılarak uygulanır.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-muted/20 border border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <p>
            ⚖️ <strong>Yasal Bilgilendirme:</strong> Yıllık izin süreleri iş sözleşmesi veya toplu iş sözleşmesi ile kanuni asgari sürelerin üzerinde belirlenebilir.
          </p>
          <span className="shrink-0 font-medium text-foreground/80">
            Kaynak: 4857 SK m. 53 &amp; ÇSGB
          </span>
        </div>
      </div>
    </div>
  );
}
