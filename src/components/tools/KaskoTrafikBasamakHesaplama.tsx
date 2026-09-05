'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KaskoTrafikBasamakHesaplama() {
  const [basePremiumStr, setBasePremiumStr] = useState('12000');
  const [step, setStep] = useState(4); // 4. basamak standart taban fiyat

  const getStepData = (s: number) => {
    switch (s) {
      case 8: return { label: '8. Basamak (Çok İyi Sürücü - 5+ Yıl Hasarsız)', rate: -0.50, desc: '%50 İndirim' };
      case 7: return { label: '7. Basamak (3 Yıl Hasarsız)', rate: -0.40, desc: '%40 İndirim' };
      case 6: return { label: '6. Basamak (2 Yıl Hasarsız)', rate: -0.30, desc: '%30 İndirim' };
      case 5: return { label: '5. Basamak (1 Yıl Hasarsız)', rate: -0.15, desc: '%15 İndirim' };
      case 4: return { label: '4. Basamak (Sisteme İlk Giriş)', rate: 0.00, desc: 'Tarife Taban Fiyatı' };
      case 3: return { label: '3. Basamak (1. Hasar)', rate: 0.45, desc: '%45 Zam / Sürprim' };
      case 2: return { label: '2. Basamak (2. Hasar)', rate: 0.90, desc: '%90 Zam / Sürprim' };
      case 1: return { label: '1. Basamak (3. Hasar)', rate: 1.35, desc: '%135 Zam / Sürprim' };
      case 0: return { label: '0. Basamak (Çok Riskli Sürücü)', rate: 2.00, desc: '%200 Zam / Sürprim' };
      default: return { label: '4. Basamak', rate: 0.00, desc: 'Standart' };
    }
  };

  const base = parseTurkishNumber(basePremiumStr) || 0;
  const currentStepData = getStepData(step);
  const finalPrice = base * (1 + currentStepData.rate);
  const diff = finalPrice - base;

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="base" className="block text-sm font-medium text-foreground mb-1">
              4. Basamak Taban Poliçe Prim Fiyatı (TL)
            </label>
            <input
              id="base"
              type="text"
              value={basePremiumStr}
              onChange={(e) => setBasePremiumStr(sanitizeNumericInput(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
          <div>
            <label htmlFor="step" className="block text-sm font-medium text-foreground mb-1">
              Hasarsızlık Basamağı Seçin (SBM)
            </label>
            <select
              id="step"
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              {[8, 7, 6, 5, 4, 3, 2, 1, 0].map((s) => (
                <option key={s} value={s}>{getStepData(s).label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Basamak Fiyat Sonucu</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-xs text-muted-foreground block mb-1">Ödenecek Tahmini Poliçe Tutarı</span>
              <span className="text-2xl font-bold text-primary">{formatNumber(Math.round(finalPrice))} ₺</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">Tarife Durumu</span>
              <span className="text-xl font-bold text-foreground">{currentStepData.desc}</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">Fark (İndirim / Ceza)</span>
              <span className={`text-xl font-bold ${diff > 0 ? 'text-destructive' : diff < 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'}`}>
                {diff > 0 ? '+' : ''}{formatNumber(Math.round(diff))} ₺
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
