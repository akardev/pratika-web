import { Metadata } from 'next';
import { Suspense } from 'react';
import CategoriesCatalog from '@/components/categories/CategoriesCatalog';

export const metadata: Metadata = {
  title: 'Tüm Kategoriler ve Araç Kataloğu',
  description: 'Eğitim, finans, matematik, ticaret, PDF, metin, sağlık ve onlarca kategoride yüzlerce online hesaplama ve dönüştürme aracını keşfedin.',
  alternates: {
    canonical: '/kategoriler',
  },
  openGraph: {
    title: 'Tüm Kategoriler ve Araç Kataloğu | Pratiksel',
    description: 'Eğitim, finans, matematik, ticaret, PDF, metin, sağlık ve onlarca kategoride yüzlerce online hesaplama ve dönüştürme aracını keşfedin.',
    url: '/kategoriler',
    type: 'website',
  },
};

export default function KategorilerPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
      <Suspense
        fallback={
          <div className="w-full space-y-8 animate-pulse">
            <div className="h-10 max-w-md mx-auto bg-muted rounded-xl" />
            <div className="h-14 max-w-2xl mx-auto bg-muted rounded-xl" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-52 bg-muted rounded-2xl" />
              ))}
            </div>
          </div>
        }
      >
        <CategoriesCatalog />
      </Suspense>
    </div>
  );
}
