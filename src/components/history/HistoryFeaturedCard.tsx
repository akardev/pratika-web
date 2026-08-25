'use client';

import { HistoryEvent, CATEGORY_LABELS, formatHistoryDayLabel } from '@/data/todayInHistory';

interface HistoryFeaturedCardProps {
  event: HistoryEvent;
  mode: 'day' | 'year';
}

export default function HistoryFeaturedCard({ event, mode }: HistoryFeaturedCardProps) {
  const categoryName = CATEGORY_LABELS[event.category] || 'ÖNE ÇIKAN OLAY';
  const badgeLabel = mode === 'day' ? `${event.year}` : formatHistoryDayLabel(event.month, event.day);

  return (
    <section aria-labelledby="featured-event-title" className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-primary px-3 py-1 font-mono text-sm font-bold text-primary-foreground shadow-xs">
            {badgeLabel}
          </span>
          <span className="rounded-md border border-border/80 bg-background/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {categoryName}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Öne Çıkan Tarih Notu
        </span>
      </div>

      <div className="mt-4 max-w-3xl">
        <h2
          id="featured-event-title"
          className="text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl lg:text-3xl"
        >
          {event.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {event.description}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4 text-xs">
        <a
          href={event.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-primary transition-colors hover:underline"
        >
          <span>Doğrulanmış Kaynak:</span>
          <span className="font-semibold">{event.sourceLabel}</span>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>

        {mode === 'year' && (
          <span className="text-muted-foreground">
            {formatHistoryDayLabel(event.month, event.day)} {event.year}
          </span>
        )}
      </div>
    </section>
  );
}
