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

const CATEGORY_ICONS: Record<HistoryCategory, string> = {
  turkey: '🇹🇷',
  world: '🌍',
  science: '🔬',
  culture: '🎨',
  sports: '⚽',
  birth: '👶',
  death: '🕊️',
  event: '📌',
};

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
        icon: CATEGORY_ICONS[category],
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
        { '@type': 'ListItem', position: 2, name: 'Bilgi Merkezi', item: `${siteConfig.url}/bilgi` },
        { '@type': 'ListItem', position: 3, name: 'Tarihte Bugün', item: `${siteConfig.url}/tarihte-bugun` },
        ...(mode === 'year'
          ? [{ '@type': 'ListItem', position: 4, name: `${effectiveYear} Yılı`, item: pageUrl }]
          : [{ '@type': 'ListItem', position: 4, name: dayLabel, item: pageUrl }]),
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
    <main className="min-h-screen bg-slate-50/50 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container mx-auto max-w-5xl px-4 pt-6 sm:px-6 sm:pt-10 lg:px-8">
        {/* 1. HERO / ÜST ALAN */}
        <HistoryHeader
          mode={mode}
          title={pageTitle}
          subtitle={pageSubtitle}
          currentDaySlug={daySlug}
          currentYear={effectiveYear}
          highlightLabel={mode === 'day' ? dayLabel : `${effectiveYear}`}
        />

        {/* 2. DATE / YEAR NAVIGATOR */}
        <div className="mt-6">
          {mode === 'day' ? (
            <HistoryDayNavigator month={effectiveMonth} day={effectiveDay} />
          ) : (
            <HistoryYearNavigator year={effectiveYear} />
          )}
        </div>

        {/* 3. GÜN ÖZETİ (DYNAMIC SUMMARY STATS) & KATEGORİ FİLTRELERİ */}
        {hasContent && (
          <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Günün Kayıt Dağılımı ({stats.all} Kayıt):
                </span>
                {/* Stats Pills Bar / Category Filter */}
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {/* All Category Pill */}
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>Tümü</span>
                    <span className={`rounded-md px-1.5 py-0.2 text-[10px] ${selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'}`}>
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
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white font-bold shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200'
                        }`}
                      >
                        <span>{CATEGORY_ICONS[cat]}</span>
                        <span>{CATEGORY_LABELS[cat]}</span>
                        <span className={`rounded-md px-1.5 py-0.2 text-[10px] ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* In-page Instant Search */}
              <div className="w-full lg:w-72">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Bu günde ara..."
                    className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-8 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                    aria-label="Bu günde ara"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-slate-600"
                      aria-label="Aramayı temizle"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="mt-8">
            <HistoryFeaturedCard event={featuredEvent} mode={mode} />
          </div>
        )}

        {/* 5. KATEGORİLERE GÖRE EVENT KARTLARI */}
        <div className="mt-10 space-y-12">
          {categorizedSections.map(({ category, label, icon, events }) => {
            const isExpanded = Boolean(expandedCategories[category]);
            const shouldLimit = events.length > INITIAL_CATEGORY_LIMIT && !isExpanded;
            const displayedEvents = shouldLimit
              ? events.slice(0, INITIAL_CATEGORY_LIMIT)
              : events;

            return (
              <section key={category} aria-labelledby={`category-${category}`}>
                {/* Category Section Header */}
                <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl" aria-hidden="true">{icon}</span>
                    <h2
                      id={`category-${category}`}
                      className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg"
                    >
                      {label}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                      {events.length} kayıt
                    </span>
                  </div>
                </div>

                {/* Event Cards Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {displayedEvents.map((event) => (
                    <HistoryEventCard key={event.id} event={event} mode={mode} />
                  ))}
                </div>

                {/* Progressive Loading: "Daha Fazla Göster" Button */}
                {events.length > INITIAL_CATEGORY_LIMIT && (
                  <div className="mt-5 text-center">
                    <button
                      type="button"
                      onClick={() => toggleExpand(category)}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-blue-700 shadow-2xs transition-all hover:border-blue-300 hover:bg-blue-50 hover:shadow-xs"
                    >
                      {isExpanded ? (
                        <>
                          <span>Daha Az Göster</span>
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span>+{events.length - INITIAL_CATEGORY_LIMIT} Olayı Daha Göster</span>
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center sm:p-12">
              <p className="text-sm font-semibold text-slate-700">
                &ldquo;{searchQuery}&rdquo; aramasına uygun bir olay bulunamadı.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs font-bold text-blue-600 hover:underline"
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
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/80 pt-6 text-sm text-slate-500">
          <Link
            href="/bilgi"
            className="inline-flex items-center gap-1.5 font-bold text-blue-700 transition-colors hover:text-blue-900 hover:underline"
          >
            ← Bilgi Merkezi Rehberlerine Dön
          </Link>
          <div className="text-xs text-slate-400">
            Pratika Tarih Keşif Merkezi — Güvenilir Resmî Tarih Arşivi
          </div>
        </div>
      </div>
    </main>
  );
}
