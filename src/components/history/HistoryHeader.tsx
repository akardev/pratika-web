'use client';

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
  currentDaySlug = '25-agustos',
  currentYear = 1960,
}: HistoryHeaderProps) {
  return (
    <header className="space-y-6">
      <nav aria-label="Sayfa yolu" className="text-xs text-muted-foreground">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-foreground hover:underline">
              Ana Sayfa
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/bilgi" className="hover:text-foreground hover:underline">
              Bilgi Merkezi
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-foreground" aria-current="page">
            Tarih Keşif Merkezi
          </li>
        </ol>
      </nav>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Tarih Keşif Merkezi
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        </div>

        {/* Mode Switcher Segmented Control */}
        <div className="inline-flex shrink-0 rounded-xl border border-border/80 bg-card p-1 shadow-2xs">
          <Link
            href={`/tarihte-bugun/${currentDaySlug}`}
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all sm:text-sm ${
              mode === 'day'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
            }`}
            aria-current={mode === 'day' ? 'page' : undefined}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            GÜNÜ KEŞFET
          </Link>
          <Link
            href={`/tarihte-bugun/yil/${currentYear}`}
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all sm:text-sm ${
              mode === 'year'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
            }`}
            aria-current={mode === 'year' ? 'page' : undefined}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            BİR YILI KEŞFET
          </Link>
        </div>
      </div>
    </header>
  );
}
