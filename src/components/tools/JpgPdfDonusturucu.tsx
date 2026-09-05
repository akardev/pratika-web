'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PDFDocument, PageSizes } from 'pdf-lib';
import FileDropzone, { formatBytes } from './pdf/FileDropzone';
import PrivacyBadge from './pdf/PrivacyBadge';
import PdfResultCard from './pdf/PdfResultCard';

export interface ImageFileItem {
  id: string;
  file: File;
  previewUrl: string;
}

type PageSizeOption = 'a4' | 'a5' | 'fit';
type OrientationOption = 'portrait' | 'landscape' | 'auto';
type MarginOption = 'none' | 'small' | 'medium';

export default function JpgPdfDonusturucu() {
  const [items, setItems] = useState<ImageFileItem[]>([]);
  const [pageSize, setPageSize] = useState<PageSizeOption>('a4');
  const [orientation, setOrientation] = useState<OrientationOption>('portrait');
  const [margin, setMargin] = useState<MarginOption>('small');
  const [customFileName, setCustomFileName] = useState<string>('pratiksel-gorseller');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; name: string; size: number } | null>(null);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setErrorMessage(null);

    const validNewItems: ImageFileItem[] = [];
    const currentSignatures = new Set(items.map((it) => `${it.file.name}_${it.file.size}_${it.file.lastModified}`));

    for (const file of selectedFiles) {
      const sig = `${file.name}_${file.size}_${file.lastModified}`;
      if (currentSignatures.has(sig)) {
        continue; // duplicate skip
      }
      currentSignatures.add(sig);

      const previewUrl = URL.createObjectURL(file);
      validNewItems.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        previewUrl,
      });
    }

    if (validNewItems.length === 0 && selectedFiles.length > 0) {
      setErrorMessage('Seçtiğiniz görseller zaten listede mevcut.');
      return;
    }

    setItems((prev) => [...prev, ...validNewItems]);
  };

  const handleRemove = (id: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setItems((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index: number) => {
    setItems((prev) => {
      if (index === prev.length - 1) return prev;
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  // Helper to convert any image format to JPEG/PNG bytes via Canvas if needed
  const getCompatibleImageBytes = async (file: File): Promise<{ bytes: Uint8Array; format: 'png' | 'jpg' }> => {
    const rawBuffer = await file.arrayBuffer();
    const isPng = file.type === 'image/png' || file.name.toLowerCase().endsWith('.png');

    if (isPng || file.type === 'image/jpeg' || file.name.match(/\.(jpg|jpeg)$/i)) {
      return {
        bytes: new Uint8Array(rawBuffer),
        format: isPng ? 'png' : 'jpg',
      };
    }

    // For WEBP or other browser image types: draw to canvas and export to PNG
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context could not be created'));
          return;
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              reject(new Error('Image blob conversion failed'));
              return;
            }
            const buf = await blob.arrayBuffer();
            resolve({ bytes: new Uint8Array(buf), format: 'png' });
          },
          'image/png',
          1.0
        );
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Image could not be decoded'));
      };
      img.src = url;
    });
  };

  const handleCreatePdf = async () => {
    if (items.length === 0) {
      setErrorMessage('Lütfen en az 1 görsel seçin.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setStatusMessage('PDF belgesi oluşturuluyor...');

    try {
      const pdfDoc = await PDFDocument.create();

      const marginPt = margin === 'none' ? 0 : margin === 'small' ? 15 : 30;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        setStatusMessage(`"${item.file.name}" görseli işleniyor (${i + 1}/${items.length})...`);

        const { bytes, format } = await getCompatibleImageBytes(item.file);

        let pdfImage;
        if (format === 'png') {
          try {
            pdfImage = await pdfDoc.embedPng(bytes);
          } catch {
            pdfImage = await pdfDoc.embedJpg(bytes);
          }
        } else {
          try {
            pdfImage = await pdfDoc.embedJpg(bytes);
          } catch {
            pdfImage = await pdfDoc.embedPng(bytes);
          }
        }

        const imgWidth = pdfImage.width;
        const imgHeight = pdfImage.height;

        let pageWidth = 0;
        let pageHeight = 0;

        if (pageSize === 'fit') {
          pageWidth = imgWidth + marginPt * 2;
          pageHeight = imgHeight + marginPt * 2;
        } else {
          // Standard Page Dimensions: A4 or A5
          const baseDimensions = pageSize === 'a5' ? PageSizes.A5 : PageSizes.A4;

          let isLandscape = orientation === 'landscape';
          if (orientation === 'auto') {
            isLandscape = imgWidth > imgHeight;
          }

          pageWidth = isLandscape ? baseDimensions[1] : baseDimensions[0];
          pageHeight = isLandscape ? baseDimensions[0] : baseDimensions[1];
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        const availWidth = Math.max(1, pageWidth - marginPt * 2);
        const availHeight = Math.max(1, pageHeight - marginPt * 2);

        // Aspect ratio preservation (Fit with scale)
        const scale = Math.min(availWidth / imgWidth, availHeight / imgHeight);
        const drawWidth = imgWidth * scale;
        const drawHeight = imgHeight * scale;

        // Centered coordinates
        const x = marginPt + (availWidth - drawWidth) / 2;
        const y = marginPt + (availHeight - drawHeight) / 2;

        page.drawImage(pdfImage, {
          x,
          y,
          width: drawWidth,
          height: drawHeight,
        });
      }

      setStatusMessage('Sonuç dosyası derleniyor...');
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const sanitizedName = (customFileName.trim() || 'pratiksel-gorseller')
        .replace(/[^a-zA-Z0-9_-]/g, '-')
        .replace(/-+/g, '-') + '.pdf';

      setResult({
        url,
        name: sanitizedName,
        size: blob.size,
      });
    } catch (err) {
      console.error('PDF Generation Error:', err);
      setErrorMessage('Görseller PDF belgesine dönüştürülürken bir sorun oluştu. Dosyaların geçerli bir görsel olduğundan emin olun.');
    } finally {
      setIsProcessing(false);
      setStatusMessage('');
    }
  };

  const handleReset = () => {
    if (result?.url) {
      URL.revokeObjectURL(result.url);
    }
    items.forEach((it) => {
      if (it.previewUrl) URL.revokeObjectURL(it.previewUrl);
    });
    setResult(null);
    setItems([]);
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
            title="Görselleriniz Başarıyla PDF’e Dönüştürüldü!"
            subtitle="Tüm fotoğraflarınız belirlediğiniz sayfa ve kenar boşluğu düzeninde tek bir PDF belgesine toplandı."
          />
        ) : (
          <div className="space-y-6">
            <FileDropzone
              accept="image/jpeg,image/png,image/webp"
              multiple={true}
              maxFiles={50}
              title="PDF yapmak istediğiniz görselleri (JPG, JPEG, PNG) seçin"
              subtitle="Görselleri sürükleyip bırakabilir veya dosya seçiciyle ekleyebilirsiniz"
              onFilesSelected={handleFilesSelected}
              onError={(err) => setErrorMessage(err)}
              disabled={isProcessing}
            />

            {items.length > 0 && (
              <>
                {/* PDF Sayfa & Düzen Ayarları */}
                <div className="p-5 rounded-2xl bg-muted/20 border border-border space-y-4">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      PDF Sayfa ve Yerleşim Seçenekleri
                    </span>
                    <span className="text-xs text-primary font-bold">
                      {items.length} Görsel / Sayfa
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Sayfa Boyutu */}
                    <div>
                      <label htmlFor="pdf-size-opt" className="block text-xs font-semibold text-foreground mb-1.5">
                        Sayfa Boyutu
                      </label>
                      <select
                        id="pdf-size-opt"
                        value={pageSize}
                        onChange={(e) => setPageSize(e.target.value as PageSizeOption)}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs sm:text-sm font-medium text-foreground focus:ring-2 focus:ring-primary"
                      >
                        <option value="a4">A4 Standart (210 × 297 mm)</option>
                        <option value="a5">A5 Küçük (148 × 210 mm)</option>
                        <option value="fit">Görsel Boyutuna Göre (Otomatik)</option>
                      </select>
                    </div>

                    {/* Sayfa Yönü */}
                    <div>
                      <label htmlFor="pdf-orientation-opt" className="block text-xs font-semibold text-foreground mb-1.5">
                        Sayfa Yönü
                      </label>
                      <select
                        id="pdf-orientation-opt"
                        value={orientation}
                        disabled={pageSize === 'fit'}
                        onChange={(e) => setOrientation(e.target.value as OrientationOption)}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs sm:text-sm font-medium text-foreground focus:ring-2 focus:ring-primary disabled:opacity-50"
                      >
                        <option value="portrait">Dikey (Portrait)</option>
                        <option value="landscape">Yatay (Landscape)</option>
                        <option value="auto">Görsele Göre Otomatik</option>
                      </select>
                    </div>

                    {/* Kenar Boşluğu */}
                    <div>
                      <label htmlFor="pdf-margin-opt" className="block text-xs font-semibold text-foreground mb-1.5">
                        Kenar Boşluğu (Margin)
                      </label>
                      <select
                        id="pdf-margin-opt"
                        value={margin}
                        onChange={(e) => setMargin(e.target.value as MarginOption)}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs sm:text-sm font-medium text-foreground focus:ring-2 focus:ring-primary"
                      >
                        <option value="none">Kenar Boşluğu Yok (0 pt)</option>
                        <option value="small">Küçük Boşluk (15 pt)</option>
                        <option value="medium">Orta Boşluk (30 pt)</option>
                      </select>
                    </div>

                    {/* Çıktı Dosya Adı */}
                    <div>
                      <label htmlFor="pdf-filename-opt" className="block text-xs font-semibold text-foreground mb-1.5">
                        PDF Dosya Adı
                      </label>
                      <input
                        type="text"
                        id="pdf-filename-opt"
                        value={customFileName}
                        onChange={(e) => setCustomFileName(e.target.value)}
                        placeholder="pratiksel-gorseller"
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs sm:text-sm font-medium text-foreground focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Sıralanabilir Görsel Listesi */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                    <span>PDF Sayfa Sırası ({items.length} Görsel)</span>
                    <span>Sırala / Kaldır</span>
                  </div>

                  <div className="space-y-2">
                    {items.map((item, index) => {
                      const displayIndex = (index + 1).toString().padStart(2, '0');
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-3 p-3 sm:p-4 rounded-xl bg-card border border-border/80 shadow-2xs hover:border-border transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs font-mono font-bold text-foreground shrink-0">
                              {displayIndex}
                            </span>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.previewUrl}
                              alt={item.file.name}
                              className="w-10 h-10 object-cover rounded-lg border border-border shrink-0 bg-muted/20"
                            />

                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate max-w-[160px] sm:max-w-xs md:max-w-md">
                                {item.file.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatBytes(item.file.size)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleMoveUp(index)}
                              disabled={isProcessing || index === 0}
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
                              onClick={() => handleMoveDown(index)}
                              disabled={isProcessing || index === items.length - 1}
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
                              onClick={() => handleRemove(item.id)}
                              disabled={isProcessing}
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
                      );
                    })}
                  </div>
                </div>

                {/* Alt Aksiyon Alanı */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/60">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Toplam <strong>{items.length}</strong> görsel dönüştürülmeye hazır.
                  </p>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setItems([])}
                      disabled={isProcessing}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-muted text-foreground text-xs sm:text-sm font-semibold hover:bg-muted/80 transition-colors"
                    >
                      Listeyi Temizle
                    </button>

                    <button
                      type="button"
                      onClick={handleCreatePdf}
                      disabled={isProcessing || items.length === 0}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-xs"
                    >
                      {isProcessing ? statusMessage || 'PDF Oluşturuluyor...' : 'PDF’i Oluştur ve İndir'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Rehber ve SSS */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">JPG’den PDF’e Dönüştürme Nasıl Çalışır?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            JPG PDF Dönüştürücü, fotoğraf, fatura, taranmış belge veya ekran görüntülerinizi (JPG, JPEG, PNG) yüksek kalitede tek bir PDF belgesinde bir araya getirir. Sayfaları yukarı/aşağı butonlarıyla sıralayabilir, A4/A5 veya görsel boyutuna göre sayfa yerleşimini özelleştirebilirsiniz. Tüm işlem cihazınızın tarayıcısında gerçekleşir; dosyalarınız hiçbir sunucuya yüklenmez.
          </p>
        </div>

        <div className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Birden fazla JPG görseli tek bir PDF dosyasında birleştirebilir miyim?</h3>
              <p className="text-muted-foreground">
                Evet. 1, 5, 10 veya daha fazla görseli aynı anda seçebilir, sayfa sırasını dilediğiniz gibi belirleyerek tek bir PDF belgesi halinde indirebilirsiniz.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Görsellerimin netliği ve çözünürlüğü bozulur mu?</h3>
              <p className="text-muted-foreground">
                Hayır. Pratiksel, görsellerin orijinal en-boy oranını (aspect ratio) titizlikle korur. Görseller sıkıştırılıp ezilmeden, tam sayfa çözünürlüğünde PDF içerisine gömülür.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">PNG ve WEBP formatındaki görselleri de ekleyebilir miyim?</h3>
              <p className="text-muted-foreground">
                Evet. JPG ve JPEG dosyalarının yanı sıra PNG ve WEBP formatındaki tüm resimler tam uyumlu olarak dönüştürülebilir.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Dosyalarım sunucuya yükleniyor mu veya kaydediliyor mu?</h3>
              <p className="text-muted-foreground">
                Kesinlikle hayır. Tüm PDF oluşturma süreci %100 yerel olarak tarayıcınızın belleğinde işlenir. İnternete hiçbir dosya aktarımı yapılmaz.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">JPG ve JPEG arasında herhangi bir fark var mı?</h3>
              <p className="text-muted-foreground">
                Hayır. JPG ve JPEG aynı sıkıştırma standardını temsil eden dosya uzantılarıdır. İki uzantı da birebir aynı şekilde işlenir.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Sayfa kenar boşluğu (margin) ne işe yarar?</h3>
              <p className="text-muted-foreground">
                Kenar boşluğu, görselin A4 sayfasının kenarlarına yapışmasını engelleyerek yazdırma işlemlerinde kenar kırpılmalarını önler. Dilerseniz &quot;Kenar Boşluğu Yok&quot; seçeneğini seçerek görselin sayfayı tamamen kaplamasını sağlayabilirsiniz.
              </p>
            </div>
          </div>
        </div>

        {/* İlgili PDF Araçları Bağlantıları */}
        <div className="border-t border-border/60 pt-6">
          <h3 className="text-sm font-bold text-foreground mb-3">İlgili PDF ve Dosya Araçları</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/arac/pdf-jpg-donusturucu"
              className="p-3 rounded-xl border border-border/60 bg-muted/20 hover:border-primary/40 hover:bg-muted/40 transition-colors text-xs font-semibold text-foreground flex items-center justify-between"
            >
              <span>PDF → JPG Dönüştürücü</span>
              <span className="text-primary">&rarr;</span>
            </Link>
            <Link
              href="/arac/pdf-birlestir"
              className="p-3 rounded-xl border border-border/60 bg-muted/20 hover:border-primary/40 hover:bg-muted/40 transition-colors text-xs font-semibold text-foreground flex items-center justify-between"
            >
              <span>PDF Birleştirici</span>
              <span className="text-primary">&rarr;</span>
            </Link>
            <Link
              href="/arac/pdf-bol"
              className="p-3 rounded-xl border border-border/60 bg-muted/20 hover:border-primary/40 hover:bg-muted/40 transition-colors text-xs font-semibold text-foreground flex items-center justify-between"
            >
              <span>PDF Bölücü</span>
              <span className="text-primary">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
