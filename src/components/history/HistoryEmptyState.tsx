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
      className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-xs sm:p-12"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>

      <h2 className="mt-4 text-lg font-bold text-slate-900 sm:text-xl">
        {queryLabel} için kayıt bulunamadı
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-slate-500 sm:text-sm">
        Pratika Tarih Arşivi yalnızca resmî ve doğrulanabilir kaynaklarla genişletilmektedir. Aşağıdaki popüler ve zengin tarih kayıtlarını inceleyebilirsiniz.
      </p>

      {/* Suggested Landmarks */}
      <div className="mt-8 border-t border-slate-100 pt-6">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {mode === 'day' ? 'Öne Çıkan Tarihler:' : 'Dönüm Noktası Yıllar:'}
        </span>

        {mode === 'day' ? (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {popularDates.map((item) => (
              <Link
                key={item.slug}
                href={`/tarihte-bugun/${item.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 hover:shadow-2xs"
              >
                <span>📅</span>
                <span>{item.label}</span>
                <span className="text-[11px] text-slate-400 font-normal">({item.count} olay)</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {popularYears.map((item) => (
              <Link
                key={item.year}
                href={`/tarihte-bugun/yil/${item.year}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 font-mono text-xs font-semibold text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 hover:shadow-2xs"
              >
                <span>🏛️</span>
                <span>{item.year}</span>
                <span className="text-[11px] text-slate-400 font-normal">({item.count} olay)</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
