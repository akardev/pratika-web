'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function DosyaAktarimSuresiHesaplama() {
  const [fileSizeStr, setFileSizeStr] = useState<string>('5');
  const [fileSizeUnit, setFileSizeUnit] = useState<'MB' | 'GB' | 'TB'>('GB');
  const [speedStr, setSpeedStr] = useState<string>('100');
  const [speedUnit, setSpeedUnit] = useState<'Mbps' | 'MBps' | 'Gbps'>('Mbps');

  const [result, setResult] = useState<{
    totalSeconds: number;
    formattedTime: string;
    speedMBps: number;
    fileSizeMB: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const size = parseTurkishNumber(fileSizeStr);
    const speed = parseTurkishNumber(speedStr);

    if (isNaN(size) || size <= 0) {
      setError('Lütfen geçerli bir dosya boyutu giriniz.');
      return;
    }

    if (isNaN(speed) || speed <= 0) {
      setError('Lütfen geçerli bir bağlantı veya aktarım hızı giriniz.');
      return;
    }

    // Dosya boyutunu Megabayt (MB) cinsine çevir
    let fileSizeMB = size;
    if (fileSizeUnit === 'GB') fileSizeMB = size * 1024;
    else if (fileSizeUnit === 'TB') fileSizeMB = size * 1024 * 1024;

    // Aktarım hızını saniyede Megabayt (MB/s) cinsine çevir
    let speedMBps = speed;
    if (speedUnit === 'Mbps') speedMBps = speed / 8;
    else if (speedUnit === 'Gbps') speedMBps = (speed * 1000) / 8;

    const totalSeconds = fileSizeMB / speedMBps;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const timeParts = [];
    if (hours > 0) timeParts.push(`${hours} saat`);
    if (minutes > 0 || hours > 0) timeParts.push(`${minutes} dakika`);
    timeParts.push(`${seconds} saniye`);

    setResult({
      totalSeconds,
      formattedTime: timeParts.join(' '),
      speedMBps,
      fileSizeMB,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <form onSubmit={handleCalculate} noValidate className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fileSize" className="block text-xs font-medium text-foreground mb-1.5">
                Dosya Boyutu
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="decimal"
                  id="fileSize"
                  placeholder="Örn: 5"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  value={fileSizeStr}
                  onChange={(e) => setFileSizeStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <select
                  className="rounded-lg border border-border bg-background px-3 py-2.5 text-xs font-semibold text-foreground"
                  value={fileSizeUnit}
                  onChange={(e) => setFileSizeUnit(e.target.value as 'MB' | 'GB' | 'TB')}
                >
                  <option value="MB">MB</option>
                  <option value="GB">GB</option>
                  <option value="TB">TB</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="speed" className="block text-xs font-medium text-foreground mb-1.5">
                İndirme / Aktarım Hızı
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="decimal"
                  id="speed"
                  placeholder="Örn: 100"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  value={speedStr}
                  onChange={(e) => setSpeedStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <select
                  className="rounded-lg border border-border bg-background px-3 py-2.5 text-xs font-semibold text-foreground"
                  value={speedUnit}
                  onChange={(e) => setSpeedUnit(e.target.value as 'Mbps' | 'MBps' | 'Gbps')}
                >
                  <option value="Mbps">Mbps (İnternet Hızı)</option>
                  <option value="MBps">MB/s (Gerçek Hız)</option>
                  <option value="Gbps">Gbps</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground text-sm font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-all"
          >
            Tahmini İndirme / Aktarım Süresini Hesapla
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 bg-muted/20 rounded-xl border border-border text-center">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                Tahmini Aktarım / İndirme Süresi
              </span>
              <span className="font-extrabold text-3xl sm:text-5xl text-primary tracking-tight">
                {result.formattedTime}
              </span>
              <span className="text-xs text-muted-foreground block mt-2">
                Saniyede ~{formatNumber(result.speedMBps, 1)} MB veri transferi
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">İndirme Süresi Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          İnternet servis sağlayıcılarının belirttiği 100 Mbps (Megabit) hızı, saniyede 12.5 MB (Megabayt) indirmeye karşılık gelir (1 Byte = 8 Bit).
        </p>
      </div>
    </div>
  );
}
