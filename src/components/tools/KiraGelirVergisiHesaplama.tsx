'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KiraGelirVergisiHesaplama() {
  const [annualRentIncomeStr, setAnnualRentIncomeStr] = useState<string>('240.000'); // Yıllık Kira Geliri TL
  const [exemptionAmountStr] = useState<string>('33.000'); // 2024/2025 Konut İstisnası
  const [hasExemption, setHasExemption] = useState<boolean>(true); // İstisna hakkı var mı?

  const [result, setResult] = useState<{
    annualRentIncome: number;
    exemptionAmount: number;
    expenseAmount: number;
    taxBase: number; // Vergi Matrahı
    calculatedTax: number;
    damgaVergisi: number;
    totalTaxPayable: number;
    effectiveTaxRate: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const totalIncome = parseTurkishNumber(annualRentIncomeStr);
    if (isNaN(totalIncome) || totalIncome <= 0) {
      setError('Lütfen geçerli bir yıllık kira geliri tutarı giriniz.');
      return;
    }

    const rawExemption = parseTurkishNumber(exemptionAmountStr);
    const exemption = hasExemption ? (totalIncome > rawExemption ? rawExemption : totalIncome) : 0;

    // Kalan Tutar = Toplam Gelir - İstisna
    const remainingIncome = Math.max(0, totalIncome - exemption);
    
    // %15 Götürü Gider İndirimi
    const expenseAmount = remainingIncome * 0.15;
    const taxBase = Math.max(0, remainingIncome - expenseAmount);

    // Gelir Vergisi Dilimleri (2024/2025 Referans Dilimler)
    // 110.000'e kadar %15
    // 230.000'e kadar %20
    // 580.000'e kadar %27
    // 3.000.000'a kadar %35
    // Üzeri %40
    let calculatedTax = 0;
    if (taxBase <= 110000) {
      calculatedTax = taxBase * 0.15;
    } else if (taxBase <= 230000) {
      calculatedTax = 16500 + (taxBase - 110000) * 0.20;
    } else if (taxBase <= 580000) {
      calculatedTax = 40500 + (taxBase - 230000) * 0.27;
    } else if (taxBase <= 3000000) {
      calculatedTax = 135000 + (taxBase - 580000) * 0.35;
    } else {
      calculatedTax = 982000 + (taxBase - 3000000) * 0.40;
    }

    const damgaVergisi = 485; // Yıllık gelir vergisi beyanname damga vergisi ~485-600 TL
    const totalTaxPayable = calculatedTax + damgaVergisi;
    const effectiveTaxRate = (totalTaxPayable / totalIncome) * 100;

    setResult({
      annualRentIncome: totalIncome,
      exemptionAmount: exemption,
      expenseAmount,
      taxBase,
      calculatedTax,
      damgaVergisi,
      totalTaxPayable,
      effectiveTaxRate,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="annualRent" className="block text-sm font-medium mb-1 text-foreground">
                Yıllık Toplam Konut Kira Geliri (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="annualRent"
                  placeholder="Örn: 240.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={annualRentIncomeStr}
                  onChange={(e) => setAnnualRentIncomeStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-foreground">
                Konut Kira İstisnası ({exemptionAmountStr} TL)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setHasExemption(true)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    hasExemption
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  İstisna Uygulansın
                </button>
                <button
                  type="button"
                  onClick={() => setHasExemption(false)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    !hasExemption
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  İstisna Yok (Ticari/Yüksek Gelir)
                </button>
              </div>
            </div>

            <div className="p-3 bg-muted/40 rounded-lg border border-border/60 text-xs text-muted-foreground">
              Gider Yöntemi: <span className="font-semibold text-foreground">%15 Götürü Gider Esası</span>
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
              Kira Gelir Vergisini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Yıllık Vergi Tutarı
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Toplam Ödenecek Gelir Vergisi</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.totalTaxPayable)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    2 Taksitte Ödenir (Taksit: {formatCurrency(result.totalTaxPayable / 2)})
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Konut İstisnası:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">-{formatCurrency(result.exemptionAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">%15 Götürü Gider:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">-{formatCurrency(result.expenseAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Vergi Matrahı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.taxBase)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Beyanname Damga Vergisi:</span>
                    <span className="font-semibold text-foreground">+{formatCurrency(result.damgaVergisi)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kira-artis-orani-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Yasal TÜFE kira artış tavanını hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Yıllık konut kira gelirinizi girerek ödenecek gelir vergisi ve taksitlerini hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Kira Gelir Vergisi Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Konut kira gelirlerinde yıllık yasal istisna tutarı düşüldükten sonra kalan tutardan %15 götürü gider indirilir. Kalan net matrah, Gelir Vergisi Kanunu&apos;nun artan oranlı vergi tarifesine (%15-%40) göre vergilendirilir ve Mart ile Temmuz aylarında 2 eşit taksitle ödenir.
        </p>
      </div>
    </div>
  );
}
