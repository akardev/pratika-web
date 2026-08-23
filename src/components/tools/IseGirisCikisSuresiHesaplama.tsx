'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateWorkDuration, WorkDuration } from '@/lib/laborCalculations';
import DatePicker from '@/components/ui/DatePicker';

export default function IseGirisCikisSuresiHesaplama() {
  const [startDate, setStartDate] = useState<string>('2020-03-01');
  const [endDate, setEndDate] = useState<string>('2026-08-24');

  const [result, setResult] = useState<WorkDuration | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!startDate || !endDate) {
      setError('Lütfen işe giriş ve işten çıkış tarihlerini girin.');
      return;
    }

    const duration = calculateWorkDuration(startDate, endDate);
    if (!duration) {
      setError('İşten çıkış tarihi işe giriş tarihinden önce olamaz.');
      return;
    }

    setResult(duration);
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-2xs mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <DatePicker
              id="durationStart"
              label="İşe Giriş Tarihi"
              required
              value={startDate}
              onChange={setStartDate}
              placeholder="01.03.2020"
            />

            <DatePicker
              id="durationEnd"
              label="İşten Çıkış / Ayrılış Tarihi"
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
              Çalışma Süresini Hesapla
            </button>
          </form>

          {/* Sonuç Alanı */}
          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-between p-5 sm:p-6 bg-muted/20 rounded-2xl border border-border/80 shadow-2xs animate-in fade-in zoom-in-95 duration-150">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-border/60 pb-2.5">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Toplam Çalışma Süresi
                    </span>
                    <span className="text-xs font-medium text-foreground bg-background px-2.5 py-0.5 rounded border border-border/60">
                      {result.totalDays.toLocaleString('tr-TR')} Gün
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center my-3 text-center">
                    <span className="text-xs text-muted-foreground mb-0.5">Hizmet / Kıdem Süreniz</span>
                    <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight font-mono">
                      {result.formattedText}
                    </span>
                    <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-0.5 rounded border border-border/60">
                      Yaklaşık {result.totalWeeks.toLocaleString('tr-TR')} Hafta
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t border-border/60 pt-3 text-center">
                    <div className="p-2 rounded-lg bg-background border border-border/50">
                      <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Yıl</span>
                      <span className="text-base font-bold text-foreground font-mono">{result.years}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-background border border-border/50">
                      <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Ay</span>
                      <span className="text-base font-bold text-foreground font-mono">{result.months}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-background border border-border/50">
                      <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Gün</span>
                      <span className="text-base font-bold text-foreground font-mono">{result.days}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <Link
                    href="/arac/kidem-tazminati-hesaplama"
                    className="text-primary hover:underline font-semibold inline-flex items-center gap-1 text-[11px]"
                  >
                    Kıdem Tazminatını Hesapla &rarr;
                  </Link>
                  <Link
                    href="/arac/ihbar-suresi-hesaplama"
                    className="text-muted-foreground hover:text-foreground text-[11px]"
                  >
                    İhbar Süresini Gör
                  </Link>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[240px] flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 p-6 text-center text-muted-foreground bg-muted/5">
                <svg className="w-8 h-8 text-muted-foreground/60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs font-medium text-foreground">İşe giriş ve çıkış tarihlerini seçin.</p>
                <p className="text-[11px] text-muted-foreground mt-1">Yıl, ay, gün ve toplam hafta süresi anında hesaplanır.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-muted/20 border border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-muted-foreground">
        <p>
          ⚖️ <strong>Bilgilendirme:</strong> İşe başlama ve ayrılış günlerinin her ikisi de yasal olarak fiili çalışma süresine dahildir (+1 gün yöntemi uygulanır).
        </p>
        <span className="shrink-0 font-medium text-foreground/80">
          Kaynak: 4857 Sayılı İş Kanunu
        </span>
      </div>
    </div>
  );
}
