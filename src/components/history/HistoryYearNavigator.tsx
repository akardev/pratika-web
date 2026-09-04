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
    <div className="space-y-2.5">
      <div className="relative rounded-2xl border border-border/80 bg-card p-2 sm:p-2.5 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          {/* Previous Year */}
          <Link
            href={`/tarihte-bugun/yil/${prev}`}
            className="group inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-muted/40 px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-muted sm:px-4 sm:py-2 sm:text-sm"
            title={`Önceki Yıl: ${prev}`}
            aria-label={`Önceki Yıl: ${prev}`}
          >
            <svg className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-x-0.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
            className="inline-flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-4 py-1.5 font-mono text-sm font-bold text-primary shadow-2xs transition-all hover:bg-primary/15 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:px-5 sm:py-2 sm:text-base"
          >
            <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span>{year}</span>
            <svg
              className={`h-3.5 w-3.5 text-primary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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
            className="group inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-muted/40 px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-muted sm:px-4 sm:py-2 sm:text-sm"
            title={`Sonraki Yıl: ${next}`}
            aria-label={`Sonraki Yıl: ${next}`}
          >
            <span className="font-mono">{next}</span>
            <svg className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
            className="absolute left-1/2 top-full z-50 mt-2 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-border bg-card p-4 shadow-xl animate-in fade-in zoom-in-95 duration-150 sm:p-5"
          >
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <h3 className="text-sm font-semibold text-foreground">Yıl Arama & Arşiv</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Kapat"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
                placeholder="Yıl (örn: 1923)"
                value={searchYear}
                onChange={(e) => setSearchYear(e.target.value)}
                className="h-9 flex-1 rounded-xl border border-border/80 bg-background px-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                aria-label="Yıl girişi"
              />
              <button
                type="submit"
                className="h-9 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Git
              </button>
            </form>

            {/* Quick Available Years */}
            <div className="mt-3.5 border-t border-border/60 pt-3">
              <span className="text-[11px] font-semibold text-muted-foreground">
                Öne Çıkan Yıllar:
              </span>
              <div className="mt-2 grid grid-cols-4 gap-1.5 sm:grid-cols-5 max-h-48 overflow-y-auto">
                {availableYears.map((item) => {
                  const isCurrent = item.year === year;
                  return (
                    <button
                      key={item.year}
                      type="button"
                      onClick={() => handleSelectYear(item.year)}
                      className={`flex flex-col items-center justify-center rounded-xl p-1.5 font-mono text-xs font-semibold transition-all ${
                        isCurrent
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'border border-border/70 bg-muted/40 text-foreground hover:bg-muted'
                      }`}
                    >
                      <span>{item.year}</span>
                      <span className="text-[9px] font-normal opacity-70">{item.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Popular landmark year pills bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="shrink-0 text-[11px] font-medium text-muted-foreground">
          Önemli:
        </span>
        {availableYears.slice(0, 14).map((item) => (
          <Link
            key={item.year}
            href={`/tarihte-bugun/yil/${item.year}`}
            className={`shrink-0 rounded-lg border px-2 py-0.5 font-mono text-xs transition-all ${
              item.year === year
                ? 'border-primary/30 bg-primary/10 text-primary font-bold shadow-2xs'
                : 'border-border/70 bg-card text-muted-foreground hover:border-border hover:text-foreground'
            }`}
          >
            {item.year}
          </Link>
        ))}
      </div>
    </div>
  );
}
