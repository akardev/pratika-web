'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KlimaBtuHesaplama() {
  const [areaStr, setAreaStr] = useState<string>('25'); // Oda m²
  const [region, setRegion] = useState<string>('marmara'); // marmara=385, akdeniz=445, ege=425, ic_anadolu=345, karadeniz=385, dogu=345, guneydogu=460
  const [peopleCountStr, setPeopleCountStr] = useState<string>('2');
  const [isTopFloorOrSun, setIsTopFloorOrSun] = useState<boolean>(false);

  const [result, setResult] = useState<{
    calculatedBtu: number;
    recommendedModel: string; // 9.000, 12.000, 18.000, 24.000 BTU
    kwPower: number; // 1 kW ≈ 3412 BTU
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const area = parseTurkishNumber(areaStr);
    const people = parseTurkishNumber(peopleCountStr) || 0;

    if (isNaN(area) || area <= 0) {
      setError('Lütfen geçerli bir oda alanı (m²) giriniz.');
      return;
    }

    let regionCoeff = 385; // Marmara / Karadeniz
    if (region === 'akdeniz') regionCoeff = 445;
    else if (region === 'ege') regionCoeff = 425;
    else if (region === 'ic_anadolu' || region === 'dogu') regionCoeff = 345;
    else if (region === 'guneydogu') regionCoeff = 460;

    // Temel BTU = Alan (m²) * Bölge Katsayısı
    let totalBtu = area * regionCoeff;
    
    // İlave her kişi için +600 BTU
    if (people > 2) {
      totalBtu += (people - 2) * 600;
    }

    // Çatı katı veya çok güneş alan cephe için +%15
    if (isTopFloorOrSun) {
      totalBtu *= 1.15;
    }

    // Piyasada standart klima modelleri
    let recommendedModel = '9.000 BTU';
    if (totalBtu <= 9500) recommendedModel = '9.000 BTU/h';
    else if (totalBtu <= 13500) recommendedModel = '12.000 BTU/h';
    else if (totalBtu <= 19500) recommendedModel = '18.000 BTU/h';
    else if (totalBtu <= 26000) recommendedModel = '24.000 BTU/h';
    else recommendedModel = '28.000+ BTU / Multi Split';

    const kwPower = totalBtu / 3412.14;

    setResult({
      calculatedBtu: Math.round(totalBtu),
      recommendedModel,
      kwPower,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="area" className="block text-sm font-medium mb-1 text-foreground">
                  Oda / Salon Alanı (m²) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="area"
                    placeholder="Örn: 25"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-12 text-foreground font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary"
                    value={areaStr}
                    onChange={(e) => setAreaStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">m²</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">
                  Bulunduğunuz Coğrafi Bölge
                </label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option value="marmara">Marmara Bölgesi</option>
                  <option value="ege">Ege Bölgesi</option>
                  <option value="akdeniz">Akdeniz Bölgesi (Sıcak)</option>
                  <option value="guneydogu">Güneydoğu Anadolu</option>
                  <option value="ic_anadolu">İç Anadolu Bölgesi</option>
                  <option value="karadeniz">Karadeniz Bölgesi</option>
                  <option value="dogu">Doğu Anadolu</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="people" className="block text-xs font-medium mb-1 text-foreground">
                Odada Düzenli Bulunan Kişi Sayısı
              </label>
              <input
                type="text"
                inputMode="numeric"
                id="people"
                placeholder="2"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                value={peopleCountStr}
                onChange={(e) => setPeopleCountStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="sunCheck"
                checked={isTopFloorOrSun}
                onChange={(e) => setIsTopFloorOrSun(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="sunCheck" className="text-xs text-foreground font-medium cursor-pointer">
                ☀️ Çatı Katı veya Yoğun Güneş Alan Güney/Batı Cephe (+%15 Kapasite)
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
              Gereken Klima Kapasitesini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200 text-center">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Önerilen Klima Kapasitesi
                </h3>

                <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight font-mono">
                  {result.recommendedModel}
                </span>
                <span className="text-xs font-semibold text-foreground mt-2 inline-block bg-background px-3 py-1.5 rounded-md border border-border/80">
                  Net Hesaplanan: {formatNumber(result.calculatedBtu, 0)} BTU/h ({formatNumber(result.kwPower, 2)} kW)
                </span>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/alan-donusturucu"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Oda alanı ve metrekare dönüştürücüsüne gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Oda ölçüsü ve bölgenizi seçerek ideal klima BTU kapasitesini hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Klima BTU/h Kapasitesi Nasıl Seçilir?</h2>
        <p className="mb-4 text-muted-foreground">
          BTU (British Thermal Unit), klimanın soğutma veya ısıtma gücünü belirler. Yetersiz BTU odanın soğumamasına, aşırı yüksek BTU ise klimanın sık dur-kalk yaparak fazla elektrik harcamasına yol açar.
        </p>
      </div>
    </div>
  );
}
