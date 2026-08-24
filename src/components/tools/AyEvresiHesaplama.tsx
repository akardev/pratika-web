'use client';

import { useState } from 'react';
import Link from 'next/link';
import DatePicker from '@/components/ui/DatePicker';
import { formatNumber } from '@/lib/utils';

export default function AyEvresiHesaplama() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const [result, setResult] = useState<{
    phaseName: string;
    phaseEmoji: string;
    illuminationPercent: number;
    moonAgeDays: number;
    nextFullMoon: string;
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

    // Sinodik Ay Döngüsü: 29.53058867 gün
    // Referans Yeni Ay: 6 Ocak 2000 18:14 UTC
    const refDate = new Date('2000-01-06T18:14:00Z').getTime();
    const targetTime = date.getTime();
    const diffDays = (targetTime - refDate) / (1000 * 60 * 60 * 24);
    const synodicMonth = 29.53058867;
    const moonAgeDays = ((diffDays % synodicMonth) + synodicMonth) % synodicMonth;

    let phaseName = 'Yeni Ay';
    let phaseEmoji = '🌑';
    let illuminationPercent = 0;

    if (moonAgeDays < 1.845) {
      phaseName = 'Yeni Ay';
      phaseEmoji = '🌑';
      illuminationPercent = 0;
    } else if (moonAgeDays < 5.536) {
      phaseName = 'Hilal (Büyüyen)';
      phaseEmoji = '🌒';
      illuminationPercent = 25;
    } else if (moonAgeDays < 9.228) {
      phaseName = 'İlk Dördün';
      phaseEmoji = '🌓';
      illuminationPercent = 50;
    } else if (moonAgeDays < 12.919) {
      phaseName = 'Şişkin Ay (Büyüyen)';
      phaseEmoji = '🌔';
      illuminationPercent = 75;
    } else if (moonAgeDays < 16.61) {
      phaseName = 'Dolunay';
      phaseEmoji = '🌕';
      illuminationPercent = 100;
    } else if (moonAgeDays < 20.302) {
      phaseName = 'Şişkin Ay (Küçülen)';
      phaseEmoji = '🌖';
      illuminationPercent = 75;
    } else if (moonAgeDays < 23.993) {
      phaseName = 'Son Dördün';
      phaseEmoji = '🌗';
      illuminationPercent = 50;
    } else if (moonAgeDays < 27.685) {
      phaseName = 'Hilal (Küçülen)';
      phaseEmoji = '🌘';
      illuminationPercent = 25;
    } else {
      phaseName = 'Yeni Ay';
      phaseEmoji = '🌑';
      illuminationPercent = 0;
    }

    // Bir sonraki dolunaya kalan gün
    const daysUntilFull = ((14.765 - moonAgeDays) + synodicMonth) % synodicMonth;
    const nextFullDate = new Date(date.getTime() + daysUntilFull * 24 * 60 * 60 * 1000);
    const nextFullMoon = nextFullDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

    setResult({
      phaseName,
      phaseEmoji,
      illuminationPercent,
      moonAgeDays,
      nextFullMoon,
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
                label="Ay Evresini Görmek İstediğiniz Tarih"
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
              Ay Evresini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200 text-center">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Ay Fazı ve Görünümü
                </h3>

                <div className="text-6xl mb-2">{result.phaseEmoji}</div>

                <span className="font-extrabold text-2xl text-foreground block">
                  {result.phaseName}
                </span>
                <span className="text-xs font-semibold text-primary mt-1 inline-block bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                  Aydınlanma Oranı: ~%{result.illuminationPercent}
                </span>

                <div className="border-t border-border/60 pt-3 mt-4 space-y-1.5 text-xs sm:text-sm text-left">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Ay Yaşı (Döngü Günü):</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.moonAgeDays, 1)} / 29.5 Gün</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">En Yakın Dolunay:</span>
                    <span className="font-semibold text-foreground">{result.nextFullMoon}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/haftanin-gunu-bulma"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Haftanın gününü bulma aracına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Tarih seçerek ayın hangi evrede (hilal, dolunay, dördün) olduğunu öğrenin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Ay Evreleri (Fazları) Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Ay&apos;ın Dünya etrafındaki bir tam dolanımı yaklaşık 29.53 gün (sinodik ay) sürer. Bu döngü Yeni Ay ile başlar, Hilal, İlk Dördün, Dolunay ve Son Dördün evrelerini takip eder.
        </p>
      </div>
    </div>
  );
}
