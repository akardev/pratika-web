'use client';

import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '@/data/dailyQuiz';

interface DailyQuizCardProps {
  initialQuestion: QuizQuestion;
  className?: string;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export default function DailyQuizCard({
  initialQuestion,
  className = '',
}: DailyQuizCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const todayStr = new Date().toISOString().split('T')[0];
        const cacheKey = `pratiksel_daily_quiz_${todayStr}_${initialQuestion.id}`;
        const cachedStr = localStorage.getItem(cacheKey) || localStorage.getItem(`pratika_daily_quiz_${todayStr}_${initialQuestion.id}`);
        
        if (cachedStr) {
          const parsed = parseInt(cachedStr, 10);
          if (!isNaN(parsed) && parsed >= 0 && parsed <= 3) {
            // eslint-disable-next-line
            setSelectedIndex(parsed);
          }
        }
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [initialQuestion.id]);

  const isAnswered = selectedIndex !== null;
  const isCorrect = selectedIndex === initialQuestion.correctIndex;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedIndex(index);

    if (typeof window !== 'undefined') {
      try {
        const todayStr = new Date().toISOString().split('T')[0];
        const cacheKey = `pratiksel_daily_quiz_${todayStr}_${initialQuestion.id}`;
        localStorage.setItem(cacheKey, index.toString());
      } catch {
        // Ignore localStorage errors
      }
    }
  };

  return (
    <div
      className={`group relative flex h-full min-h-[350px] flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs transition-all hover:border-border hover:shadow-md ${className}`}
    >
      {/* Decorative ambient gradient */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl transition-all group-hover:bg-blue-500/15" />

      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              <svg aria-hidden="true" className="h-3.5 w-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Günün Sorusu
            </span>
          </div>

          <span
            className={`text-[11px] font-semibold transition-colors ${
              isAnswered
                ? isCorrect
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400'
                : 'text-muted-foreground'
            }`}
          >
            {isAnswered ? (isCorrect ? '✓ Doğru!' : '✗ Yanlış') : 'Tek Soru'}
          </span>
        </div>

        {/* Question Prompt */}
        <div className="mt-3">
          <h3 className="min-h-[38px] text-xs sm:text-[13px] font-semibold leading-snug text-foreground">
            {initialQuestion.question}
          </h3>

          {/* 4 Options: Compact 2x2 Grid */}
          <div className="mt-2.5 grid grid-cols-2 gap-2">
            {initialQuestion.options.map((option, idx) => {
              const letter = OPTION_LETTERS[idx];
              const isSelected = selectedIndex === idx;
              const isThisCorrect = idx === initialQuestion.correctIndex;

              let buttonStyles =
                'border-border/80 bg-muted/40 hover:bg-muted/80 hover:border-border text-foreground';
              let badgeStyles = 'bg-card text-foreground border-border/80 font-bold';
              let textStyles = 'text-foreground font-medium';

              if (isAnswered) {
                if (isThisCorrect) {
                  buttonStyles =
                    'border-2 border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/30 shadow-xs';
                  badgeStyles = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                  textStyles = 'text-foreground font-semibold';
                } else if (isSelected) {
                  buttonStyles =
                    'border-2 border-rose-500 bg-rose-50/80 dark:bg-rose-950/30';
                  badgeStyles = 'bg-rose-600 text-white border-rose-600 font-bold';
                  textStyles = 'text-foreground/85 font-medium line-through';
                } else {
                  buttonStyles = 'border-border/60 bg-muted/20';
                  badgeStyles = 'bg-muted text-muted-foreground border-border/60 font-semibold';
                  textStyles = 'text-foreground/75 font-normal';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`flex min-h-8 sm:min-h-9 items-center gap-1.5 sm:gap-2 rounded-xl border px-2 sm:px-2.5 py-1.5 text-left text-xs transition-all ${buttonStyles} ${
                    !isAnswered ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                  }`}
                >
                  <span
                    className={`flex h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-md border text-[10.5px] sm:text-[11px] transition-colors ${badgeStyles}`}
                  >
                    {letter}
                  </span>
                  <span className={`flex-1 text-[11px] sm:text-[12px] leading-tight break-words ${textStyles}`}>{option}</span>
                  {isAnswered && isThisCorrect && (
                    <svg aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {isAnswered && isSelected && !isThisCorrect && (
                    <svg aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {/* Dedicated Compact Result Area: Pre-allocated height to eliminate layout jumping */}
          <div className="mt-2.5 min-h-[48px]">
            {isAnswered ? (
              <div className="rounded-xl border border-border/70 bg-muted/40 p-2 text-xs animate-fadeIn">
                <p className="text-[11px] sm:text-[11.5px] leading-snug text-foreground/90">
                  <strong className="text-foreground">
                    Doğru Cevap: {OPTION_LETTERS[initialQuestion.correctIndex]}){' '}
                  </strong>
                  {initialQuestion.explanation}
                </p>
              </div>
            ) : (
              <p className="py-2 text-center text-[11px] text-muted-foreground/75">
                Doğru şıkkı seçerek cevabınızı test edin.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Actions / Footer Bar */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/50 pt-3">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>Günün Sorusu</span>
        </div>

        {isAnswered && (
          <span className="text-[10.5px] font-medium text-muted-foreground/70">
            {isCorrect ? 'Tebrikler! 🎉' : 'Yarın yeni soru!'}
          </span>
        )}
      </div>
    </div>
  );
}

