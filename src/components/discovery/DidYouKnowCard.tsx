'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DidYouKnowItem } from '@/data/didYouKnow';

interface DidYouKnowCardProps {
  initialFact: DidYouKnowItem;
  className?: string;
}

export default function DidYouKnowCard({
  initialFact,
  className = '',
}: DidYouKnowCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `Biliyor muydunuz?\n\n"${initialFact.fact}"\n— Pratika Günün Keşfi (pratika.com.tr)`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={`group relative flex h-full min-h-[350px] flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs transition-all hover:border-border hover:shadow-md ${className}`}
    >
      {/* Decorative ambient gradient */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl transition-all group-hover:bg-amber-500/15" />

      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
              <svg aria-hidden="true" className="h-3.5 w-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Biliyor muydunuz?
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
            title="Günün Bilgisini Kopyala"
          >
            {copied ? (
              <>
                <svg aria-hidden="true" className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Kopyalandı</span>
              </>
            ) : (
              <>
                <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Kopyala</span>
              </>
            )}
          </button>
        </div>

        {/* Fact Content */}
        <div className="mt-4">
          <p className="text-sm font-normal leading-relaxed text-foreground sm:text-[14px]">
            {initialFact.fact}
          </p>
        </div>
      </div>

      {/* Bottom Actions / Footer Bar */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/50 pt-3">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>Günün Bilgisi</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="text-[10.5px] text-muted-foreground/75">Her gün yenilenir</span>
        </div>

        {initialFact.relatedToolSlug && initialFact.relatedToolTitle ? (
          <Link
            href={`/arac/${initialFact.relatedToolSlug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:underline"
          >
            <span>{initialFact.relatedToolTitle}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <span className="text-[10.5px] text-muted-foreground/60">Yarın yeni bilgi</span>
        )}
      </div>
    </div>
  );
}

