'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function HaliOdaMetrekareHesaplama() {
  const [roomWidthStr, setRoomWidthStr] = useState<string>('3.5');
  const [roomLengthStr, setRoomLengthStr] = useState<string>('5.0');
  const [furnitureDeduction, setFurnitureDeduction] = useState<number>(20); // %20 mobilya altı payı
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    roomArea: number;
    recommendedRugArea: number;
    suggestedStandardSizes: string[];
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const w = parseTurkishNumber(roomWidthStr);
    const l = parseTurkishNumber(roomLengthStr);

    if (isNaN(w) || isNaN(l) || w <= 0 || l <= 0) {
      setError('Lütfen oda boyutlarını metre cinsinden geçerli girin.');
      return;
    }

    const totalArea = w * l;
    const targetArea = totalArea * (1 - furnitureDeduction / 100);

    const sizes = [];
    if (targetArea <= 3) sizes.push('80x150 cm (1.2 m²) veya 100x200 cm (2 m²)');
    else if (targetArea <= 5) sizes.push('160x230 cm (3.68 m² - Yaygın 4 m²)');
    else if (targetArea <= 7) sizes.push('200x290 cm (5.80 m² - Standart 6 m²)');
    else sizes.push('200x300 cm (6 m²) veya 240x340 cm (8 m² Büyük Salon)');

    setResult({
      roomArea: Math.round(totalArea * 100) / 100,
      recommendedRugArea: Math.round(targetArea * 100) / 100,
      suggestedStandardSizes: sizes,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="rw" className="block text-sm font-medium text-foreground mb-1">Oda Eni (metre)</label>
              <input
                id="rw"
                type="text"
                value={roomWidthStr}
                onChange={(e) => setRoomWidthStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="rl" className="block text-sm font-medium text-foreground mb-1">Oda Boyu (metre)</label>
              <input
                id="rl"
                type="text"
                value={roomLengthStr}
                onChange={(e) => setRoomLengthStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="fd" className="block text-sm font-medium text-foreground mb-1">Mobilya & Kenar Boşluğu</label>
              <select
                id="fd"
                value={furnitureDeduction}
                onChange={(e) => setFurnitureDeduction(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value={15}>%15 (Geniş zemin kaplama)</option>
                <option value={25}>%25 (Standart salon yerleşimi)</option>
                <option value={40}>%40 (Yoğun eşyalı / ada halı)</option>
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Halı Ölçüsünü Belirle
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tavsiye Edilen Ölçüler</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Oda Net Alanı</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.roomArea)} m²</span>
                <span className="text-xs text-muted-foreground block mt-1">İdeal halı alanı: ~{formatNumber(result.recommendedRugArea)} m²</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Piyasada Standart Ebat Önerisi</span>
                <span className="text-base font-semibold text-foreground">{result.suggestedStandardSizes.join(', ')}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
