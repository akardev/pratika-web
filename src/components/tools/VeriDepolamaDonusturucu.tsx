'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

type DataUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB';

const UNIT_MULTIPLIERS: Record<DataUnit, number> = {
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
  PB: 1024 ** 5,
};

export default function VeriDepolamaDonusturucu() {
  const [valStr, setValStr] = useState<string>('500');
  const [fromUnit, setFromUnit] = useState<DataUnit>('GB');

  const [result, setResult] = useState<{
    B: number;
    KB: number;
    MB: number;
    GB: number;
    TB: number;
    PB: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const val = parseTurkishNumber(valStr);
    if (isNaN(val) || val < 0) {
      setError('Lütfen geçerli bir veri miktarı giriniz.');
      return;
    }

    const totalBytes = val * UNIT_MULTIPLIERS[fromUnit];

    setResult({
      B: totalBytes,
      KB: totalBytes / UNIT_MULTIPLIERS.KB,
      MB: totalBytes / UNIT_MULTIPLIERS.MB,
      GB: totalBytes / UNIT_MULTIPLIERS.GB,
      TB: totalBytes / UNIT_MULTIPLIERS.TB,
      PB: totalBytes / UNIT_MULTIPLIERS.PB,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="val" className="block text-sm font-medium mb-1 text-foreground">
                  Miktar <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="val"
                  placeholder="Örn: 500"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  value={valStr}
                  onChange={(e) => setValStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Birim</label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value as DataUnit)}
                >
                  <option value="B">Byte (B)</option>
                  <option value="KB">Kilobyte (KB)</option>
                  <option value="MB">Megabyte (MB)</option>
                  <option value="GB">Gigabyte (GB)</option>
                  <option value="TB">Terabyte (TB)</option>
                  <option value="PB">Petabyte (PB)</option>
                </select>
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
              Tüm Birimlere Dönüştür
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Dönüşüm Tablosu (1024 Tabanlı)
                </h3>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Gigabyte (GB):</span>
                    <span className="font-bold text-primary font-mono">{formatNumber(result.GB, 4)} GB</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Megabyte (MB):</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.MB, 2)} MB</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Terabyte (TB):</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.TB, 6)} TB</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Kilobyte (KB):</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.KB, 0)} KB</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Byte (B):</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.B, 0)} B</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/internet-hizi-donusturucu"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    İnternet hızı ve indirme süresi hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Veri miktarını ve birimini seçerek tüm depolama birimlerine çevirin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Dijital Depolama Birimleri (KB, MB, GB, TB)</h2>
        <p className="mb-4 text-muted-foreground">
          Bilgisayar bilimlerinde veri birimleri ikili sistem (1024 tabanlı) olarak katlanır: 1 KB = 1024 Byte, 1 MB = 1024 KB, 1 GB = 1024 MB ve 1 TB = 1024 GB&apos;tır.
        </p>
      </div>
    </div>
  );
}
