'use client';

import { useState, useRef } from 'react';

export default function GorselKirpici() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [aspect, setAspect] = useState<'free' | '1:1' | '16:9' | '4:3'>('1:1');
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result as string);
        setCroppedUrl(null);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCrop = () => {
    if (!imgRef.current) return;
    const img = imgRef.current;

    const canvas = document.createElement('canvas');
    const width = img.naturalWidth;
    const height = img.naturalHeight;

    let cropX = 0;
    let cropY = 0;
    let cropWidth = width;
    let cropHeight = height;

    if (aspect === '1:1') {
      const minDim = Math.min(width, height);
      cropX = (width - minDim) / 2;
      cropY = (height - minDim) / 2;
      cropWidth = minDim;
      cropHeight = minDim;
    } else if (aspect === '16:9') {
      const targetHeight = (width * 9) / 16;
      if (targetHeight <= height) {
        cropY = (height - targetHeight) / 2;
        cropHeight = targetHeight;
      } else {
        const targetWidth = (height * 16) / 9;
        cropX = (width - targetWidth) / 2;
        cropWidth = targetWidth;
      }
    } else if (aspect === '4:3') {
      const targetHeight = (width * 3) / 4;
      if (targetHeight <= height) {
        cropY = (height - targetHeight) / 2;
        cropHeight = targetHeight;
      } else {
        const targetWidth = (height * 4) / 3;
        cropX = (width - targetWidth) / 2;
        cropWidth = targetWidth;
      }
    }

    canvas.width = cropWidth;
    canvas.height = cropHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
      setCroppedUrl(canvas.toDataURL('image/png'));
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cropfile" className="block text-sm font-medium text-foreground mb-1">Görsel Yükleyin</label>
            <input
              id="cropfile"
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="asp" className="block text-sm font-medium text-foreground mb-1">En-Boy Kırpma Oranı</label>
            <select
              id="asp"
              value={aspect}
              onChange={(e) => setAspect(e.target.value as 'free' | '1:1' | '16:9' | '4:3')}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              <option value="1:1">1:1 Kare (Profil / Instagram Gönderisi)</option>
              <option value="16:9">16:9 Yatay (YouTube / Web Banner)</option>
              <option value="4:3">4:3 Standart Fotoğraf</option>
            </select>
          </div>
        </div>

        {imgSrc && (
          <div className="space-y-4 pt-4">
            <div className="max-h-80 overflow-hidden flex justify-center bg-muted/20 rounded-lg p-2 border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img ref={imgRef} src={imgSrc} alt="Kırpılacak Görsel" className="max-h-72 object-contain" />
            </div>

            <button
              type="button"
              onClick={handleCrop}
              className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
            >
              Merkezden Orantılı Kırp
            </button>
          </div>
        )}

        {croppedUrl && (
          <div className="mt-8 pt-6 border-t border-border space-y-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Kırpılmış Çıktı:</span>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={croppedUrl} alt="Sonuç" className="max-h-48 rounded border border-border" />
              <a
                href={croppedUrl}
                download="pratikacom-kirpilmis.png"
                className="px-6 h-11 inline-flex items-center justify-center bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Kırpılan Görseli İndir
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
