'use client';

import React, { useState } from 'react';
import { PDFDocument, PageSizes } from 'pdf-lib';
import FileDropzone from './pdf/FileDropzone';
import FileList, { ManagedFileItem } from './pdf/FileList';
import PrivacyBadge from './pdf/PrivacyBadge';
import PdfResultCard from './pdf/PdfResultCard';

type PageFormat = 'a4' | 'fit';
type Orientation = 'portrait' | 'landscape' | 'auto';
type MarginOption = 'none' | 'small' | 'normal';

export default function GorselleriPdfYap() {
  const [items, setItems] = useState<ManagedFileItem[]>([]);
  const [pageSize, setPageSize] = useState<PageFormat>('a4');
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [margin, setMargin] = useState<MarginOption>('small');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; name: string; size: number } | null>(null);

  const handleFilesSelected = (files: File[]) => {
    setErrorMessage(null);
    const newItems: ManagedFileItem[] = files.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setItems((prev) => [...prev, ...newItems]);
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

  const handleConvertToPdf = async () => {
    if (items.length === 0) {
      setErrorMessage('Lütfen en az bir görsel seçin.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setStatusMessage('PDF dokümanı hazırlanıyor...');

    try {
      const pdfDoc = await PDFDocument.create();

      const marginPt = margin === 'none' ? 0 : margin === 'small' ? 15 : 30;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        setStatusMessage(`"${item.file.name}" görseli işleniyor (${i + 1}/${items.length})...`);

        const arrayBuffer = await item.file.arrayBuffer();
        let pdfImage;

        const isPng = item.file.type === 'image/png' || item.file.name.toLowerCase().endsWith('.png');
        if (isPng) {
          try {
            pdfImage = await pdfDoc.embedPng(arrayBuffer);
          } catch {
            pdfImage = await pdfDoc.embedJpg(arrayBuffer);
          }
        } else {
          try {
            pdfImage = await pdfDoc.embedJpg(arrayBuffer);
          } catch {
            pdfImage = await pdfDoc.embedPng(arrayBuffer);
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
          // A4 format (595.28 x 841.89 pt)
          let isLandscape = orientation === 'landscape';
          if (orientation === 'auto') {
            isLandscape = imgWidth > imgHeight;
          }

          pageWidth = isLandscape ? PageSizes.A4[1] : PageSizes.A4[0];
          pageHeight = isLandscape ? PageSizes.A4[0] : PageSizes.A4[1];
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        const availWidth = pageWidth - marginPt * 2;
        const availHeight = pageHeight - marginPt * 2;

        const scale = Math.min(availWidth / imgWidth, availHeight / imgHeight);
        const drawWidth = imgWidth * scale;
        const drawHeight = imgHeight * scale;

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

      setResult({
        url,
        name: 'gorseller.pdf',
        size: blob.size,
      });
    } catch {
      setErrorMessage('Görseller PDF dosyasına dönüştürülürken bir sorun oluştu.');
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
            subtitle="Tüm fotoğraflarınız yüksek kalitede tek bir PDF belgesine eklendi."
          />
        ) : (
          <div className="space-y-6">
            <FileDropzone
              accept="image/jpeg,image/png,image/webp"
              multiple={true}
              maxFiles={40}
              title="PDF yapmak istediğiniz görselleri (JPG, PNG) seçin"
              subtitle="Birden fazla görseli aynı anda ekleyebilir ve sıralayabilirsiniz"
              onFilesSelected={handleFilesSelected}
              onError={(err) => setErrorMessage(err)}
              disabled={isProcessing}
            />

            {items.length > 0 && (
              <>
                {/* Sayfa & Düzen Ayarları */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-muted/20 border border-border">
                  <div>
                    <label htmlFor="pdf-size" className="block text-xs font-semibold text-foreground mb-1.5">
                      Sayfa Boyutu
                    </label>
                    <select
                      id="pdf-size"
                      value={pageSize}
                      onChange={(e) => setPageSize(e.target.value as PageFormat)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs sm:text-sm font-medium text-foreground focus:ring-2 focus:ring-primary"
                    >
                      <option value="a4">A4 Standart Belge</option>
                      <option value="fit">Görsel Boyutuna Göre (Otomatik)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="pdf-orientation" className="block text-xs font-semibold text-foreground mb-1.5">
                      Sayfa Yönü
                    </label>
                    <select
                      id="pdf-orientation"
                      value={orientation}
                      disabled={pageSize === 'fit'}
                      onChange={(e) => setOrientation(e.target.value as Orientation)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs sm:text-sm font-medium text-foreground focus:ring-2 focus:ring-primary disabled:opacity-50"
                    >
                      <option value="portrait">Dikey (Portrait)</option>
                      <option value="landscape">Yatay (Landscape)</option>
                      <option value="auto">Görsele Göre Otomatik</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="pdf-margin" className="block text-xs font-semibold text-foreground mb-1.5">
                      Kenar Boşluğu (Margin)
                    </label>
                    <select
                      id="pdf-margin"
                      value={margin}
                      onChange={(e) => setMargin(e.target.value as MarginOption)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs sm:text-sm font-medium text-foreground focus:ring-2 focus:ring-primary"
                    >
                      <option value="none">Kenar Boşluğu Yok (Tam Sayfa)</option>
                      <option value="small">Küçük Boşluk (15pt)</option>
                      <option value="normal">Standart Boşluk (30pt)</option>
                    </select>
                  </div>
                </div>

                <FileList
                  items={items}
                  onRemove={handleRemove}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  disabled={isProcessing}
                />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/60">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Toplam <strong>{items.length}</strong> görsel seçildi.
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
                      onClick={handleConvertToPdf}
                      disabled={isProcessing || items.length === 0}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-xs"
                    >
                      {isProcessing ? statusMessage || 'Dönüştürülüyor...' : 'Görselleri PDF’e Dönüştür'}
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
          <h2 className="text-lg font-bold text-foreground mb-2">JPG ve PNG Görseller Nasıl PDF Yapılır?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Fotoğraflarınızı, taranmış evraklarınızı veya dekont ekran görüntülerinizi yükleyin. Ok butonlarıyla sayfa sırasını belirleyin, dilerseniz A4 boyutlandırma ve sayfa yönü seçeneklerini seçin ve <strong>&quot;Görselleri PDF’e Dönüştür&quot;</strong> butonuna basın.
          </p>
        </div>

        <div className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Görsellerin çözünürlüğü ve kalitesi düşer mi?</h3>
              <p className="text-muted-foreground">
                Hayır. Görseller doğrudan orijinal piksel kaliteleriyle PDF sayfasına gömülür ve kalite kaybı yaşanmaz.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Hangi görsel formatlarını yükleyebilirim?</h3>
              <p className="text-muted-foreground">
                JPG, JPEG, PNG ve WEBP formatındaki tüm resim dosyaları desteklenmektedir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
