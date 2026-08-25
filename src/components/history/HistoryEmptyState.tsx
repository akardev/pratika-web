'use client';

import Link from 'next/link';
import { getAllAvailableDates, getAllAvailableYears } from '@/data/todayInHistory';

interface HistoryEmptyStateProps {
  mode: 'day' | 'year';
  queryLabel: string;
}

export default function HistoryEmptyState({ mode, queryLabel }: HistoryEmptyStateProps) {
  const popularDates = getAllAvailableDates().slice(0, 6);
  const popularYears = getAllAvailableYears().slice(0, 8);

  return (
    <section
      aria-live="polite"
      className="rounded-2xl border border-dashed border-border bg-card/60 p-8 text-center sm:p-12"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>

      <h2 className="mt-4 text-lg font-bold text-foreground sm:text-xl">
        {queryLabel} için henüz doğrulanmış bir kayıt bulunmuyor
      </h2>
      <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
        Pratika Tarih Arşivi yalnızca resmî ve doğrulanabilir kaynaklarla genişletilmektedir. Aşağıdaki popüler ve zengin tarih kayıtlarını keşfedebilirsiniz.
      </p>

      {/* Suggested Landmarks */}
      <div className="mt-6 border-t border-border/60 pt-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {mode === 'day' ? 'Önerilen Tarihler:' : 'Önerilen Dönüm Noktası Yıllar:'}
        </span>

        {mode === 'day' ? (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {popularDates.map((item) => (
              <Link
                key={item.slug}
                href={`/tarihte-bugun/${item.slug}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              >
                <span>📅</span>
                <span>{item.label}</span>
                <span className="text-[10px] text-muted-foreground">({item.count})</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {popularYears.map((item) => (
              <Link
                key={item.year}
                href={`/tarihte-bugun/yil/${item.year}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-card px-3 py-1.5 font-mono text-xs font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              >
                <span>🏛️</span>
                <span>{item.year}</span>
                <span className="text-[10px] text-muted-foreground">({item.count} olay)</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
