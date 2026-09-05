'use client';

import { useState } from 'react';

export default function FaviconOlusturucu() {
  const [, setSelectedFile] = useState<File | null>(null);
  const [previews, setPreviews] = useState<{ size: number; url: string }[]>([]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const sizes = [16, 32, 48, 180];
          const newPreviews = sizes.map((s) => {
            const canvas = document.createElement('canvas');
            canvas.width = s;
            canvas.height = s;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, s, s);
            }
            return { size: s, url: canvas.toDataURL('image/png') };
          });
          setPreviews(newPreviews);
        };
        img.src = ev.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <label htmlFor="fav" className="block text-sm font-medium text-foreground mb-1">
            Logo veya Kare Görsel Seçin
          </label>
          <input
            id="fav"
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
          />
        </div>

        {previews.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Üretilen Favicon Boyutları</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {previews.map((p) => (
                <div key={p.size} className="p-4 rounded-lg bg-muted/20 border border-border flex flex-col items-center gap-3">
                  <span className="text-xs font-semibold text-muted-foreground">{p.size}x{p.size} px</span>
                  <div className="w-16 h-16 flex items-center justify-center bg-card rounded border border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt={`${p.size}x${p.size}`} width={p.size} height={p.size} className="max-w-full max-h-full" />
                  </div>
                  <a
                    href={p.url}
                    download={`favicon-${p.size}x${p.size}.png`}
                    className="text-xs text-primary font-medium hover:underline"
                  >
                    İndir (PNG)
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
