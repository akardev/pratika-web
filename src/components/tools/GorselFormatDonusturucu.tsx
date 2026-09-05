'use client';

import { useState } from 'react';

export default function GorselFormatDonusturucu() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/webp');
  const [quality] = useState(0.9);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setConvertedUrl(null);
    }
  };

  const handleConvert = () => {
    if (!selectedFile) return;
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setConvertedUrl(url);
            }
            setLoading(false);
          }, targetFormat, quality);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(selectedFile);
  };

  const getExtension = () => {
    if (targetFormat === 'image/jpeg') return 'jpg';
    if (targetFormat === 'image/png') return 'png';
    return 'webp';
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-foreground mb-1">Görsel Seçin (JPG, PNG, WebP)</label>
            <input
              id="file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="fmt" className="block text-sm font-medium text-foreground mb-1">Hedef Format</label>
            <select
              id="fmt"
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value as 'image/png' | 'image/jpeg' | 'image/webp')}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              <option value="image/webp">WebP (Modern ve Hafif)</option>
              <option value="image/jpeg">JPEG / JPG (Evrensel)</option>
              <option value="image/png">PNG (Kayıpsız / Şeffaf)</option>
            </select>
          </div>
        </div>

        {selectedFile && (
          <button
            type="button"
            disabled={loading}
            onClick={handleConvert}
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? 'Dönüştürülüyor...' : 'Formatı Dönüştür'}
          </button>
        )}

        {convertedUrl && (
          <div className="mt-8 pt-6 border-t border-border space-y-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Dönüştürme Tamamlandı:</span>
            <div className="flex items-center gap-4">
              <a
                href={convertedUrl}
                download={`pratikacom-donusturuldu.${getExtension()}`}
                className="px-6 h-11 inline-flex items-center justify-center bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
              >
                .{getExtension().toUpperCase()} Dosyasını İndir
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
