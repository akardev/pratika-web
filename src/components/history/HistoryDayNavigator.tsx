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
    <div className="relative rounded-2xl border border-border/80 bg-card p-3 shadow-2xs sm:p-4">
      <div className="flex items-center justify-between gap-2">
        {/* Previous Day */}
        <Link
          href={`/tarihte-bugun/${prev.slug}`}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-muted/30 px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary sm:px-4 sm:py-2.5 sm:text-sm"
          title={`Önceki Gün: ${prev.label}`}
          aria-label={`Önceki Gün: ${prev.label}`}
        >
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden xs:inline">{prev.label}</span>
          <span className="xs:hidden">Önceki</span>
        </Link>

        {/* Center Active Date Trigger */}
        <button
          type="button"
          onClick={() => {
            setActiveMonth(month);
            setIsOpen(!isOpen);
          }}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className="inline-flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-all hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:px-6 sm:py-2.5 sm:text-base"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{currentLabel}</span>
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

        {/* Next Day */}
        <Link
          href={`/tarihte-bugun/${next.slug}`}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-muted/30 px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary sm:px-4 sm:py-2.5 sm:text-sm"
          title={`Sonraki Gün: ${next.label}`}
          aria-label={`Sonraki Gün: ${next.label}`}
        >
          <span className="hidden xs:inline">{next.label}</span>
          <span className="xs:hidden">Sonraki</span>
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
          className="absolute left-1/2 top-full z-50 mt-3 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 rounded-2xl border border-border bg-card p-4 shadow-xl sm:p-5"
        >
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h3 className="text-sm font-bold text-foreground">Günü Keşfet — Ay & Gün Seçimi</h3>
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

          {/* Month selector tabs */}
          <div className="mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-6">
            {MONTH_NAMES_TR.map((mName, idx) => {
              const mNum = idx + 1;
              const isSelected = activeMonth === mNum;
              return (
                <button
                  key={mName}
                  type="button"
                  onClick={() => setActiveMonth(mNum)}
                  className={`rounded-lg py-1.5 text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'bg-primary text-primary-foreground font-bold shadow-2xs'
                      : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {mName}
                </button>
              );
            })}
          </div>

          {/* Day Grid */}
          <div className="mt-4">
            <div className="mb-2 text-xs font-medium text-muted-foreground">
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
                    className={`flex h-9 items-center justify-center rounded-lg text-xs font-semibold transition-all sm:text-sm ${
                      isCurrent
                        ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                        : 'bg-muted/30 text-foreground hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {dNum}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Landmark date quick jumps */}
          <div className="mt-4 border-t border-border/60 pt-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Önemli Tarihler:
            </span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {landmarkDates.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => handleSelectDay(item.month, item.day)}
                  className="rounded-md border border-border/60 bg-card px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
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
