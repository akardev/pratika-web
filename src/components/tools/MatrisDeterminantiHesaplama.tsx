'use client';

import { useState } from 'react';


export default function MatrisDeterminantiHesaplama() {
  const [size, setSize] = useState<2 | 3>(2);

  // 2x2
  const [m2, setM2] = useState<number[][]>([
    [3, 8],
    [4, 6],
  ]);

  // 3x3
  const [m3, setM3] = useState<number[][]>([
    [1, 2, 3],
    [0, 4, 5],
    [1, 0, 6],
  ]);

  const [result, setResult] = useState<{
    det: number;
    isInvertible: boolean;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    if (size === 2) {
      // det = ad - bc
      const det = (m2[0][0] * m2[1][1]) - (m2[0][1] * m2[1][0]);
      setResult({ det, isInvertible: det !== 0 });
    } else {
      // Sarrus kuralı 3x3
      const a = m3[0][0], b = m3[0][1], c = m3[0][2];
      const d = m3[1][0], e_val = m3[1][1], f = m3[1][2];
      const g = m3[2][0], h = m3[2][1], i = m3[2][2];

      const det = a * (e_val * i - f * h) - b * (d * i - f * g) + c * (d * h - e_val * g);
      setResult({ det, isInvertible: det !== 0 });
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => { setSize(2); setResult(null); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium border ${size === 2 ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-foreground border-border'}`}
            >
              2 × 2 Matris
            </button>
            <button
              type="button"
              onClick={() => { setSize(3); setResult(null); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium border ${size === 3 ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-foreground border-border'}`}
            >
              3 × 3 Matris
            </button>
          </div>

          <div className="inline-block p-4 border border-border rounded-xl bg-background shadow-inner">
            {size === 2 ? (
              <div className="grid grid-cols-2 gap-2">
                {[0, 1].map((r) =>
                  [0, 1].map((c) => (
                    <input
                      key={`${r}-${c}`}
                      type="number"
                      value={m2[r][c]}
                      onChange={(e) => {
                        const copy = [...m2.map(row => [...row])];
                        copy[r][c] = Number(e.target.value);
                        setM2(copy);
                      }}
                      className="w-16 h-12 text-center text-base font-bold border border-border rounded-lg bg-card"
                    />
                  ))
                )}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((r) =>
                  [0, 1, 2].map((c) => (
                    <input
                      key={`${r}-${c}`}
                      type="number"
                      value={m3[r][c]}
                      onChange={(e) => {
                        const copy = [...m3.map(row => [...row])];
                        copy[r][c] = Number(e.target.value);
                        setM3(copy);
                      }}
                      className="w-14 h-12 text-center text-base font-bold border border-border rounded-lg bg-card"
                    />
                  ))
                )}
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
            >
              Determinantı Hesapla
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Determinant Sonucu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">det(A) Değeri</span>
                <span className="text-3xl font-bold text-primary">{result.det}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Ters Matris (A⁻¹) Durumu</span>
                <span className="text-base font-bold text-foreground">
                  {result.isInvertible ? '✓ Terslenebilir (det ≠ 0)' : '✕ Tekil Matris (det = 0, tersi yoktur)'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
