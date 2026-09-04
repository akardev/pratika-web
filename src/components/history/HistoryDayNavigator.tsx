'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MONTH_NAMES_TR,
  formatDaySlug,
  formatHistoryDayLabel,
  getAdjacentDays,
  getAllAvailableDates,
} from '@/data/todayInHistory';

interface HistoryDayNavigatorProps {
  month: number;
  day: number;
}

export default function HistoryDayNavigator({ month, day }: HistoryDayNavigatorProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeMonth, setActiveMonth] = useState(month);
  const modalRef = useRef<HTMLDivElement>(null);

  const { prev, next } = getAdjacentDays(month, day);
  const currentLabel = formatHistoryDayLabel(month, day);
  const landmarkDates = getAllAvailableDates().slice(0, 6);

  // Real today date info
  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();
  const isViewingToday = month === todayMonth && day === todayDay;
  const todaySlug = formatDaySlug(todayMonth, todayDay);
  const todayLabel = formatHistoryDayLabel(todayMonth, todayDay);

  // Number of days in active selected month (using non-leap 2025 default)
  const daysInMonth = new Date(2025, activeMonth, 0).getDate();

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

  const handleSelectDay = (targetMonth: number, targetDay: number) => {
    const slug = formatDaySlug(targetMonth, targetDay);
    setIsOpen(false);
    router.push(`/tarihte-bugun/${slug}`);
  };

  return (
    <div className="relative rounded-2xl border border-border/80 bg-card p-2 sm:p-2.5 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        {/* Previous Day */}
        <Link
          href={`/tarihte-bugun/${prev.slug}`}
          className="group inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-muted/40 px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted hover:border-border sm:px-4 sm:py-2 sm:text-sm"
          title={`Önceki Gün: ${prev.label}`}
          aria-label={`Önceki Gün: ${prev.label}`}
        >
          <svg className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5 group-hover:text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden xs:inline">{prev.label}</span>
          <span className="xs:hidden">Önceki</span>
        </Link>

        {/* Center: Active Date Trigger & Today Quick Jump */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveMonth(month);
              setIsOpen(!isOpen);
            }}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            className="inline-flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-3.5 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary/15 sm:px-5 sm:py-2 sm:text-sm cursor-pointer"
          >
            <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="tracking-tight font-bold">{currentLabel}</span>
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

          {!isViewingToday && (
            <Link
              href={`/tarihte-bugun/${todaySlug}`}
              className="inline-flex items-center gap-1 rounded-xl border border-amber-500/25 bg-amber-500/10 px-2.5 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 transition-all hover:bg-amber-500/15"
              title={`Bugünün Tarihine Git (${todayLabel})`}
            >
              <span>Bugün</span>
            </Link>
          )}
        </div>

        {/* Next Day */}
        <Link
          href={`/tarihte-bugun/${next.slug}`}
          className="group inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-muted/40 px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted hover:border-border sm:px-4 sm:py-2 sm:text-sm"
          title={`Sonraki Gün: ${next.label}`}
          aria-label={`Sonraki Gün: ${next.label}`}
        >
          <span className="hidden xs:inline">{next.label}</span>
          <span className="xs:hidden">Sonraki</span>
          <svg className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Popover / Modal Date Picker */}
      {isOpen && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Tarih seçici"
          className="absolute left-1/2 top-full z-50 mt-2.5 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150 sm:p-5"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <h3 className="text-sm font-bold text-slate-900">Tarih Seçimi (Ay & Gün)</h3>
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

          {/* Month selector tabs */}
          <div className="mt-3.5 grid grid-cols-4 gap-1.5 sm:grid-cols-6">
            {MONTH_NAMES_TR.map((mName, idx) => {
              const mNum = idx + 1;
              const isSelected = activeMonth === mNum;
              return (
                <button
                  key={mName}
                  type="button"
                  onClick={() => setActiveMonth(mNum)}
                  className={`rounded-lg py-1.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {mName}
                </button>
              );
            })}
          </div>

          {/* Day Grid */}
          <div className="mt-4">
            <div className="mb-2 text-xs font-semibold text-slate-500">
              {MONTH_NAMES_TR[activeMonth - 1]} ayı günleri:
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((dNum) => {
                const isCurrent = activeMonth === month && dNum === day;
                return (
                  <button
                    key={dNum}
                    type="button"
                    onClick={() => handleSelectDay(activeMonth, dNum)}
                    className={`flex h-8.5 items-center justify-center rounded-lg text-xs font-bold transition-all sm:text-sm ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-xs scale-105'
                        : 'bg-slate-50 text-slate-800 hover:bg-blue-100 hover:text-blue-900'
                    }`}
                  >
                    {dNum}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Landmark date quick jumps */}
          <div className="mt-4 border-t border-slate-100 pt-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Dönüm Noktası Tarihler:
            </span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {landmarkDates.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => handleSelectDay(item.month, item.day)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
