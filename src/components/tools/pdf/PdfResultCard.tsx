'use client';

import React from 'react';
import { formatBytes } from './FileDropzone';

interface PdfResultCardProps {
  fileName: string;
  fileSizeBytes: number;
  downloadUrl: string;
  onReset: () => void;
  title?: string;
  subtitle?: string;
}

export default function PdfResultCard({
  fileName,
  fileSizeBytes,
  downloadUrl,
  onReset,
  title = 'İşleminiz Başarıyla Tamamlandı!',
  subtitle = 'Dosyanız cihazınızda oluşturuldu ve indirmeye hazır.',
}: PdfResultCardProps) {
  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8 space-y-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div className="space-y-1.5">
        <h3 className="text-lg sm:text-xl font-bold text-foreground">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {subtitle}
        </p>
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border text-xs sm:text-sm font-medium text-foreground">
        <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="truncate max-w-[200px] sm:max-w-xs">{fileName}</span>
        <span className="text-muted-foreground font-normal">({formatBytes(fileSizeBytes)})</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <a
          href={downloadUrl}
          download={fileName}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors shadow-xs"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>PDF Dosyasını İndir</span>
        </a>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-muted text-foreground font-semibold text-sm hover:bg-muted/80 transition-colors"
        >
          Yeni İşlem Yap
        </button>
      </div>
    </div>
  );
}
