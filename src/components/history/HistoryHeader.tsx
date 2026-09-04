'use client';

import React from 'react';
import Link from 'next/link';

interface HistoryHeaderProps {
  mode: 'day' | 'year';
  title: string;
  subtitle: string;
  currentDaySlug?: string;
  currentYear?: number;
  highlightLabel?: string;
}

export default function HistoryHeader({
  mode,
  title,
  subtitle,
  currentDaySlug = '1-ocak',
  currentYear = 1923,
  highlightLabel,
}: HistoryHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-blue-950/40 bg-gradient-to-br from-[#061224] via-[#0a1d37] to-[#122b52] text-white shadow-xl">
      {/* Decorative background grid and ambient lighting */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(#93c5fd 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" 
        aria-hidden="true" 
      />

      <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-12 lg:px-12">
        {/* Top bar: Breadcrumb & Mode Switcher */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Sayfa yolu" className="text-xs font-medium text-slate-300/80">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-white hover:underline">
                  Ana Sayfa
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-500">/</li>
              <li>
                <Link href="/bilgi" className="transition-colors hover:text-white hover:underline">
                  Bilgi Merkezi
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-500">/</li>
              <li className="font-semibold text-blue-200" aria-current="page">
                Tarihte Bugün
              </li>
            </ol>
          </nav>

          {/* Mode Switcher Segmented Control */}
          <div className="inline-flex self-start rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-md sm:self-auto">
            <Link
              href={`/tarihte-bugun/${currentDaySlug}`}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                mode === 'day'
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
              aria-current={mode === 'day' ? 'page' : undefined}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                mode === 'year'
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
              aria-current={mode === 'year' ? 'page' : undefined}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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

        {/* Center Hero Content */}
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-blue-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              PRATİKA TARİH & KRONOLOJİ ARŞİVİ
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              {subtitle}
            </p>
          </div>

          {/* Prominent Visual Date Badge */}
          {highlightLabel && (
            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md sm:p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white shadow-inner sm:h-14 sm:w-14">
                {mode === 'day' ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
                  {mode === 'day' ? 'SEÇİLİ GÜN' : 'SEÇİLİ YIL'}
                </span>
                <div className="text-xl font-black text-white sm:text-2xl">
                  {highlightLabel}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
