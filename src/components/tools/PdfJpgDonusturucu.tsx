'use client';

import React, { useState } from 'react';
import FileDropzone, { formatBytes } from './pdf/FileDropzone';
import PrivacyBadge from './pdf/PrivacyBadge';

interface ConvertedPageImage {
  pageNumber: number;
  dataUrl: string;
  width: number;
  height: number;
}

export default function PdfJpgDonusturucu() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [scaleFactor, setScaleFactor] = useState<number>(1.5);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [convertedImages, setConvertedImages] = useState<ConvertedPageImage[]>([]);

  const MAX_PAGES_LIMIT = 15;

  const handleFileSelected = async (files: File[]) => {
    if (files.length === 0) return;
    const selectedFile = files[0];
    setErrorMessage(null);
    setConvertedImages([]);

    setIsProcessing(true);
    setStatusMessage('PDF belgesi inceleniyor...');

    try {
      const pdfjs = await import('pdfjs-dist');
      if (typeof window !== 'undefined') {
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      }

      const arrayBuffer = await selectedFile.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);

      const loadingTask = pdfjs.getDocument({
        data,
        isEvalSupported: false,
      });

      const pdfDoc = await loadingTask.promise;

      setFile(selectedFile);
      setTotalPages(pdfDoc.numPages);
    } catch (err: unknown) {
      console.error('PDF Read Error:', err);
      const errorObj = err as { name?: string; message?: string };
      if (errorObj?.name === 'PasswordException') {
        setErrorMessage('Bu PDF belgesi şifrelidir. Parola korumalı dosyaları dönüştürmek için önce şifresini kaldırmalısınız.');
      } else if (errorObj?.name === 'InvalidPDFException') {
        setErrorMessage('Geçersiz veya bozuk bir PDF dosyası seçtiniz.');
      } else {
        setErrorMessage('PDF dosyası okunurken bir hata oluştu. Dosyanın şifresiz ve geçerli olduğundan emin olun.');
      }
    } finally {
      setIsProcessing(false);
      setStatusMessage('');
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsProcessing(true);
    setErrorMessage(null);
    setConvertedImages([]);

    try {
      const pdfjs = await import('pdfjs-dist');
      if (typeof window !== 'undefined') {
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      }

      const arrayBuffer = await file.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);

      const loadingTask = pdfjs.getDocument({
        data,
        isEvalSupported: false,
      });

      const pdfDoc = await loadingTask.promise;
      const pagesToProcess = Math.min(pdfDoc.numPages, MAX_PAGES_LIMIT);
      const images: ConvertedPageImage[] = [];

      for (let i = 1; i <= pagesToProcess; i++) {
        setStatusMessage(`Sayfa ${i} / ${pagesToProcess} JPG görseline dönüştürülüyor...`);
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: scaleFactor });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render white background first
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Render PDF page into canvas
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const renderContext: any = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        images.push({
          pageNumber: i,
          dataUrl,
          width: viewport.width,
          height: viewport.height,
        });
      }

      setConvertedImages(images);
    } catch (err: unknown) {
      console.error('PDF Conversion Error:', err);
      const errorObj = err as { name?: string; message?: string };
      if (errorObj?.name === 'PasswordException') {
        setErrorMessage('Bu PDF belgesi şifre korumalıdır.');
      } else {
        setErrorMessage('PDF sayfaları görsele dönüştürülürken bir hata meydana geldi.');
      }
    } finally {
      setIsProcessing(false);
      setStatusMessage('');
    }
  };

  const handleDownloadSingle = (img: ConvertedPageImage) => {
    const link = document.createElement('a');
    link.href = img.dataUrl;
    const baseName = file?.name.replace(/\.pdf$/i, '') || 'belge';
    link.download = `${baseName}-sayfa-${img.pageNumber}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    convertedImages.forEach((img, idx) => {
      setTimeout(() => {
        handleDownloadSingle(img);
      }, idx * 250);
    });
  };

  const handleReset = () => {
    setFile(null);
    setTotalPages(0);
    setConvertedImages([]);
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

        {!file ? (
          <FileDropzone
            accept="application/pdf"
            multiple={false}
            title="JPG’ye dönüştürmek istediğiniz PDF dosyasını seçin"
            subtitle="Maksimum 50 MB / dosya"
            onFilesSelected={handleFileSelected}
            onError={(err) => setErrorMessage(err)}
            disabled={isProcessing}
          />
        ) : (
          <div className="space-y-6">
            {/* Dosya Özeti */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(file.size)} • <strong>{totalPages} Toplam Sayfa</strong>
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

            {/* Sayfa Sınırı ve Performans Uyarısı */}
            {totalPages > MAX_PAGES_LIMIT && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
                <strong>Tarayıcı Performans Bildirimi:</strong> Cihazınızın kilitlenmesini ve bellek aşımını önlemek amacıyla ilk <strong>{MAX_PAGES_LIMIT} sayfa</strong> dönüştürülecektir.
              </div>
            )}

            {/* Ayarlar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-muted/20 border border-border">
              <div>
                <label htmlFor="scale-select" className="block text-xs font-semibold text-foreground mb-1.5">
                  Görsel Çözünürlüğü &amp; Kalite
                </label>
                <select
                  id="scale-select"
                  value={scaleFactor}
                  onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
                  disabled={isProcessing}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs sm:text-sm font-medium text-foreground focus:ring-2 focus:ring-primary"
                >
                  <option value={1.2}>Standart Kalite (Hızlı Dönüşüm - 1.2x)</option>
                  <option value={1.5}>Yüksek Kalite (Önerilen - 1.5x)</option>
                  <option value={2.0}>Ultra HD Çözünürlük (2.0x)</option>
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <button
                  type="button"
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="w-full h-10 px-5 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm hover:bg-primary/90 disabled:opacity-50 transition-all shadow-xs"
                >
                  {isProcessing ? statusMessage || 'Dönüştürülüyor...' : 'Sayfaları JPG’ye Çevir'}
                </button>
              </div>
            </div>

            {/* Dönüştürülen Görseller Listesi */}
            {convertedImages.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-border/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Dönüştürülen Sayfalar ({convertedImages.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleDownloadAll}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors shadow-2xs"
                  >
                    <span>↓ Tümünü İndir</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {convertedImages.map((img) => (
                    <div
                      key={img.pageNumber}
                      className="p-3 rounded-xl border border-border bg-card flex flex-col space-y-2.5 shadow-2xs"
                    >
                      <div className="relative aspect-3/4 rounded-lg overflow-hidden border border-border/60 bg-muted/20">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.dataUrl}
                          alt={`Sayfa ${img.pageNumber}`}
                          className="w-full h-full object-contain"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold">
                          Sayfa {img.pageNumber}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDownloadSingle(img)}
                        className="w-full py-2 rounded-lg bg-muted text-foreground text-xs font-semibold hover:bg-muted/80 transition-colors text-center"
                      >
                        JPG Olarak İndir
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Rehber ve SSS */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">PDF Dosyası Nasıl JPG Görseline Çevrilir?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            PDF belgenizi yükledikten sonra çözünürlük ayarını seçip <strong>&quot;Sayfaları JPG’ye Çevir&quot;</strong> butonuna tıklayın. Sayfalar HTML5 Canvas teknolojisiyle yüksek çözünürlüklü JPEG formatına dönüştürülür ve tek tıkla cihazınıza kaydedilebilir.
          </p>
        </div>

        <div className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Dönüştürülen görseller nereye kaydedilir?</h3>
              <p className="text-muted-foreground">
                Görseller doğrudan tarayıcınızın İndirilenler (Downloads) klasörüne JPG formatında kaydedilir.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Dosyalarım sunucuya gönderiliyor mu?</h3>
              <p className="text-muted-foreground">
                Hayır. PDF render işlemi tarayıcınızın kendi grafik motoru (Canvas) üzerinden %100 yerel olarak gerçekleşir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
