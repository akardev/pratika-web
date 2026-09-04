'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getFactForTool, DidYouKnowItem } from '@/data/didYouKnow';

interface ToolDidYouKnowWidgetProps {
  toolSlug: string;
  categorySlug?: string;
  className?: string;
}

export default function ToolDidYouKnowWidget({
  toolSlug,
  categorySlug,
  className = '',
}: ToolDidYouKnowWidgetProps) {
  const [fact] = useState<DidYouKnowItem | null>(() =>
    getFactForTool(toolSlug, categorySlug)
  );

  if (!fact) return null;

  return (
    <aside
      aria-label="İlginç Bilgi"
      className={`relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-4.5 backdrop-blur-sm transition-all hover:border-border sm:p-5 ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </span>
          <span className="text-xs font-semibold text-foreground">Biliyor muydunuz?</span>
          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            {fact.category}
          </span>
        </div>
      </div>

      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
        {fact.fact}
      </p>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/40 pt-2 text-[11px]">
        <span className="text-muted-foreground/75">
          İlginç Bilgi & Keşif
        </span>
        <Link
          href="/"
          className="font-medium text-primary hover:underline"
        >
          Günün Keşfi →
        </Link>
      </div>
    </aside>
  );
}
