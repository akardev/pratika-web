'use client';

import React from 'react';
import { formatBytes } from './FileDropzone';

export interface ManagedFileItem {
  id: string;
  file: File;
  pageCount?: number;
  previewUrl?: string;
}

interface FileListProps {
  items: ManagedFileItem[];
  onRemove: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  disabled?: boolean;
}

export default function FileList({
  items,
  onRemove,
  onMoveUp,
  onMoveDown,
  disabled = false,
}: FileListProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
        <span>Seçilen Dosyalar ({items.length})</span>
        <span>İşlem Sırası</span>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 p-3 sm:p-4 rounded-xl bg-card border border-border/80 shadow-2xs hover:border-border transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                {index + 1}
              </span>

              {item.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.previewUrl}
                  alt={item.file.name}
                  className="w-10 h-10 object-cover rounded-lg border border-border shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              )}

              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate max-w-[180px] sm:max-w-xs md:max-w-md">
                  {item.file.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{formatBytes(item.file.size)}</span>
                  {item.pageCount !== undefined && (
                    <>
                      <span>•</span>
                      <span>{item.pageCount} Sayfa</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => onMoveUp(index)}
                disabled={disabled || index === 0}
                className="p-1.5 rounded-lg bg-muted text-foreground hover:bg-muted/80 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Yukarı Taşı"
                aria-label="Yukarı Taşı"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => onMoveDown(index)}
                disabled={disabled || index === items.length - 1}
                className="p-1.5 rounded-lg bg-muted text-foreground hover:bg-muted/80 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Aşağı Taşı"
                aria-label="Aşağı Taşı"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => onRemove(item.id)}
                disabled={disabled}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors ml-1"
                title="Kaldır"
                aria-label="Kaldır"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
