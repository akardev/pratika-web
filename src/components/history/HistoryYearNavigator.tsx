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
      <div className="relative rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-sm sm:p-3">
        <div className="flex items-center justify-between gap-2">
          {/* Previous Year */}
          <Link
            href={`/tarihte-bugun/yil/${prev}`}
            className="group inline-flex items-center gap-1.5 rounded-xl border border-slate-200/70 bg-slate-50/80 px-3 py-2 text-xs font-semibold text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-700 sm:px-4 sm:py-2.5 sm:text-sm"
            title={`Önceki Yıl: ${prev}`}
            aria-label={`Önceki Yıl: ${prev}`}
          >
            <svg className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
            className="inline-flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-200/80 px-4 py-2 font-mono text-base font-bold text-blue-900 shadow-2xs transition-all hover:bg-blue-100/70 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 sm:px-6 sm:py-2.5 sm:text-lg"
          >
            <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span>{year}</span>
            <svg
              className={`h-4 w-4 text-blue-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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
            className="group inline-flex items-center gap-1.5 rounded-xl border border-slate-200/70 bg-slate-50/80 px-3 py-2 text-xs font-semibold text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-700 sm:px-4 sm:py-2.5 sm:text-sm"
            title={`Sonraki Yıl: ${next}`}
            aria-label={`Sonraki Yıl: ${next}`}
          >
            <span className="font-mono">{next}</span>
            <svg className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
            className="absolute left-1/2 top-full z-50 mt-2.5 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150 sm:p-5"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <h3 className="text-sm font-bold text-slate-900">Yıl Arama & Arşiv</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Kapat"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Direct Year Input */}
            <form onSubmit={handleSearchSubmit} className="mt-3.5 flex gap-2">
              <input
                type="number"
                min="1000"
                max="2100"
                placeholder="Yıl (örn: 1923)"
                value={searchYear}
                onChange={(e) => setSearchYear(e.target.value)}
                className="h-10 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 font-mono text-sm text-slate-900 outline-none transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                aria-label="Yıl girişi"
              />
              <button
                type="submit"
                className="h-10 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white transition-colors hover:bg-blue-700"
              >
                Git
              </button>
            </form>

            {/* Quick Available Years */}
            <div className="mt-4 border-t border-slate-100 pt-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Arşivdeki Öne Çıkan Yıllar:
              </span>
              <div className="mt-2.5 grid grid-cols-4 gap-1.5 sm:grid-cols-5">
                {availableYears.map((item) => {
                  const isCurrent = item.year === year;
                  return (
                    <button
                      key={item.year}
                      type="button"
                      onClick={() => handleSelectYear(item.year)}
                      className={`flex flex-col items-center justify-center rounded-xl p-2 font-mono text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'border border-slate-200/80 bg-slate-50 text-slate-800 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-900'
                      }`}
                    >
                      <span>{item.year}</span>
                      <span className="text-[9px] font-normal opacity-70">{item.count} olay</span>
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
        <span className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Önemli Yıllar:
        </span>
        {availableYears.slice(0, 14).map((item) => (
          <Link
            key={item.year}
            href={`/tarihte-bugun/yil/${item.year}`}
            className={`shrink-0 rounded-lg border px-2.5 py-1 font-mono text-xs font-semibold transition-all ${
              item.year === year
                ? 'border-blue-500 bg-blue-50 text-blue-800 font-bold shadow-2xs'
                : 'border-slate-200/80 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-800'
            }`}
          >
            {item.year}
          </Link>
        ))}
      </div>
    </div>
  );
}
