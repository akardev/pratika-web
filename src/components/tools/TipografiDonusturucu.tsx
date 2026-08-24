'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

type TypoUnit = 'px' | 'rem' | 'em' | 'pt' | 'percent';

export default function TipografiDonusturucu() {
  const [valStr, setValStr] = useState<string>('16');
  const [unit, setUnit] = useState<TypoUnit>('px');
  const [baseFontSizeStr, setBaseFontSizeStr] = useState<string>('16'); // 16px browser default root font size

  const [result, setResult] = useState<{
    px: number;
    rem: number;
    em: number;
    pt: number;
    percent: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const val = parseTurkishNumber(valStr);
    const basePx = parseTurkishNumber(baseFontSizeStr) || 16;

    if (isNaN(val) || val <= 0) {
      setError('Lütfen geçerli bir font boyutu giriniz.');
      return;
    }

    let px = 0;
    if (unit === 'px') px = val;
    else if (unit === 'rem' || unit === 'em') px = val * basePx;
    else if (unit === 'pt') px = val * (96 / 72); // 1pt = 1.333px (96 DPI)
    else if (unit === 'percent') px = (val / 100) * basePx;

    const rem = px / basePx;
    const em = rem;
    const pt = px * (72 / 96);
    const percent = (px / basePx) * 100;

    setResult({
      px,
      rem,
      em,
      pt,
      percent,
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
                  Değer <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="val"
                  placeholder="Örn: 16"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  value={valStr}
                  onChange={(e) => setValStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Birim</label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as TypoUnit)}
                >
                  <option value="px">Piksel (px)</option>
                  <option value="rem">rem (Root Em)</option>
                  <option value="em">em</option>
                  <option value="pt">Punto (pt - Baskı)</option>
                  <option value="percent">Yüzde (%)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="baseFont" className="block text-xs font-medium mb-1 text-foreground">
                Kök Font Boyutu (Root / Base Size px)
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="baseFont"
                placeholder="16"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                value={baseFontSizeStr}
                onChange={(e) => setBaseFontSizeStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
              />
              <p className="text-[11px] text-muted-foreground mt-0.5">Tarayıcı varsayılanı 16px&apos;tir.</p>
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
              Tipografi Birimlerini Dönüştür
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Tipografi Karşılıkları
                </h3>

                <div className="space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Piksel (px):</span>
                    <span className="font-bold text-primary font-mono">{formatNumber(result.px, 2)} px</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">rem:</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.rem, 4)} rem</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Punto (pt):</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.pt, 2)} pt</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Yüzde (%):</span>
                    <span className="font-bold text-foreground font-mono">%{formatNumber(result.percent, 1)}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-background rounded-lg border border-border/60 text-center overflow-hidden">
                  <span className="text-[11px] text-muted-foreground block mb-1">Canlı Boyut Önizlemesi:</span>
                  <p style={{ fontSize: `${Math.min(48, Math.max(10, result.px))}px` }} className="font-semibold text-foreground truncate">
                    Örnek Tipografi Metni
                  </p>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Piksel (px) ve REM/EM arasında kolayca web ve tasarım dönüşümü yapın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">PX ile REM Dönüşümü Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          CSS tasarımında erişilebilirlik ve responsive uyum için <strong>rem</strong> birimi kullanılır. 1 rem kök font büyüklüğüne (genellikle 16px) eşittir. Formül: <code>rem = piksel / 16</code>.
        </p>
      </div>
    </div>
  );
}
