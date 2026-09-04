'use client';

import React, { useState } from 'react';
import { HistoryEvent, formatHistoryDayLabel, getHistoryEventNarrative } from '@/data/todayInHistory';

interface HistoryEventCardProps {
  event: HistoryEvent;
  mode: 'day' | 'year';
}

const CATEGORY_STYLES: Record<string, { label: string; badgeClass: string }> = {
  turkey: {
    label: 'Türkiye',
    badgeClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  },
  world: {
    label: 'Dünya & Siyaset',
    badgeClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  },
  science: {
    label: 'Bilim & Teknoloji',
    badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  },
  culture: {
    label: 'Sanat & Kültür',
    badgeClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  },
  sports: {
    label: 'Spor',
    badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  },
  birth: {
    label: 'Doğum',
    badgeClass: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
  },
  death: {
    label: 'Vefat',
    badgeClass: 'bg-muted text-muted-foreground border-border/80',
  },
  event: {
    label: 'Olay',
    badgeClass: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
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
    <article className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-2xs transition-all duration-200 hover:border-primary/40 hover:shadow-xs">
      <div>
        {/* Top Header: YIL + Kategori + Copy Icon */}
        <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-2.5">
          <div className="flex items-center gap-2">
            {/* Year Badge */}
            <span className="inline-flex items-center rounded-lg border border-border/70 bg-muted/60 px-2 py-0.5 font-mono text-xs font-bold text-foreground">
              {timeBadge}
            </span>
            {/* Category Pill */}
            <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide ${styleConfig.badgeClass}`}>
              {styleConfig.label}
            </span>
          </div>

          {/* Subtle Quick Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            title={copied ? 'Kopyalandı!' : 'Metni Kopyala'}
            aria-label="Olay metnini kopyala"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:opacity-100"
          >
            {copied ? (
              <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>

        {/* Historical Explanation */}
        <p className="mt-3 text-sm font-normal leading-relaxed text-foreground/90">
          {narrative}
        </p>
      </div>

      {mode === 'year' && (
        <div className="mt-3 flex items-center justify-end border-t border-border/60 pt-2 text-xs">
          <span className="text-[11px] font-medium text-muted-foreground">
            {formatHistoryDayLabel(event.month, event.day)}
          </span>
        </div>
      )}
    </article>
  );
}
