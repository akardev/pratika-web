'use client';

import React, { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { getTodayInHistory, getHistoryEventNarrative, MONTH_NAMES_TR } from '@/data/todayInHistory';

interface TodayInHistoryCardProps {
  className?: string;
  showExploreLink?: boolean;
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function getCardTopEvents(events: ReturnType<typeof getTodayInHistory>['events']) {
  if (!events || events.length === 0) return [];

  const selected: typeof events = [];
  let totalLineScore = 0;
  const maxLineScore = 6; // Kartın sabit yüksekliğini koruyacak satır sınırı

  for (const event of events) {
    const narrative = getHistoryEventNarrative(event);
    const lineScore = narrative.length > 55 ? 2 : 1;

    // Satır kapasitesi aşıldığında kartın büyümesini önlemek için durdur
    if (selected.length >= 2 && totalLineScore + lineScore > maxLineScore) {
      break;
    }
    if (selected.length >= 5) {
      break;
    }

    selected.push(event);
    totalLineScore += lineScore;
  }

  return selected.length > 0 ? selected : events.slice(0, 2);
}

export default function TodayInHistoryCard({
  className = '',
  showExploreLink = true,
}: TodayInHistoryCardProps) {
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <div className={`h-full min-h-[300px] rounded-2xl border border-border/80 bg-card p-5 sm:p-6 animate-pulse ${className}`} />
    );
  }

  const now = new Date();
  const todayInHistory = getTodayInHistory(now);
  const dayNumber = now.getDate();
  const monthName = MONTH_NAMES_TR[now.getMonth()];
  const topEvents = getCardTopEvents(todayInHistory.events);

  return (
    <div
      className={`group relative flex h-full min-h-[350px] flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs transition-all hover:border-border hover:shadow-md ${className}`}
    >
      {/* Decorative ambient gradient */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/15" />

      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
              <svg aria-hidden="true" className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Tarihte Bugün
            </span>
            <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              {dayNumber} {monthName}
            </span>
          </div>

          <span className="text-[11px] font-medium text-muted-foreground">
            {todayInHistory.events.length} Olay
          </span>
        </div>

        {/* History Events List */}
        <div className="mt-3.5 space-y-2.5">
          {topEvents.map((event) => {
            const narrative = getHistoryEventNarrative(event);
            const yearBadge = event.year < 0 ? `MÖ ${Math.abs(event.year)}` : `${event.year}`;

            return (
              <div key={event.id || `${event.year}-${narrative.slice(0, 20)}`} className="flex items-start gap-2.5">
                <span className="shrink-0 rounded-md bg-muted/80 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-primary">
                  {yearBadge}
                </span>
                <p className="line-clamp-2 text-xs font-normal leading-snug text-foreground sm:text-[13px]">
                  {narrative}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/50 pt-3">
        <span className="text-[11px] text-muted-foreground">
          Kapsamlı Tarih Arşivi
        </span>

        {showExploreLink && (
          <Link
            href="/tarihte-bugun"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:underline"
          >
            <span>Tüm Olaylar</span>
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
