import { Metadata } from 'next';
import { Suspense } from 'react';
import ToolsCatalog from '@/components/tools/ToolsCatalog';

export const metadata: Metadata = {
  title: 'Online Araçlar ve Hesaplama Araçları | Pratika',
  description: 'İhtiyacınız olan tüm online hesaplama, dönüştürme ve pratik dijital araçları Pratika araç kataloğunda keşfedin.',
  alternates: {
    canonical: '/araclar',
  },
  openGraph: {
    title: 'Online Araçlar ve Hesaplama Araçları | Pratika',
    description: 'İhtiyacınız olan tüm online hesaplama, dönüştürme ve pratik dijital araçları Pratika araç kataloğunda keşfedin.',
    url: '/araclar',
    type: 'website',
  },
};

export default function AraclarPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-6xl">
      {/* Sayfa Başlığı ve Açıklaması */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
          Tüm Araçlar
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          İhtiyacınız olan hesaplama, dönüştürme ve pratik dijital araçları keşfedin.
        </p>
      </div>

      {/* Katalog Bileşeni */}
      <Suspense
        fallback={
          <div className="w-full space-y-8 animate-pulse">
            <div className="h-12 sm:h-14 max-w-2xl mx-auto bg-muted rounded-2xl" />
            <div className="flex justify-center gap-2">
              <div className="h-8 w-20 bg-muted rounded-full" />
              <div className="h-8 w-28 bg-muted rounded-full" />
              <div className="h-8 w-24 bg-muted rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-44 bg-muted rounded-xl" />
              ))}
            </div>
          </div>
        }
      >
        <ToolsCatalog />
      </Suspense>
    </div>
  );
}
