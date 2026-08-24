'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function CemberDaireHesaplama() {
  const [radiusStr, setRadiusStr] = useState<string>('5');
  const [angleStr, setAngleStr] = useState<string>('90'); // Daire dilimi açısı derece

  const [result, setResult] = useState<{
    radius: number;
    diameter: number;
    circumference: number; // Çevre 2πr
    area: number; // Alan πr²
    arcLength: number; // Yay uzunluğu
    sectorArea: number; // Dilim alanı
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const r = parseTurkishNumber(radiusStr);
    const angle = parseTurkishNumber(angleStr) || 0;

    if (isNaN(r) || r <= 0) {
      setError('Lütfen geçerli bir pozitif yarıçap (r) giriniz.');
      return;
    }
    if (angle < 0 || angle > 360) {
      setError('Dilim açısı 0 ile 360 derece arasında olmalıdır.');
      return;
    }

    const diameter = 2 * r;
    const circumference = 2 * Math.PI * r;
    const area = Math.PI * Math.pow(r, 2);
    const arcLength = (2 * Math.PI * r * angle) / 360;
    const sectorArea = (Math.PI * Math.pow(r, 2) * angle) / 360;

    setResult({
      radius: r,
      diameter,
      circumference,
      area,
      arcLength,
      sectorArea,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="radius" className="block text-sm font-medium mb-1 text-foreground">
                Yarıçap (r) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="radius"
                  placeholder="Örn: 5"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={radiusStr}
                  onChange={(e) => setRadiusStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">cm / m</div>
              </div>
            </div>

            <div>
              <label htmlFor="angle" className="block text-sm font-medium mb-1 text-foreground">
                Daire Dilim Açısı (Derece °)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="angle"
                  placeholder="Örn: 90"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={angleStr}
                  onChange={(e) => setAngleStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">°</div>
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
              Daire Geometrisini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Geometrik Ölçümler (π ≈ 3.14159)
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-4 text-center">
                  <div className="p-3 bg-background rounded-lg border border-border/60">
                    <span className="text-xs text-muted-foreground block mb-0.5">Dairenin Alanı</span>
                    <span className="font-extrabold text-2xl text-primary font-mono">{formatNumber(result.area, 2)}</span>
                  </div>
                  <div className="p-3 bg-background rounded-lg border border-border/60">
                    <span className="text-xs text-muted-foreground block mb-0.5">Çevre Uzunluğu</span>
                    <span className="font-extrabold text-2xl text-foreground font-mono">{formatNumber(result.circumference, 2)}</span>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Çap (2r):</span>
                    <span className="font-semibold text-foreground font-mono">{result.diameter}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Dilim Alanı ({angleStr}°):</span>
                    <span className="font-semibold text-foreground font-mono">{formatNumber(result.sectorArea, 2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Yay Uzunluğu ({angleStr}°):</span>
                    <span className="font-semibold text-foreground font-mono">{formatNumber(result.arcLength, 2)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/metrekare-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Metrekare ve alan hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Yarıçap girerek dairenin çevre, alan ve dilim değerlerini hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Çember ve Daire Formülleri</h2>
        <p className="mb-4 text-muted-foreground">
          Dairenin alanı <code>A = π × r²</code>, çemberin çevresi ise <code>Ç = 2 × π × r</code> formülleriyle hesaplanır.
        </p>
      </div>
    </div>
  );
}
