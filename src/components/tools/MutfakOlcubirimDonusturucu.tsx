'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

type Ingredient = 'su' | 'un' | 'seker' | 'sivi_yag' | 'pirinc' | 'tereyag';
type KitchenUnit = 'su_bardagi' | 'cay_bardagi' | 'yemek_kasigi' | 'tatli_kasigi' | 'cay_kasigi' | 'gram' | 'ml' | 'cup' | 'tbsp' | 'tsp';

// 1 Su bardağı = 200 ml
// 1 Çay bardağı = 100 ml
// 1 Yemek kaşığı = 15 ml
// 1 Tatlı kaşığı = 10 ml
// 1 Çay kaşığı = 5 ml
// 1 US Cup = 240 ml
// 1 US Tbsp = 15 ml
// 1 US Tsp = 5 ml

// Malzeme Yoğunlukları (Gram / mL):
const DENSITIES: Record<Ingredient, number> = {
  su: 1.0, // 1 Su bardağı = 200g
  un: 0.60, // 1 Su bardağı = 120g
  seker: 0.85, // 1 Su bardağı = 170g
  sivi_yag: 0.90, // 1 Su bardağı = 180g
  pirinc: 0.95, // 1 Su bardağı = 190g
  tereyag: 0.92, // 1 Su bardağı = 185g
};

const ML_PER_UNIT: Record<KitchenUnit, number> = {
  ml: 1,
  gram: 1, // Yoğunluğa göre hesaplanacak
  su_bardagi: 200,
  cay_bardagi: 100,
  yemek_kasigi: 15,
  tatli_kasigi: 10,
  cay_kasigi: 5,
  cup: 240,
  tbsp: 15,
  tsp: 5,
};

export default function MutfakOlcubirimDonusturucu() {
  const [valStr, setValStr] = useState<string>('2');
  const [unit, setUnit] = useState<KitchenUnit>('su_bardagi');
  const [ingredient, setIngredient] = useState<Ingredient>('un');

  const [result, setResult] = useState<{
    gram: number;
    ml: number;
    su_bardagi: number;
    cay_bardagi: number;
    yemek_kasigi: number;
    cay_kasigi: number;
    cup: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const val = parseTurkishNumber(valStr);
    if (isNaN(val) || val <= 0) {
      setError('Lütfen geçerli bir miktar giriniz.');
      return;
    }

    const density = DENSITIES[ingredient];
    let totalMl = 0;

    if (unit === 'gram') {
      totalMl = val / density;
    } else {
      totalMl = val * ML_PER_UNIT[unit];
    }

    const totalGram = totalMl * density;

    setResult({
      gram: totalGram,
      ml: totalMl,
      su_bardagi: totalMl / 200,
      cay_bardagi: totalMl / 100,
      yemek_kasigi: totalMl / 15,
      cay_kasigi: totalMl / 5,
      cup: totalMl / 240,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">
                Malzeme Türü <span className="text-destructive">*</span>
              </label>
              <select
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value as Ingredient)}
              >
                <option value="un">Buğday Unu (1 Su Bardağı ≈ 120 g)</option>
                <option value="seker">Toz Şeker (1 Su Bardağı ≈ 170 g)</option>
                <option value="su">Su / Süt / Sıvı (1 Su Bardağı ≈ 200 g)</option>
                <option value="sivi_yag">Sıvı Yağ / Zeytinyağı (1 Su Bardağı ≈ 180 g)</option>
                <option value="tereyag">Tereyağı / Margarin (1 Su Bardağı ≈ 185 g)</option>
                <option value="pirinc">Pirinç / Bulgur (1 Su Bardağı ≈ 190 g)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="val" className="block text-sm font-medium mb-1 text-foreground">
                  Miktar <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="val"
                  placeholder="Örn: 2"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  value={valStr}
                  onChange={(e) => setValStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Ölçü Birimi</label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as KitchenUnit)}
                >
                  <option value="su_bardagi">Su Bardağı (200 ml)</option>
                  <option value="cay_bardagi">Çay Bardağı (100 ml)</option>
                  <option value="yemek_kasigi">Yemek Kaşığı (15 ml)</option>
                  <option value="tatli_kasigi">Tatlı Kaşığı (10 ml)</option>
                  <option value="cay_kasigi">Çay Kaşığı (5 ml)</option>
                  <option value="gram">Gram (g)</option>
                  <option value="ml">Mililitre (ml)</option>
                  <option value="cup">Cup (US 240 ml)</option>
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
              Mutfak Ölçülerini Dönüştür
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Tarif Karşılıkları
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-4 text-center">
                  <div className="p-3 bg-background rounded-lg border border-border/60">
                    <span className="text-xs text-muted-foreground block mb-0.5">Ağırlık Karşılığı</span>
                    <span className="font-extrabold text-2xl text-primary font-mono">{formatNumber(result.gram, 1)} Gram</span>
                  </div>
                  <div className="p-3 bg-background rounded-lg border border-border/60">
                    <span className="text-xs text-muted-foreground block mb-0.5">Hacim Karşılığı</span>
                    <span className="font-extrabold text-2xl text-foreground font-mono">{formatNumber(result.ml, 1)} mL</span>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Su Bardağı:</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.su_bardagi, 2)} Bardak</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Çay Bardağı:</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.cay_bardagi, 2)} Çay Bardağı</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Yemek Kaşığı:</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.yemek_kasigi, 1)} Yemek Kaşığı</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">US Cup:</span>
                    <span className="font-bold text-foreground font-mono">{formatNumber(result.cup, 2)} Cup</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/hacim-sivi-donusturucu"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Genel sıvı hacim dönüştürücüsüne gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Yemek veya tatlı tariflerindeki bardak, kaşık ve gram ölçülerini birbirine dönüştürün.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">1 Su Bardağı Kaç Gram Eder?</h2>
        <p className="mb-4 text-muted-foreground">
          Standart 200 ml su bardağı su ile doldurulduğunda 200 gram, un ile doldurulduğunda yaklaşık <strong>120 gram</strong>, toz şeker ile doldurulduğunda ise yaklaşık <strong>170 gram</strong> gelir. Malzemenin yoğunluğuna göre ağırlık değişir.
        </p>
      </div>
    </div>
  );
}
