'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { HistoryEvent, CATEGORY_LABELS, formatHistoryDayLabel, getHistoryEventNarrative } from '@/data/todayInHistory';

interface HistoryFeaturedCardProps {
  event: HistoryEvent;
  mode: 'day' | 'year';
}

export default function HistoryFeaturedCard({ event, mode }: HistoryFeaturedCardProps) {
  const [copied, setCopied] = useState(false);

  const categoryName = CATEGORY_LABELS[event.category] || 'TARİHİ DÖNÜM NOKTASI';
  const badgeLabel = mode === 'day' 
    ? (event.year < 0 ? `MÖ ${Math.abs(event.year)}` : `${event.year}`) 
    : formatHistoryDayLabel(event.month, event.day);

  const narrative = getHistoryEventNarrative(event);

  const handleCopy = () => {
    const textToCopy = `${badgeLabel} - ${narrative}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section 
      aria-labelledby="featured-event-title" 
      className="relative overflow-hidden rounded-3xl border border-blue-900/20 bg-gradient-to-br from-[#0a1d37]/5 via-white to-amber-500/5 p-6 shadow-md transition-all sm:p-8 lg:p-10"
    >
      {/* Subtle top accent bar */}
      <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-blue-600 via-amber-500 to-blue-800" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Prominent Year Badge */}
          <span className="inline-flex items-center rounded-xl bg-[#0a1d37] px-3.5 py-1.5 font-mono text-base font-black text-white shadow-sm sm:text-lg">
            {badgeLabel}
          </span>

          <span className="inline-flex items-center rounded-lg border border-slate-200/80 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-2xs">
            {categoryName}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-700">
            <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Günün Öne Çıkan Olayı
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
            title="Metni Kopyala"
          >
            {copied ? (
              <>
                <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-700">Kopyalandı</span>
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className={`mt-5 ${event.image ? 'grid grid-cols-1 gap-6 lg:grid-cols-3' : ''}`}>
        <div className={event.image ? 'lg:col-span-2' : 'max-w-4xl'}>
          <h2
            id="featured-event-title"
            className="text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight text-slate-900 leading-relaxed"
          >
            {narrative}
          </h2>
        </div>

        {/* Event Image if available */}
        {event.image && (
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xs">
            <div className="relative aspect-video w-full">
              <Image
                src={event.image.url}
                alt={event.image.alt || narrative}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            {event.image.caption && (
              <p className="p-2.5 text-[11px] text-slate-500 italic">
                {event.image.caption}
              </p>
            )}
          </div>
        )}
      </div>

      {mode === 'year' && (
        <div className="mt-6 flex items-center justify-end border-t border-slate-200/80 pt-4 text-xs">
          <span className="font-semibold text-slate-500">
            {formatHistoryDayLabel(event.month, event.day)} {event.year}
          </span>
        </div>
      )}
    </section>
  );
}
