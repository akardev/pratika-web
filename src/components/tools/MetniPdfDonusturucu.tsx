'use client';

import React, { useState, useMemo } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

type PageSizeOption = 'A4' | 'A5' | 'Letter';
type OrientationOption = 'portrait' | 'landscape';
type FontSizeOption = 12 | 14 | 16 | 18 | 20;
type FontFamilyOption = 'arial' | 'georgia' | 'courier';
type MarginOption = 'small' | 'medium' | 'large';

// Boyut tanımları (pt cinsinden 72 dpi: 1 inç = 72 pt, 1 mm ≈ 2.83465 pt)
const PAGE_DIMENSIONS: Record<PageSizeOption, { width: number; height: number }> = {
  A4: { width: 595.28, height: 841.89 },
  A5: { width: 419.53, height: 595.28 },
  Letter: { width: 612.0, height: 792.0 },
};

const MARGIN_VALUES: Record<MarginOption, number> = {
  small: 28.35, // ~10mm
  medium: 56.7, // ~20mm
  large: 85.04, // ~30mm
};

const FONT_FILES: Record<FontFamilyOption, { file: string; cssFont: string; label: string }> = {
  arial: {
    file: '/fonts/roboto.ttf',
    cssFont: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    label: 'Arial / Sans-serif',
  },
  georgia: {
    file: '/fonts/notoserif.ttf',
    cssFont: 'Georgia, Cambria, "Times New Roman", Times, serif',
    label: 'Georgia / Serif',
  },
  courier: {
    file: '/fonts/robotomono.ttf',
    cssFont: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    label: 'Courier New / Monospace',
  },
};

const FONT_CACHE: Record<string, ArrayBuffer> = {};

export default function MetniPdfDonusturucu() {
  const [text, setText] = useState('');
  const [pageSize, setPageSize] = useState<PageSizeOption>('A4');
  const [orientation, setOrientation] = useState<OrientationOption>('portrait');
  const [fontSize, setFontSize] = useState<FontSizeOption>(14);
  const [fontFamily, setFontFamily] = useState<FontFamilyOption>('arial');
  const [margin, setMargin] = useState<MarginOption>('medium');
  const [fileName, setFileName] = useState('pratika-belge');
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Karakter ve kelime sayısı
  const charCount = text.length;
  const wordCount = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [text]);

  // Tahmini sayfa sayısı
  const estimatedPages = useMemo(() => {
    if (!text.trim()) return 1;
    const baseCapacity = pageSize === 'A5' ? 1100 : pageSize === 'Letter' ? 2000 : 2300;
    const fontMultiplier = 14 / fontSize;
    const marginMultiplier = margin === 'small' ? 1.15 : margin === 'large' ? 0.88 : 1.0;
    const capacity = baseCapacity * fontMultiplier * marginMultiplier;
    return Math.max(1, Math.ceil(text.length / capacity));
  }, [text, pageSize, fontSize, margin]);


  // Örnek metin yükleme
  const handleLoadSample = () => {
    setText(
      `PRATİKA BELGE VE DÖKÜMAN ŞABLONU\n\n` +
      `Tarih: ${new Date().toLocaleDateString('tr-TR')}\n\n` +
      `Bu belge, Pratika "Metni PDF'e Dönüştür" aracı kullanılarak doğrudan tarayıcı üzerinde oluşturulmuştur.\n\n` +
      `Öne Çıkan Özellikler:\n` +
      `1. Türkçe Karakter Desteği: ç, Ç, ğ, Ğ, ı, İ, ö, Ö, ş, Ş, ü, Ü.\n` +
      `2. %100 İstemci Taraflı Güvenlik: Yazdığınız veya yapıştırdığınız metinler hiçbir zaman sunucuya gönderilmez.\n` +
      `3. Çok Sayfalı Taşma Yönetimi: Metin uzadıkça yeni sayfalar otomatik olarak eklenir ve sayfa altbilgisi numaralandırılır.\n` +
      `4. Özel Sayfa ve Font Ayarları: A4, A5, Letter boyutları; dikey/yatay yön ve farklı tipografi seçenekleri.\n\n` +
      `Hızlı, sade, güvenilir ve pratik dijital araçlar için Pratika'yı tercih ettiğiniz için teşekkür ederiz.`
    );
    setStatusMessage({ type: 'info', text: 'Örnek metin başarıyla yüklendi.' });
  };

  // Temizle
  const handleClear = () => {
    setText('');
    setStatusMessage({ type: 'info', text: 'Metin alanı temizlendi.' });
  };

  // PDF Oluştur ve İndir
  const handleGeneratePdf = async () => {
    if (!text.trim()) {
      setStatusMessage({ type: 'error', text: 'PDF oluşturmak için önce metin girin.' });
      return;
    }

    setIsGenerating(true);
    setStatusMessage(null);

    try {
      // 1. PDF dokümanı oluştur ve fontkit kaydet
      const pdfDoc = await PDFDocument.create();
      pdfDoc.registerFontkit(fontkit);

      // 2. Seçilen font dosyasını yükle (varsa önbellekten)
      const fontUrl = FONT_FILES[fontFamily].file;
      let fontBytes = FONT_CACHE[fontUrl];
      if (!fontBytes) {
        const fontResponse = await fetch(fontUrl);
        if (!fontResponse.ok) {
          throw new Error(`Yazı tipi dosyası yüklenemedi: ${fontUrl}`);
        }
        fontBytes = await fontResponse.arrayBuffer();
        FONT_CACHE[fontUrl] = fontBytes;
      }
      const customFont = await pdfDoc.embedFont(fontBytes);


      // 3. Sayfa boyutunu hesapla
      const baseDim = PAGE_DIMENSIONS[pageSize];
      const pageW = orientation === 'portrait' ? baseDim.width : baseDim.height;
      const pageH = orientation === 'portrait' ? baseDim.height : baseDim.width;
      const marginPt = MARGIN_VALUES[margin];

      const contentWidth = pageW - marginPt * 2;
      const lineHeight = fontSize * 1.45;
      const marginBottom = marginPt + 24; // Alt bilgi için alan

      // 4. Metni satırlara böl (wrapping)
      const lines: string[] = [];
      const rawParagraphs = text.split('\n');

      for (const paragraph of rawParagraphs) {
        if (paragraph === '') {
          lines.push(''); // Boş satır korunsun
          continue;
        }

        const words = paragraph.split(' ');
        let currentLine = '';

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const textWidth = customFont.widthOfTextAtSize(testLine, fontSize);

          if (textWidth <= contentWidth) {
            currentLine = testLine;
          } else {
            // Kelime tek başına satırı aşıyorsa harf harf böl
            if (!currentLine) {
              let chunk = '';
              for (const char of word) {
                const testChunk = chunk + char;
                if (customFont.widthOfTextAtSize(testChunk, fontSize) <= contentWidth) {
                  chunk = testChunk;
                } else {
                  lines.push(chunk);
                  chunk = char;
                }
              }
              currentLine = chunk;
            } else {
              lines.push(currentLine);
              // Kalan kelime tek başına sığıyor mu kontrol et
              if (customFont.widthOfTextAtSize(word, fontSize) <= contentWidth) {
                currentLine = word;
              } else {
                let chunk = '';
                for (const char of word) {
                  const testChunk = chunk + char;
                  if (customFont.widthOfTextAtSize(testChunk, fontSize) <= contentWidth) {
                    chunk = testChunk;
                  } else {
                    lines.push(chunk);
                    chunk = char;
                  }
                }
                currentLine = chunk;
              }
            }
          }
        }
        if (currentLine) {
          lines.push(currentLine);
        }
      }

      // 5. Sayfaları ve metin bloklarını çiz
      let currentPage = pdfDoc.addPage([pageW, pageH]);
      let currentY = pageH - marginPt - fontSize;

      const pagesList = [currentPage];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Sayfa sonuna geldik mi?
        if (currentY - lineHeight < marginBottom) {
          currentPage = pdfDoc.addPage([pageW, pageH]);
          pagesList.push(currentPage);
          currentY = pageH - marginPt - fontSize;
        }

        if (line.length > 0) {
          currentPage.drawText(line, {
            x: marginPt,
            y: currentY,
            size: fontSize,
            font: customFont,
            color: rgb(0.12, 0.14, 0.18),
          });
        }

        currentY -= lineHeight;
      }

      // 6. Sayfa numaraları altbilgisini çiz
      const totalPages = pagesList.length;
      for (let pIdx = 0; pIdx < totalPages; pIdx++) {
        const p = pagesList[pIdx];
        const footerText = `Sayfa ${pIdx + 1} / ${totalPages}`;
        const footerSize = 9;
        const footerWidth = customFont.widthOfTextAtSize(footerText, footerSize);

        p.drawText(footerText, {
          x: pageW - marginPt - footerWidth,
          y: marginPt - 12,
          size: footerSize,
          font: customFont,
          color: rgb(0.55, 0.6, 0.68),
        });
      }

      // 7. PDF'i byte dizisi olarak kaydet ve indir
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(blob);

      const cleanBaseName = fileName.trim().replace(/\.pdf$/i, '') || 'pratika-belge';
      const finalFileName = `${cleanBaseName}.pdf`;

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = finalFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setStatusMessage({
        type: 'success',
        text: `"${finalFileName}" başarıyla oluşturuldu ve indirildi (${totalPages} Sayfa).`,
      });
    } catch (err) {
      console.error('PDF oluşturma hatası:', err);
      setStatusMessage({
        type: 'error',
        text: 'PDF oluşturulurken bir sorun oluştu. Metni kontrol edip tekrar deneyin.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Gizlilik Güvenlik Rozeti */}
      <div className="flex items-center gap-2 p-3 sm:p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-800 text-xs font-medium">
        <span className="shrink-0 text-sm">🔒</span>
        <span>
          <strong>Gizliliğiniz Güvende:</strong> Metniniz tamamen tarayıcınızda işlenir. Dosyanız hiçbir sunucuya yüklenmez.
        </span>
      </div>

      {/* Ana Çalışma Alanı (Grid: Sol Metin & Ayarlar, Sağ Önizleme) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sol Kolon: Metin Girişi ve PDF Ayarları */}
        <div className="lg:col-span-7 space-y-6">
          {/* Metin Editörü */}
          <div className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="text-input" className="text-sm font-bold text-foreground">
                Metin İçeriği
              </label>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="text-primary hover:underline font-medium"
                >
                  Örnek Metin
                </button>
                <span>·</span>
                <span className="font-mono">{charCount} karakter</span>
                <span>·</span>
                <span className="font-mono">{wordCount} kelime</span>
              </div>
            </div>

            <textarea
              id="text-input"
              rows={11}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="PDF'e dönüştürmek istediğiniz metni buraya yazın veya yapıştırın..."
              className="w-full p-4 rounded-xl border border-border/80 bg-background text-foreground placeholder:text-muted-foreground text-sm sm:text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
            />

            {/* Metin Hızlı Aksiyonları */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <span>Satır aralıkları ve paragraflar korunur.</span>
              {text && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-red-500 hover:underline font-medium"
                >
                  Metni Temizle
                </button>
              )}
            </div>
          </div>

          {/* PDF Ayarları */}
          <div className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-xs space-y-5">
            <h2 className="text-sm font-bold text-foreground pb-2 border-b border-border/60">
              PDF Sayfa ve Biçimlendirme Ayarları
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Kağıt Boyutu */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Kağıt Boyutu
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as PageSizeOption)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="A4">A4 (210 × 297 mm)</option>
                  <option value="A5">A5 (148 × 210 mm)</option>
                  <option value="Letter">Letter (216 × 279 mm)</option>
                </select>
              </div>

              {/* Sayfa Yönü */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Sayfa Yönü
                </label>
                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value as OrientationOption)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="portrait">Dikey (Portrait)</option>
                  <option value="landscape">Yatay (Landscape)</option>
                </select>
              </div>

              {/* Yazı Tipi */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Yazı Tipi (Font)
                </label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value as FontFamilyOption)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="arial">Arial (Modern Sans-serif)</option>
                  <option value="georgia">Georgia (Klasik Serif)</option>
                  <option value="courier">Courier New (Monospace / Kod)</option>
                </select>
              </div>

              {/* Yazı Boyutu */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Yazı Boyutu (pt)
                </label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value) as FontSizeOption)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                >
                  <option value={12}>12 pt (Küçük / Yoğun)</option>
                  <option value={14}>14 pt (Varsayılan / Standart)</option>
                  <option value={16}>16 pt (Orta / Rahat)</option>
                  <option value={18}>18 pt (Büyük)</option>
                  <option value={20}>20 pt (Çok Büyük)</option>
                </select>
              </div>

              {/* Kenar Boşluğu */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Kenar Boşluğu
                </label>
                <select
                  value={margin}
                  onChange={(e) => setMargin(e.target.value as MarginOption)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="small">Küçük (10 mm)</option>
                  <option value="medium">Orta (20 mm - Standart)</option>
                  <option value="large">Büyük (30 mm)</option>
                </select>
              </div>

              {/* Dosya Adı */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  İndirilecek Dosya Adı
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="pratika-belge"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-l-lg border border-r-0 border-border bg-background text-foreground focus:outline-none focus:border-primary"
                  />
                  <span className="px-3 py-2 bg-muted text-muted-foreground text-xs font-mono rounded-r-lg border border-border border-l-0 select-none">
                    .pdf
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Kolon: Canlı Sayfa Önizlemesi ve İndirme */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h2 className="text-sm font-bold text-foreground">
                Sayfa Önizlemesi
              </h2>
              <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
                <span className="px-2 py-0.5 rounded bg-muted border border-border/60">
                  {pageSize}
                </span>
                <span className="px-2 py-0.5 rounded bg-muted border border-border/60">
                  {orientation === 'portrait' ? 'Dikey' : 'Yatay'}
                </span>
              </div>
            </div>

            {/* Gerçekçi Kağıt Önizleme Kutusu */}
            <div className="p-3 bg-muted/40 rounded-xl border border-border/70 flex items-center justify-center min-h-[340px]">
              <div
                className="w-full bg-white text-slate-900 shadow-md border border-slate-200 transition-all rounded-sm overflow-hidden flex flex-col justify-between"
                style={{
                  aspectRatio: orientation === 'portrait' ? '1 / 1.414' : '1.414 / 1',
                  maxHeight: '440px',
                  fontFamily: FONT_FILES[fontFamily].cssFont,
                  padding: margin === 'small' ? '12px' : margin === 'medium' ? '20px' : '28px',
                }}
              >
                {/* Önizleme Metin Alanı */}
                <div
                  className="overflow-y-auto leading-relaxed text-slate-800 flex-1 pr-1"
                  style={{
                    fontSize: `${Math.max(10, fontSize * 0.75)}px`,
                    maxHeight: '320px',
                  }}
                >
                  {text ? (
                    <div className="whitespace-pre-wrap break-words break-all [overflow-wrap:anywhere]">
                      {text}
                    </div>
                  ) : (
                    <div className="text-slate-400 italic text-xs">
                      Metin girdiğinizde bu alanda sayfa tipografisi ve yerleşimi canlı olarak önizlenecektir...
                    </div>
                  )}
                </div>

                {/* Önizleme Alt Bilgi */}
                <div className="pt-3 mt-auto border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                  <span>Pratika PDF Belgesi ({estimatedPages} Sayfa)</span>
                  <span>Sayfa 1 / {estimatedPages}</span>
                </div>
              </div>
            </div>


            {/* Butonlar ve Bildirimler */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleGeneratePdf}
                disabled={isGenerating}
                className="w-full py-3.5 px-4 rounded-xl bg-foreground text-background font-bold text-sm sm:text-base hover:bg-foreground/90 active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-background" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>PDF Hazırlanıyor...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>PDF Oluştur ve İndir</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="w-full py-2 px-4 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground text-xs font-semibold hover:bg-muted transition-colors"
              >
                Metni Temizle
              </button>
            </div>

            {/* Durum / Başarı / Hata Bildirimi */}
            {statusMessage && (
              <div
                className={`p-3.5 rounded-xl text-xs font-medium animate-in fade-in duration-150 ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-800'
                    : statusMessage.type === 'error'
                    ? 'bg-red-500/10 border border-red-500/20 text-red-700'
                    : 'bg-muted border border-border text-foreground'
                }`}
              >
                {statusMessage.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
