'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function AciDonusturucu() {
  const [valStr, setValStr] = useState<string>('90');
  const [unit, setUnit] = useState<'deg' | 'rad' | 'grad' | 'turn'>('deg');

  const [result, setResult] = useState<{
    deg: number;
    rad: number;
    grad: number;
    turn: number;
    sin: number;
    cos: number;
    tan: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const val = parseTurkishNumber(valStr);
    if (isNaN(val)) {
      setError('Lütfen geçerli bir açı değeri giriniz.');
      return;
    }

    let deg = 0;
    if (unit === 'deg') deg = val;
    else if (unit === 'rad') deg = val * (180 / Math.PI);
    else if (unit === 'grad') deg = val * 0.9;
    else if (unit === 'turn') deg = val * 360;

    const rad = deg * (Math.PI / 180);
    const grad = deg / 0.9;
    const turn = deg / 360;

    const sinVal = Math.sin(rad);
    const cosVal = Math.cos(rad);
    let tanText = '';
    if (Math.abs(cosVal) < 1e-10) {
      tanText = 'Tanımsız (∞)';
    } else {
      tanText = formatNumber(Math.tan(rad), 4);
    }

    setResult({
      deg,
      rad,
      grad,
      turn,
      sin: sinVal,
      cos: cosVal,
      tan: tanText,
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
                  Açı Değeri <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="val"
                  placeholder="Örn: 90"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  value={valStr}
                  onChange={(e) => setValStr(sanitizeNumericInput(e.target.value, { allowDecimal: true, allowNegative: true }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Birim</label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as never)}
                >
                  <option value="deg">Derece (°)</option>
                  <option value="rad">Radyan (rad)</option>
                  <option value="grad">Grad (grad)</option>
                  <option value="turn">Devir / Tam Tur (turn)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-1.5 flex-wrap">
              {['30', '45', '60', '90', '180', '360'].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => { setValStr(d); setUnit('deg'); }}
                  className="px-2 py-1 text-xs font-medium rounded bg-muted hover:bg-muted/80 text-foreground border border-border/50 font-mono"
                >
                  {d}°
                </button>
              ))}
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
              Açıları Dönüştür
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Açı ve Trigonometri Sonuçları
                </h3>

                <div className="space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Derece:</span>
                    <span className="font-bold text-primary font-mono">{formatNumber(result.deg, 4)}°</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Radyan:</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.rad, 6)} rad ({formatNumber(result.rad / Math.PI, 3)} π)</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Grad:</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.grad, 2)} grad</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Sinüs / Kosinüs:</span>
                    <span className="font-bold text-foreground font-mono">sin: {formatNumber(result.sin, 4)} | cos: {formatNumber(result.cos, 4)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Tanjant:</span>
                    <span className="font-bold text-foreground font-mono">tan: {result.tan}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/cember-daire-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Daire dilim alanı hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Açı değerini girerek Derece, Radyan, Grad ve trigonometrik değerlerini hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Derece ile Radyan Dönüşümü</h2>
        <p className="mb-4 text-muted-foreground">
          Bir çember 360 derece veya <strong>2π radyan</strong>&apos;dır. Radyan formülü: <code>Radyan = Derece × (π / 180)</code>.
        </p>
      </div>
    </div>
  );
}
