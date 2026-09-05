'use client';

import { useState } from 'react';
import { formatNumber } from '@/lib/utils';

export default function GorselSikistirici() {
  const [file, setFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(70);
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      setOriginalSize(f.size);
      setCompressedUrl(null);
    }
  };

  const handleCompress = () => {
    if (!file) return;
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
              setCompressedSize(blob.size);
              setCompressedUrl(URL.createObjectURL(blob));
            }
            setLoading(false);
          }, 'image/jpeg', quality / 100);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const savedPercent = originalSize > 0 && compressedSize > 0 
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100) 
    : 0;

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <label htmlFor="compfile" className="block text-sm font-medium text-foreground mb-1">Görsel Seçin</label>
          <input
            id="compfile"
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
          />
        </div>

        {file && (
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span>Sıkıştırma Kalitesi:</span>
                <span>%{quality}</span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={handleCompress}
              className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
            >
              {loading ? 'Sıkıştırılıyor...' : 'Görseli Sıkıştır'}
            </button>
          </div>
        )}

        {compressedUrl && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Sıkıştırma Sonuçları</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <span className="text-xs text-muted-foreground block mb-1">Boyut Tasarrufu</span>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">%{savedPercent} Azaldı</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Yeni Dosya Boyutu</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(Math.round(compressedSize / 1024))} KB</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Orijinal Boyut</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(Math.round(originalSize / 1024))} KB</span>
              </div>
            </div>

            <a
              href={compressedUrl}
              download="pratiksel-sikistirilmis.jpg"
              className="inline-flex items-center justify-center px-6 h-11 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
            >
              Sıkıştırılmış Görseli İndir
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
