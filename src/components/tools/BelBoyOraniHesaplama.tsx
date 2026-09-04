'use client';

import { useState } from 'react';
import { parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function BelBoyOraniHesaplama() {
  const [waistStr, setWaistStr] = useState<string>('82'); // cm
  const [heightStr, setHeightStr] = useState<string>('178'); // cm
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    ratio: number;
    category: string;
    description: string;
    idealWaistMax: number;
    colorClass: string;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const w = parseTurkishNumber(waistStr);
    const h = parseTurkishNumber(heightStr);

    if (isNaN(w) || isNaN(h) || w <= 30 || h <= 80) {
      setError('Lütfen bel çevresi ve boy uzunluğunu geçerli santimetre (cm) değerleri olarak girin.');
      return;
    }

    const ratio = w / h;
    const idealMax = Math.round(h * 0.5); // Bel çevresi boyun yarısından küçük olmalı

    let cat = '';
    let desc = '';
    let color = '';

    if (ratio < 0.40) {
      cat = 'Aşırı Zayıf (Düşük Yağ Oranı)';
      desc = 'Bel çevreniz boyunuza oranla oldukça düşüktür.';
      color = 'text-amber-500 bg-amber-500/10 border-amber-500/30';
    } else if (ratio <= 0.49) {
      cat = 'İdeal ve Sağlıklı Aralık';
      desc = 'Tebrikler! Bel çevreniz boyunuzun yarısının altında, kardiyometabolik riskiniz düşüktür.';
      color = 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30';
    } else if (ratio <= 0.59) {
      cat = 'Artmış Sağlık Riski (Fazla Kilolu)';
      desc = 'İç organ yağlanması (viseral yağ) başlamış olabilir. Egzersiz ve beslenme düzenlemesi önerilir.';
      color = 'text-amber-600 bg-amber-500/10 border-amber-500/30';
    } else {
      cat = 'Yüksek Sağlık Riski (Santral Obezite)';
      desc = 'Kalp damar hastalıkları, insülin direnci ve diyabet riski belirgin şekilde yükselmiştir.';
      color = 'text-destructive bg-destructive/10 border-destructive/30';
    }

    setResult({
      ratio: Math.round(ratio * 100) / 100,
      category: cat,
      description: desc,
      idealWaistMax: idealMax,
      colorClass: color,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="w" className="block text-sm font-medium text-foreground mb-1">Bel Çevresi (cm)</label>
              <input
                id="w"
                type="text"
                value={waistStr}
                onChange={(e) => setWaistStr(sanitizeNumericInput(e.target.value))}
                placeholder="Örn: 85"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
              <span className="text-[11px] text-muted-foreground block mt-1">Göbek deliği hizasından</span>
            </div>
            <div>
              <label htmlFor="h" className="block text-sm font-medium text-foreground mb-1">Boy Uzunluğu (cm)</label>
              <input
                id="h"
                type="text"
                value={heightStr}
                onChange={(e) => setHeightStr(sanitizeNumericInput(e.target.value))}
                placeholder="Örn: 175"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="g" className="block text-sm font-medium text-foreground mb-1">Cinsiyet</label>
              <select
                id="g"
                value={gender}
                onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="male">Erkek</option>
                <option value="female">Kadın</option>
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Bel-Boy Oranını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Analiz Raporu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Bel - Boy Oranı (WHtR)</span>
                <span className="text-3xl font-bold text-primary">{result.ratio}</span>
                <span className="text-xs text-muted-foreground block mt-1">(Sağlıklı hedef: 0.50 altı)</span>
              </div>
              <div className={`p-4 rounded-lg border ${result.colorClass} sm:col-span-2`}>
                <span className="text-xs block mb-1 font-semibold">{result.category}</span>
                <p className="text-sm font-medium mb-1">{result.description}</p>
                <span className="text-xs block mt-2 text-foreground">
                  Boyunuza göre önerilen azami bel çevresi: <strong>{result.idealWaistMax} cm</strong>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">Altın Kural: &quot;Belinizi Boyunuzun Yarısından Küçük Tutun&quot;</p>
        <p>Tıp dünyasında son yıllarda BMI (Vücut Kitle İndeksi) yerine bel-boy oranına öncelik verilmektedir; çünkü kas kütlesi yüksek sporcularda BMI yanıltıcı olabilirken, bel çevresi doğrudan iç organ (viseral) yağlanmasını ölçer.</p>
      </div>
    </div>
  );
}
