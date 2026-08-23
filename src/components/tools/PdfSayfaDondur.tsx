'use client';

import React, { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import FileDropzone, { formatBytes } from './pdf/FileDropzone';
import PrivacyBadge from './pdf/PrivacyBadge';
import PdfResultCard from './pdf/PdfResultCard';

export default function PdfSayfaDondur() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageRotations, setPageRotations] = useState<number[]>([]);
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

      // Read existing rotations if any
      const initialRotations: number[] = [];
      for (let i = 0; i < count; i++) {
        const rot = doc.getPage(i).getRotation().angle || 0;
        initialRotations.push(rot);
      }

      setFile(selectedFile);
      setPageCount(count);
      setPageRotations(initialRotations);
    } catch {
      setErrorMessage('Geçerli bir PDF dosyası yüklenemedi. Dosya bozuk veya şifreli olabilir.');
    }
  };

  const rotateSinglePage = (index: number, delta: number) => {
    setPageRotations((prev) => {
      const copy = [...prev];
      const newAngle = ((copy[index] + delta) % 360 + 360) % 360;
      copy[index] = newAngle;
      return copy;
    });
  };

  const rotateAllPages = (delta: number) => {
    setPageRotations((prev) =>
      prev.map((angle) => ((angle + delta) % 360 + 360) % 360)
    );
  };

  const resetRotations = () => {
    setPageRotations(new Array(pageCount).fill(0));
  };

  const handleSaveRotatedPdf = async () => {
    if (!file || pageCount === 0) return;

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);

      for (let i = 0; i < pageCount; i++) {
        const page = pdfDoc.getPage(i);
        page.setRotation(degrees(pageRotations[i]));
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const baseName = file.name.replace(/\.pdf$/i, '');
      setResult({
        url,
        name: `${baseName}-dondurulmus.pdf`,
        size: blob.size,
      });
    } catch {
      setErrorMessage('PDF sayfaları döndürülürken bir sorun oluştu.');
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
    setPageRotations([]);
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
            title="Sayfalar Başarıyla Döndürüldü!"
            subtitle="Belirttiğiniz yönlendirmelere göre yeni PDF belgeniz oluşturuldu."
          />
        ) : !file ? (
          <FileDropzone
            accept="application/pdf"
            multiple={false}
            title="Döndürmek istediğiniz PDF dosyasını seçin"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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

            {/* Toplu Döndürme Araç Çubuğu */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Toplu Sayfa Döndürme
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => rotateAllPages(90)}
                  className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs font-medium hover:bg-muted/80 flex items-center gap-1"
                >
                  <span>↻ Tümünü 90° Döndür</span>
                </button>
                <button
                  type="button"
                  onClick={() => rotateAllPages(180)}
                  className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs font-medium hover:bg-muted/80"
                >
                  180° Çevir
                </button>
                <button
                  type="button"
                  onClick={resetRotations}
                  className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs font-medium hover:bg-muted/80"
                >
                  Sıfırla
                </button>
              </div>
            </div>

            {/* Sayfa Kartları Izgarası */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[420px] overflow-y-auto p-1">
              {Array.from({ length: pageCount }, (_, index) => {
                const rotation = pageRotations[index] || 0;
                return (
                  <div
                    key={index}
                    className="p-4 rounded-xl border border-border/80 bg-card flex flex-col items-center justify-between gap-3 shadow-2xs hover:border-primary/40 transition-all"
                  >
                    <div className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground">
                      <span>Sayfa {index + 1}</span>
                      <span className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono">
                        {rotation}°
                      </span>
                    </div>

                    {/* Dönen Sayfa Simgesi */}
                    <div
                      className="w-14 h-18 rounded border-2 border-dashed border-primary/60 bg-muted/30 flex items-center justify-center transition-transform duration-300 shadow-xs my-2"
                      style={{ transform: `rotate(${rotation}deg)` }}
                    >
                      <span className="text-xs font-bold text-primary">A4</span>
                    </div>

                    {/* Tekil Döndürme Butonları */}
                    <div className="flex items-center gap-2 w-full">
                      <button
                        type="button"
                        onClick={() => rotateSinglePage(index, -90)}
                        className="flex-1 py-1.5 rounded-lg bg-muted text-foreground text-xs font-bold hover:bg-muted/80 transition-colors"
                        title="Sola 90° Döndür"
                      >
                        ↺ -90°
                      </button>
                      <button
                        type="button"
                        onClick={() => rotateSinglePage(index, 90)}
                        className="flex-1 py-1.5 rounded-lg bg-muted text-foreground text-xs font-bold hover:bg-muted/80 transition-colors"
                        title="Sağa 90° Döndür"
                      >
                        ↻ +90°
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Kaydet Butonu */}
            <div className="flex justify-end pt-3">
              <button
                type="button"
                onClick={handleSaveRotatedPdf}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-xs"
              >
                {isProcessing ? 'Döndürülüyor...' : 'Değişiklikleri Kaydet ve İndir'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Rehber ve SSS */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">PDF Sayfası Döndürme Nasıl Yapılır?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Yan veya ters taranmış PDF sayfalarını doğru açıya getirmek için dosyanızı yükleyin. İster tek tek sayfaların altındaki <strong>↻ +90°</strong> butonlarını, isterseniz üstteki <strong>&quot;Tümünü 90° Döndür&quot;</strong> butonunu kullanarak sayfaları kalıcı olarak yönlendirebilirsiniz.
          </p>
        </div>

        <div className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Döndürme işlemi kalıcı mıdır?</h3>
              <p className="text-muted-foreground">
                Evet. İndirdiğiniz yeni PDF dosyasında sayfalar hangi açıyla kaydettiyseniz tüm PDF okuyucularda o şekilde açılır.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Sayfaları tek tek farklı açılara döndürebilir miyim?</h3>
              <p className="text-muted-foreground">
                Evet. Örneğin 1. sayfayı dikey tutup yalnızca 2. sayfayı 90° yatay konuma getirebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
