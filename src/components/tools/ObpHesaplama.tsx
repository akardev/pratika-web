'use client';

import { useState } from 'react';
import { parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function ObpHesaplama() {
  const [diplomaGradeStr, setDiplomaGradeStr] = useState('85.50');
  const [isBrokenObp, setIsBrokenObp] = useState(false); // Kırık OBP (geçen yıl yerleşti)

  const [result, setResult] = useState<{
    obp: number;
    standardContribution: number;
    brokenContribution: number;
    finalContribution: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const diploma = parseTurkishNumber(diplomaGradeStr);
    if (isNaN(diploma) || diploma < 50 || diploma > 100) return;

    // OBP = Diploma Notu * 5 (Aralık: 250 - 500)
    const obp = diploma * 5;
    const standardContribution = obp * 0.12; // Normal katsayı 0.12 (30 - 60 puan)
    const brokenContribution = obp * 0.06; // Kırık OBP katsayısı 0.06
    const finalContribution = isBrokenObp ? brokenContribution : standardContribution;

    setResult({
      obp: Math.round(obp * 100) / 100,
      standardContribution: Math.round(standardContribution * 100) / 100,
      brokenContribution: Math.round(brokenContribution * 100) / 100,
      finalContribution: Math.round(finalContribution * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dip" className="block text-sm font-medium text-foreground mb-1">
                Lise Mezuniyet Notu (100 Üzerinden)
              </label>
              <input
                id="dip"
                type="text"
                value={diplomaGradeStr}
                onChange={(e) => setDiplomaGradeStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
                placeholder="Örn: 85.50"
              />
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBrokenObp}
                  onChange={(e) => setIsBrokenObp(e.target.checked)}
                  className="rounded border-border"
                />
                Geçen Yıl Bir Programa Yerleştim (Kırık OBP)
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            YKS Katkısını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">OBP Puanı ve YKS Katkısı</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">YKS Ham Puana Eklenecek Puan</span>
                <span className="text-2xl font-bold text-primary">+{result.finalContribution}</span>
                <span className="text-xs text-muted-foreground block mt-1">Katsayı: {isBrokenObp ? '0.06 (Kırık)' : '0.12 (Normal)'}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Ortaöğretim Başarı Puanı (OBP)</span>
                <span className="text-xl font-bold text-foreground">{result.obp} / 500</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Normal OBP Katkısı</span>
                <span className="text-xl font-bold text-foreground">+{result.standardContribution}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
