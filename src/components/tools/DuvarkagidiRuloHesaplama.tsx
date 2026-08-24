'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function DuvarkagidiRuloHesaplama() {
  const [wallWidthStr, setWallWidthStr] = useState<string>('4.5'); // Duvar genişliği (m)
  const [wallHeightStr, setWallHeightStr] = useState<string>('2.7'); // Duvar yüksekliği (m)
  const [hasPattern, setHasPattern] = useState<boolean>(true); // Desenli / desen tekrarı (%10-15 fire)

  const [result, setResult] = useState<{
    wallArea: number;
    rollsNeeded: number;
    stripsPerRoll: number;
    totalStrips: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const w = parseTurkishNumber(wallWidthStr);
    const h = parseTurkishNumber(wallHeightStr);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      setError('Lütfen geçerli duvar ölçüleri giriniz.');
      return;
    }

    // Standart rulo: 0.53 m genişlik x 10.05 m uzunluk
    const rollWidth = 0.53;
    const rollLength = 10.05;

    // Bir duvardan kaç şerit (boy) çıkar
    const totalStrips = Math.ceil(w / rollWidth);
    
    // Bir rulodan kaç şerit çıkar (desen payına göre tavan boyuna +10 cm pay verilir)
    const effectiveHeight = hasPattern ? (h + 0.25) : (h + 0.10);
    const stripsPerRoll = Math.floor(rollLength / effectiveHeight);

    const rollsNeeded = Math.ceil(totalStrips / (stripsPerRoll || 1));
    const wallArea = w * h;

    setResult({
      wallArea,
      rollsNeeded,
      stripsPerRoll,
      totalStrips,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="wallW" className="block text-sm font-medium mb-1 text-foreground">
                  Duvar Genişliği (m) <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="wallW"
                  placeholder="Örn: 4.5"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  value={wallWidthStr}
                  onChange={(e) => setWallWidthStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>

              <div>
                <label htmlFor="wallH" className="block text-sm font-medium mb-1 text-foreground">
                  Tavan Yüksekliği (m) <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="wallH"
                  placeholder="Örn: 2.7"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  value={wallHeightStr}
                  onChange={(e) => setWallHeightStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="hasPatternCheck"
                checked={hasPattern}
                onChange={(e) => setHasPattern(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="hasPatternCheck" className="text-xs text-foreground font-medium cursor-pointer">
                Desenli Duvar Kağıdı (Desen Tekrarı / Fire Payı Dahil)
              </label>
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
              Gereken Rulo Sayısını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200 text-center">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Gereken Duvar Kağıdı
                </h3>

                <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight font-mono">
                  {result.rollsNeeded} Rulo
                </span>
                <span className="text-xs font-semibold text-foreground mt-2 inline-block bg-background px-3 py-1.5 rounded-md border border-border/80">
                  Standart Euro Rulo (0.53m × 10.05m = 5.3 m²)
                </span>

                <div className="border-t border-border/60 pt-3 mt-4 space-y-1.5 text-xs sm:text-sm text-left">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Toplam Duvar Alanı:</span>
                    <span className="font-semibold text-foreground font-mono">{formatNumber(result.wallArea, 2)} m²</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Gereken Toplam Şerit Sayısı:</span>
                    <span className="font-semibold text-foreground font-mono">{result.totalStrips} Şerit / Boy</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/boya-miktari-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Boya miktarı hesaplama aracına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Duvar genişliği ve yüksekliğini girerek kaç rulo duvar kağıdı gerektiğini hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Duvar Kağıdı Rulo Hesabı Nasıl Yapılır?</h2>
        <p className="mb-4 text-muted-foreground">
          Piyasadaki standart Avrupa duvar kağıtları 0.53 metre eninde ve 10 metre boyundadır. Duvarın genişliğine göre kaç şerit gerektiği bulunur ve rulo boyundan çıkan şerit sayısına bölünerek net rulo adedi tespit edilir.
        </p>
      </div>
    </div>
  );
}
