'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';
import { calculateGrossSalaryFromNet, SalaryBreakdown } from '@/lib/laborCalculations';

export default function NettenBruteMaasHesaplama() {
  const [netSalaryStr, setNetSalaryStr] = useState<string>('30.000');
  const [cumulativeBaseStr, setCumulativeBaseStr] = useState<string>('0');

  const [result, setResult] = useState<SalaryBreakdown | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const net = parseTurkishNumber(netSalaryStr);
    const cum = cumulativeBaseStr.trim() ? parseTurkishNumber(cumulativeBaseStr) : 0;

    if (isNaN(net) || net <= 0) {
      setError('Lütfen geçerli bir net maaş tutarı girin.');
      return;
    }

    if (isNaN(cum) || cum < 0) {
      setError('Lütfen geçerli bir kümülatif matrah girin.');
      return;
    }

    const calc = calculateGrossSalaryFromNet(net, cum);
    setResult(calc);
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-2xs mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="targetNetSal" className="block text-xs font-semibold mb-1.5 text-foreground">
                Ele Geçen Hedef Net Maaş (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="targetNetSal"
                  placeholder="Örn: 30.000"
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
                  value={netSalaryStr}
                  onChange={(e) => setNetSalaryStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">
                  TL
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="netCumBase" className="block text-xs font-semibold mb-1.5 text-foreground">
                Mevcut Kümülatif Gelir Vergisi Matrahı (Opsiyonel)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="netCumBase"
                  placeholder="Örn: 0"
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
                  value={cumulativeBaseStr}
                  onChange={(e) => setCumulativeBaseStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">
                  TL
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">Yıl içinde üst vergi dilimlerine geçişi simüle etmek için kullanılır.</p>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-xs rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-11 mt-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
            >
              Brüt Maaşı ve Kesintileri Hesapla
            </button>
          </form>

          {/* Sonuç Alanı */}
          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-between p-5 sm:p-6 bg-muted/20 rounded-2xl border border-border/80 shadow-2xs animate-in fade-in zoom-in-95 duration-150">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-border/60 pb-2.5">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Hesaplanan Brüt Maaş
                    </span>
                    <span className="text-xs font-medium text-foreground bg-background px-2.5 py-0.5 rounded border border-border/60">
                      Asgari Ücret İstisnası Dahil
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center my-3 text-center">
                    <span className="text-xs text-muted-foreground mb-0.5">Gereken Aylık Brüt Maaş</span>
                    <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight font-mono">
                      {formatCurrency(result.grossSalary)}
                    </span>
                    <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-0.5 rounded border border-border/60">
                      İşverene Toplam Maliyet: {formatCurrency(result.totalEmployerCost)}
                    </span>
                  </div>

                  <div className="border-t border-border/60 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>SGK İşçi Primi (%14):</span>
                      <span className="font-mono font-semibold text-destructive">-{formatCurrency(result.sgkEmployee)}</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>İşsizlik Sigortası Primi (%1):</span>
                      <span className="font-mono font-semibold text-destructive">-{formatCurrency(result.unemploymentEmployee)}</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Ödenecek Gelir Vergisi (İstisna Sonrası):</span>
                      <span className="font-mono font-semibold text-destructive">-{formatCurrency(result.effectiveIncomeTax)}</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Ödenecek Damga Vergisi (İstisna Sonrası):</span>
                      <span className="font-mono font-semibold text-destructive">-{formatCurrency(result.effectiveStampTax)}</span>
                    </div>
                    <div className="flex justify-between items-center text-primary border-t border-border/40 pt-1.5 font-bold">
                      <span>Ele Geçen Net Maaş:</span>
                      <span className="font-mono text-sm">{formatCurrency(result.netSalary)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 text-center">
                  <Link
                    href="/arac/brutten-nete-maas-hesaplama"
                    className="text-primary hover:underline font-semibold inline-flex items-center gap-1 text-xs"
                  >
                    Brütten nete maaş dökümünü inceleyin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[240px] flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 p-6 text-center text-muted-foreground bg-muted/5">
                <svg className="w-8 h-8 text-muted-foreground/60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-xs font-medium text-foreground">Hedeflediğiniz net maaşı girin.</p>
                <p className="text-[11px] text-muted-foreground mt-1">SGK, Gelir Vergisi ve Asgari Ücret İstisnası otomatik hesaplanır.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-5 rounded-xl border border-border/60 bg-card text-xs text-muted-foreground leading-relaxed space-y-3">
          <h3 className="font-bold text-sm text-foreground">Asgari Ücret Vergi İstisnası Nedir?</h3>
          <p>
            7349 sayılı Kanun gereğince, tüm çalışanların brüt ücretlerinin aylık asgari ücrete kadar olan kısmı Gelir Vergisi ve Damga Vergisinden istisna edilmiştir. Bu nedenle netten brüte hesaplamalarda asgari ücret tutarındaki vergi muafiyeti doğrudan mahsup edilir.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-muted/20 border border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <p>
            ⚖️ <strong>Yasal Bilgilendirme:</strong> Yıl içinde gelir vergisi matrahı arttıkça (%15 &rarr; %20 &rarr; %27) net maaşın sabit kalması için gereken brüt maaş artabilir.
          </p>
          <span className="shrink-0 font-medium text-foreground/80">
            Kaynak: 193 Sayılı GVK &amp; 7349 SK
          </span>
        </div>
      </div>
    </div>
  );
}
