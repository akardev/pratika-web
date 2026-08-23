'use client';

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import FileDropzone, { formatBytes } from './pdf/FileDropzone';
import PrivacyBadge from './pdf/PrivacyBadge';
import PdfResultCard from './pdf/PdfResultCard';

export function parsePageRange(rangeStr: string, maxPages: number): number[] {
  const parts = rangeStr.split(/[,;\s]+/).map((s) => s.trim()).filter(Boolean);
  const pagesSet = new Set<number>();

  for (const part of parts) {
    if (part.includes('-')) {
      const [startStr, endStr] = part.split('-');
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);

      if (!isNaN(start) && !isNaN(end)) {
        const from = Math.max(1, Math.min(start, end));
        const to = Math.min(maxPages, Math.max(start, end));
        for (let p = from; p <= to; p++) {
          pagesSet.add(p);
        }
      }
    } else {
      const p = parseInt(part, 10);
      if (!isNaN(p) && p >= 1 && p <= maxPages) {
        pagesSet.add(p);
      }
    }
  }

  return Array.from(pagesSet).sort((a, b) => a - b);
}

export default function PdfBol() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [rangeInput, setRangeInput] = useState<string>('');
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
      setRangeInput(count > 1 ? `1-${Math.min(count, 3)}` : '1');
    } catch {
      setErrorMessage('Geçerli bir PDF dosyası yüklenemedi. Dosya bozuk veya şifreli olabilir.');
    }
  };

  const handleSplit = async () => {
    if (!file || pageCount === 0) return;

    const parsedPages = parsePageRange(rangeInput, pageCount);
    if (parsedPages.length === 0) {
      setErrorMessage(`Lütfen geçerli sayfa numaraları girin (1 ile ${pageCount} arası). Örnek: 1-3, 5, 7`);
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const buffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(buffer);
      const outputPdf = await PDFDocument.create();

      // Zero-indexed indices
      const pageIndicesToCopy = parsedPages.map((p) => p - 1);
      const copiedPages = await outputPdf.copyPages(sourcePdf, pageIndicesToCopy);
      copiedPages.forEach((page) => outputPdf.addPage(page));

      const pdfBytes = await outputPdf.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const baseName = file.name.replace(/\.pdf$/i, '');
      setResult({
        url,
        name: `${baseName}-bolunmus.pdf`,
        size: blob.size,
      });
    } catch {
      setErrorMessage('PDF bölünürken beklenmeyen bir hata oluştu.');
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
    setRangeInput('');
    setErrorMessage(null);
  };

  const parsedPagesPreview = file ? parsePageRange(rangeInput, pageCount) : [];

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
            title="PDF Dosyanız Başarıyla Bölündü!"
            subtitle="Belirttiğiniz sayfa aralığı yeni bir PDF belgesi olarak hazırlandı."
          />
        ) : !file ? (
          <FileDropzone
            accept="application/pdf"
            multiple={false}
            title="Bölmek istediğiniz PDF dosyasını seçin"
            subtitle="Maksimum 50 MB / dosya"
            onFilesSelected={handleFileSelected}
            onError={(err) => setErrorMessage(err)}
          />
        ) : (
          <div className="space-y-6">
            {/* Seçili Dosya Özeti */}
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

            {/* Sayfa Aralığı Belirleme */}
            <div className="space-y-3">
              <label htmlFor="range-input" className="block text-sm font-semibold text-foreground">
                Alınacak Sayfa Numaraları veya Aralıkları
              </label>
              <input
                type="text"
                id="range-input"
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value.replace(/[^0-9, -]/g, ''))}
                placeholder="Örnek: 1-3, 5, 8-10"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground text-sm font-mono font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground">
                Virgülle ayırarak tekil sayfaları veya tire (-) ile sayfa aralıklarını belirtebilirsiniz.
              </p>
            </div>

            {/* Hızlı Seçim Butonları */}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => setRangeInput(`1-${pageCount}`)}
                className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs font-medium hover:bg-muted/80 transition-colors"
              >
                Tüm Sayfalar (1-{pageCount})
              </button>
              {pageCount >= 2 && (
                <button
                  type="button"
                  onClick={() => setRangeInput('1')}
                  className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs font-medium hover:bg-muted/80 transition-colors"
                >
                  Yalnızca İlk Sayfa
                </button>
              )}
              {pageCount >= 4 && (
                <button
                  type="button"
                  onClick={() => setRangeInput(`1-${Math.ceil(pageCount / 2)}`)}
                  className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs font-medium hover:bg-muted/80 transition-colors"
                >
                  İlk Yarı (1-{Math.ceil(pageCount / 2)})
                </button>
              )}
            </div>

            {/* Önizleme Özeti */}
            <div className="p-3.5 rounded-xl bg-muted/30 border border-border text-xs text-foreground flex items-center justify-between">
              <span>Seçilen Sayfalar:</span>
              <span className="font-semibold text-primary">
                {parsedPagesPreview.length > 0
                  ? `${parsedPagesPreview.length} Sayfa (${parsedPagesPreview.join(', ')})`
                  : 'Hiçbir sayfa seçilmedi'}
              </span>
            </div>

            {/* Butonlar */}
            <div className="flex justify-end pt-3">
              <button
                type="button"
                onClick={handleSplit}
                disabled={isProcessing || parsedPagesPreview.length === 0}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-xs"
              >
                {isProcessing ? 'Sayfalar Ayrılıyor...' : 'PDF’i Böl ve İndir'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Rehber ve SSS */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">PDF Bölme Nasıl Yapılır?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            PDF Bölücü, çok sayfalı bir PDF dosyasından yalnızca ihtiyacınız olan sayfaları veya sayfa aralıklarını ayırıp yeni bir belge oluşturmanıza yarar. Örneğin <code>1-5, 8, 12-15</code> yazarak yalnızca bu sayfalardan oluşan temiz bir PDF elde edebilirsiniz.
          </p>
        </div>

        <div className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Aralıkları nasıl yazmalıyım?</h3>
              <p className="text-muted-foreground">
                Aralıkları belirtmek için tire (-) işaretini (örneğin 1-4), farklı sayfaları eklemek içinse virgül (,) kullanabilirsiniz (örneğin: 1-4, 7, 10).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Orijinal PDF dosyam bozulur mu?</h3>
              <p className="text-muted-foreground">
                Hayır. Orijinal dosyanız bilgisayarınızda değişmeden kalır; sadece seçtiğiniz sayfalardan oluşan yeni bir kopya oluşturulur.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Bölünen PDF sayfalarında metinler seçilebilir kalır mı?</h3>
              <p className="text-muted-foreground">
                Evet. Sayfaların tüm vektör ve metin yapısı orijinal kalitesiyle yeni belgeye kopyalanır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
