'use client';

import { useState } from 'react';

interface PlatformSize {
  name: string;
  width: number;
  height: number;
  aspectRatio: string;
  format: string;
  notes: string;
}

interface PlatformData {
  id: string;
  title: string;
  sizes: PlatformSize[];
}

const PLATFORMS: PlatformData[] = [
  {
    id: 'instagram',
    title: 'Instagram',
    sizes: [
      { name: 'Kare Gönderi (Square Post)', width: 1080, height: 1080, aspectRatio: '1:1', format: 'JPG / PNG', notes: 'En standart kare akış gönderisi boyutu.' },
      { name: 'Dikey Gönderi (Portrait Post)', width: 1080, height: 1350, aspectRatio: '4:5', format: 'JPG / PNG', notes: 'Akışta en çok alan kaplayan dikey görsel formatı.' },
      { name: 'Yatay Gönderi (Landscape Post)', width: 1080, height: 566, aspectRatio: '1.91:1', format: 'JPG / PNG', notes: 'Geniş manzara ve banner görselleri için.' },
      { name: 'Hikaye ve Reels (Story & Reels)', width: 1080, height: 1920, aspectRatio: '9:16', format: 'MP4 / JPG / PNG', notes: 'Tam ekran dikey mobil format.' },
      { name: 'Profil Fotoğrafı', width: 320, height: 320, aspectRatio: '1:1', format: 'JPG / PNG', notes: 'Daire şeklinde kırpılır, merkezde olmalıdır.' },
    ],
  },
  {
    id: 'youtube',
    title: 'YouTube',
    sizes: [
      { name: 'Video Küçük Resmi (Thumbnail)', width: 1280, height: 720, aspectRatio: '16:9', format: 'JPG / PNG / WebP', notes: 'Maksimum 2MB dosya boyutu, HD çözünürlük.' },
      { name: 'Kanal Banner Görseli (Kapak)', width: 2560, height: 1440, aspectRatio: '16:9', format: 'JPG / PNG', notes: 'Güvenli alan: merkezdeki 1235x338 piksel.' },
      { name: 'Kanal Profil Resmi', width: 800, height: 800, aspectRatio: '1:1', format: 'JPG / PNG', notes: 'Dairesel kırpılır.' },
      { name: 'YouTube Shorts Videosu', width: 1080, height: 1920, aspectRatio: '9:16', format: 'MP4', notes: 'Dikey tam ekran kısa video formatı.' },
    ],
  },
  {
    id: 'twitter',
    title: 'X (Twitter)',
    sizes: [
      { name: 'Akış Gönderi Görseli (Tweet Image)', width: 1200, height: 675, aspectRatio: '16:9', format: 'JPG / PNG / WebP', notes: 'Maksimum 5MB dosya boyutu.' },
      { name: 'Başlık / Kapak Görseli (Header)', width: 1500, height: 500, aspectRatio: '3:1', format: 'JPG / PNG', notes: 'Profil sayfası üst geniş banner alanı.' },
      { name: 'Profil Fotoğrafı', width: 400, height: 400, aspectRatio: '1:1', format: 'JPG / PNG', notes: 'Dairesel olarak görüntülenir.' },
    ],
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    sizes: [
      { name: 'Gönderi Görseli (Feed Post)', width: 1200, height: 627, aspectRatio: '1.91:1', format: 'JPG / PNG', notes: 'Bağlantı önizlemeleri ve tekil paylaşımlar.' },
      { name: 'Şirket Sayfası Kapak Görseli', width: 1128, height: 191, aspectRatio: '5.9:1', format: 'JPG / PNG', notes: 'Şirket ve kurum profilleri banner alanı.' },
      { name: 'Kişisel Profil Kapak Görseli', width: 1584, height: 396, aspectRatio: '4:1', format: 'JPG / PNG', notes: 'Bireysel profil arka plan bannerı.' },
      { name: 'Profil Fotoğrafı', width: 400, height: 400, aspectRatio: '1:1', format: 'JPG / PNG', notes: 'Profesyonel vesikalık fotoğraf formatı.' },
    ],
  },
  {
    id: 'tiktok',
    title: 'TikTok',
    sizes: [
      { name: 'Video ve Hikaye (Video & Story)', width: 1080, height: 1920, aspectRatio: '9:16', format: 'MP4 / MOV', notes: 'Tam ekran dikey akıllı telefon formatı.' },
      { name: 'Profil Fotoğrafı', width: 200, height: 200, aspectRatio: '1:1', format: 'JPG / PNG', notes: 'Minimum 20x20 piksel.' },
    ],
  },
];

export default function SosyalMedyaGorselBoyutlari() {
  const [activePlatform, setActivePlatform] = useState<string>('instagram');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const currentPlatform = PLATFORMS.find((p) => p.id === activePlatform) || PLATFORMS[0];

  const handleCopySize = (w: number, h: number, index: number) => {
    navigator.clipboard.writeText(`${w}x${h}`);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full space-y-8">
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
        {/* Platform Sekmeleri */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {PLATFORMS.map((platform) => (
            <button
              key={platform.id}
              type="button"
              onClick={() => setActivePlatform(platform.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activePlatform === platform.id
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-muted/60 text-muted-foreground hover:text-foreground'
              }`}
            >
              {platform.title}
            </button>
          ))}
        </div>

        {/* Boyut Tablosu / Listesi */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <span className="text-xs font-bold text-foreground uppercase tracking-wider">
              {currentPlatform.title} Standart Ölçüleri
            </span>
            <span className="text-xs text-muted-foreground">
              {currentPlatform.sizes.length} farklı format
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {currentPlatform.sizes.map((size, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-muted/20 border border-border/80 hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-semibold text-sm text-foreground">{size.name}</h3>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {size.aspectRatio}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-mono text-lg sm:text-xl font-bold text-foreground">
                      {size.width} × {size.height}
                    </span>
                    <span className="text-xs text-muted-foreground">piksel (px)</span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {size.notes}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-border/50 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-muted-foreground">Format: {size.format}</span>
                  <button
                    type="button"
                    onClick={() => handleCopySize(size.width, size.height, index)}
                    className="font-semibold text-primary hover:underline"
                  >
                    {copiedIndex === index ? 'Kopyalandı!' : 'Boyutu Kopyala'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bilgilendirme ve Tavsiyeler */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">Görsel Kalitesini Korumak İçin İpuçları</h2>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1.5 leading-relaxed">
            <li>Görsellerinizi platformların önerdiği tam piksel boyutlarında hazırlayın; bu sayede otomatik sıkıştırma nedeniyle bulanıklaşma önlenir.</li>
            <li>Düz renk ve grafik ağırlıklı tasarımlarda <strong>PNG</strong>, detaylı fotoğraflarda ise <strong>JPG / WebP</strong> formatını tercih edin.</li>
            <li>Hikaye ve dikey videolarda önemli metinleri ekranın en üst ve en altındaki 200 piksellik alana yerleştirmekten kaçının (profil ve buton alanları).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
