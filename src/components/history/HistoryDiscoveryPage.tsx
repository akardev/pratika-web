'use client';

import React from 'react';
import Link from 'next/link';
import {
  HistoryCategory,
  CATEGORY_LABELS,
  formatHistoryDayLabel,
  formatDaySlug,
  getEventsByDay,
  getEventsByYear,
  getFeaturedEvent,
} from '@/data/todayInHistory';
import { siteConfig } from '@/lib/site';
import HistoryHeader from './HistoryHeader';
import HistoryDayNavigator from './HistoryDayNavigator';
import HistoryYearNavigator from './HistoryYearNavigator';
import HistoryFeaturedCard from './HistoryFeaturedCard';
import HistoryEventCard from './HistoryEventCard';
import HistoryEmptyState from './HistoryEmptyState';

export interface HistoryDiscoveryPageProps {
  mode: 'day' | 'year';
  month?: number;
  day?: number;
  year?: number;
  selectedDate?: Date; // backwards compatibility
  selectedDateValue?: string; // backwards compatibility
}

const CATEGORY_ORDER: HistoryCategory[] = [
  'event',
  'turkey',
  'world',
  'science',
  'culture',
  'sports',
  'birth',
  'death',
];

export default function HistoryDiscoveryPage({
  mode = 'day',
  month: propMonth,
  day: propDay,
  year: propYear,
  selectedDate,
}: HistoryDiscoveryPageProps) {
  // Resolve month and day (fallback to selectedDate or today)
  const today = new Date();
  const effectiveMonth = propMonth ?? (selectedDate ? selectedDate.getMonth() + 1 : today.getMonth() + 1);
  const effectiveDay = propDay ?? (selectedDate ? selectedDate.getDate() : today.getDate());
  const effectiveYear = propYear ?? (mode === 'year' ? 1960 : today.getFullYear());

  const dayLabel = formatHistoryDayLabel(effectiveMonth, effectiveDay);
  const daySlug = formatDaySlug(effectiveMonth, effectiveDay);

  // Fetch events based on mode
  const allEvents =
    mode === 'day'
      ? getEventsByDay(effectiveMonth, effectiveDay)
      : getEventsByYear(effectiveYear);

  const featuredEvent = getFeaturedEvent(allEvents);
  const nonFeaturedEvents = featuredEvent
    ? allEvents.filter((e) => e.id !== featuredEvent.id)
    : allEvents;

  // Group non-featured events by category
  const categorizedSections = CATEGORY_ORDER.map((category) => {
    return {
      category,
      label: CATEGORY_LABELS[category],
      events: nonFeaturedEvents.filter((e) => e.category === category),
    };
  }).filter((section) => section.events.length > 0);

  const hasContent = allEvents.length > 0;

  // Dynamic titles and subtitles
  const pageTitle =
    mode === 'day' ? `Tarihte ${dayLabel}` : `${effectiveYear} Yılında Neler Oldu?`;

  const pageSubtitle =
    mode === 'day'
      ? `${dayLabel} gününde tarihte yaşanan önemli siyasi, bilimsel, kültürel olaylar ve doğum/vefat notları.`
      : `${effectiveYear} yılında dünya, Türkiye, bilim, sanat ve sporda gerçekleşen tarihi dönüm noktaları.`;

  const pageUrl =
    mode === 'day'
      ? `${siteConfig.url}/tarihte-bugun/${daySlug}`
      : `${siteConfig.url}/tarihte-bugun/yil/${effectiveYear}`;

  // Schema.org Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${pageTitle} | Tarih Keşif Merkezi | Pratika`,
    description: pageSubtitle,
    url: pageUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Pratika',
      url: siteConfig.url,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Bilgi Merkezi', item: `${siteConfig.url}/bilgi` },
        { '@type': 'ListItem', position: 3, name: 'Tarihte Bugün', item: `${siteConfig.url}/tarihte-bugun` },
        ...(mode === 'year'
          ? [{ '@type': 'ListItem', position: 4, name: `${effectiveYear} Yılı`, item: pageUrl }]
          : [{ '@type': 'ListItem', position: 4, name: dayLabel, item: pageUrl }]),
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allEvents.map((evt, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: evt.title,
        description: evt.description,
      })),
    },
  };

  return (
    <main className="min-h-screen border-b border-border/60 bg-muted/10 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Header with Mode Switcher */}
        <HistoryHeader
          mode={mode}
          title={pageTitle}
          subtitle={pageSubtitle}
          currentDaySlug={daySlug}
          currentYear={effectiveYear}
        />

        {/* Navigator Section */}
        <div className="mt-8">
          {mode === 'day' ? (
            <HistoryDayNavigator month={effectiveMonth} day={effectiveDay} />
          ) : (
            <HistoryYearNavigator year={effectiveYear} />
          )}
        </div>

        {/* Content Section */}
        <div className="mt-10 space-y-10">
          {/* Featured Hero Card */}
          {featuredEvent && (
            <HistoryFeaturedCard event={featuredEvent} mode={mode} />
          )}

          {/* Categorized Event Sections */}
          {categorizedSections.map(({ category, label, events }) => (
            <section key={category} aria-labelledby={`category-${category}`}>
              <div className="mb-4 flex items-end justify-between gap-3 border-b border-border/60 pb-2">
                <h2
                  id={`category-${category}`}
                  className="text-xs font-bold tracking-[0.14em] text-foreground sm:text-sm"
                >
                  {label}
                </h2>
                <span className="text-xs text-muted-foreground">
                  {events.length} kayıt
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {events.map((event) => (
                  <HistoryEventCard key={event.id} event={event} mode={mode} />
                ))}
              </div>
            </section>
          ))}

          {/* Empty State */}
          {!hasContent && (
            <HistoryEmptyState
              mode={mode}
              queryLabel={mode === 'day' ? dayLabel : `${effectiveYear} Yılı`}
            />
          )}
        </div>

        {/* Bilgi Merkezi Connection Footer */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground">
          <Link
            href="/bilgi"
            className="inline-flex items-center gap-1 font-semibold text-primary transition-colors hover:underline"
          >
            ← Bilgi Merkezi Rehberlerine Dön
          </Link>
          <div className="text-xs">
            Pratika Tarih Keşif Merkezi — Güvenilir Resmî Tarih Arşivi
          </div>
        </div>
      </div>
    </main>
  );
}
