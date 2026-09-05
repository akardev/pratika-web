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
  // Kartın min-h-[350px] sınırını aşmayacak kullanılabilir net dikey alan bütçesi (piksel)
  const MAX_EVENTS_HEIGHT_PX = 205;
  let accumulatedHeight = 0;

  for (const event of events) {
    const narrative = getHistoryEventNarrative(event);
    // 44 karakter ve altı tek satır (~22px), üstü 2 satır (~38px) render alanı kaplar
    const isMultiLine = narrative.length > 44;
    const itemHeight = isMultiLine ? 38 : 22;
    const itemGap = selected.length > 0 ? 8 : 0;
    const requiredHeight = itemHeight + itemGap;

    // Minimum 2 olay gösterildikten sonra bütçe aşılıyorsa kartın büyümesini önlemek için durdur
    if (selected.length >= 2 && accumulatedHeight + requiredHeight > MAX_EVENTS_HEIGHT_PX) {
      break;
    }

    selected.push(event);
    accumulatedHeight += requiredHeight;
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

      {/* Top Meta Bar + Events */}
      <div className="flex flex-1 flex-col overflow-hidden min-h-0">
        <div className="flex items-center justify-between gap-2 shrink-0">
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

          <span className="text-[11px] font-medium text-muted-foreground shrink-0">
            {todayInHistory.events.length} Olay
          </span>
        </div>

        {/* History Events List */}
        <div className="mt-3.5 space-y-2 flex-1 min-h-0 overflow-hidden">
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
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/50 pt-3 shrink-0">
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
