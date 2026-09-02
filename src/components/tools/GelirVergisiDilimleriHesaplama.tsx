'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

// 2026 Gelir Vergisi Dilimleri (Ücret Dışı / Genel Gelirler)
// 158.000 TL'ye kadar %15
// 330.000 TL'nin 158.000 TL'si için 23.700 TL, fazlası %20
// 800.000 TL'nin 330.000 TL'si için 58.100 TL, fazlası %27
// 4.300.000 TL'nin 800.000 TL'si için 185.000 TL, fazlası %35
// 4.300.000 TL'den fazlası için 1.410.000 TL + fazlası %40
export default function GelirVergisiDilimleriHesaplama() {
  const [taxBaseStr, setTaxBaseStr] = useState<string>('500000');
  const [incomeType, setIncomeType] = useState<'wage' | 'non-wage'>('wage');
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    taxBase: number;
    totalTax: number;
    effectiveRate: number;
    netIncome: number;
    bracketsBreakdown: { bracket: string; amount: number; rate: number; tax: number }[];
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const base = parseTurkishNumber(taxBaseStr);
    if (isNaN(base) || base <= 0) {
      setError('Lütfen pozitif ve geçerli bir vergi matrahı girin.');
      return;
    }

    // Dilim sınırları (Ücret için 3. dilim 1.200.000 TL'ye kadar uzar)
    const b1 = 158000;
    const b2 = 330000;
    const b3 = incomeType === 'wage' ? 1200000 : 800000;
    const b4 = 4300000;

    let totalTax = 0;
    const brackets = [];

    // 1. Dilim %15
    const amount1 = Math.min(base, b1);
    const tax1 = amount1 * 0.15;
    totalTax += tax1;
    brackets.push({ bracket: `0 - ${formatNumber(b1)} ₺`, amount: amount1, rate: 15, tax: Math.round(tax1) });

    // 2. Dilim %20
    if (base > b1) {
      const amount2 = Math.min(base - b1, b2 - b1);
      const tax2 = amount2 * 0.20;
      totalTax += tax2;
      brackets.push({ bracket: `${formatNumber(b1)} - ${formatNumber(b2)} ₺`, amount: amount2, rate: 20, tax: Math.round(tax2) });
    }

    // 3. Dilim %27
    if (base > b2) {
      const amount3 = Math.min(base - b2, b3 - b2);
      const tax3 = amount3 * 0.27;
      totalTax += tax3;
      brackets.push({ bracket: `${formatNumber(b2)} - ${formatNumber(b3)} ₺`, amount: amount3, rate: 27, tax: Math.round(tax3) });
    }

    // 4. Dilim %35
    if (base > b3) {
      const amount4 = Math.min(base - b3, b4 - b3);
      const tax4 = amount4 * 0.35;
      totalTax += tax4;
      brackets.push({ bracket: `${formatNumber(b3)} - ${formatNumber(b4)} ₺`, amount: amount4, rate: 35, tax: Math.round(tax4) });
    }

    // 5. Dilim %40
    if (base > b4) {
      const amount5 = base - b4;
      const tax5 = amount5 * 0.40;
      totalTax += tax5;
      brackets.push({ bracket: `${formatNumber(b4)} ₺ üzeri`, amount: amount5, rate: 40, tax: Math.round(tax5) });
    }

    const effectiveRate = (totalTax / base) * 100;
    const netIncome = base - totalTax;

    setResult({
      taxBase: base,
      totalTax: Math.round(totalTax),
      effectiveRate: Math.round(effectiveRate * 100) / 100,
      netIncome: Math.round(netIncome),
      bracketsBreakdown: brackets,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="taxBase" className="block text-sm font-medium text-foreground mb-1">
                Yıllık Kümülatif Vergi Matrahı (TL)
              </label>
              <input
                id="taxBase"
                type="text"
                value={taxBaseStr}
                onChange={(e) => setTaxBaseStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="incomeType" className="block text-sm font-medium text-foreground mb-1">
                Gelir Türü
              </label>
              <select
                id="incomeType"
                value={incomeType}
                onChange={(e) => setIncomeType(e.target.value as 'wage' | 'non-wage')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="wage">Ücret Gelirleri (Maaşlı Çalışanlar)</option>
                <option value="non-wage">Ücret Dışı Gelirler (Ticari, Serbest Meslek)</option>
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Vergiyi Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Gelir Vergisi</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.totalTax)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Efektif Vergi Oranı</span>
                <span className="text-xl font-bold text-foreground">%{result.effectiveRate}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Vergi Sonrası Kalan Net</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.netIncome)} ₺</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Dilim Bazında Dağılım</h4>
              <div className="border border-border rounded-lg overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 border-b border-border text-muted-foreground font-medium">
                    <tr>
                      <th className="p-2.5">Vergi Dilimi</th>
                      <th className="p-2.5">Matrah Dilimi Tutarı</th>
                      <th className="p-2.5">Oran</th>
                      <th className="p-2.5 text-right">Ödenen Vergi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {result.bracketsBreakdown.map((b, idx) => (
                      <tr key={idx} className="hover:bg-muted/20">
                        <td className="p-2.5 font-medium text-foreground">{b.bracket}</td>
                        <td className="p-2.5">{formatNumber(b.amount)} ₺</td>
                        <td className="p-2.5">%{b.rate}</td>
                        <td className="p-2.5 text-right font-semibold text-foreground">{formatNumber(b.tax)} ₺</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">Gelir Vergisi Kanunu Madde 103:</p>
        <p>Gelir vergisi artan oranlıdır. Toplam gelir doğrudan en üst orana tabi tutulmaz; her basamak kendi dilim sınırına kadar ilgili oranla vergilendirilir.</p>
      </div>
    </div>
  );
}
