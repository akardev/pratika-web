'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function AracDegerKaybiHesaplama() {
  const [marketValueStr, setMarketValueStr] = useState('900000');
  const [mileageStr, setMileageStr] = useState('45000');
  const [damageSize, setDamageSize] = useState<'minor' | 'medium' | 'major'>('medium');
  const [faultPercent, setFaultPercent] = useState('0'); // Karşı taraf kusuru %100 -> kullanıcının kusuru 0

  const [result, setResult] = useState<{
    estimatedLoss: number;
    claimableAmount: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const market = parseTurkishNumber(marketValueStr);
    const mileage = parseTurkishNumber(mileageStr);
    const userFault = parseTurkishNumber(faultPercent) || 0;

    if (isNaN(market) || isNaN(mileage) || market <= 0) return;

    // Hasar boyutu katsayısı
    let damageFactor = 0.04;
    if (damageSize === 'medium') damageFactor = 0.08;
    else if (damageSize === 'major') damageFactor = 0.14;

    // Kilometre amortisman indirimi
    let kmFactor = 1.0;
    if (mileage > 150000) kmFactor = 0.4;
    else if (mileage > 100000) kmFactor = 0.6;
    else if (mileage > 50000) kmFactor = 0.8;

    const baseLoss = market * damageFactor * kmFactor;
    // Karşı tarafın kusur oranı (100 - userFault)
    const opponentFault = Math.max(0, 100 - userFault) / 100;
    const claimable = baseLoss * opponentFault;

    setResult({
      estimatedLoss: Math.round(baseLoss),
      claimableAmount: Math.round(claimable),
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="mv" className="block text-sm font-medium text-foreground mb-1">Kaza Öncesi Piyasa Rayici (TL)</label>
              <input
                id="mv"
                type="text"
                value={marketValueStr}
                onChange={(e) => setMarketValueStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="km" className="block text-sm font-medium text-foreground mb-1">Araç Kilometresi</label>
              <input
                id="km"
                type="text"
                value={mileageStr}
                onChange={(e) => setMileageStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="dmg" className="block text-sm font-medium text-foreground mb-1">Hasar Boyutu</label>
              <select
                id="dmg"
                value={damageSize}
                onChange={(e) => setDamageSize(e.target.value as 'minor' | 'medium' | 'major')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="minor">Hafif (Tek Parça Boya/Değişen)</option>
                <option value="medium">Orta (2-3 Parça Hasar)</option>
                <option value="major">Ağır (Şasi/Tavan/Hava Yastığı)</option>
              </select>
            </div>
            <div>
              <label htmlFor="flt" className="block text-sm font-medium text-foreground mb-1">Sizin Kusur Oranınız (%)</label>
              <select
                id="flt"
                value={faultPercent}
                onChange={(e) => setFaultPercent(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="0">%0 (Tamamen Karşı Taraf Kusurlu)</option>
                <option value="25">%25 Kusur</option>
                <option value="50">%50 / %50 Eşit Kusur</option>
                <option value="75">%75 Kusur</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Değer Kaybını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tazminat Hesaplama Sonucu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Sigortadan Talep Edilebilir Tutar</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.claimableAmount)} ₺</span>
                <span className="text-xs text-muted-foreground block mt-1">Karşı tarafın sigorta şirketine başvuru yapılabilir.</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Tahmini Değer Kaybı</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.estimatedLoss)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
