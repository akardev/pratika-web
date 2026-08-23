'use client';

import React, { useState, useEffect, useRef, useId, useMemo, useCallback } from 'react';

export interface DatePickerProps {
  id?: string;
  label?: string;
  value: string; // 'YYYY-MM-DD'
  onChange: (value: string) => void;
  minDate?: string; // 'YYYY-MM-DD'
  maxDate?: string; // 'YYYY-MM-DD'
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  helperText?: string;
  error?: string;
  allowClear?: boolean;
}

const MONTH_NAMES_TR = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
];

const WEEKDAY_NAMES_TR = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

/**
 * YYYY-MM-DD -> GG.AA.YYYY
 */
export function formatToDisplay(isoDate: string): string {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const [year, month, day] = parts;
  return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
}

/**
 * Validates whether year, month (1-12), day (1-31) form a valid calendar date
 */
function isValidCalendarDate(year: number, month: number, day: number): boolean {
  if (year < 1900 || year > 2100) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  // Ayın gerçek gün sayısı kontrolü (artık yıl hesabı dahil)
  const daysInMonth = new Date(year, month, 0).getDate();
  return day <= daysInMonth;
}

/**
 * Parses user input (GG.AA.YYYY, GG/AA/YYYY, GG-AA-YYYY, GGAA YYYY, or raw 8 digits GGAAAAYYYY) -> YYYY-MM-DD
 */
export function parseFromDisplay(displayText: string): string | null {
  if (!displayText) return null;
  const trimmed = displayText.trim();

  let day: number | null = null;
  let month: number | null = null;
  let year: number | null = null;

  // 1. Raw 8 haneli giriş (Örn: 24082026)
  const rawDigits = trimmed.replace(/\D/g, '');
  if (rawDigits.length === 8 && !trimmed.includes('.') && !trimmed.includes('/') && !trimmed.includes('-')) {
    day = parseInt(rawDigits.slice(0, 2), 10);
    month = parseInt(rawDigits.slice(2, 4), 10);
    year = parseInt(rawDigits.slice(4, 8), 10);
  } else {
    // 2. Ayraçlı girişler (24.08.2026, 24/08/2026, 24-08-2026)
    const clean = trimmed.replace(/[/\\-]/g, '.');
    const parts = clean.split('.');
    if (parts.length === 3) {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    }
  }

  if (day === null || month === null || year === null) return null;
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

  if (!isValidCalendarDate(year, month, day)) {
    return null;
  }

  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${year}-${pad(month)}-${pad(day)}`;
}

/**
 * Otomatik ayraç formatlayıcı (Kullanıcı yazarken GG.AA.YYYY kalıbına sokar)
 */
function formatTypingInput(raw: string, prevRaw: string): string {
  // Kullanıcı siliyorsa (backspace), otomatik nokta ekleme
  const isDeleting = raw.length < prevRaw.length;
  if (isDeleting) {
    return raw;
  }

  // Sadece rakam ve nokta/tire/bölü al
  const clean = raw.replace(/[^0-9./-]/g, '').replace(/[/\\-]/g, '.');
  const digits = clean.replace(/\D/g, '');

  if (digits.length === 0) return '';
  if (digits.length <= 2) {
    return digits.length === 2 && !clean.includes('.') ? `${digits}.` : clean;
  }
  if (digits.length <= 4) {
    const d = digits.slice(0, 2);
    const m = digits.slice(2);
    return m.length === 2 && clean.split('.').length < 3 ? `${d}.${m}.` : `${d}.${m}`;
  }

  const d = digits.slice(0, 2);
  const m = digits.slice(2, 4);
  const y = digits.slice(4, 8);
  return `${d}.${m}.${y}`;
}

type ViewMode = 'days' | 'months' | 'years';

export default function DatePicker({
  id,
  label,
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = 'GG.AA.YYYY',
  required = false,
  disabled = false,
  className = '',
  helperText,
  error,
  allowClear = true,
}: DatePickerProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('days');
  const [prevValue, setPrevValue] = useState(value);
  const [inputText, setInputText] = useState(() => formatToDisplay(value));
  const [prevInputText, setPrevInputText] = useState(() => formatToDisplay(value));
  const [localError, setLocalError] = useState<string | null>(null);

  // Takvim görünüm ayı ve yılı
  const parsedInitialDate = useMemo(() => {
    if (!value) return new Date();
    const d = new Date(value + 'T00:00:00');
    return !isNaN(d.getTime()) ? d : new Date();
  }, [value]);

  const [viewYear, setViewYear] = useState(() => parsedInitialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => parsedInitialDate.getMonth());
  // Yıl seçici için başlangıç yılı (12 yıllık dilim)
  const [yearGridStart, setYearGridStart] = useState(() => Math.floor(parsedInitialDate.getFullYear() / 12) * 12);

  // Dışarıdan value değişirse render anında state'leri senkronize et
  if (prevValue !== value) {
    setPrevValue(value);
    const formatted = formatToDisplay(value);
    setInputText(formatted);
    setPrevInputText(formatted);
    if (value) {
      const d = new Date(value + 'T00:00:00');
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
        setYearGridStart(Math.floor(d.getFullYear() / 12) * 12);
      }
    }
  }

  // Click outside to close calendar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setViewMode('days');
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setViewMode('days');
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Handle manual typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatTypingInput(raw, prevInputText);

    setPrevInputText(formatted);
    setInputText(formatted);

    if (!formatted.trim()) {
      setLocalError(null);
      onChange('');
      return;
    }

    // Tam 8 basamak veya GG.AA.YYYY tamamlandığında doğrula
    const digits = formatted.replace(/\D/g, '');
    if (digits.length >= 8 || formatted.length >= 10) {
      const iso = parseFromDisplay(formatted);
      if (iso) {
        // Min/Max kontrolü
        if (minDate && iso < minDate) {
          setLocalError(`En erken tarih: ${formatToDisplay(minDate)}`);
          return;
        }
        if (maxDate && iso > maxDate) {
          setLocalError(`En geç tarih: ${formatToDisplay(maxDate)}`);
          return;
        }

        setLocalError(null);
        onChange(iso);

        // Takvim görünümünü de güncelle
        const parts = iso.split('-');
        setViewYear(parseInt(parts[0], 10));
        setViewMonth(parseInt(parts[1], 10) - 1);
        setYearGridStart(Math.floor(parseInt(parts[0], 10) / 12) * 12);
      } else {
        setLocalError('Lütfen geçerli bir tarih girin. Örn: 24.08.2026');
      }
    } else {
      setLocalError(null);
    }
  };

  const handleInputBlur = () => {
    if (!inputText.trim()) {
      setLocalError(null);
      onChange('');
      return;
    }

    const iso = parseFromDisplay(inputText);
    if (iso) {
      if (minDate && iso < minDate) {
        setLocalError(`En erken tarih: ${formatToDisplay(minDate)}`);
        return;
      }
      if (maxDate && iso > maxDate) {
        setLocalError(`En geç tarih: ${formatToDisplay(maxDate)}`);
        return;
      }

      const formatted = formatToDisplay(iso);
      setInputText(formatted);
      setPrevInputText(formatted);
      setLocalError(null);
      onChange(iso);
    } else {
      setLocalError('Lütfen geçerli bir tarih girin. Örn: 24.08.2026');
    }
  };

  // Takvimde gün seçildiğinde
  const handleSelectDay = useCallback((day: number) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const iso = `${viewYear}-${pad(viewMonth + 1)}-${pad(day)}`;

    if (minDate && iso < minDate) return;
    if (maxDate && iso > maxDate) return;

    onChange(iso);
    const displayStr = formatToDisplay(iso);
    setInputText(displayStr);
    setPrevInputText(displayStr);
    setLocalError(null);
    setIsOpen(false);
    setViewMode('days');
  }, [viewYear, viewMonth, minDate, maxDate, onChange]);

  // Ay seçildiğinde
  const handleSelectMonth = useCallback((monthIndex: number) => {
    setViewMonth(monthIndex);
    setViewMode('days');
  }, []);

  // Yıl seçildiğinde
  const handleSelectYear = useCallback((year: number) => {
    setViewYear(year);
    setViewMode('months');
  }, []);

  // Bugün seçimi
  const handleSelectToday = () => {
    const today = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const iso = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

    if (minDate && iso < minDate) return;
    if (maxDate && iso > maxDate) return;

    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setYearGridStart(Math.floor(today.getFullYear() / 12) * 12);
    onChange(iso);
    const displayStr = formatToDisplay(iso);
    setInputText(displayStr);
    setPrevInputText(displayStr);
    setLocalError(null);
    setIsOpen(false);
    setViewMode('days');
  };

  // Temizle
  const handleClear = () => {
    onChange('');
    setInputText('');
    setPrevInputText('');
    setLocalError(null);
    setIsOpen(false);
    setViewMode('days');
  };

  // Ay Değiştirme
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Yıl Aralığı Değiştirme
  const handlePrevYearGrid = () => {
    setYearGridStart((s) => s - 12);
  };

  const handleNextYearGrid = () => {
    setYearGridStart((s) => s + 12);
  };

  // Takvim günlerini oluştur
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
  // Pazartesi = 0, Pazar = 6 (JS getDay'de Pazar = 0)
  const startingDay = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === viewMonth && today.getFullYear() === viewYear;
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    const parts = value.split('-');
    if (parts.length !== 3) return false;
    return (
      parseInt(parts[0], 10) === viewYear &&
      parseInt(parts[1], 10) === viewMonth + 1 &&
      parseInt(parts[2], 10) === day
    );
  };

  const isDayDisabled = (day: number) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const iso = `${viewYear}-${pad(viewMonth + 1)}-${pad(day)}`;
    if (minDate && iso < minDate) return true;
    if (maxDate && iso > maxDate) return true;
    return false;
  };

  const activeError = error || localError;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold mb-1.5 text-foreground">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type="text"
          id={inputId}
          disabled={disabled}
          value={inputText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className={`w-full rounded-lg border bg-background px-3.5 py-2.5 pr-10 text-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            activeError ? 'border-destructive focus:ring-destructive/30' : 'border-border'
          } ${disabled ? 'opacity-50 cursor-not-allowed bg-muted/40' : ''}`}
          autoComplete="off"
        />

        {/* Takvim Açma Butonu */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            setIsOpen((prev) => !prev);
            setViewMode('days');
          }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded focus:outline-none focus:ring-1 focus:ring-primary"
          aria-label="Takvimi aç"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>

      {activeError && (
        <p className="text-[11px] text-destructive mt-1 font-medium">{activeError}</p>
      )}
      {helperText && !activeError && (
        <p className="text-[11px] text-muted-foreground mt-1">{helperText}</p>
      )}

      {/* Modern Türkçe Takvim Popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="absolute left-0 top-full mt-1.5 z-50 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-card border border-border/80 rounded-2xl shadow-xl p-3.5 animate-in fade-in zoom-in-95 duration-100"
        >
          {/* ======================================================== */}
          {/* GÜNLER GÖRÜNÜMÜ (DAYS VIEW) */}
          {/* ======================================================== */}
          {viewMode === 'days' && (
            <>
              {/* Header: Ay & Yıl Seçici Butonları */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/60">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  aria-label="Önceki Ay"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Tıklanabilir Ay ve Yıl Başlığı */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setViewMode('months')}
                    className="px-2 py-1 rounded-md font-bold text-xs sm:text-sm text-foreground hover:bg-muted hover:text-primary transition-colors cursor-pointer"
                  >
                    {MONTH_NAMES_TR[viewMonth]}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setYearGridStart(Math.floor(viewYear / 12) * 12);
                      setViewMode('years');
                    }}
                    className="px-2 py-1 rounded-md font-bold text-xs sm:text-sm text-foreground hover:bg-muted hover:text-primary transition-colors cursor-pointer"
                  >
                    {viewYear}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  aria-label="Sonraki Ay"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Hafta Günleri Başlığı (Pzt - Paz) */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-muted-foreground mb-1">
                {WEEKDAY_NAMES_TR.map((dayName) => (
                  <div key={dayName} className="py-1">
                    {dayName}
                  </div>
                ))}
              </div>

              {/* Günler Grid'i */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {/* Önceki ayın kalan günleri */}
                {Array.from({ length: startingDay }).map((_, i) => {
                  const dayNum = daysInPrevMonth - startingDay + i + 1;
                  return (
                    <div key={`prev-${i}`} className="py-1.5 text-muted-foreground/30 text-[11px]">
                      {dayNum}
                    </div>
                  );
                })}

                {/* Bu ayın günleri */}
                {Array.from({ length: daysInCurrentMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const selected = isSelected(dayNum);
                  const today = isToday(dayNum);
                  const disabledDay = isDayDisabled(dayNum);

                  return (
                    <button
                      key={`cur-${dayNum}`}
                      type="button"
                      disabled={disabledDay}
                      onClick={() => handleSelectDay(dayNum)}
                      className={`h-8 w-8 mx-auto rounded-lg flex items-center justify-center font-medium transition-all cursor-pointer text-xs ${
                        selected
                          ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                          : today
                          ? 'border border-primary text-primary font-bold hover:bg-primary/10'
                          : 'hover:bg-muted text-foreground'
                      } ${disabledDay ? 'opacity-25 cursor-not-allowed pointer-events-none' : ''}`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* AYLAR GÖRÜNÜMÜ (MONTHS VIEW) */}
          {/* ======================================================== */}
          {viewMode === 'months' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-border/60">
                <button
                  type="button"
                  onClick={() => setViewYear((y) => y - 1)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  aria-label="Önceki Yıl"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setYearGridStart(Math.floor(viewYear / 12) * 12);
                    setViewMode('years');
                  }}
                  className="px-2 py-1 rounded-md font-bold text-sm text-foreground hover:bg-muted hover:text-primary transition-colors cursor-pointer"
                >
                  {viewYear} (Yıl Değiştir)
                </button>

                <button
                  type="button"
                  onClick={() => setViewYear((y) => y + 1)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  aria-label="Sonraki Yıl"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1">
                {MONTH_NAMES_TR.map((mName, idx) => {
                  const isCurrentSelected = idx === viewMonth;
                  return (
                    <button
                      key={mName}
                      type="button"
                      onClick={() => handleSelectMonth(idx)}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isCurrentSelected
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      {mName}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* YILLAR GÖRÜNÜMÜ (YEARS VIEW - 12 YILLIK DİLİMLER) */}
          {/* ======================================================== */}
          {viewMode === 'years' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-border/60">
                <button
                  type="button"
                  onClick={handlePrevYearGrid}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  aria-label="Önceki 12 Yıl"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <span className="font-bold text-xs sm:text-sm text-foreground">
                  {yearGridStart} – {yearGridStart + 11}
                </span>

                <button
                  type="button"
                  onClick={handleNextYearGrid}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  aria-label="Sonraki 12 Yıl"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1">
                {Array.from({ length: 12 }).map((_, i) => {
                  const y = yearGridStart + i;
                  const isCurrentSelected = y === viewYear;
                  return (
                    <button
                      key={y}
                      type="button"
                      onClick={() => handleSelectYear(y)}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all cursor-pointer font-mono ${
                        isCurrentSelected
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      {y}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ALT HIZLI AKSİYONLAR (Bugün, Temizle, Kapat) */}
          {/* ======================================================== */}
          <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSelectToday}
                className="text-primary hover:underline font-semibold text-[11px] cursor-pointer"
              >
                Bugün
              </button>
              {allowClear && value && !required && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-destructive hover:underline font-semibold text-[11px] cursor-pointer"
                >
                  Temizle
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setViewMode('days');
              }}
              className="text-muted-foreground hover:text-foreground text-[11px] cursor-pointer"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
