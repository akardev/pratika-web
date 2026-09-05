'use client';

import { useState } from 'react';
import { parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function HomaIrHesaplama() {
  const [glucoseStr, setGlucoseStr] = useState('95'); // Açlık glukoz mg/dL
  const [insulinStr, setInsulinStr] = useState('12'); // Açlık insülin uIU/mL

  const [result, setResult] = useState<{
    score: number;
    status: string;
    description: string;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const glucose = parseTurkishNumber(glucoseStr);
    const insulin = parseTurkishNumber(insulinStr);

    if (isNaN(glucose) || isNaN(insulin) || glucose <= 0 || insulin <= 0) return;

    // Standart HOMA-IR Formülü: (Açlık Şekeri × Açlık İnsülini) / 405
    const score = (glucose * insulin) / 405;

    let status = 'Normal';
    let description = 'İnsülin direnci tespit edilmedi (2.5 altı).';
    if (score >= 2.5) {
      status = 'İnsülin Direnci Mevcut';
      description = 'HOMA-IR skoru 2.5 üzerinde. Metabolik sendrom veya prediyabet riski bulunabilir.';
    }

    setResult({
      score: Math.round(score * 100) / 100,
      status,
      description,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="gl" className="block text-sm font-medium text-foreground mb-1">Açlık Kan Şekeri (Glukoz - mg/dL)</label>
              <input
                id="gl"
                type="text"
                value={glucoseStr}
                onChange={(e) => setGlucoseStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="ins" className="block text-sm font-medium text-foreground mb-1">Açlık İnsülini (µIU/mL)</label>
              <input
                id="ins"
                type="text"
                value={insulinStr}
                onChange={(e) => setInsulinStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            HOMA-IR Skorunu Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tahlil Değerlendirmesi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border ${result.score < 2.5 ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-destructive/10 border-destructive/20'}`}>
                <span className="text-xs text-muted-foreground block mb-1">HOMA-IR İndeksi</span>
                <span className={`text-2xl font-bold ${result.score < 2.5 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
                  {result.score}
                </span>
                <span className="text-xs font-semibold block mt-1">{result.status}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border flex items-center">
                <p className="text-sm text-muted-foreground leading-relaxed">{result.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
