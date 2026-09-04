'use client';

import { useState } from 'react';

export default function MetinOkumaSuresiHesaplama() {
  const [text, setText] = useState<string>('');
  const [speedMode, setSpeedMode] = useState<'silent' | 'speech'>('silent');

  // Kelime sayısı tespiti
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  // Sessiz okuma ortalaması: ~200 kelime/dk
  // Sesli konuşma/sunum: ~130 kelime/dk
  const wordsPerMin = speedMode === 'silent' ? 200 : 130;
  const totalMinutes = words > 0 ? words / wordsPerMin : 0;
  const mins = Math.floor(totalMinutes);
  const secs = Math.round((totalMinutes - mins) * 60);

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label htmlFor="tx" className="block text-sm font-medium text-foreground">Metninizi Buraya Yapıştırın</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSpeedMode('silent')}
                className={`text-xs px-3 py-1 rounded-md border ${speedMode === 'silent' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-foreground border-border'}`}
              >
                Sessiz Okuma (200 k/dk)
              </button>
              <button
                type="button"
                onClick={() => setSpeedMode('speech')}
                className={`text-xs px-3 py-1 rounded-md border ${speedMode === 'speech' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-foreground border-border'}`}
              >
                Sesli Sunum (130 k/dk)
              </button>
            </div>
          </div>

          <textarea
            id="tx"
            rows={7}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Metninizi buraya yapıştırın..."
            className="w-full p-3 rounded-lg border border-border bg-background text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <span className="text-xs text-muted-foreground block mb-1">Tahmini Süre</span>
              <span className="text-2xl font-bold text-primary">
                {mins > 0 ? `${mins} dk ${secs} sn` : `${secs} saniye`}
              </span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">Toplam Kelime</span>
              <span className="text-2xl font-bold text-foreground">{words} Kelime</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">Toplam Karakter</span>
              <span className="text-2xl font-bold text-foreground">{charCount} Karakter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
