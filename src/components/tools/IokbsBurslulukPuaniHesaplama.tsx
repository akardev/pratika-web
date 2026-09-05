'use client';

import { useState } from 'react';

export default function IokbsBurslulukPuaniHesaplama() {
  const [grade, setGrade] = useState('5');
  const [scores, setScores] = useState({
    turkce: { c: 20, w: 2 },
    mat: { c: 18, w: 3 },
    fen: { c: 21, w: 1 },
    sosyal: { c: 22, w: 1 },
  });

  const [totalScore, setTotalScore] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    // Netler = Doğru - (Yanlış / 3)
    const netT = Math.max(0, scores.turkce.c - (scores.turkce.w / 3));
    const netM = Math.max(0, scores.mat.c - (scores.mat.w / 3));
    const netF = Math.max(0, scores.fen.c - (scores.fen.w / 3));
    const netS = Math.max(0, scores.sosyal.c - (scores.sosyal.w / 3));

    // Standart MEB İOKBS yaklaşık taban ve katsayı puanı
    const baseScore = 150;
    const score = baseScore + (netT * 3.7) + (netM * 4.2) + (netF * 3.3) + (netS * 2.8);

    setTotalScore(Math.min(500, Math.round(score * 100) / 100));
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="max-w-xs mb-4">
            <label htmlFor="grd" className="block text-sm font-medium text-foreground mb-1">Sınıf Seviyesi</label>
            <select
              id="grd"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              <option value="5">5. Sınıf</option>
              <option value="6">6. Sınıf</option>
              <option value="7">7. Sınıf</option>
              <option value="8">8. Sınıf</option>
              <option value="9">9, 10, 11. Sınıf</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(['turkce', 'mat', 'fen', 'sosyal'] as const).map((subject) => (
              <div key={subject} className="p-3 rounded-lg border border-border bg-muted/20 space-y-2">
                <span className="font-semibold text-xs capitalize text-foreground">{subject === 'turkce' ? 'Türkçe' : subject === 'mat' ? 'Matematik' : subject === 'fen' ? 'Fen Bilimleri' : 'Sosyal Bilgiler'}</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    min="0"
                    max="25"
                    value={scores[subject].c}
                    onChange={(e) => setScores({ ...scores, [subject]: { ...scores[subject], c: Number(e.target.value) } })}
                    placeholder="Doğru"
                    className="h-9 px-2 rounded border border-border bg-background text-xs"
                  />
                  <input
                    type="number"
                    min="0"
                    max="25"
                    value={scores[subject].w}
                    onChange={(e) => setScores({ ...scores, [subject]: { ...scores[subject], w: Number(e.target.value) } })}
                    placeholder="Yanlış"
                    className="h-9 px-2 rounded border border-border bg-background text-xs"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Bursluluk Puanını Hesapla
          </button>
        </form>

        {totalScore !== null && (
          <div className="mt-8 pt-6 border-t border-border">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 inline-block min-w-72">
              <span className="text-xs text-muted-foreground block mb-1">Tahmini İOKBS Bursluluk Puanı</span>
              <span className="text-3xl font-bold text-primary">{totalScore} / 500</span>
              <span className="text-xs text-muted-foreground block mt-1">Burs kazanma taban puanı genellikle 440-465 civarındadır.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
