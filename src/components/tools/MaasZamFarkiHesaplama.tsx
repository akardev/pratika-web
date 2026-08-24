'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function MaasZamFarkiHesaplama() {
  const [oldSalaryStr, setOldSalaryStr] = useState<string>('25.000');
  const [newSalaryStr, setNewSalaryStr] = useState<string>('35.000');

  const [result, setResult] = useState<{
    oldSalary: number;
    newSalary: number;
    difference: number;
    percentage: number;
    annualDifference: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const oldVal = parseTurkishNumber(oldSalaryStr);
    const newVal = parseTurkishNumber(newSalaryStr);

    if (isNaN(oldVal) || oldVal <= 0) {
      setError('Eski maaş 0\'dan büyük olmalıdır.');
      return;
    }
    if (isNaN(newVal) || newVal <= 0) {
      setError('Yeni maaş 0\'dan büyük olmalıdır.');
      return;
    }

    const difference = newVal - oldVal;
    const percentage = ((newVal - oldVal) / oldVal) * 100;
    const annualDifference = difference * 12;

    setResult({
      oldSalary: oldVal,
      newSalary: newVal,
      difference,
      percentage,
      annualDifference,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="oldSalary" className="block text-sm font-medium mb-2 text-foreground">
                Eski / Mevcut Maaş Tutarı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="oldSalary"
                  placeholder="Örn: 25.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={oldSalaryStr}
                  onChange={(e) => setOldSalaryStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="newSalary" className="block text-sm font-medium mb-2 text-foreground">
                Yeni / Zamlı Maaş Tutarı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="newSalary"
                  placeholder="Örn: 35.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={newSalaryStr}
                  onChange={(e) => setNewSalaryStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL
                </div>
              </div>
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
              Zam Farkını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Maaş Artış Analizi
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Aylık Net Artış</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    +{formatCurrency(result.difference)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    %{formatNumber(result.percentage, 2)} Zam Oranı
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Eski Maaş:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.oldSalary)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Yeni Maaş:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.newSalary)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">12 Aylık (Yıllık) Ek Kazanç:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.annualDifference)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/zam-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Yüzdeye göre zamlı fiyat veya maaş hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Eski ve yeni maaş tutarlarını girip artış oranını hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Maaş Zam Farkı ve Oranı Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Maaş zam farkı, yeni maaşınız ile eski maaşınız arasındaki mutlak parasal artışı ifade eder. 
          Zam yüzdesi ise bu farkın eski maaşa oranlanmasıyla hesaplanır.
        </p>

        <div className="p-5 rounded-xl border border-border/80 bg-muted/30 font-mono text-xs sm:text-sm text-foreground mb-6 space-y-1.5">
          <p className="font-sans font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-1">
            Hesaplama Formülü:
          </p>
          <p>• Aylık Zam Tutarı = Yeni Maaş - Eski Maaş</p>
          <p>• Zam Oranı (%) = [(Yeni Maaş - Eski Maaş) / Eski Maaş] × 100</p>
          <p>• Yıllık Toplam Fark = Aylık Zam Tutarı × 12</p>
        </div>
      </div>
    </div>
  );
}
