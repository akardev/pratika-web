'use client';

import { useState } from 'react';
import Link from 'next/link';
import { parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function FinaldeKacAlmaliyim() {
  const [vizeScoreStr, setVizeScoreStr] = useState<string>('45');
  const [targetPassScoreStr, setTargetPassScoreStr] = useState<string>('60'); // Hedeflenen Geçme Notu
  const [vizeWeightStr, setVizeWeightStr] = useState<string>('40'); // Vize Ağırlığı %
  const [finalMinThresholdStr, setFinalMinThresholdStr] = useState<string>('50'); // Üniversitenin minimum final barajı

  const [result, setResult] = useState<{
    vizeScore: number;
    targetPassScore: number;
    requiredFinalScore: number;
    finalMinThreshold: number;
    effectiveRequiredScore: number;
    isAchievable: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const vize = parseTurkishNumber(vizeScoreStr);
    const target = parseTurkishNumber(targetPassScoreStr);
    const vizeWeight = parseTurkishNumber(vizeWeightStr);
    const finalMin = parseTurkishNumber(finalMinThresholdStr) || 0;

    if (isNaN(vize) || vize < 0 || vize > 100) {
      setError('Vize notu 0 ile 100 arasında olmalıdır.');
      return;
    }
    if (isNaN(target) || target <= 0 || target > 100) {
      setError('Hedeflenen not 1 ile 100 arasında olmalıdır.');
      return;
    }
    if (isNaN(vizeWeight) || vizeWeight <= 0 || vizeWeight >= 100) {
      setError('Vize ağırlığı %1 ile %99 arasında olmalıdır.');
      return;
    }

    const finalWeight = 100 - vizeWeight;
    // Formül: Target = (Vize * (vWeight/100)) + (RequiredFinal * (fWeight/100))
    // RequiredFinal = (Target - (Vize * (vWeight/100))) / (fWeight/100)
    const requiredFinalScore = (target - (vize * (vizeWeight / 100))) / (finalWeight / 100);
    const effectiveRequiredScore = Math.max(finalMin, Math.ceil(requiredFinalScore));
    const isAchievable = effectiveRequiredScore <= 100;

    setResult({
      vizeScore: vize,
      targetPassScore: target,
      requiredFinalScore: Math.max(0, requiredFinalScore),
      finalMinThreshold: finalMin,
      effectiveRequiredScore: Math.max(0, effectiveRequiredScore),
      isAchievable,
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
                  Aldığınız Vize Notu <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="vize"
                  placeholder="Örn: 45"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={vizeScoreStr}
                  onChange={(e) => setVizeScoreStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>

              <div>
                <label htmlFor="target" className="block text-sm font-medium mb-1 text-foreground">
                  Hedeflediğiniz Geçme Notu <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="target"
                  placeholder="Örn: 60"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={targetPassScoreStr}
                  onChange={(e) => setTargetPassScoreStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <label htmlFor="fMin" className="block text-xs font-medium mb-1 text-foreground">
                  Final Barajı (En Az)
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
              Gereken Final Puanını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Gereken Sınav Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Finalden Almanız Gereken En Az Puan</span>
                  <span className={`font-extrabold text-4xl sm:text-5xl tracking-tight ${
                    result.isAchievable ? 'text-primary' : 'text-destructive'
                  }`}>
                    {result.isAchievable ? result.effectiveRequiredScore : 'İmkânsız (>100)'}
                  </span>
                  <span className={`text-xs font-semibold mt-1.5 px-2.5 py-1 rounded-md border ${
                    result.isAchievable 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                      : 'bg-destructive/10 text-destructive border-destructive/20'
                  }`}>
                    {result.isAchievable ? 'Dersi geçmek için bu puanı almalısınız' : '100 alsanız dahi hedef nota ulaşılamıyor'}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Vize Notunuz:</span>
                    <span className="font-semibold text-foreground">{result.vizeScore}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Hedeflenen Ortalamanız:</span>
                    <span className="font-semibold text-foreground">{result.targetPassScore}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/vize-final-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Vize ve final not ortalaması hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Vize notunuzu ve hedef ortalamanızı girerek finalden kaç almanız gerektiğini öğrenin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Finalden Kaç Almalıyım Formülü</h2>
        <p className="mb-4 text-muted-foreground">
          Gereken final puanı formülü: <code>(Hedef Ortalama - (Vize Notu × Vize Etkisi)) / Final Etkisi</code>. Ayrıca üniversitenizin belirlediği asgari final baraj puanını da sağlamanız gerekir.
        </p>
      </div>
    </div>
  );
}
