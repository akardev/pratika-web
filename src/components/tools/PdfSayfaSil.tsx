'use client';

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import FileDropzone, { formatBytes } from './pdf/FileDropzone';
import PrivacyBadge from './pdf/PrivacyBadge';
import PdfResultCard from './pdf/PdfResultCard';

export default function PdfSayfaSil() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pagesToDelete, setPagesToDelete] = useState<Set<number>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; name: string; size: number } | null>(null);

  const handleFileSelected = async (files: File[]) => {
    if (files.length === 0) return;
    const selectedFile = files[0];
    setErrorMessage(null);

    try {
      const buffer = await selectedFile.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = doc.getPageCount();

      setFile(selectedFile);
      setPageCount(count);
      setPagesToDelete(new Set());
    } catch {
      setErrorMessage('Geçerli bir PDF dosyası yüklenemedi. Dosya bozuk veya şifreli olabilir.');
    }
  };

  const togglePageDelete = (pageNumber: number) => {
    setPagesToDelete((prev) => {
      const next = new Set(prev);
      if (next.has(pageNumber)) {
        next.delete(pageNumber);
      } else {
        next.add(pageNumber);
      }
      return next;
    });
  };

  const selectOddPages = () => {
    const next = new Set<number>();
    for (let i = 1; i <= pageCount; i += 2) {
      next.add(i);
    }
    setPagesToDelete(next);
  };

  const selectEvenPages = () => {
    const next = new Set<number>();
    for (let i = 2; i <= pageCount; i += 2) {
      next.add(i);
    }
    setPagesToDelete(next);
  };

  const clearSelection = () => {
    setPagesToDelete(new Set());
  };

  const handleDeletePages = async () => {
    if (!file || pageCount === 0) return;

    const remainingPagesCount = pageCount - pagesToDelete.size;
    if (remainingPagesCount <= 0) {
      setErrorMessage('Tüm sayfaları silemezsiniz. Yeni PDF belgesinde en az 1 sayfa kalmalıdır.');
      return;
    }

    if (pagesToDelete.size === 0) {
      setErrorMessage('Lütfen silmek istediğiniz en az bir sayfa seçin.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const buffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(buffer);
      const outputPdf = await PDFDocument.create();

      // Collect 0-indexed indices of pages to KEEP
      const keepIndices: number[] = [];
      for (let i = 1; i <= pageCount; i++) {
        if (!pagesToDelete.has(i)) {
          keepIndices.push(i - 1);
        }
      }

      const copiedPages = await outputPdf.copyPages(sourcePdf, keepIndices);
      copiedPages.forEach((page) => outputPdf.addPage(page));

      const pdfBytes = await outputPdf.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const baseName = file.name.replace(/\.pdf$/i, '');
      setResult({
        url,
        name: `${baseName}-sayfalar-silindi.pdf`,
        size: blob.size,
      });
    } catch {
      setErrorMessage('Sayfalar silinirken beklenmeyen bir hata oluştu.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    if (result?.url) {
      URL.revokeObjectURL(result.url);
    }
    setResult(null);
    setFile(null);
    setPageCount(0);
    setPagesToDelete(new Set());
    setErrorMessage(null);
  };

  return (
    <div className="w-full space-y-8">
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs space-y-6">
        <PrivacyBadge />

        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {result ? (
          <PdfResultCard
            fileName={result.name}
            fileSizeBytes={result.size}
            downloadUrl={result.url}
            onReset={handleReset}
            title="Seçilen Sayfalar Başarıyla Silindi!"
            subtitle="İstenmeyen sayfalar kaldırılarak temizlenmiş yeni PDF belgeniz hazırlandı."
          />
        ) : !file ? (
          <FileDropzone
            accept="application/pdf"
            multiple={false}
            title="Sayfalarını silmek istediğiniz PDF dosyasını seçin"
            subtitle="Maksimum 50 MB / dosya"
            onFilesSelected={handleFileSelected}
            onError={(err) => setErrorMessage(err)}
          />
        ) : (
          <div className="space-y-6">
            {/* Dosya Özeti */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(file.size)} • <strong>{pageCount} Toplam Sayfa</strong>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-rose-500 hover:underline px-2 py-1"
              >
                Farklı Dosya Seç
              </button>
            </div>

            {/* Hızlı Seçim ve Filtreleme */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Silinecek Sayfalara Tıklayın ({pagesToDelete.size} Sayfa Seçildi)
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={selectOddPages}
                  className="px-2.5 py-1 rounded-lg bg-muted text-foreground text-xs font-medium hover:bg-muted/80"
                >
                  Tek Sayfalar
                </button>
                <button
                  type="button"
                  onClick={selectEvenPages}
                  className="px-2.5 py-1 rounded-lg bg-muted text-foreground text-xs font-medium hover:bg-muted/80"
                >
                  Çift Sayfalar
                </button>
                <button
                  type="button"
                  onClick={clearSelection}
                  className="px-2.5 py-1 rounded-lg bg-muted text-foreground text-xs font-medium hover:bg-muted/80"
                >
                  Temizle
                </button>
              </div>
            </div>

            {/* Sayfa Izgarası (Grid) */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-[380px] overflow-y-auto p-1">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNum) => {
                const isSelectedForDelete = pagesToDelete.has(pageNum);
                return (
                  <div
                    key={pageNum}
                    onClick={() => togglePageDelete(pageNum)}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all aspect-3/4 select-none ${
                      isSelectedForDelete
                        ? 'border-rose-500 bg-rose-500/10 scale-95'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className="w-8 h-10 rounded border border-border bg-background flex items-center justify-center text-xs font-bold text-muted-foreground mb-2 shadow-2xs">
                      {pageNum}
                    </div>

                    <span className="text-xs font-semibold text-foreground">
                      Sayfa {pageNum}
                    </span>

                    {isSelectedForDelete ? (
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold">
                        ✕
                      </span>
                    ) : (
                      <span className="text-[10px] text-muted-foreground mt-1">
                        Koru
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Alt İşlem Butonları */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/60">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Kalan Sayfa Sayısı: <strong>{pageCount - pagesToDelete.size}</strong> / {pageCount}
              </p>

              <button
                type="button"
                onClick={handleDeletePages}
                disabled={isProcessing || pagesToDelete.size === 0 || pageCount - pagesToDelete.size <= 0}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-xs"
              >
                {isProcessing ? 'Sayfalar Siliniyor...' : `${pagesToDelete.size} Sayfayı Sil ve İndir`}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Rehber ve SSS */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">PDF Sayfası Nasıl Silinir?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Belgenizdeki boş, hatalı veya gereksiz sayfaları çıkarmak için PDF dosyanızı yükleyin. Açılan sayfalar ızgarasında çıkarmak istediğiniz sayfaların üzerine tıklayarak kırmızı işaretleyin ve <strong>&quot;Sayfaları Sil ve İndir&quot;</strong> butonuna basın.
          </p>
        </div>

        <div className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Birden fazla sayfayı aynı anda silebilir miyim?</h3>
              <p className="text-muted-foreground">
                Evet, dilediğiniz kadar sayfayı tek tek seçebilir veya &quot;Tek Sayfalar&quot; / &quot;Çift Sayfalar&quot; butonlarıyla toplu seçim yapabilirsiniz.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Tüm sayfaları silersem ne olur?</h3>
              <p className="text-muted-foreground">
                Geçerli bir PDF belgesi oluşturulabilmesi için belgede en az 1 sayfa kalmalıdır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
