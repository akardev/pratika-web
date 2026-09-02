'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function ParkeFayansHesaplama() {
  const [widthStr, setWidthStr] = useState<string>('4.5');
  const [lengthStr, setLengthStr] = useState<string>('6.0');
  const [wasteRate, setWasteRate] = useState<number>(10); // %10 kesim firesi
  const [boxM2Str, setBoxM2Str] = useState<string>('2.15'); // 1 paketteki m2
  const [boxPriceStr] = useState<string>('650');
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    netArea: number;
    totalWithWaste: number;
    wasteM2: number;
    boxesNeeded: number;
    totalCost: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const w = parseTurkishNumber(widthStr);
    const l = parseTurkishNumber(lengthStr);
    const boxM2 = parseTurkishNumber(boxM2Str) || 2.15;
    const boxPrice = parseTurkishNumber(boxPriceStr) || 0;

    if (isNaN(w) || isNaN(l) || w <= 0 || l <= 0) {
      setError('Lütfen oda en ve boy ölçülerini geçerli olarak girin.');
      return;
    }

    const netArea = w * l;
    const wasteM2 = netArea * (wasteRate / 100);
    const totalWithWaste = netArea + wasteM2;
    const boxesNeeded = Math.ceil(totalWithWaste / boxM2);
    const totalCost = boxesNeeded * boxPrice;

    setResult({
      netArea: Math.round(netArea * 100) / 100,
      totalWithWaste: Math.round(totalWithWaste * 100) / 100,
      wasteM2: Math.round(wasteM2 * 100) / 100,
      boxesNeeded,
      totalCost,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label htmlFor="pw" className="block text-sm font-medium text-foreground mb-1">Oda Eni (metre)</label>
              <input
                id="pw"
                type="text"
                value={widthStr}
                onChange={(e) => setWidthStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="pl" className="block text-sm font-medium text-foreground mb-1">Oda Boyu (metre)</label>
              <input
                id="pl"
                type="text"
                value={lengthStr}
                onChange={(e) => setLengthStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="wr" className="block text-sm font-medium text-foreground mb-1">Fire Oranı</label>
              <select
                id="wr"
                value={wasteRate}
                onChange={(e) => setWasteRate(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value={5}>%5 (Düz döşeme, basit oda)</option>
                <option value={10}>%10 (Standart döşeme)</option>
                <option value={15}>%15 (Çapraz döşeme, girintili oda)</option>
              </select>
            </div>
            <div>
              <label htmlFor="bm2" className="block text-sm font-medium text-foreground mb-1">Paket İçi Alan (m²)</label>
              <input
                id="bm2"
                type="text"
                value={boxM2Str}
                onChange={(e) => setBoxM2Str(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            İhtiyacı Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Malzeme ve Paket Hesabı</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Gereken Paket Sayısı</span>
                <span className="text-2xl font-bold text-primary">{result.boxesNeeded} Kutu / Paket</span>
                <span className="text-xs text-muted-foreground block mt-1">(Toplam {formatNumber(result.totalWithWaste)} m²)</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Net Alan ve Fire</span>
                <span className="text-xl font-semibold text-foreground">{formatNumber(result.netArea)} m²</span>
                <span className="text-xs text-muted-foreground block mt-1">(+{formatNumber(result.wasteM2)} m² kesim firesi)</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Tahmini Malzeme Tutarı</span>
                <span className="text-xl font-semibold text-foreground">{formatNumber(result.totalCost)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">Tadilat İpucu:</p>
        <p>Parke ve seramik döşemelerinde kenar ve köşe kesimleri nedeniyle standart odalarda %10, çapraz (diyagonal) döşemelerde en az %15 fire payı eklenmesi tavsiye edilir.</p>
      </div>
    </div>
  );
}
