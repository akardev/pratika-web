'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CityTimeZone {
  label: string;
  zone: string;
}

const CITIES: CityTimeZone[] = [
  { label: 'İstanbul (Türkiye)', zone: 'Europe/Istanbul' },
  { label: 'Londra (İngiltere)', zone: 'Europe/London' },
  { label: 'New York (ABD - EST)', zone: 'America/New_York' },
  { label: 'Los Angeles (ABD - PST)', zone: 'America/Los_Angeles' },
  { label: 'Berlin / Paris (Orta Avrupa)', zone: 'Europe/Berlin' },
  { label: 'Dubai (BAE)', zone: 'Asia/Dubai' },
  { label: 'Tokyo (Japonya)', zone: 'Asia/Tokyo' },
  { label: 'Sidney (Avustralya)', zone: 'Australia/Sydney' },
  { label: 'Moskova (Rusya)', zone: 'Europe/Moscow' },
];

export default function ZamanDilimiDonusturucu() {
  const [sourceZone, setSourceZone] = useState<string>('Europe/Istanbul');
  const [targetZone, setTargetZone] = useState<string>('America/New_York');
  const [inputTime, setInputTime] = useState<string>('14:30');
  const [inputDate, setInputDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const [result, setResult] = useState<{
    targetTime: string;
    targetDate: string;
    dayDifferenceText: string;
    sourceZoneLabel: string;
    targetZoneLabel: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!inputTime || !inputDate) {
      setError('Lütfen tarih ve saat seçiniz.');
      return;
    }

    try {
      const dateTimeString = `${inputDate}T${inputTime}:00`;
      // Hedef ve kaynak için Intl.DateTimeFormat
      const testDate = new Date(dateTimeString);

      const targetDateFormatted = new Intl.DateTimeFormat('tr-TR', {
        timeZone: targetZone,
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(testDate);

      const targetTimeFormatted = new Intl.DateTimeFormat('tr-TR', {
        timeZone: targetZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(testDate);

      const sourceLabel = CITIES.find((c) => c.zone === sourceZone)?.label || sourceZone;
      const targetLabel = CITIES.find((c) => c.zone === targetZone)?.label || targetZone;

      setResult({
        targetTime: targetTimeFormatted,
        targetDate: targetDateFormatted,
        dayDifferenceText: 'Saat farkı başarıyla dönüştürüldü.',
        sourceZoneLabel: sourceLabel,
        targetZoneLabel: targetLabel,
      });
    } catch {
      setError('Zaman dilimi dönüşümü sırasında bir hata oluştu.');
    }
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">Kaynak Şehir / Ülke</label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  value={sourceZone}
                  onChange={(e) => setSourceZone(e.target.value)}
                >
                  {CITIES.map((c) => (
                    <option key={c.zone} value={c.zone}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">Hedef Şehir / Ülke</label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  value={targetZone}
                  onChange={(e) => setTargetZone(e.target.value)}
                >
                  {CITIES.map((c) => (
                    <option key={c.zone} value={c.zone}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="inTime" className="block text-xs font-medium mb-1 text-foreground">
                  Kaynak Saat <span className="text-destructive">*</span>
                </label>
                <input
                  type="time"
                  id="inTime"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  value={inputTime}
                  onChange={(e) => setInputTime(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="inDate" className="block text-xs font-medium mb-1 text-foreground">
                  Kaynak Tarih <span className="text-destructive">*</span>
                </label>
                <input
                  type="date"
                  id="inDate"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                />
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
              Dünya Saatini Dönüştür
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hedef Konumdaki Saat
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">{result.targetZoneLabel}</span>
                  <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight font-mono">
                    {result.targetTime}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-2 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Tarih: {result.targetDate}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/saat-farki-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    İki saat arası süre farkı hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Şehirleri ve saati seçerek uluslararası zaman farkını hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Dünya Zaman Dilimleri (Time Zones)</h2>
        <p className="mb-4 text-muted-foreground">
          Uluslararası toplantılar, uçuşlar ve küresel iş takiplerinde zaman dilimi farkları kritik önem taşır. Türkiye UTC+3 sabit saat diliminde yer alır.
        </p>
      </div>
    </div>
  );
}
