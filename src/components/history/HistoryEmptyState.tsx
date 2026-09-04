'use client';

import React from 'react';
import Link from 'next/link';
import { getAllAvailableDates, getAllAvailableYears } from '@/data/todayInHistory';

interface HistoryEmptyStateProps {
  mode: 'day' | 'year';
  queryLabel: string;
}

export default function HistoryEmptyState({ mode, queryLabel }: HistoryEmptyStateProps) {
  const popularDates = getAllAvailableDates().slice(0, 8);
  const popularYears = getAllAvailableYears().slice(0, 10);

  return (
    <section
      aria-live="polite"
      className="rounded-2xl border border-dashed border-border bg-card p-8 text-center shadow-2xs sm:p-12"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>

      <h2 className="mt-4 text-base font-bold text-foreground sm:text-lg">
        {queryLabel} için kayıt bulunamadı
      </h2>
      <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
        Pratika Tarih Arşivi yalnızca resmî ve doğrulanabilir kaynaklarla genişletilmektedir. Aşağıdaki popüler tarih kayıtlarını inceleyebilirsiniz.
      </p>

      {/* Suggested Landmarks */}
      <div className="mt-6 border-t border-border/60 pt-5">
        <span className="text-xs font-semibold text-muted-foreground">
          {mode === 'day' ? 'Öne Çıkan Tarihler:' : 'Dönüm Noktası Yıllar:'}
        </span>

        {mode === 'day' ? (
          <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
            {popularDates.map((item) => (
              <Link
                key={item.slug}
                href={`/tarihte-bugun/${item.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-muted hover:border-border"
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-muted-foreground font-normal">({item.count})</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
            {popularYears.map((item) => (
              <Link
                key={item.year}
                href={`/tarihte-bugun/yil/${item.year}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-muted/40 px-3 py-1.5 text-xs font-mono font-medium text-foreground transition-all hover:bg-muted hover:border-border"
              >
                <span>{item.year}</span>
                <span className="text-[10px] text-muted-foreground font-normal">({item.count})</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
