'use client';

import { useState } from 'react';

export default function BurcYukselenBurcBulucu() {
  const [day, setDay] = useState<number>(15);
  const [month, setMonth] = useState<number>(5);
  const [birthHour, setBirthHour] = useState<number>(14);

  const [result, setResult] = useState<{
    sunSign: string;
    sunElement: string;
    risingSign: string;
    risingElement: string;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    // Güneş Burcu
    let sign = '';
    let elem = '';
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) { sign = 'Koç'; elem = 'Ateş'; }
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) { sign = 'Boğa'; elem = 'Toprak'; }
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) { sign = 'İkizler'; elem = 'Hava'; }
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) { sign = 'Yengeç'; elem = 'Su'; }
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) { sign = 'Aslan'; elem = 'Ateş'; }
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) { sign = 'Başak'; elem = 'Toprak'; }
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) { sign = 'Terazi'; elem = 'Hava'; }
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) { sign = 'Akrep'; elem = 'Su'; }
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) { sign = 'Yay'; elem = 'Ateş'; }
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) { sign = 'Oğlak'; elem = 'Toprak'; }
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) { sign = 'Kova'; elem = 'Hava'; }
    else { sign = 'Balık'; elem = 'Su'; }

    // Yaklaşık Yükselen Burç (2'şer saatlik kayma tablosu)
    const zodiacs = [
      { name: 'Koç', elem: 'Ateş' },
      { name: 'Boğa', elem: 'Toprak' },
      { name: 'İkizler', elem: 'Hava' },
      { name: 'Yengeç', elem: 'Su' },
      { name: 'Aslan', elem: 'Ateş' },
      { name: 'Başak', elem: 'Toprak' },
      { name: 'Terazi', elem: 'Hava' },
      { name: 'Akrep', elem: 'Su' },
      { name: 'Yay', elem: 'Ateş' },
      { name: 'Oğlak', elem: 'Toprak' },
      { name: 'Kova', elem: 'Hava' },
      { name: 'Balık', elem: 'Su' },
    ];

    const sunIndex = zodiacs.findIndex(z => z.name === sign);
    // Güneş doğum anında sabah 06:00 sularında Güneş burcuyla ufukta doğar.
    // Her 2 saatte bir burç ilerler:
    const hourShift = Math.floor(((birthHour + 18) % 24) / 2);
    const risingIndex = (sunIndex + hourShift) % 12;
    const rising = zodiacs[risingIndex];

    setResult({
      sunSign: sign,
      sunElement: elem,
      risingSign: rising.name,
      risingElement: rising.elem,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="bm" className="block text-sm font-medium text-foreground mb-1">Doğum Ayı</label>
              <select
                id="bm"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                {['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'].map((m, idx) => (
                  <option key={idx} value={idx + 1}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bd" className="block text-sm font-medium text-foreground mb-1">Doğum Günü</label>
              <input
                id="bd"
                type="number"
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                min="1" max="31"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="bh" className="block text-sm font-medium text-foreground mb-1">Doğum Saati (0-23)</label>
              <input
                id="bh"
                type="number"
                value={birthHour}
                onChange={(e) => setBirthHour(Number(e.target.value))}
                min="0" max="23"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Burçları Bul
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Astrolojik Sonuçlar</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Güneş (Öz) Burcunuz</span>
                <span className="text-3xl font-bold text-primary">{result.sunSign}</span>
                <span className="text-xs text-muted-foreground block mt-1">Elementi: {result.sunElement}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Tahmini Yükselen Burcunuz</span>
                <span className="text-3xl font-bold text-foreground">{result.risingSign}</span>
                <span className="text-xs text-muted-foreground block mt-1">Elementi: {result.risingElement}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
