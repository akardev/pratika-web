import { Metadata } from 'next';
import { Suspense } from 'react';
import { permanentRedirect } from 'next/navigation';
import { categories } from '@/data/tools';
import ToolsCatalog from '@/components/tools/ToolsCatalog';

export const metadata: Metadata = {
  title: 'Online Araçlar ve Hesaplama Araçları',
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

type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AraclarPage({ searchParams }: Props) {
  if (searchParams) {
    const params = await searchParams;
    const kategori = typeof params.kategori === 'string' ? params.kategori : undefined;
    const query = typeof params.q === 'string' ? params.q : undefined;

    // Eski query parametreli kategori URL'lerini (/araclar?kategori=egitim) yeni temiz SEO rotasına (/kategoriler/egitim) yönlendir
    if (kategori && kategori !== 'all' && !query) {
      const matchedCategory = categories.find(
        (c) => c.id === kategori || c.slug === kategori
      );
      if (matchedCategory) {
        permanentRedirect(`/kategoriler/${matchedCategory.slug}`);
      }
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
      {/* Katalog Bileşeni */}
      <Suspense
        fallback={
          <div className="w-full space-y-8 animate-pulse">
            <div className="h-10 max-w-md mx-auto bg-muted rounded-xl" />
            <div className="h-14 max-w-2xl mx-auto bg-muted rounded-xl" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-40 bg-muted rounded-xl" />
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
