'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function DamgaVergisiHesaplama() {
  const [contractAmountStr, setContractAmountStr] = useState<string>('200.000');
  const [contractType, setContractType] = useState<string>('sozlesme'); // 'sozlesme', 'kira', 'ihale', 'ucret'

  const [result, setResult] = useState<{
    contractAmount: number;
    ratePerThousand: number;
    stampTaxAmount: number;
    maxCapApplied: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const amount = parseTurkishNumber(contractAmountStr);
    if (isNaN(amount) || amount <= 0) {
      setError('Lütfen geçerli bir sözleşme/işlem tutarı giriniz.');
      return;
    }

    let ratePerThousand = 9.48; // Binde 9.48 (Belli parayı içeren mukavelenameler)
    if (contractType === 'kira') ratePerThousand = 1.89; // Kira mukavelenameleri (binde 1.89)
    else if (contractType === 'ihale') ratePerThousand = 5.69; // İhale kararları (binde 5.69)
    else if (contractType === 'ucret') ratePerThousand = 7.59; // Maaş/Ücret bordroları (binde 7.59)

    let stampTaxAmount = (amount * ratePerThousand) / 1000;
    
    // 2025/2026 Damga vergisi üst sınırı (tavan) kontrolü
    const maxCap = 24800000; // ~24.8 Milyon TL üst sınır
    const maxCapApplied = stampTaxAmount > maxCap;
    if (maxCapApplied) {
      stampTaxAmount = maxCap;
    }

    setResult({
      contractAmount: amount,
      ratePerThousand,
      stampTaxAmount,
      maxCapApplied,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">
                Sözleşme / Belge Türü
              </label>
              <select
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
              >
                <option value="sozlesme">Ticari / Hizmet Sözleşmesi (Binde 9.48)</option>
                <option value="kira">Kira Sözleşmesi (Binde 1.89)</option>
                <option value="ihale">İhale Kararı (Binde 5.69)</option>
                <option value="ucret">Maaş & Ücret Ödemesi (Binde 7.59)</option>
              </select>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-1 text-foreground">
                Belgede Yer Alan Toplam Tutar (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="amount"
                  placeholder="Örn: 200.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={contractAmountStr}
                  onChange={(e) => setContractAmountStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
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
              Damga Vergisini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Damga Vergisi Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Ödenecek Damga Vergisi</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.stampTaxAmount)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Uygulanan Oran: Binde {result.ratePerThousand} (‰{result.ratePerThousand})
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Belge Tutarı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.contractAmount)}</span>
                  </div>
                  {result.maxCapApplied && (
                    <div className="p-2 bg-amber-500/10 rounded text-amber-700 text-[11px]">
                      Yasal azami tavan sınır uygulandı.
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/serbest-meslek-makbuzu-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Serbest meslek makbuzu hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Belge türü ve tutarını girerek yasal damga vergisini hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Damga Vergisi Nedir ve Hangi Oranlar Geçerlidir?</h2>
        <p className="mb-4 text-muted-foreground">
          488 sayılı Damga Vergisi Kanunu&apos;na göre resmi ve ticari evraklardan maktu veya nispi oranda damga vergisi alınır. Belli parayı içeren ticari sözleşmelerde yasal oran <strong>binde 9.48</strong>&apos;dir.
        </p>
      </div>
    </div>
  );
}
