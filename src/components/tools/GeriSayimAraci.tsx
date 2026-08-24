'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GeriSayimAraci() {
  const [eventName, setEventName] = useState<string>('Yılbaşı / Hedef Tarih');
  const [targetDateTime, setTargetDateTime] = useState<string>(() => {
    const nextYear = new Date().getFullYear() + 1;
    return `${nextYear}-01-01T00:00`;
  });

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDateTime).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetDateTime]);

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="eventName" className="block text-xs font-medium mb-1 text-foreground">
                Etkinlik / Hedef Adı
              </label>
              <input
                type="text"
                id="eventName"
                placeholder="Örn: Yılbaşı, Sınav Tarihi..."
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="targetDT" className="block text-xs font-medium mb-1 text-foreground">
                Hedef Tarih ve Saat
              </label>
              <input
                type="datetime-local"
                id="targetDT"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                value={targetDateTime}
                onChange={(e) => setTargetDateTime(e.target.value)}
              />
            </div>
          </div>

          <div className="p-6 bg-muted/20 rounded-2xl border border-border shadow-sm text-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-4">
              {eventName || 'Geri Sayım'}
            </span>

            {timeLeft.isPast ? (
              <div className="py-6">
                <span className="font-extrabold text-3xl text-emerald-600 dark:text-emerald-400">
                  🎉 Süre Doldu / Etkinlik Zamanı Geldi!
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
                <div className="p-3 bg-background rounded-xl border border-border/80 flex flex-col items-center">
                  <span className="font-extrabold text-2xl sm:text-4xl text-primary font-mono">{timeLeft.days}</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase mt-1">Gün</span>
                </div>
                <div className="p-3 bg-background rounded-xl border border-border/80 flex flex-col items-center">
                  <span className="font-extrabold text-2xl sm:text-4xl text-foreground font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase mt-1">Saat</span>
                </div>
                <div className="p-3 bg-background rounded-xl border border-border/80 flex flex-col items-center">
                  <span className="font-extrabold text-2xl sm:text-4xl text-foreground font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase mt-1">Dakika</span>
                </div>
                <div className="p-3 bg-background rounded-xl border border-border/80 flex flex-col items-center">
                  <span className="font-extrabold text-2xl sm:text-4xl text-primary font-mono">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase mt-1">Saniye</span>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-border/60 text-center">
              <Link
                href="/arac/yilin-kacinci-gunu-haftasi"
                className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                Yılın kaçıncı günü olduğunu öğrenin &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Canlı Geri Sayım Sayacı</h2>
        <p className="mb-4 text-muted-foreground">
          Önemli etkinlikler, doğum günleri, sınavlar, yeni yıl veya tatiller için kalan gün, saat, dakika ve saniyeleri anlık olarak canlı takip edebilirsiniz.
        </p>
      </div>
    </div>
  );
}
