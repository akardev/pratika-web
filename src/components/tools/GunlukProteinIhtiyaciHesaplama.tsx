'use client';

import { useState } from 'react';
import { parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function GunlukProteinIhtiyaciHesaplama() {
  const [weightStr, setWeightStr] = useState<string>('75');
  const [goal, setGoal] = useState<'sedentary' | 'moderate' | 'hypertrophy' | 'fat-loss'>('hypertrophy');
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    dailyProteinGramsMin: number;
    dailyProteinGramsMax: number;
    proteinPerKg: string;
    targetExplanation: string;
    foodEquivalents: { name: string; amount: string }[];
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const kg = parseTurkishNumber(weightStr);
    if (isNaN(kg) || kg <= 20 || kg >= 300) {
      setError('Lütfen geçerli bir vücut ağırlığı girin (20 - 300 kg).');
      return;
    }

    let minRate = 0.8;
    let maxRate = 1.0;
    let exp = '';

    if (goal === 'sedentary') {
      minRate = 0.8;
      maxRate = 1.0;
      exp = 'Hareketsiz / masa başı yaşam tarzında sağlıklı kas dokusu ve bağışıklık dengesi için DSÖ asgari önerisi.';
    } else if (goal === 'moderate') {
      minRate = 1.2;
      maxRate = 1.5;
      exp = 'Haftada 2-3 gün kardiyo veya hafif-orta tempo spor yapan bireyler için kas onarım desteği.';
    } else if (goal === 'hypertrophy') {
      minRate = 1.6;
      maxRate = 2.2;
      exp = 'Haftada 3-5 gün ağırlık/direnç antrenmanı yapan ve kas kütlesi artırmayı (hipertrofi) hedefleyenler için optimal aralık.';
    } else if (goal === 'fat-loss') {
      minRate = 2.0;
      maxRate = 2.4;
      exp = 'Kalori açığıyla yağ yakarken mevcut kas kütlesini korumak ve tokluk hissini artırmak için yüksek protein hedefi.';
    }

    const pMin = Math.round(kg * minRate);
    const pMax = Math.round(kg * maxRate);

    // Ortalama protein miktarına göre besin karşılıkları
    const avg = (pMin + pMax) / 2;
    const eggs = Math.round(avg / 6.5); // 1 yumurta ~6.5g protein
    const chickenBreast = Math.round((avg / 31) * 100); // 100g tavuk göğsü ~31g protein

    setResult({
      dailyProteinGramsMin: pMin,
      dailyProteinGramsMax: pMax,
      proteinPerKg: `${minRate} - ${maxRate} g/kg`,
      targetExplanation: exp,
      foodEquivalents: [
        { name: 'Tavuk / Hindi Göğsü', amount: `~${chickenBreast} gram` },
        { name: 'Haşlanmış Yumurta', amount: `~${eggs} adet` },
        { name: 'Süzme Yoğurt / Lor Peyniri', amount: `~${Math.round((avg / 15) * 100)} gram` },
      ],
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="w" className="block text-sm font-medium text-foreground mb-1">Vücut Ağırlığı (kg)</label>
              <input
                id="w"
                type="text"
                value={weightStr}
                onChange={(e) => setWeightStr(sanitizeNumericInput(e.target.value))}
                placeholder="Örn: 75"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="gl" className="block text-sm font-medium text-foreground mb-1">Aktivite ve Fitness Hedefi</label>
              <select
                id="gl"
                value={goal}
                onChange={(e) => setGoal(e.target.value as 'sedentary' | 'moderate' | 'hypertrophy' | 'fat-loss')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="sedentary">Sedanter (Hareketsiz Yaşam - 0.8-1.0 g/kg)</option>
                <option value="moderate">Hafif / Orta Düzey Egzersiz (1.2-1.5 g/kg)</option>
                <option value="hypertrophy">Kas Kazanımı / Ağırlık Antrenmanı (1.6-2.2 g/kg)</option>
                <option value="fat-loss">Yağ Yakımı & Diyet Dönemi (2.0-2.4 g/kg)</option>
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Protein İhtiyacını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Günlük Önerilen Protein</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 sm:col-span-1">
                <span className="text-xs text-muted-foreground block mb-1">Hedef Protein Aralığı</span>
                <span className="text-3xl font-bold text-primary">{result.dailyProteinGramsMin} - {result.dailyProteinGramsMax} g</span>
                <span className="text-xs text-muted-foreground block mt-1">({result.proteinPerKg})</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border sm:col-span-2">
                <span className="text-xs text-muted-foreground block mb-2">Eşdeğer Örnek Besin Kaynakları (Tek Başına Karşılasaydı)</span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {result.foodEquivalents.map((f, i) => (
                    <div key={i} className="bg-background/80 p-2 rounded border border-border/60">
                      <span className="block font-medium text-foreground">{f.name}</span>
                      <span className="text-primary font-semibold">{f.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">{result.targetExplanation}</p>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-xs text-muted-foreground space-y-1">
        <p className="font-semibold text-foreground">Önemli Sağlık Bildirimi:</p>
        <p>Bu hesaplama Uluslararası Sporcu Beslenmesi Derneği (ISSN) ve Dünya Sağlık Örgütü (WHO) genel referanslarına dayanmaktadır. Tıbbi teşhis veya reçete niteliği taşımaz. Böbrek veya karaciğer rahatsızlığı olan bireyler beslenme programlarını mutlaka hekimlerine danışmalıdır.</p>
      </div>
    </div>
  );
}
