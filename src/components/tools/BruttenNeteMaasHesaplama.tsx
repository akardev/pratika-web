'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';
import { calculateNetSalaryFromGross, SalaryBreakdown } from '@/lib/laborCalculations';

export default function BruttenNeteMaasHesaplama() {
  const [grossSalaryStr, setGrossSalaryStr] = useState<string>('45.000');
  const [cumulativeBaseStr, setCumulativeBaseStr] = useState<string>('0');

  const [result, setResult] = useState<SalaryBreakdown | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const gross = parseTurkishNumber(grossSalaryStr);
    const cum = cumulativeBaseStr.trim() ? parseTurkishNumber(cumulativeBaseStr) : 0;

    if (isNaN(gross) || gross <= 0) {
      setError('Lütfen geçerli bir brüt maaş tutarı girin.');
      return;
    }

    if (isNaN(cum) || cum < 0) {
      setError('Lütfen geçerli bir kümülatif matrah girin.');
      return;
    }

    const calc = calculateNetSalaryFromGross(gross, cum);
    setResult(calc);
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-2xs mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="grossSalInput" className="block text-xs font-semibold mb-1.5 text-foreground">
                Aylık Brüt Maaş Tutarı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="grossSalInput"
                  placeholder="Örn: 45.000"
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
                  value={grossSalaryStr}
                  onChange={(e) => setGrossSalaryStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">
                  TL
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="grossCumBase" className="block text-xs font-semibold mb-1.5 text-foreground">
                Mevcut Kümülatif Gelir Vergisi Matrahı (Opsiyonel)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="grossCumBase"
                  placeholder="Örn: 0"
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
                  value={cumulativeBaseStr}
                  onChange={(e) => setCumulativeBaseStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">
                  TL
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">Önceki aylardan devreden vergi matrahınızdır.</p>
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
              Net Maaşı ve Kesintileri Hesapla
            </button>
          </form>

          {/* Sonuç Alanı */}
          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-between p-5 sm:p-6 bg-muted/20 rounded-2xl border border-border/80 shadow-2xs animate-in fade-in zoom-in-95 duration-150">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-border/60 pb-2.5">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Hesaplanan Net Maaş
                    </span>
                    <span className="text-xs font-medium text-foreground bg-background px-2.5 py-0.5 rounded border border-border/60">
                      Asgari Ücret İstisnası Uygulandı
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center my-3 text-center">
                    <span className="text-xs text-muted-foreground mb-0.5">Ele Geçecek Net Maaş</span>
                    <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight font-mono">
                      {formatCurrency(result.netSalary)}
                    </span>
                    <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-0.5 rounded border border-border/60">
                      Toplam Kesinti: {formatCurrency(result.totalDeductions)}
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
                      <span>Ödenecek Gelir Vergisi:</span>
                      <span className="font-mono font-semibold text-destructive">-{formatCurrency(result.effectiveIncomeTax)}</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Ödenecek Damga Vergisi:</span>
                      <span className="font-mono font-semibold text-destructive">-{formatCurrency(result.effectiveStampTax)}</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground border-t border-border/40 pt-1.5">
                      <span>İşverene Toplam Maliyet:</span>
                      <span className="font-mono font-semibold text-foreground">{formatCurrency(result.totalEmployerCost)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 text-center">
                  <Link
                    href="/arac/netten-brute-maas-hesaplama"
                    className="text-primary hover:underline font-semibold inline-flex items-center gap-1 text-xs"
                  >
                    Hedef netten brüt maaşı hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[240px] flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 p-6 text-center text-muted-foreground bg-muted/5">
                <svg className="w-8 h-8 text-muted-foreground/60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-xs font-medium text-foreground">Aylık brüt maaşınızı girin.</p>
                <p className="text-[11px] text-muted-foreground mt-1">SGK, vergi kesintileri ve net tutar anında hesaplanır.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-5 rounded-xl border border-border/60 bg-card text-xs text-muted-foreground leading-relaxed space-y-3">
          <h3 className="font-bold text-sm text-foreground">Brütten Nete Kesintiler Nasıl Yapılır?</h3>
          <ol className="list-decimal pl-4 space-y-1.5">
            <li><strong>SGK ve İşsizlik Kesintisi:</strong> Brüt ücretten %14 SGK İşçi Payı ve %1 İşsizlik Primi düşülerek Gelir Vergisi Matrahı bulunur.</li>
            <li><strong>Gelir Vergisi Hesabı:</strong> Matraha dilim oranları uygulanır; ardından Asgari Ücret Vergi İstisnası mahsup edilir.</li>
            <li><strong>Damga Vergisi:</strong> Brüt ücret üzerinden binde 7,59 hesaplanır ve asgari ücret damga vergisi istisnası düşülür.</li>
            <li><strong>Net Maaş:</strong> Brüt ücretten tüm yasal kesintiler çıkarılarak net ele geçen maaş elde edilir.</li>
          </ol>
        </div>

        <div className="p-4 rounded-xl bg-muted/20 border border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <p>
            ⚖️ <strong>Yasal Bilgilendirme:</strong> Özel sağlık sigortası, sendika aidatı veya BES gibi ek kesintiler bireysel tercihlere göre bordroya yansıtılabilir.
          </p>
          <span className="shrink-0 font-medium text-foreground/80">
            Kaynak: 5510 SK &amp; 193 Sayılı GVK
          </span>
        </div>
      </div>
    </div>
  );
}
