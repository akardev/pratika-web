'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function EmlakVergisiHesaplama() {
  const [rayicStr, setRayicStr] = useState('1500000');
  const [propertyType, setPropertyType] = useState<'house' | 'workplace' | 'land' | 'field'>('house');
  const [isMetropolitan, setIsMetropolitan] = useState(true);

  const [result, setResult] = useState<{
    ratePercent: number;
    annualTax: number;
    installment: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const rayic = parseTurkishNumber(rayicStr);
    if (isNaN(rayic) || rayic <= 0) return;

    // Oranlar (Büyükşehirde 2 kat):
    // Konut: Normal binde 1 (%0.1), Büyükşehir binde 2 (%0.2)
    // İşyeri: Normal binde 2 (%0.2), Büyükşehir binde 4 (%0.4)
    // Arsa: Normal binde 3 (%0.3), Büyükşehir binde 6 (%0.6)
    // Arazi: Normal binde 1 (%0.1), Büyükşehir binde 2 (%0.2)
    let baseRate = 0.001;
    if (propertyType === 'workplace') baseRate = 0.002;
    else if (propertyType === 'land') baseRate = 0.003;
    else if (propertyType === 'field') baseRate = 0.001;

    const multiplier = isMetropolitan ? 2 : 1;
    const finalRate = baseRate * multiplier;
    const annualTax = rayic * finalRate;
    const installment = annualTax / 2;

    setResult({
      ratePercent: finalRate * 100,
      annualTax: Math.round(annualTax * 100) / 100,
      installment: Math.round(installment * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="rayic" className="block text-sm font-medium text-foreground mb-1">Belediye Rayiç Değeri (TL)</label>
              <input
                id="rayic"
                type="text"
                value={rayicStr}
                onChange={(e) => setRayicStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="ptype" className="block text-sm font-medium text-foreground mb-1">Gayrimenkul Türü</label>
              <select
                id="ptype"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as 'house' | 'workplace' | 'land' | 'field')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="house">Mesken / Konut</option>
                <option value="workplace">İşyeri / Dükkan</option>
                <option value="land">Arsa</option>
                <option value="field">Arazi</option>
              </select>
            </div>
            <div>
              <label htmlFor="metro" className="block text-sm font-medium text-foreground mb-1">Belediye Konumu</label>
              <select
                id="metro"
                value={isMetropolitan ? 'yes' : 'no'}
                onChange={(e) => setIsMetropolitan(e.target.value === 'yes')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="yes">Büyükşehir Belediyesi Sınırları (%100 Artırımlı)</option>
                <option value="no">Diğer Belediyeler (Normal Oran)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Yıllık Emlak Vergisini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Emlak Vergisi Taksitleri</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Yıllık Toplam Emlak Vergisi</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.annualTax)} ₺</span>
                <span className="text-xs text-muted-foreground block mt-1">Uygulanan Oran: %{result.ratePercent}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">1. Taksit (Mayıs Ayı)</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.installment)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">2. Taksit (Kasım Ayı)</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.installment)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
