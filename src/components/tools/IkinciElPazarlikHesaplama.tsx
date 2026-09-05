'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function IkinciElPazarlikHesaplama() {
  const [askingPriceStr, setAskingPriceStr] = useState('15000');
  const [offerPriceStr, setOfferPriceStr] = useState('12000');

  const asking = parseTurkishNumber(askingPriceStr) || 0;
  const offer = parseTurkishNumber(offerPriceStr) || 0;

  const discountAmount = Math.max(0, asking - offer);
  const discountPercent = asking > 0 ? Math.round((discountAmount / asking) * 100) : 0;
  const fairMiddlePoint = Math.round((asking + offer) / 2);

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ask" className="block text-sm font-medium text-foreground mb-1">Satıcının İstediği Fiyat (TL)</label>
            <input
              id="ask"
              type="text"
              value={askingPriceStr}
              onChange={(e) => setAskingPriceStr(sanitizeNumericInput(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
          <div>
            <label htmlFor="off" className="block text-sm font-medium text-foreground mb-1">Sizin Teklifiniz (TL)</label>
            <input
              id="off"
              type="text"
              value={offerPriceStr}
              onChange={(e) => setOfferPriceStr(sanitizeNumericInput(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Pazarlık Analizi</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-xs text-muted-foreground block mb-1">İndirim Oranı</span>
              <span className="text-2xl font-bold text-primary">%{discountPercent} İndirim</span>
              <span className="text-xs text-muted-foreground block mt-1">Fark: {formatNumber(discountAmount)} ₺</span>
            </div>
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-xs text-muted-foreground block mb-1">Önerilen Orta Nokta (Uzlaşma)</span>
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{formatNumber(fairMiddlePoint)} ₺</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">Pazarlık Değerlendirmesi</span>
              <span className="text-sm font-medium text-foreground block mt-1">
                {discountPercent > 30 ? 'Agresif Teklif (Satıcı reddedebilir)' : discountPercent > 15 ? 'İdeal Pazarlık Aralığı' : 'Makul ve Kabul Edilebilir'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
