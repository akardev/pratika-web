'use client';

import { useState } from 'react';
import { formatNumber } from '@/lib/utils';

export default function EkranPpiYogunlukHesaplama() {
  const [widthPx, setWidthPx] = useState<number>(2560);
  const [heightPx, setHeightPx] = useState<number>(1440);
  const [diagonalInches, setDiagonalInches] = useState<number>(27);

  const [result, setResult] = useState<{
    ppi: number;
    totalPixels: number;
    qualityAssessment: string;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    if (widthPx <= 0 || heightPx <= 0 || diagonalInches <= 0) return;

    // PPI = sqrt(w² + h²) / diagonal
    const diagPixels = Math.sqrt(widthPx * widthPx + heightPx * heightPx);
    const ppi = diagPixels / diagonalInches;
    const totalPixels = widthPx * heightPx;

    let quality = 'Standart Ekran Keskinliği';
    if (ppi >= 400) quality = 'Ultra Yüksek Retina Keskinlik (Akıllı Telefon / Üst Düzey)';
    else if (ppi >= 200) quality = 'Çok Yüksek Keskinlik (4K Monitör / Laptop Retina)';
    else if (ppi >= 100) quality = 'İyi / Net Masaüstü Monitör Keskinliği (2K/QHD)';
    else quality = 'Düşük Piksel Yoğunluğu (Büyük TV veya düşük çözünürlük)';

    setResult({
      ppi: Math.round(ppi * 10) / 10,
      totalPixels,
      qualityAssessment: quality,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="wpx" className="block text-sm font-medium text-foreground mb-1">Yatay Çözünürlük (px)</label>
              <input
                id="wpx"
                type="number"
                value={widthPx}
                onChange={(e) => setWidthPx(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="hpx" className="block text-sm font-medium text-foreground mb-1">Dikey Çözünürlük (px)</label>
              <input
                id="hpx"
                type="number"
                value={heightPx}
                onChange={(e) => setHeightPx(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="diag" className="block text-sm font-medium text-foreground mb-1">Köşegen Boyutu (İnç)</label>
              <input
                id="diag"
                type="number"
                value={diagonalInches}
                onChange={(e) => setDiagonalInches(Number(e.target.value))}
                step="0.1"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            PPI Değerini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Piksel Yoğunluğu Analizi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Piksel Yoğunluğu (PPI)</span>
                <span className="text-3xl font-bold text-primary">{result.ppi} PPI</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Piksel Sayısı</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.totalPixels)} px</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Keskinlik Değerlendirmesi</span>
                <span className="text-xs font-semibold text-foreground block mt-1">{result.qualityAssessment}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
