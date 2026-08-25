'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAdjacentYears, getAllAvailableYears } from '@/data/todayInHistory';

interface HistoryYearNavigatorProps {
  year: number;
}

export default function HistoryYearNavigator({ year }: HistoryYearNavigatorProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchYear, setSearchYear] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  const { prev, next } = getAdjacentYears(year);
  const availableYears = getAllAvailableYears();

  // Close modal on Escape or clicking outside
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectYear = (targetYear: number) => {
    setIsOpen(false);
    router.push(`/tarihte-bugun/yil/${targetYear}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(searchYear.trim(), 10);
    if (!isNaN(val) && val >= 1000 && val <= 2100) {
      handleSelectYear(val);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative rounded-2xl border border-border/80 bg-card p-3 shadow-2xs sm:p-4">
        <div className="flex items-center justify-between gap-2">
          {/* Previous Year */}
          <Link
            href={`/tarihte-bugun/yil/${prev}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-muted/30 px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary sm:px-4 sm:py-2.5 sm:text-sm"
            title={`Önceki Yıl: ${prev}`}
            aria-label={`Önceki Yıl: ${prev}`}
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-mono">{prev}</span>
          </Link>

          {/* Center Active Year Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            className="inline-flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 font-mono text-base font-bold text-primary transition-all hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:px-6 sm:py-2.5 sm:text-lg"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span>{year}</span>
            <svg
              className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Next Year */}
          <Link
            href={`/tarihte-bugun/yil/${next}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-muted/30 px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary sm:px-4 sm:py-2.5 sm:text-sm"
            title={`Sonraki Yıl: ${next}`}
            aria-label={`Sonraki Yıl: ${next}`}
          >
            <span className="font-mono">{next}</span>
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Year Picker Modal / Popover */}
        {isOpen && (
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Yıl seçici"
            className="absolute left-1/2 top-full z-50 mt-3 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-border bg-card p-4 shadow-xl sm:p-5"
          >
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="text-sm font-bold text-foreground">Bir Yılı Keşfet</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Kapat"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Direct Year Input */}
            <form onSubmit={handleSearchSubmit} className="mt-3 flex gap-2">
              <input
                type="number"
                min="1000"
                max="2100"
                placeholder="Yıl yazın (örn: 1960)"
                value={searchYear}
                onChange={(e) => setSearchYear(e.target.value)}
                className="h-10 flex-1 rounded-lg border border-border bg-background px-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                aria-label="Yıl girişi"
              />
              <button
                type="submit"
                className="h-10 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Git
              </button>
            </form>

            {/* Quick Available Years */}
            <div className="mt-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Arşivdeki Dönüm Noktası Yıllar:
              </span>
              <div className="mt-2 grid grid-cols-4 gap-1.5 sm:grid-cols-5">
                {availableYears.map((item) => {
                  const isCurrent = item.year === year;
                  return (
                    <button
                      key={item.year}
                      type="button"
                      onClick={() => handleSelectYear(item.year)}
                      className={`flex flex-col items-center justify-center rounded-lg p-1.5 font-mono text-xs font-semibold transition-all ${
                        isCurrent
                          ? 'bg-primary text-primary-foreground font-bold shadow-2xs'
                          : 'border border-border/60 bg-muted/20 text-foreground hover:border-primary/40 hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      <span>{item.year}</span>
                      <span className="text-[9px] opacity-75">{item.count} olay</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Popular landmark year pills bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Öne Çıkan Yıllar:
        </span>
        {availableYears.map((item) => (
          <Link
            key={item.year}
            href={`/tarihte-bugun/yil/${item.year}`}
            className={`shrink-0 rounded-md border px-2 py-0.5 font-mono text-xs transition-colors ${
              item.year === year
                ? 'border-primary bg-primary/10 font-bold text-primary'
                : 'border-border/60 bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground'
            }`}
          >
            {item.year}
          </Link>
        ))}
      </div>
    </div>
  );
}
