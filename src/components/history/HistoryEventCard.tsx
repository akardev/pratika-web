'use client';

import { HistoryEvent, formatHistoryDayLabel } from '@/data/todayInHistory';

interface HistoryEventCardProps {
  event: HistoryEvent;
  mode: 'day' | 'year';
}

const getCategoryDisplay = (cat: string) => {
  switch (cat) {
    case 'turkey': return '🇹🇷 Türkiye Tarihi';
    case 'world': return '🌍 Dünya Tarihi';
    case 'science': return '🔬 Bilim & Teknoloji';
    case 'culture': return '🎨 Kültür & Sanat';
    case 'sports': return '⚽ Spor';
    case 'birth': return '👤 Doğum';
    case 'death': return '🕊️ Vefat';
    default: return '📌 Tarihi Olay';
  }
};

export default function HistoryEventCard({ event, mode }: HistoryEventCardProps) {
  const categoryDisplay = getCategoryDisplay(event.category);
  const badge = mode === 'day' ? `${event.year}` : formatHistoryDayLabel(event.month, event.day);
  const isFeatured = event.importance === 'featured';

  return (
    <article className={`group flex flex-col justify-between rounded-xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6 ${isFeatured ? 'border-[#d97750]/30' : 'border-border/60'}`}>
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className={`inline-flex items-center rounded-lg px-3 py-1 font-mono text-lg font-bold tracking-tight ${isFeatured ? 'bg-[#d97750]/10 text-[#d97750]' : 'bg-[#0a1d37]/5 text-[#0a1d37]'}`}>
            {badge}
          </span>
          <span className="inline-flex items-center rounded-full bg-muted/50 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
            {categoryDisplay}
          </span>
        </div>

        <h3 className="text-base font-bold leading-snug text-[#0a1d37] sm:text-lg">
          {event.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>
      </div>

      <div className="mt-5 border-t border-border/40 pt-4">
        <a
          href={event.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-w-full items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-[#d97750]"
          title={`${event.sourceLabel} kaynağını yeni sekmede aç`}
        >
          <svg className="h-3.5 w-3.5 shrink-0 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="truncate">{event.sourceLabel}</span>
        </a>
      </div>
    </article>
  );
}

