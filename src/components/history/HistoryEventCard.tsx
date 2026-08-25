'use client';

import { HistoryEvent, CATEGORY_LABELS, formatHistoryDayLabel } from '@/data/todayInHistory';

interface HistoryEventCardProps {
  event: HistoryEvent;
  mode: 'day' | 'year';
}

export default function HistoryEventCard({ event, mode }: HistoryEventCardProps) {
  const categoryLabel = CATEGORY_LABELS[event.category] || 'OLAY';
  const badge = mode === 'day' ? `${event.year}` : formatHistoryDayLabel(event.month, event.day);

  return (
    <article className="group flex flex-col justify-between rounded-xl border border-border/80 bg-card p-5 shadow-2xs transition-all hover:border-primary/40 hover:shadow-xs sm:p-6">
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="rounded-md bg-primary/10 px-2.5 py-1 font-mono text-xs font-bold text-primary">
            {badge}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {categoryLabel}
          </span>
        </div>

        <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
          {event.title}
        </h3>

        <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {event.description}
        </p>
      </div>

      <div className="mt-4 border-t border-border/50 pt-3">
        <a
          href={event.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-w-full items-center gap-1 text-xs font-medium text-primary transition-colors hover:underline"
          title={`${event.sourceLabel} kaynağını yeni sekmede aç`}
        >
          <span>Kaynak:</span>
          <span className="truncate">{event.sourceLabel}</span>
          <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </article>
  );
}
