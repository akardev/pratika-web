'use client';

import React, { useState } from 'react';
import { HistoryEvent, formatHistoryDayLabel, getHistoryEventNarrative } from '@/data/todayInHistory';

interface HistoryEventCardProps {
  event: HistoryEvent;
  mode: 'day' | 'year';
}

const CATEGORY_STYLES: Record<string, { label: string; badgeClass: string; yearBadgeClass: string }> = {
  turkey: {
    label: '🇹🇷 Türkiye Tarihi',
    badgeClass: 'bg-red-50 text-red-700 border-red-200/80',
    yearBadgeClass: 'bg-red-50 text-red-800 border-red-200',
  },
  world: {
    label: '🌍 Dünya & Siyaset',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200/80',
    yearBadgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  science: {
    label: '🔬 Bilim & Teknoloji',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    yearBadgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  culture: {
    label: '🎨 Sanat & Kültür',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200/80',
    yearBadgeClass: 'bg-purple-50 text-purple-800 border-purple-200',
  },
  sports: {
    label: '⚽ Spor',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200/80',
    yearBadgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
  },
  birth: {
    label: '👶 Doğum',
    badgeClass: 'bg-teal-50 text-teal-700 border-teal-200/80',
    yearBadgeClass: 'bg-teal-50 text-teal-800 border-teal-200',
  },
  death: {
    label: '🕊️ Vefat',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200/80',
    yearBadgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
  },
  event: {
    label: '📌 Tarihi Olay',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    yearBadgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
};

export default function HistoryEventCard({ event, mode }: HistoryEventCardProps) {
  const [copied, setCopied] = useState(false);

  const styleConfig = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.event;
  const timeBadge = mode === 'day' 
    ? (event.year < 0 ? `MÖ ${Math.abs(event.year)}` : `${event.year}`) 
    : formatHistoryDayLabel(event.month, event.day);

  const narrative = getHistoryEventNarrative(event);

  const handleCopy = () => {
    const textToCopy = `${timeBadge} - ${narrative}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/70 hover:shadow-md">
      <div>
        {/* Top Header: YIL + Kategori + Copy Icon */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            {/* Prominent Year Badge */}
            <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 font-mono text-sm font-extrabold tracking-tight ${styleConfig.yearBadgeClass}`}>
              {timeBadge}
            </span>
            {/* Category Pill */}
            <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${styleConfig.badgeClass}`}>
              {styleConfig.label}
            </span>
          </div>

          {/* Subtle Quick Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            title={copied ? 'Kopyalandı!' : 'Metni Kopyala'}
            aria-label="Olay metnini kopyala"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 opacity-70 transition-all hover:bg-slate-100 hover:text-slate-700 hover:opacity-100 focus:opacity-100"
          >
            {copied ? (
              <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>

        {/* Single Historical Explanation */}
        <p className="mt-3.5 text-sm sm:text-[15px] font-normal leading-relaxed text-slate-700">
          {narrative}
        </p>
      </div>

      {mode === 'year' && (
        <div className="mt-3 flex items-center justify-end border-t border-slate-100 pt-2.5 text-xs">
          <span className="text-[11px] font-medium text-slate-400">
            {formatHistoryDayLabel(event.month, event.day)}
          </span>
        </div>
      )}
    </article>
  );
}
