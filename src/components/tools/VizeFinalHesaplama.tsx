'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function VizeFinalHesaplama() {
  const [vizeScoreStr, setVizeScoreStr] = useState<string>('65');
  const [finalScoreStr, setFinalScoreStr] = useState<string>('70');
  const [vizeWeightStr, setVizeWeightStr] = useState<string>('40'); // Vize ağırlığı % (Final otomatik 100 - Vize)
  const [passThresholdStr, setPassThresholdStr] = useState<string>('50'); // Geçme Notu Barajı
  const [finalMinThresholdStr, setFinalMinThresholdStr] = useState<string>('50'); // Final Barajı

  const [result, setResult] = useState<{
    vizeScore: number;
    finalScore: number;
    vizeWeight: number;
    finalWeight: number;
    averageScore: number;
    isPassed: boolean;
    passReason: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const vize = parseTurkishNumber(vizeScoreStr);
    const final = parseTurkishNumber(finalScoreStr);
    const vizeWeight = parseTurkishNumber(vizeWeightStr);
    const passThreshold = parseTurkishNumber(passThresholdStr);
    const finalMinThreshold = parseTurkishNumber(finalMinThresholdStr) || 0;

    if (isNaN(vize) || vize < 0 || vize > 100) {
      setError('Vize notu 0 ile 100 arasında olmalıdır.');
      return;
    }
    if (isNaN(final) || final < 0 || final > 100) {
      setError('Final notu 0 ile 100 arasında olmalıdır.');
      return;
    }
    if (isNaN(vizeWeight) || vizeWeight <= 0 || vizeWeight >= 100) {
      setError('Vize ağırlığı %1 ile %99 arasında olmalıdır.');
      return;
    }

    const finalWeight = 100 - vizeWeight;
    const averageScore = (vize * (vizeWeight / 100)) + (final * (finalWeight / 100));

    let isPassed = true;
    let passReason = 'Tebrikler, dersi başarıyla geçtiniz!';

    if (final < finalMinThreshold) {
      isPassed = false;
      passReason = `Final sınavı barajının (${finalMinThreshold}) altında kaldınız.`;
    } else if (averageScore < passThreshold) {
      isPassed = false;
      passReason = `Ortalamanız geçme notunun (${passThreshold}) altında kaldı.`;
    }

    setResult({
      vizeScore: vize,
      finalScore: final,
      vizeWeight,
      finalWeight,
      averageScore,
      isPassed,
      passReason,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="vize" className="block text-sm font-medium mb-1 text-foreground">
                  Vize / Ara Sınav Notu <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="vize"
                  placeholder="Örn: 65"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={vizeScoreStr}
                  onChange={(e) => setVizeScoreStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>

              <div>
                <label htmlFor="final" className="block text-sm font-medium mb-1 text-foreground">
                  Final / Yıl Sonu Notu <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="final"
                  placeholder="Örn: 70"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={finalScoreStr}
                  onChange={(e) => setFinalScoreStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label htmlFor="vWeight" className="block text-xs font-medium mb-1 text-foreground">
                  Vize Ağırlığı (%)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  id="vWeight"
                  placeholder="40"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                  value={vizeWeightStr}
                  onChange={(e) => setVizeWeightStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
              </div>

              <div>
                <label htmlFor="pThresh" className="block text-xs font-medium mb-1 text-foreground">
                  Geçme Notu Barajı
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  id="pThresh"
                  placeholder="50"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                  value={passThresholdStr}
                  onChange={(e) => setPassThresholdStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
              </div>

              <div>
                <label htmlFor="fMin" className="block text-xs font-medium mb-1 text-foreground">
                  Final Barajı (Min)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  id="fMin"
                  placeholder="50"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                  value={finalMinThresholdStr}
                  onChange={(e) => setFinalMinThresholdStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
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
              Ders Başarı Notunu Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Ders Başarı Durumu
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Dönem Sonu Başarı Notu</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatNumber(result.averageScore, 2)}
                  </span>
                  <span className={`text-xs font-semibold mt-1.5 px-2.5 py-1 rounded-md border ${
                    result.isPassed 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                      : 'bg-destructive/10 text-destructive border-destructive/20'
                  }`}>
                    {result.isPassed ? 'GEÇTİ' : 'KALDI'} — {result.passReason}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Vize Katkısı (%{result.vizeWeight}):</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.vizeScore * (result.vizeWeight / 100), 2)} Puan</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Final Katkısı (%{result.finalWeight}):</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.finalScore * (result.finalWeight / 100), 2)} Puan</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/finalde-kac-almaliyim"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Finalde kaç almam gerekiyor hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Vize ve final notlarınızı girerek ders geçme notunuzu hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Vize ve Final Not Ortalaması Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Üniversitelerde yaygın olarak uygulanan formül: <strong>(Vize Notu × %40) + (Final Notu × %60)</strong>&apos;tır. Çıkan sonuç üniversitenin belirlediği geçme notu barajına ve final taban puanına göre değerlendirilir.
        </p>
      </div>
    </div>
  );
}
