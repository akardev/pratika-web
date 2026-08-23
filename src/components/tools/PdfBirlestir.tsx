'use client';

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import FileDropzone from './pdf/FileDropzone';
import FileList, { ManagedFileItem } from './pdf/FileList';
import PrivacyBadge from './pdf/PrivacyBadge';
import PdfResultCard from './pdf/PdfResultCard';

export default function PdfBirlestir() {
  const [items, setItems] = useState<ManagedFileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; name: string; size: number } | null>(null);

  const handleFilesSelected = async (files: File[]) => {
    setErrorMessage(null);

    const newItems: ManagedFileItem[] = [];
    for (const file of files) {
      const id = Math.random().toString(36).substring(2, 9);
      try {
        const buffer = await file.arrayBuffer();
        const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        newItems.push({
          id,
          file,
          pageCount: doc.getPageCount(),
        });
      } catch {
        newItems.push({
          id,
          file,
        });
      }
    }

    setItems((prev) => [...prev, ...newItems]);
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
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

  const handleMerge = async () => {
    if (items.length < 2) {
      setErrorMessage('Birleştirme işlemi için en az 2 adet PDF dosyası eklemelisiniz.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setStatusMessage('Yeni PDF belgesi oluşturuluyor...');

    try {
      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        setStatusMessage(`"${item.file.name}" dosyası işleniyor (${i + 1}/${items.length})...`);
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      setStatusMessage('Sonuç dosyası derleniyor...');
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setResult({
        url,
        name: 'birlestirilmis-belge.pdf',
        size: blob.size,
      });
    } catch {
      setErrorMessage(
        'PDF dosyaları birleştirilirken bir sorun oluştu. Dosyaların şifreli veya bozuk olmadığından emin olun.'
      );
    } finally {
      setIsProcessing(false);
      setStatusMessage('');
    }
  };

  const handleReset = () => {
    if (result?.url) {
      URL.revokeObjectURL(result.url);
    }
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
            title="PDF Dosyalarınız Başarıyla Birleştirildi!"
            subtitle="Belgeleriniz belirttiğiniz sıralamaya uygun olarak tek bir PDF dosyasında toplandı."
          />
        ) : (
          <div className="space-y-6">
            <FileDropzone
              accept="application/pdf"
              multiple={true}
              maxFiles={30}
              title="Birleştirmek istediğiniz PDF dosyalarını seçin"
              subtitle="Birden fazla PDF dosyasını aynı anda yükleyebilirsiniz"
              onFilesSelected={handleFilesSelected}
              onError={(err) => setErrorMessage(err)}
              disabled={isProcessing}
            />

            <FileList
              items={items}
              onRemove={handleRemove}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              disabled={isProcessing}
            />

            {items.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/60">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Toplam <strong>{items.length}</strong> dosya seçildi.
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
                    onClick={handleMerge}
                    disabled={isProcessing || items.length < 2}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-xs"
                  >
                    {isProcessing ? statusMessage || 'İşleniyor...' : 'PDF’leri Birleştir'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Rehber ve SSS */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">PDF Birleştirici Nasıl Çalışır?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Pratika PDF Birleştirici, iki veya daha fazla bağımsız PDF belgesini tek bir dosyada bir araya getirmenizi sağlar. Dosyalarınızı yükledikten sonra yukarı/aşağı okları kullanarak dilediğiniz sıraya dizin ve <strong>&quot;PDF’leri Birleştir&quot;</strong> butonuna tıklayın. Tüm birleştirme işlemi tarayıcınızın kendi işlem gücü ile güvenle tamamlanır.
          </p>
        </div>

        <div className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Birleştirme sırasında PDF kalitesi veya metin netliği bozulur mu?</h3>
              <p className="text-muted-foreground">
                Hayır. PDF sayfaları yeniden sıkıştırılmaz veya rasterize edilmez. Orijinal vektör yazı tipleri, çözünürlükler ve düzenler birebir korunur.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Dosyalarım internete yükleniyor mu?</h3>
              <p className="text-muted-foreground">
                Kesinlikle hayır. Belgeleriniz sunucularımıza gönderilmez; tamamen cihazınızın RAM belleğinde birleştirilip anında size sunulur.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Kaç adet PDF dosyasını aynı anda birleştirebilirim?</h3>
              <p className="text-muted-foreground">
                Tek seferde 30 adede kadar PDF belgesini kolayca birleştirebilirsiniz.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Şifreli PDF dosyalarını birleştirebilir miyim?</h3>
              <p className="text-muted-foreground">
                Şifre korumalı PDF belgelerinin birleştirilebilmesi için öncelikle şifresinin kaldırılmış olması gerekmektedir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
