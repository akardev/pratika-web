'use client';

import React from 'react';
import Link from 'next/link';

interface HistoryHeaderProps {
  mode: 'day' | 'year';
  title: string;
  subtitle: string;
  currentDaySlug?: string;
  currentYear?: number;
}

export default function HistoryHeader({
  mode,
  title,
  subtitle,
  currentDaySlug = '1-ocak',
  currentYear = 1923,
}: HistoryHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 sm:p-8 md:p-10 shadow-xs">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Top bar: Breadcrumb & Mode Switcher */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Sayfa yolu" className="text-xs font-medium text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground hover:underline">
                  Ana Sayfa
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted-foreground/40">/</li>
              <li>
                <Link href="/bilgi" className="transition-colors hover:text-foreground hover:underline">
                  Bilgi Merkezi
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted-foreground/40">/</li>
              <li className="font-semibold text-foreground" aria-current="page">
                Tarihte Bugün
              </li>
            </ol>
          </nav>

          {/* Mode Switcher Segmented Control */}
          <div className="inline-flex self-start rounded-xl border border-border/70 bg-muted/60 p-1 sm:self-auto">
            <Link
              href={`/tarihte-bugun/${currentDaySlug}`}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                mode === 'day'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-current={mode === 'day' ? 'page' : undefined}
            >
              <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Günü Keşfet
            </Link>
            <Link
              href={`/tarihte-bugun/yil/${currentYear}`}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                mode === 'year'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-current={mode === 'year' ? 'page' : undefined}
            >
              <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Yılı Keşfet
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-semibold text-primary">
            <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tarih & Kronoloji Arşivi
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {title}
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        </div>
      </div>
    </header>
  );
}
