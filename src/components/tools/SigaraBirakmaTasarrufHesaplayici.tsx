'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function SigaraBirakmaTasarrufHesaplayici() {
  const [quitDate, setQuitDate] = useState('');
  const [packsPerDayStr, setPacksPerDayStr] = useState('1');
  const [packPriceStr, setPackPriceStr] = useState('75');

  const [result, setResult] = useState<{
    daysSmokeFree: number;
    moneySaved: number;
    cigarettesNotSmoked: number;
    hoursRegained: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quitDate) return;

    const quit = new Date(quitDate);
    const now = new Date();
    const diffMs = now.getTime() - quit.getTime();
    if (diffMs < 0) return;

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const packsPerDay = parseTurkishNumber(packsPerDayStr) || 1;
    const packPrice = parseTurkishNumber(packPriceStr) || 75;

    const moneySaved = days * packsPerDay * packPrice;
    const cigarettesNotSmoked = Math.round(days * packsPerDay * 20);
    // Her sigara yaklaşık 11 dakika ömür/zaman tasarrufu
    const hoursRegained = Math.round((cigarettesNotSmoked * 11) / 60);

    setResult({
      daysSmokeFree: days,
      moneySaved: Math.round(moneySaved),
      cigarettesNotSmoked,
      hoursRegained,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="qd" className="block text-sm font-medium text-foreground mb-1">Sigarayı Bıraktığınız Tarih</label>
              <input
                id="qd"
                type="date"
                value={quitDate}
                onChange={(e) => setQuitDate(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="ppd" className="block text-sm font-medium text-foreground mb-1">Günde Kaç Paket İçiyordunuz?</label>
              <input
                id="ppd"
                type="text"
                value={packsPerDayStr}
                onChange={(e) => setPacksPerDayStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="prc" className="block text-sm font-medium text-foreground mb-1">Bir Paket Sigara Fiyatı (TL)</label>
              <input
                id="prc"
                type="text"
                value={packPriceStr}
                onChange={(e) => setPackPriceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Tasarrufu ve Sağlık Kazanımını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Kazanım Karnesi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <span className="text-xs text-muted-foreground block mb-1">Cebinizde Kalan Para</span>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {formatNumber(result.moneySaved)} ₺
                </span>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Sigarasız Geçen Süre</span>
                <span className="text-xl font-bold text-primary">{result.daysSmokeFree} Gün</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">İçilmeyen Sigara Sayısı</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.cigarettesNotSmoked)} Dal</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Geri Kazanılan Yaşam Süresi</span>
                <span className="text-xl font-bold text-foreground">{result.hoursRegained} Saat</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
