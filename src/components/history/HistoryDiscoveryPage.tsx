'use client';

import React, { useState, useMemo } from 'react';
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
  'turkey',
  'world',
  'science',
  'culture',
  'sports',
  'birth',
  'death',
  'event',
];
// Initial items shown per category before user clicks "Daha Fazla Göster"
const INITIAL_CATEGORY_LIMIT = 8;

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
  const effectiveYear = propYear ?? (mode === 'year' ? 1923 : today.getFullYear());

  const dayLabel = formatHistoryDayLabel(effectiveMonth, effectiveDay);
  const daySlug = formatDaySlug(effectiveMonth, effectiveDay);

  // Filter and search state
  const [selectedCategory, setSelectedCategory] = useState<HistoryCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  // Track expanded state for categories with many items
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Fetch all events for day or year
  const allEvents = useMemo(() => {
    return mode === 'day'
      ? getEventsByDay(effectiveMonth, effectiveDay)
      : getEventsByYear(effectiveYear);
  }, [mode, effectiveMonth, effectiveDay, effectiveYear]);

  // Featured event calculation
  const featuredEvent = useMemo(() => getFeaturedEvent(allEvents), [allEvents]);

  // Non-featured events list
  const nonFeaturedEvents = useMemo(() => {
    return featuredEvent
      ? allEvents.filter((e) => e.id !== featuredEvent.id)
      : allEvents;
  }, [allEvents, featuredEvent]);

  // Filter events based on active category and optional search query
  const filteredEvents = useMemo(() => {
    let list = nonFeaturedEvents;

    if (selectedCategory !== 'all') {
      list = list.filter((e) => e.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.year.toString().includes(q) ||
          e.sourceLabel.toLowerCase().includes(q)
      );
    }

    return list;
  }, [nonFeaturedEvents, selectedCategory, searchQuery]);

  // Dynamic statistics per category computed from all events
  const stats = useMemo(() => {
    const counts: Record<string, number> = {
      all: allEvents.length,
      turkey: 0,
      world: 0,
      science: 0,
      culture: 0,
      sports: 0,
      birth: 0,
      death: 0,
      event: 0,
    };

    allEvents.forEach((evt) => {
      if (counts[evt.category] !== undefined) {
        counts[evt.category] += 1;
      }
    });

    return counts;
  }, [allEvents]);

  // Group filtered events by category
  const categorizedSections = useMemo(() => {
    return CATEGORY_ORDER.map((category) => {
      const catEvents = filteredEvents.filter((e) => e.category === category);
      return {
        category,
        label: CATEGORY_LABELS[category],
        events: catEvents,
        totalInDate: stats[category] || 0,
      };
    }).filter((section) => section.events.length > 0);
  }, [filteredEvents, stats]);

  const hasContent = allEvents.length > 0;

  // Toggle category expansion
  const toggleExpand = (cat: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  // Titles and descriptions
  const pageTitle =
    mode === 'day' ? `Tarihte Bugün (${dayLabel})` : `${effectiveYear} Yılında Neler Oldu?`;

  const pageSubtitle =
    mode === 'day'
      ? `${dayLabel} gününde tarihte yaşanan önemli siyasi, bilimsel, kültürel olaylar, dönüm noktaları ve biyografiler.`
      : `${effectiveYear} yılında dünya, Türkiye, bilim, sanat ve sporda gerçekleşen tarihi dönüm noktaları.`;

  const pageUrl =
    mode === 'day'
      ? `${siteConfig.url}/tarihte-bugun/${daySlug}`
      : `${siteConfig.url}/tarihte-bugun/yil/${effectiveYear}`;

  // Schema.org Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${pageTitle} | Pratika Tarih Arşivi`,
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
        { '@type': 'ListItem', position: 2, name: 'Tarihte Bugün', item: `${siteConfig.url}/tarihte-bugun` },
        ...(mode === 'year'
          ? [{ '@type': 'ListItem', position: 3, name: `${effectiveYear} Yılı`, item: pageUrl }]
          : [{ '@type': 'ListItem', position: 3, name: dayLabel, item: pageUrl }]),
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allEvents.slice(0, 30).map((evt, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: evt.title,
        description: evt.description,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-background pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container mx-auto max-w-5xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        {/* 1. HERO / ÜST ALAN */}
        <HistoryHeader
          mode={mode}
          title={pageTitle}
          subtitle={pageSubtitle}
          currentDaySlug={daySlug}
          currentYear={effectiveYear}
        />

        {/* 2. DATE / YEAR NAVIGATOR */}
        <div className="mt-5">
          {mode === 'day' ? (
            <HistoryDayNavigator month={effectiveMonth} day={effectiveDay} />
          ) : (
            <HistoryYearNavigator year={effectiveYear} />
          )}
        </div>

        {/* 3. MODERN FİLTRE & ARAMA ALANI */}
        {hasContent && (
          <div className="mt-6 rounded-2xl border border-border/80 bg-card p-3.5 shadow-2xs sm:p-4">
            <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
              {/* Category Filter Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                {/* All Category Chip */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <span>Tümü</span>
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium leading-none ${
                      selectedCategory === 'all'
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-background/80 text-foreground/70'
                    }`}
                  >
                    {stats.all}
                  </span>
                </button>

                {/* Individual Categories */}
                {CATEGORY_ORDER.map((cat) => {
                  const count = stats[cat] || 0;
                  if (count === 0) return null;
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(isSelected ? 'all' : cat)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                          : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <span>{CATEGORY_LABELS[cat]}</span>
                      <span
                        className={`rounded-md px-1.5 py-0.5 text-[10px] leading-none ${
                          isSelected
                            ? 'bg-primary-foreground/20 text-primary-foreground'
                            : 'bg-background/80 text-foreground/70'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* In-page Instant Search */}
              <div className="w-full shrink-0 lg:w-64">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Bu günde ara..."
                    className="h-9 w-full rounded-xl border border-border/80 bg-background pl-8 pr-7 text-xs text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                    aria-label="Bu günde ara"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-muted-foreground hover:text-foreground"
                      aria-label="Aramayı temizle"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. ÖNE ÇIKAN OLAY (FEATURED SPOTLIGHT CARD) */}
        {featuredEvent && !searchQuery && selectedCategory === 'all' && (
          <div className="mt-6">
            <HistoryFeaturedCard event={featuredEvent} mode={mode} />
          </div>
        )}

        {/* 5. KATEGORİLERE GÖRE EVENT KARTLARI */}
        <div className="mt-8 space-y-10">
          {categorizedSections.map(({ category, label, events }) => {
            const isExpanded = Boolean(expandedCategories[category]);
            const shouldLimit = events.length > INITIAL_CATEGORY_LIMIT && !isExpanded;
            const displayedEvents = shouldLimit
              ? events.slice(0, INITIAL_CATEGORY_LIMIT)
              : events;

            return (
              <section key={category} aria-labelledby={`category-${category}`}>
                {/* Category Section Header */}
                <div className="mb-4 flex items-center justify-between border-b border-border/70 pb-2.5">
                  <div className="flex items-center gap-2">
                    <h2
                      id={`category-${category}`}
                      className="text-base font-bold tracking-tight text-foreground sm:text-lg"
                    >
                      {label}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {events.length} olay
                    </span>
                  </div>
                </div>

                {/* Event Cards Grid */}
                <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
                  {displayedEvents.map((event) => (
                    <HistoryEventCard key={event.id} event={event} mode={mode} />
                  ))}
                </div>

                {/* Progressive Loading: "Daha Fazla Göster" Button */}
                {events.length > INITIAL_CATEGORY_LIMIT && (
                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      onClick={() => toggleExpand(category)}
                      className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-2xs transition-colors hover:bg-muted hover:border-border"
                    >
                      {isExpanded ? (
                        <>
                          <span>Daha Az Göster</span>
                          <svg className="h-3.5 w-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span>+{events.length - INITIAL_CATEGORY_LIMIT} Olay Daha Göster</span>
                          <svg className="h-3.5 w-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </section>
            );
          })}

          {/* Search Result Empty State */}
          {hasContent && categorizedSections.length === 0 && searchQuery && (
            <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center sm:p-12">
              <p className="text-sm font-semibold text-foreground">
                &ldquo;{searchQuery}&rdquo; aramasına uygun bir olay bulunamadı.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs font-semibold text-primary hover:underline"
              >
                Aramayı temizle
              </button>
            </div>
          )}

          {/* Empty State when no events exist for this date */}
          {!hasContent && (
            <HistoryEmptyState
              mode={mode}
              queryLabel={mode === 'day' ? dayLabel : `${effectiveYear} Yılı`}
            />
          )}
        </div>

        {/* 6. BOTTOM ARCHIVE FOOTER */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-6 text-sm text-muted-foreground">
          <Link
            href="/bilgi"
            className="inline-flex items-center gap-1.5 font-semibold text-primary transition-colors hover:underline"
          >
            ← Bilgi Merkezi Rehberlerine Dön
          </Link>
          <div className="text-xs text-muted-foreground">
            Pratika Tarih Keşif Merkezi — Güvenilir Resmî Tarih Arşivi
          </div>
        </div>
      </div>
    </main>
  );
}
