'use client';

import { useState } from 'react';

export default function MetinKarsilastirmaDiff() {
  const [textA, setTextA] = useState<string>(
    'Pratiksel web platformu kullanıcı dostudur.\nHızlı ve pratik hesaplama araçları sunar.\n100 yeni araç eklenmiştir.'
  );
  const [textB, setTextB] = useState<string>(
    'Pratiksel web platformu modern ve kullanıcı dostudur.\nHızlı ve pratik hesaplama araçları sunar.\n104 yeni araç eklenmiştir.'
  );

  const [diffLines, setDiffLines] = useState<{
    type: 'same' | 'added' | 'removed' | 'modified';
    lineA?: string;
    lineB?: string;
    lineNum: number;
  }[] | null>(null);

  const handleCompare = () => {
    const linesA = textA.split('\n');
    const linesB = textB.split('\n');
    const maxLen = Math.max(linesA.length, linesB.length);

    const diffs: {
      type: 'same' | 'added' | 'removed' | 'modified';
      lineA?: string;
      lineB?: string;
      lineNum: number;
    }[] = [];

    for (let i = 0; i < maxLen; i++) {
      const a = linesA[i];
      const b = linesB[i];

      if (a === b) {
        diffs.push({ type: 'same', lineA: a, lineB: b, lineNum: i + 1 });
      } else if (a !== undefined && b !== undefined) {
        diffs.push({ type: 'modified', lineA: a, lineB: b, lineNum: i + 1 });
      } else if (a !== undefined && b === undefined) {
        diffs.push({ type: 'removed', lineA: a, lineNum: i + 1 });
      } else if (a === undefined && b !== undefined) {
        diffs.push({ type: 'added', lineB: b, lineNum: i + 1 });
      }
    }

    setDiffLines(diffs);
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="textA" className="block text-sm font-medium mb-1.5 text-foreground">
                1. Orijinal Metin (A)
              </label>
              <textarea
                id="textA"
                rows={6}
                className="w-full rounded-lg border border-border bg-background p-3 text-foreground font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                value={textA}
                onChange={(e) => setTextA(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="textB" className="block text-sm font-medium mb-1.5 text-foreground">
                2. Değiştirilmiş Metin (B)
              </label>
              <textarea
                id="textB"
                rows={6}
                className="w-full rounded-lg border border-border bg-background p-3 text-foreground font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                value={textB}
                onChange={(e) => setTextB(e.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleCompare}
            className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Farkları Karşılaştır (Diff)
          </button>

          {diffLines && (
            <div className="p-4 bg-muted/20 rounded-xl border border-border space-y-1.5 animate-in fade-in zoom-in-95 duration-200">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 text-center">
                Satır Satır Karşılaştırma Sonucu
              </h3>

              <div className="space-y-1 font-mono text-xs overflow-x-auto">
                {diffLines.map((d, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded flex gap-3 items-start border ${
                      d.type === 'same'
                        ? 'bg-background/60 text-foreground border-transparent'
                        : d.type === 'modified'
                        ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20'
                        : d.type === 'added'
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20'
                        : 'bg-destructive/10 text-destructive border-destructive/20'
                    }`}
                  >
                    <span className="w-6 text-muted-foreground select-none shrink-0 text-right">{d.lineNum}</span>
                    <div className="flex-1 space-y-0.5">
                      {d.type === 'modified' && (
                        <>
                          <div className="text-destructive line-through">- {d.lineA}</div>
                          <div className="text-emerald-600 dark:text-emerald-400 font-semibold">+ {d.lineB}</div>
                        </>
                      )}
                      {d.type === 'same' && <div>  {d.lineA}</div>}
                      {d.type === 'added' && <div className="text-emerald-600 dark:text-emerald-400 font-semibold">+ {d.lineB}</div>}
                      {d.type === 'removed' && <div className="text-destructive line-through">- {d.lineA}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Metin Karşılaştırma (Diff) Aracı Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          İki metin, sözleşme maddesi veya kaynak kod arasındaki değişiklikleri, eklemeleri ve silinen satırları hızlıca tespit etmenizi sağlar.
        </p>
      </div>
    </div>
  );
}
