import { tools, categories } from '@/data/tools';
import { getArticlesByToolSlug } from '@/data/articles';
import { notFound, permanentRedirect } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ToolCard from '@/components/ui/ToolCard';


import ToolRenderer from '@/components/tools/ToolRenderer';
import ToolDidYouKnowWidget from '@/components/discovery/ToolDidYouKnowWidget';



type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return tools
    .filter((t) => t.status === 'active')
    .map((tool) => ({
      slug: tool.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const tool = tools.find((t) => t.slug === resolvedParams.slug);

  if (!tool) {
    return {
      title: 'Araç Bulunamadı',
    };
  }

  const isSocialMediaResizer = tool.slug === 'sosyal-medya-gorsel-boyutlandirici';
  const pageTitle = isSocialMediaResizer
    ? 'Sosyal Medya Görsel Boyutlandırıcı'
    : tool.title;
  const description = isSocialMediaResizer
    ? 'Instagram, YouTube, TikTok, LinkedIn ve X için görsellerinizi doğru ölçülere ücretsiz olarak uyarlayın. Görselinizi yükleyin, formatı seçin ve indirin.'
    : tool.description;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: `/arac/${tool.slug}`,
    },
    openGraph: {
      title: `${pageTitle} | Pratika`,
      description,
      url: `${siteConfig.url}/arac/${tool.slug}`,
      type: 'website',
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const resolvedParams = await params;

  // Önce tools içinde bu slug'a sahip gerçek bir araç var mı kontrol et
  const tool = tools.find((t) => t.slug === resolvedParams.slug);

  if (!tool) {
    // Gerçek tool yoksa legacy/invalid slug olarak redirect et
    if (resolvedParams.slug === 'sosyal-medya-gorsel-boyutlari') {
      permanentRedirect('/arac/sosyal-medya-gorsel-boyutlandirici');
    }
    notFound();
  }

  const category = categories.find((c) => c.id === tool.categoryId);
  const relatedTools = tools.filter((t) => t.id !== tool.id && t.categoryId === tool.categoryId).slice(0, 4);
  const fallbackRelatedTools = relatedTools.length > 0 ? relatedTools : tools.filter((t) => t.id !== tool.id).slice(0, 4);
  const relatedArticles = getArticlesByToolSlug(tool.slug);

  // WebApplication JSON-LD Schema
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    url: `${siteConfig.url}/arac/${tool.slug}`,
    description: tool.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
    },
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Araçlar', href: '/araclar' },
          ...(category ? [{ label: category.title, href: `/kategoriler/${category.slug}` }] : []),
          { label: tool.title },
        ]}
      />

      {/* Başlık Alanı */}
      <div className="mt-4 mb-8 border-b border-border/70 pb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-muted text-muted-foreground border border-border/60">
            <span>{tool.toolType === 'pdf' ? 'PDF & Dosya Aracı' : 'Ücretsiz Hesaplama'}</span>
          </div>
          {category && (
            <Link
              href={`/kategoriler/${category.slug}`}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              <span>{category.title}</span>
            </Link>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-2">
          {tool.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="mb-10">
        <ToolRenderer slug={tool.slug} />
      </div>

      {/* İlgili Biliyor Muydunuz Kartı */}
      <ToolDidYouKnowWidget
        toolSlug={tool.slug}
        categorySlug={category?.slug}
        className="mb-12"
      />


      {/* İlgili Bilgiler (Bilgi Merkezi İçerikleri) */}
      {relatedArticles.length > 0 && (
        <div className="border-t border-border/60 pt-10 mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              İlgili Bilgiler
            </h2>
            <Link
              href="/bilgi"
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              aria-label="Tüm Bilgi Merkezi içeriklerini gör"
            >
              Bilgi Merkezi &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((ra) => (
              <Link
                key={ra.id}
                href={`/bilgi/${ra.slug}`}
                className="group block p-5 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-xs transition-all"
                aria-label={`${ra.title} bilgi içeriğini oku`}
              >
                <span className="text-xs font-semibold text-primary mb-1 block">
                  {ra.category}
                </span>
                <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors mb-1">
                  {ra.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {ra.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* İlgili Araçlar */}
      {fallbackRelatedTools.length > 0 && (
        <div className="border-t border-border/60 pt-10 mt-10">
          <h2 className="text-lg font-bold tracking-tight text-foreground mb-4">
            İlgili Araçlar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fallbackRelatedTools.map((rt) => (
              <ToolCard key={rt.id} tool={rt} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
