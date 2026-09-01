'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function InternetHiziDonusturucu() {
  const [speedMbpsStr, setSpeedMbpsStr] = useState<string>('100'); // Mbps (Megabit/saniye)
  const [fileSizeGbStr, setFileSizeGbStr] = useState<string>('20'); // İndirilecek dosya GB

  const [result, setResult] = useState<{
    speedMbps: number;
    speedMBps: number; // MB/s (saniyede indirilen megabyte = Mbps / 8)
    speedKBps: number;
    speedGbps: number;
    downloadSeconds: number;
    downloadTimeFormatted: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const speedMbps = parseTurkishNumber(speedMbpsStr);
    const fileSizeGb = parseTurkishNumber(fileSizeGbStr) || 0;

    if (isNaN(speedMbps) || speedMbps <= 0) {
      setError('Lütfen geçerli bir internet hızı (Mbps) giriniz.');
      return;
    }

    // 1 Byte = 8 Bit => MB/s = Mbps / 8
    const speedMBps = speedMbps / 8;
    const speedKBps = speedMBps * 1024;
    const speedGbps = speedMbps / 1000;

    // Dosya boyutu Megabyte cinsinden: GB * 1024
    const totalFileMB = fileSizeGb * 1024;
    const downloadSeconds = speedMBps > 0 ? totalFileMB / speedMBps : 0;

    const hours = Math.floor(downloadSeconds / 3600);
    const minutes = Math.floor((downloadSeconds % 3600) / 60);
    const seconds = Math.floor(downloadSeconds % 60);

    let downloadTimeFormatted = '';
    if (hours > 0) downloadTimeFormatted += `${hours} saat `;
    if (minutes > 0 || hours > 0) downloadTimeFormatted += `${minutes} dk `;
    downloadTimeFormatted += `${seconds} sn`;

    setResult({
      speedMbps,
      speedMBps,
      speedKBps,
      speedGbps,
      downloadSeconds,
      downloadTimeFormatted,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="speed" className="block text-sm font-medium mb-1 text-foreground">
                İnternet Hızınız (Mbps / Megabit) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="speed"
                  placeholder="Örn: 100"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-16 text-foreground font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  value={speedMbpsStr}
                  onChange={(e) => setSpeedMbpsStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">Mbps</div>
              </div>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {['16', '24', '35', '50', '100', '200', '500', '1000'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSpeedMbpsStr(s)}
                    className="px-2 py-1 text-xs font-medium rounded bg-muted hover:bg-muted/80 text-foreground border border-border/50"
                  >
                    {s} Mbps
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="fileSize" className="block text-sm font-medium mb-1 text-foreground">
                İndirilecek Dosya Boyutu (GB)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="fileSize"
                  placeholder="Örn: 20"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-12 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={fileSizeGbStr}
                  onChange={(e) => setFileSizeGbStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">GB</div>
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
              Hızı ve İndirme Süresini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200 text-center">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Gerçek İndirme Hızı (Saniyede)
                </h3>

                <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight font-mono">
                  {formatNumber(result.speedMBps, 2)} MB/s
                </span>
                <span className="text-xs font-semibold text-foreground mt-2 inline-block bg-background px-3 py-1.5 rounded-md border border-border/80">
                  {result.speedMbps} Megabit = Saniyede {formatNumber(result.speedMBps, 2)} Megabyte Veri
                </span>

                <div className="border-t border-border/60 pt-3 mt-4 space-y-1.5 text-xs sm:text-sm text-left">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">{fileSizeGbStr} GB Dosya İndirme Süresi:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">~{result.downloadTimeFormatted}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Kilobyte Cinsinden:</span>
                    <span className="font-semibold text-foreground font-mono">{formatNumber(result.speedKBps, 0)} KB/s</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/veri-birimi-donusturucu"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Veri depolama ve birim dönüştürücüsüne gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">İnternet paketi hızınızı (Mbps) girerek saniyede kaç MB indireceğinizi ve dosya indirme süresini görün.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Mbps ile MB/s Arasındaki Fark Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          İnternet servis sağlayıcılarının sattığı hız <strong>Mbps (Megabit per second)</strong> cinsindendir. Dosya boyutları ise <strong>MB (Megabyte)</strong> olarak ölçülür. 1 Byte = 8 Bit olduğundan, gerçek indirme hızınız tarife hızınızın 8&apos;de biridir (Örn: 100 Mbps internet ile saniyede en fazla 12.5 MB dosya indirilir).
        </p>
      </div>
    </div>
  );
}
