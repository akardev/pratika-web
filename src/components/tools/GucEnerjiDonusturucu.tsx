'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function GucEnerjiDonusturucu() {
  const [mode, setMode] = useState<'power' | 'energy'>('power');
  const [valStr, setValStr] = useState<string>('110'); // Örn: 110 HP araç gücü
  const [powerUnit, setPowerUnit] = useState<'hp' | 'kw' | 'w'>('hp');
  const [energyUnit, setEnergyUnit] = useState<'kwh' | 'j' | 'kcal' | 'btu'>('kwh');

  const [result, setResult] = useState<{
    hp?: number;
    kw?: number;
    w?: number;
    kwh?: number;
    j?: number;
    kcal?: number;
    btu?: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const val = parseTurkishNumber(valStr);
    if (isNaN(val) || val < 0) {
      setError('Lütfen geçerli bir pozitif değer giriniz.');
      return;
    }

    if (mode === 'power') {
      // Güç: 1 kW = 1.35962 HP (Metrik Beygir Gücü)
      let watts = 0;
      if (powerUnit === 'w') watts = val;
      else if (powerUnit === 'kw') watts = val * 1000;
      else if (powerUnit === 'hp') watts = (val / 1.35962) * 1000;

      const kw = watts / 1000;
      const hp = kw * 1.35962;

      setResult({
        w: watts,
        kw,
        hp,
      });
    } else {
      // Enerji: 1 kWh = 3.600.000 J = 860.42 kcal = 3412.14 BTU
      let joules = 0;
      if (energyUnit === 'j') joules = val;
      else if (energyUnit === 'kwh') joules = val * 3600000;
      else if (energyUnit === 'kcal') joules = val * 4184;
      else if (energyUnit === 'btu') joules = val * 1055.06;

      setResult({
        j: joules,
        kwh: joules / 3600000,
        kcal: joules / 4184,
        btu: joules / 1055.06,
      });
    }
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">Kategori</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setMode('power'); setValStr('110'); }}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    mode === 'power' ? 'bg-primary text-primary-foreground border-primary shadow-xs' : 'bg-background border-border'
                  }`}
                >
                  Güç (Beygir HP, kW, Watt)
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('energy'); setValStr('10'); }}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    mode === 'energy' ? 'bg-primary text-primary-foreground border-primary shadow-xs' : 'bg-background border-border'
                  }`}
                >
                  Enerji (kWh, Joule, kcal, BTU)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="val" className="block text-sm font-medium mb-1 text-foreground">
                  Değer <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="val"
                  placeholder="Örn: 110"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  value={valStr}
                  onChange={(e) => setValStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Birim</label>
                {mode === 'power' ? (
                  <select
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                    value={powerUnit}
                    onChange={(e) => setPowerUnit(e.target.value as never)}
                  >
                    <option value="hp">Beygir Gücü (HP / BG)</option>
                    <option value="kw">Kilowatt (kW)</option>
                    <option value="w">Watt (W)</option>
                  </select>
                ) : (
                  <select
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                    value={energyUnit}
                    onChange={(e) => setEnergyUnit(e.target.value as never)}
                  >
                    <option value="kwh">Kilowatt-saat (kWh)</option>
                    <option value="kcal">Kilokalori (kcal)</option>
                    <option value="j">Joule (J)</option>
                    <option value="btu">BTU</option>
                  </select>
                )}
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
              Birimleri Dönüştür
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Dönüşüm Eşdeğerleri
                </h3>

                {mode === 'power' ? (
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="text-muted-foreground">Beygir Gücü (HP / BG):</span>
                      <span className="font-bold text-primary font-mono">{formatNumber(result.hp!, 2)} HP</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="text-muted-foreground">Kilowatt (kW):</span>
                      <span className="font-bold text-foreground font-mono">{formatNumber(result.kw!, 3)} kW</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-muted-foreground">Watt (W):</span>
                      <span className="font-bold text-foreground font-mono">{formatNumber(result.w!, 0)} W</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="text-muted-foreground">Kilowatt-saat (kWh):</span>
                      <span className="font-bold text-primary font-mono">{formatNumber(result.kwh!, 4)} kWh</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="text-muted-foreground">Kilokalori (kcal):</span>
                      <span className="font-bold text-foreground font-mono">{formatNumber(result.kcal!, 1)} kcal</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="text-muted-foreground">BTU:</span>
                      <span className="font-bold text-foreground font-mono">{formatNumber(result.btu!, 1)} BTU</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-muted-foreground">Joule (J):</span>
                      <span className="font-bold text-foreground font-mono">{formatNumber(result.j!, 0)} J</span>
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/elektrik-faturasi-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Elektrik kWh fatura hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Araç beygir gücü (HP) veya elektrik kilowatt (kW) ve enerji birimlerini dönüştürün.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Beygir Gücü (HP) ile kW Dönüşümü</h2>
        <p className="mb-4 text-muted-foreground">
          Otomotiv sektöründe yaygın olarak kullanılan metrik Beygir Gücü (BG / PS / HP) dönüşümünde <strong>1 kW = 1.35962 Beygir Gücü</strong> veya <strong>1 HP ≈ 0.7355 kW</strong> esastır.
        </p>
      </div>
    </div>
  );
}
