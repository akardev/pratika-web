'use client';

import { useState } from 'react';

export default function CssFlexboxOlusturucu() {
  const [direction, setDirection] = useState<'row' | 'row-reverse' | 'column' | 'column-reverse'>('row');
  const [justify, setJustify] = useState<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'>('center');
  const [align, setAlign] = useState<'flex-start' | 'center' | 'flex-end' | 'stretch'>('center');
  const [gap, setGap] = useState(16);

  const cssCode = `display: flex;
flex-direction: ${direction};
justify-content: ${justify};
align-items: ${align};
gap: ${gap}px;`;

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Direction</label>
            <select value={direction} onChange={(e) => setDirection(e.target.value as 'row' | 'column' | 'row-reverse' | 'column-reverse')} className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm">
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Justify Content</label>
            <select value={justify} onChange={(e) => setJustify(e.target.value as 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly')} className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm">
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Align Items</label>
            <select value={align} onChange={(e) => setAlign(e.target.value as 'stretch' | 'flex-start' | 'center' | 'flex-end')} className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm">
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="stretch">stretch</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Gap: {gap}px</label>
            <input type="range" min="0" max="48" value={gap} onChange={(e) => setGap(Number(e.target.value))} className="w-full accent-primary mt-3" />
          </div>
        </div>

        {/* Preview Playground */}
        <div
          className="min-h-64 p-6 bg-muted/20 border-2 border-dashed border-border rounded-xl"
          style={{
            display: 'flex',
            flexDirection: direction,
            justifyContent: justify,
            alignItems: align,
            gap: `${gap}px`,
          }}
        >
          <div className="w-16 h-16 bg-primary text-primary-foreground font-bold rounded-lg flex items-center justify-center shadow">1</div>
          <div className="w-16 h-20 bg-primary/80 text-primary-foreground font-bold rounded-lg flex items-center justify-center shadow">2</div>
          <div className="w-16 h-14 bg-primary/60 text-primary-foreground font-bold rounded-lg flex items-center justify-center shadow">3</div>
        </div>

        <div className="pt-4 border-t border-border space-y-2">
          <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">CSS Kodu:</span>
          <pre className="p-4 rounded-lg bg-muted/40 border border-border font-mono text-xs text-foreground select-all">
            {cssCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
