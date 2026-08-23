'use client';

import React, { useRef, useState } from 'react';

interface FileDropzoneProps {
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSizeMB?: number;
  title?: string;
  subtitle?: string;
  onFilesSelected: (files: File[]) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default function FileDropzone({
  accept = 'application/pdf',
  multiple = false,
  maxFiles = 20,
  maxSizeMB = 50,
  title = 'Dosyaları buraya sürükleyin veya seçin',
  subtitle = 'Maksimum 50 MB / dosya',
  onFilesSelected,
  onError,
  disabled = false,
}: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validateAndPassFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const filesArray = Array.from(fileList);

    if (multiple && filesArray.length > maxFiles) {
      onError?.(`En fazla ${maxFiles} dosya seçebilirsiniz.`);
      return;
    }

    const validFiles: File[] = [];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    for (const file of filesArray) {
      if (file.size === 0) {
        onError?.(`"${file.name}" adlı dosya boş (0 bayt) görünüyor.`);
        return;
      }
      if (file.size > maxSizeBytes) {
        onError?.(`"${file.name}" dosyasının boyutu ${maxSizeMB} MB sınırını aşıyor (${formatBytes(file.size)}).`);
        return;
      }

      // Check mime type / extension
      if (accept === 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
        onError?.(`"${file.name}" geçerli bir PDF dosyası gibi görünmüyor.`);
        return;
      }

      if (accept.includes('image/') && !file.type.startsWith('image/') && !file.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
        onError?.(`"${file.name}" geçerli bir görsel (JPG/PNG) formatında değil.`);
        return;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }

    // Reset native input value so user can re-select the same file if needed
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    validateAndPassFiles(e.dataTransfer.files);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => {
        if (!disabled && inputRef.current) {
          inputRef.current.click();
        }
      }}
      className={`relative w-full border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer select-none ${
        disabled
          ? 'opacity-50 cursor-not-allowed bg-muted/20 border-border'
          : isDragOver
          ? 'border-primary bg-primary/5 scale-[0.99]'
          : 'border-border/80 bg-card hover:border-primary/50 hover:bg-muted/10'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => validateAndPassFiles(e.target.files)}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>

        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-foreground">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <button
          type="button"
          disabled={disabled}
          className="inline-flex items-center px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-xs hover:bg-primary/90 transition-colors pointer-events-none"
        >
          {multiple ? 'Dosyaları Seç' : 'Dosya Seç'}
        </button>
      </div>
    </div>
  );
}
