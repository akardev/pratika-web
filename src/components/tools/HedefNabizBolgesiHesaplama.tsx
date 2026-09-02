'use client';

import { useState } from 'react';


export default function HedefNabizBolgesiHesaplama() {
  const [age, setAge] = useState<number>(30);
  const [restingHeartRate, setRestingHeartRate] = useState<number>(65);

  const [result, setResult] = useState<{
    maxHR: number;
    heartRateReserve: number;
    zones: { name: string; range: string; desc: string; color: string }[];
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    // Tanaka Formülü: Max HR = 208 - (0.7 * Yaş)
    const maxHR = Math.round(208 - (0.7 * age));
    // Karvonen Kalp Hızı Rezervi = Max HR - Dinlenik Nabız
    const hrr = maxHR - restingHeartRate;

    const calcZone = (minPercent: number, maxPercent: number) => {
      const low = Math.round(restingHeartRate + (hrr * minPercent));
      const high = Math.round(restingHeartRate + (hrr * maxPercent));
      return `${low} - ${high} bpm`;
    };

    setResult({
      maxHR,
      heartRateReserve: hrr,
      zones: [
        {
          name: 'Bölge 1: Isınma & Toparlanma (%50 - %60)',
          range: calcZone(0.50, 0.60),
          desc: 'Aktif toparlanma, dolaşım hızlandırma ve hafif tempolu yürüyüş.',
          color: 'border-blue-500/30 bg-blue-500/5',
        },
        {
          name: 'Bölge 2: Yağ Yakımı & Dayanıklılık (%60 - %70)',
          range: calcZone(0.60, 0.70),
          desc: 'Temel kardiyo kapasitesi geliştirme ve enerjiyi ağırlıklı yağlardan karşılama.',
          color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400',
        },
        {
          name: 'Bölge 3: Aerobik Kardiyo (%70 - %80)',
          range: calcZone(0.70, 0.80),
          desc: 'Akciğer ve kalp kondisyonu artırma, tempolu koşu ve bisiklet.',
          color: 'border-amber-500/30 bg-amber-500/5',
        },
        {
          name: 'Bölge 4: Anaerobik Eşik (%80 - %90)',
          range: calcZone(0.80, 0.90),
          desc: 'Laktat eşiğini yükseltme, yüksek yoğunluklu interval (HIIT) antrenmanları.',
          color: 'border-orange-500/30 bg-orange-500/5',
        },
        {
          name: 'Bölge 5: Maksimum Zirve (%90 - %100)',
          range: calcZone(0.90, 1.00),
          desc: 'Kısa süreli sprint ve maksimum patlayıcı güç.',
          color: 'border-rose-500/30 bg-rose-500/5 text-rose-600 dark:text-rose-400',
        },
      ],
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="a" className="block text-sm font-medium text-foreground mb-1">Yaşınız</label>
              <input
                id="a"
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                min="10" max="100"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="rhr" className="block text-sm font-medium text-foreground mb-1">
                Dinlenik Nabız (Sabah uyanınca ölçülen bpm)
              </label>
              <input
                id="rhr"
                type="number"
                value={restingHeartRate}
                onChange={(e) => setRestingHeartRate(Number(e.target.value))}
                min="40" max="120"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Nabız Bölgelerini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Karvonen Nabız Bölgeleri</h3>
              <span className="text-xs text-muted-foreground font-medium">Teorik Maksimum Nabız: {result.maxHR} bpm</span>
            </div>

            <div className="space-y-3">
              {result.zones.map((z, i) => (
                <div key={i} className={`p-3.5 rounded-lg border ${z.color} flex flex-col sm:flex-row justify-between sm:items-center gap-1.5`}>
                  <div>
                    <span className="text-sm font-semibold block text-foreground">{z.name}</span>
                    <span className="text-xs text-muted-foreground">{z.desc}</span>
                  </div>
                  <span className="text-base font-bold text-foreground self-start sm:self-auto">{z.range}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">Sağlık Bildirimi:</p>
        <p>Kalp ritim problemi, hipertansiyon veya kardiyovasküler hastalığı olan kişilerin yüksek nabız bölgelerine çıkmadan önce kardiyoloji uzmanına başvurmaları gerekir.</p>
      </div>
    </div>
  );
}
