'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import type { BusinessData } from './PanelDashboardOverview';
import { generateQrSvgString } from '@/lib/qrcode';
import { useOrigin } from '@/lib/useOrigin';
import styles from './panel.module.css';

export default function PanelQrManager({ business }: { business: BusinessData }) {
  const [copied, setCopied] = useState(false);

  const origin = useOrigin();
  const publicUrl = `${origin}/m/${business.slug}`;

  const svgMarkup = useMemo(() => {
    return generateQrSvgString(publicUrl, {
      margin: 2,
      color: { dark: '#0a1d37', light: '#ffffff' },
    });
  }, [publicUrl]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadSvg = () => {
    if (!svgMarkup) return;
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pratika-qr-${business.slug}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = () => {
    if (!svgMarkup) return;
    const canvas = document.createElement('canvas');
    const size = 1024;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    const svgBlob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = `pratika-qr-${business.slug}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    img.src = url;
  };

  const handleDownloadPdf = async () => {
    try {
      // Render QR as PNG data for PDF embedding
      const canvas = document.createElement('canvas');
      const size = 600;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      const svgBlob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
      const imgUrl = URL.createObjectURL(svgBlob);

      img.onload = async () => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        URL.revokeObjectURL(imgUrl);

        const pngDataUrl = canvas.toDataURL('image/png');
        const pngImageBytes = await fetch(pngDataUrl).then((res) => res.arrayBuffer());

        // Create PDF Document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([420, 595]); // A5 Portrait
        const { width, height } = page.getSize();

        const embeddedQr = await pdfDoc.embedPng(pngImageBytes);
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Header Background
        page.drawRectangle({
          x: 0,
          y: height - 110,
          width,
          height: 110,
          color: rgb(10 / 255, 29 / 255, 55 / 255),
        });

        // Brand Text
        page.drawText('PRATIKA QR MENU', {
          x: 30,
          y: height - 45,
          size: 10,
          font: fontBold,
          color: rgb(217 / 255, 119 / 255, 80 / 255),
        });

        page.drawText(business.name.toUpperCase(), {
          x: 30,
          y: height - 75,
          size: 18,
          font: fontBold,
          color: rgb(1, 1, 1),
        });

        // QR Code in Center
        const qrDim = 240;
        page.drawImage(embeddedQr, {
          x: (width - qrDim) / 2,
          y: (height - qrDim) / 2 - 20,
          width: qrDim,
          height: qrDim,
        });

        // Instructions below QR
        page.drawText('Telefonunuzun kamerasiyla okutun', {
          x: 30,
          y: 120,
          size: 13,
          font: fontBold,
          color: rgb(10 / 255, 29 / 255, 55 / 255),
        });

        page.drawText(publicUrl, {
          x: 30,
          y: 95,
          size: 10,
          font: fontRegular,
          color: rgb(100 / 255, 116 / 255, 139 / 255),
        });

        // Footer Note
        page.drawText('Menunuzu guncellediginizde bu QR kod degismez.', {
          x: 30,
          y: 40,
          size: 9,
          font: fontRegular,
          color: rgb(100 / 255, 116 / 255, 139 / 255),
        });

        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
        const downloadUrl = URL.createObjectURL(pdfBlob);

        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `pratika-masa-karti-${business.slug}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
      };

      img.src = imgUrl;
    } catch (err) {
      console.error('PDF export error:', err);
    }
  };

  return (
    <div>
      <div className={styles.sectionCardHeader}>
        <div>
          <h2>QR Kod ve Yayın Yönetimi</h2>
          <p className="mt-1 text-xs text-slate-500">
            Masalarınıza koyacağınız QR kod dosyasını tüm formatlarda (PNG, SVG, PDF) yüksek çözünürlükte indirin.
          </p>
        </div>
      </div>

      <div className={styles.sectionCard}>
        <div className={styles.qrExportCard}>
          <div className={styles.qrPreviewBox}>
            <div
              className={styles.qrSvgWrap}
              dangerouslySetInnerHTML={{ __html: svgMarkup }}
              aria-label={`${business.name} QR Kodu`}
            />
            <strong className="block text-xs font-bold text-slate-900">{business.name}</strong>
            <span className="text-[10px] text-slate-500">{business.slug}</span>
          </div>

          <div>
            <span className="inline-block rounded-md bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">
              🟢 Sabit Bağlantı Aktif
            </span>
            <h3 className="mt-2 text-xl font-extrabold text-slate-900">QR Kodunuz Masalara Yerleştirmeye Hazır</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Bu QR kod doğrudan işletmenizin sabit menü bağlantısına (<code suppressHydrationWarning>{publicUrl}</code>) yönlenir.
              Panelden fiyat değiştirdiğinizde, ürün ekleyip sildiğinizde <strong>masadaki QR kodunuzu ASLA yeniden bastırmanız gerekmez.</strong>
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button type="button" onClick={handleCopyLink} className={styles.copyUrlBtn}>
                {copied ? '✓ Bağlantı Kopyalandı' : '🔗 Bağlantıyı Kopyala'}
              </button>
              <Link
                href={`/m/${business.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionSecondaryBtn}
              >
                Canlı Menüyü Aç ↗
              </Link>
            </div>

            <div className={styles.qrDownloadRow}>
              <button type="button" onClick={handleDownloadPng} className={styles.qrDownloadBtn}>
                📥 PNG İndir (Yüksek Çözünürlük)
              </button>
              <button type="button" onClick={handleDownloadSvg} className={styles.qrDownloadBtn}>
                📐 Vektörel SVG İndir (Matbaa İçin)
              </button>
              <button type="button" onClick={handleDownloadPdf} className={styles.qrDownloadBtn}>
                📄 Masa Kartı PDF İndir (Baskıya Hazır)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PRINTING GUIDE CARD */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h4 className="text-sm font-bold text-slate-900">💡 QR Kodunuzu Nasıl Bastırabilirsiniz?</h4>
        <div className="mt-4 grid gap-4 text-xs text-slate-600 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <strong className="block text-slate-900">1. Ofis / Kafe Yazıcınız</strong>
            <p className="mt-1 leading-relaxed">PDF formatında indirip doğrudan kendi A4/A5 yazıcınızda basarak masaüstü pleksi ayaklıklara yerleştirebilirsiniz.</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <strong className="block text-slate-900">2. Matbaa / Reklamcı</strong>
            <p className="mt-1 leading-relaxed">SVG vektörel dosyasını matbaanıza ileterek ahşap, pleksi, metal stand veya masa stickerı bastırabilirsiniz.</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <strong className="block text-slate-900">3. Sıfır Yenileme Zahmeti</strong>
            <p className="mt-1 leading-relaxed">Fiyatlarınız her değiştiğinde sadece panelden güncelleyin; basılı QR kartlarınıza hiç dokunmayın.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
