'use client';

import { useState } from 'react';

export default function YksNetHesaplama() {
  const [tests, setTests] = useState([
    { name: 'Türkçe (40 Soru)', c: 32, w: 5 },
    { name: 'Temel Matematik (40 Soru)', c: 28, w: 4 },
    { name: 'Fen Bilimleri (20 Soru)', c: 15, w: 3 },
    { name: 'Sosyal Bilimler (20 Soru)', c: 16, w: 2 },
  ]);

  const calcNet = (c: number, w: number) => Math.max(0, Math.round((c - (w / 4)) * 100) / 100);

  const totalCorrect = tests.reduce((a, b) => a + b.c, 0);
  const totalWrong = tests.reduce((a, b) => a + b.w, 0);
  const totalNet = tests.reduce((a, b) => a + calcNet(b.c, b.w), 0);

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-3">
          {tests.map((t, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3 p-3 rounded-lg border border-border bg-muted/20">
              <span className="text-sm font-semibold text-foreground sm:col-span-2">{t.name}</span>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  value={t.c}
                  onChange={(e) => {
                    const newTests = [...tests];
                    newTests[idx].c = Number(e.target.value);
                    setTests(newTests);
                  }}
                  className="w-20 h-9 px-2 rounded border border-border bg-background text-xs"
                  placeholder="Doğru"
                />
                <input
                  type="number"
                  min="0"
                  value={t.w}
                  onChange={(e) => {
                    const newTests = [...tests];
                    newTests[idx].w = Number(e.target.value);
                    setTests(newTests);
                  }}
                  className="w-20 h-9 px-2 rounded border border-border bg-background text-xs"
                  placeholder="Yanlış"
                />
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-primary">{calcNet(t.c, t.w)} Net</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <span className="text-xs text-muted-foreground block mb-1">Toplam Sınav Neti</span>
            <span className="text-3xl font-bold text-primary">{Math.round(totalNet * 100) / 100} Net</span>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <span className="text-xs text-muted-foreground block mb-1">Toplam Doğru</span>
            <span className="text-xl font-bold text-foreground">{totalCorrect}</span>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <span className="text-xs text-muted-foreground block mb-1">Toplam Yanlış</span>
            <span className="text-xl font-bold text-foreground">{totalWrong}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
