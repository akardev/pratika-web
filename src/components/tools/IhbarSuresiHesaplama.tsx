'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateWorkDuration, WorkDuration } from '@/lib/laborCalculations';
import { LABOR_CONSTANTS } from '@/data/laborConstants';
import DatePicker from '@/components/ui/DatePicker';

export default function IhbarSuresiHesaplama() {
  const [startDate, setStartDate] = useState<string>('2022-09-01');
  const [endDate, setEndDate] = useState<string>('2026-08-24');

  const [result, setResult] = useState<{
    duration: WorkDuration;
    weeks: number;
    days: number;
    label: string;
    effectiveDate: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!startDate || !endDate) {
      setError('Lütfen işe giriş ve planlanan fesih bildirim tarihlerini girin.');
      return;
    }

    const duration = calculateWorkDuration(startDate, endDate);
    if (!duration) {
      setError('Fesih bildirim tarihi işe giriş tarihinden önce olamaz.');
      return;
    }

    const totalDays = duration.totalDays;
    const period =
      LABOR_CONSTANTS.NOTICE_PERIODS.find(
        (p) => totalDays >= p.minDays && totalDays <= p.maxDays
      ) || LABOR_CONSTANTS.NOTICE_PERIODS[LABOR_CONSTANTS.NOTICE_PERIODS.length - 1];

    // Bildirim süresi bittikten sonraki sözleşme fesih tarihi
    const end = new Date(endDate + 'T00:00:00');
    const effective = new Date(end.getTime() + period.days * 24 * 60 * 60 * 1000);
    const effectiveDate = effective.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    });

    setResult({
      duration,
      weeks: period.weeks,
      days: period.days,
      label: period.label,
      effectiveDate,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-2xs mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <DatePicker
              id="periodStart"
              label="İşe Giriş Tarihi"
              required
              value={startDate}
              onChange={setStartDate}
              placeholder="01.09.2022"
            />

            <DatePicker
              id="periodEnd"
              label="Fesih Bildirim Tarihi (Bugün / Planlanan)"
              required
              value={endDate}
              onChange={setEndDate}
              placeholder="24.08.2026"
            />

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-xs rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-11 mt-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
            >
              Yasal İhbar Süresini Hesapla
            </button>
          </form>

          {/* Sonuç Alanı */}
          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-between p-5 sm:p-6 bg-muted/20 rounded-2xl border border-border/80 shadow-2xs animate-in fade-in zoom-in-95 duration-150">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-border/60 pb-2.5">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Uygulanacak İhbar Süresi
                    </span>
                    <span className="text-xs font-medium text-foreground bg-background px-2.5 py-0.5 rounded border border-border/60">
                      {result.duration.formattedText} Kıdem
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center my-3 text-center">
                    <span className="text-xs text-muted-foreground mb-0.5">Yasal Bildirim Öneli</span>
                    <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight font-mono">
                      {result.weeks} <span className="text-xl font-bold">Hafta</span>
                    </span>
                    <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-0.5 rounded border border-border/60">
                      Toplam {result.days} Takvim Günü
                    </span>
                  </div>

                  <div className="border-t border-border/60 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Yasal Kademe:</span>
                      <span className="font-medium text-foreground text-right">{result.label}</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Sözleşme Bitiş Tarihi:</span>
                      <span className="font-semibold text-foreground font-mono">{result.effectiveDate}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 text-center">
                  <Link
                    href="/arac/ihbar-tazminati-hesaplama"
                    className="text-primary hover:underline font-semibold inline-flex items-center gap-1 text-xs"
                  >
                    Süreye karşılık gelen parasal tazminatı hesapla &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[240px] flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 p-6 text-center text-muted-foreground bg-muted/5">
                <svg className="w-8 h-8 text-muted-foreground/60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs font-medium text-foreground">İşe giriş ve bildirim tarihinizi girin.</p>
                <p className="text-[11px] text-muted-foreground mt-1">4857 Sayılı İş Kanunu Madde 17 esas alınır.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-5 rounded-xl border border-border/60 bg-card text-xs text-muted-foreground leading-relaxed space-y-3">
          <h3 className="font-bold text-sm text-foreground">İhbar Süresinde Yeni İş Arama İzni</h3>
          <p>
            4857 Sayılı İş Kanunu m. 27 uyarınca, bildirim süreleri içinde işveren, işçiye yeni bir iş bulması için gerekli olan <strong>iş arama iznini</strong> iş saatleri içinde ve ücret kesintisi yapmadan vermek zorundadır. İş arama izninin süresi günde <strong>2 saatten</strong> az olamaz.
          </p>
          <p>
            İşçi isterse iş arama izin saatlerini birleştirerek toplu olarak da kullanabilir.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-muted/20 border border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <p>
            ⚖️ <strong>Yasal Bilgilendirme:</strong> Bildirim şartına uymayan taraf, bildirim süresine ilişkin ücret tutarında tazminat (ihbar tazminatı) ödemek zorundadır.
          </p>
          <span className="shrink-0 font-medium text-foreground/80">
            Kaynak: 4857 SK m. 17 &amp; m. 27
          </span>
        </div>
      </div>
    </div>
  );
}
