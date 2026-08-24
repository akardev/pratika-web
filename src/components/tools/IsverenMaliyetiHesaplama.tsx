'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function IsverenMaliyetiHesaplama() {
  const [grossSalaryStr, setGrossSalaryStr] = useState<string>('30.000');
  const [hasIncentive, setHasIncentive] = useState<boolean>(true); // 5510 sayılı %5 prim teşviki

  const [result, setResult] = useState<{
    grossSalary: number;
    sgkEmployerRate: number;
    sgkEmployerAmount: number;
    unemploymentEmployerRate: number;
    unemploymentEmployerAmount: number;
    totalEmployerCost: number;
    additionalCostPercentage: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const gross = parseTurkishNumber(grossSalaryStr);
    if (isNaN(gross) || gross <= 0) {
      setError('Lütfen 0\'dan büyük geçerli bir brüt maaş tutarı giriniz.');
      return;
    }

    // SGK İşveren Primi: Normal %20.5, 5 puanlık Hazine teşviki ile %15.5
    const sgkEmployerRate = hasIncentive ? 15.5 : 20.5;
    const sgkEmployerAmount = (gross * sgkEmployerRate) / 100;

    // İşsizlik Sigortası İşveren Payı: %2
    const unemploymentEmployerRate = 2;
    const unemploymentEmployerAmount = (gross * unemploymentEmployerRate) / 100;

    const totalEmployerCost = gross + sgkEmployerAmount + unemploymentEmployerAmount;
    const additionalCostPercentage = ((totalEmployerCost - gross) / gross) * 100;

    setResult({
      grossSalary: gross,
      sgkEmployerRate,
      sgkEmployerAmount,
      unemploymentEmployerRate,
      unemploymentEmployerAmount,
      totalEmployerCost,
      additionalCostPercentage,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-5">
            <div>
              <label htmlFor="grossSalary" className="block text-sm font-medium mb-2 text-foreground">
                Aylık Brüt Maaş (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="grossSalary"
                  placeholder="Örn: 30.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={grossSalaryStr}
                  onChange={(e) => setGrossSalaryStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                5510 Sayılı Kanun %5 SGK Teşviki
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setHasIncentive(true)}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    hasIncentive
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Var (%15.5 SGK)
                </button>
                <button
                  type="button"
                  onClick={() => setHasIncentive(false)}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    !hasIncentive
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Yok (%20.5 SGK)
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                SGK prim borcu bulunmayan işverenler %5 Hazine indiriminden faydalanır.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              İşveren Maliyetini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Toplam İşveren Maliyeti
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Aylık Toplam Maliyet</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.totalEmployerCost)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Brüt Maaşa Ek +%{result.additionalCostPercentage.toFixed(1)} Maliyet
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Brüt Maaş:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.grossSalary)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">SGK İşveren Payı (%{result.sgkEmployerRate}):</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.sgkEmployerAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">İşsizlik Sigortası İşveren Payı (%{result.unemploymentEmployerRate}):</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.unemploymentEmployerAmount)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/brutten-nete-maas-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Çalışanın eline geçecek net maaşı hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Brüt maaş bilgisini girerek işverene toplam maliyeti hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">İşveren Maliyeti Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Bir çalışanın işverene toplam maliyeti yalnızca brüt maaşından ibaret değildir. 
          İşveren, brüt ücretin üzerine yasal olarak SGK işveren primi ve İşsizlik Sigortası işveren payı öder.
        </p>

        <div className="p-5 rounded-xl border border-border/80 bg-muted/30 font-mono text-xs sm:text-sm text-foreground mb-6 space-y-1.5">
          <p className="font-sans font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-1">
            Yasal Oranlar & Formül:
          </p>
          <p>• SGK İşveren Payı: %20.5 (Düzenli ödeyen işverenler için %5 indirim ile %15.5)</p>
          <p>• İşsizlik Sigortası İşveren Payı: %2.0</p>
          <p className="font-semibold text-primary mt-2">Toplam Maliyet = Brüt Maaş + (Brüt × %17.5 veya %22.5)</p>
        </div>
      </div>
    </div>
  );
}
