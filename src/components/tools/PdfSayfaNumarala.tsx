'use client';

import { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default function PdfSayfaNumarala() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [position, setPosition] = useState<'bottom-center' | 'bottom-right' | 'top-right'>('bottom-center');
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setDownloadUrl(null);

    try {
      const buffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      const totalPages = pages.length;

      for (let i = 0; i < totalPages; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();
        const text = `${i + 1} / ${totalPages}`;
        const textSize = 10;
        const textWidth = font.widthOfTextAtSize(text, textSize);

        let x = (width - textWidth) / 2;
        let y = 20;

        if (position === 'bottom-right') {
          x = width - textWidth - 30;
          y = 20;
        } else if (position === 'top-right') {
          x = width - textWidth - 30;
          y = height - 25;
        }

        page.drawText(text, {
          x,
          y,
          size: textSize,
          font,
          color: rgb(0.3, 0.3, 0.3),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch {
      alert('PDF işlenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pdffile" className="block text-sm font-medium text-foreground mb-1">PDF Dosyası Seçin</label>
            <input
              id="pdffile"
              type="file"
              accept=".pdf"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0]);
                  setDownloadUrl(null);
                }
              }}
              className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="pos" className="block text-sm font-medium text-foreground mb-1">Numara Konumu</label>
            <select
              id="pos"
              value={position}
              onChange={(e) => setPosition(e.target.value as 'bottom-center' | 'bottom-right' | 'top-right')}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              <option value="bottom-center">Alt Orta (Sayfa 1 / N)</option>
              <option value="bottom-right">Alt Sağ</option>
              <option value="top-right">Üst Sağ</option>
            </select>
          </div>
        </div>

        {selectedFile && (
          <button
            type="button"
            disabled={loading}
            onClick={handleProcess}
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? 'Numaralandırılıyor...' : 'Sayfa Numaralarını Ekle'}
          </button>
        )}

        {downloadUrl && (
          <div className="mt-8 pt-6 border-t border-border space-y-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">İşlem Tamamlandı:</span>
            <div>
              <a
                href={downloadUrl}
                download="pratikacom-numarali.pdf"
                className="px-6 h-11 inline-flex items-center justify-center bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Numaralandırılmış PDF&apos;i İndir
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
