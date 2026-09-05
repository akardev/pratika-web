import { categories, tools } from '@/data/tools';
import { articles } from '@/data/articles';
import ToolCard from '@/components/ui/ToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CategoryIcon from '@/components/ui/CategoryIcon';
import CategoryCard, { CATEGORY_THEMES, DEFAULT_THEME } from '@/components/ui/CategoryCard';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const category = categories.find(
    (c) => c.slug === resolvedParams.slug || c.id === resolvedParams.slug
  );

  if (!category) {
    return {
      title: 'Kategori Bulunamadı',
    };
  }

  const pageTitle = category.title.toLowerCase().includes('araç')
    ? category.title
    : `${category.title} Hesaplama Araçları`;

  const metaDescription = `${category.title} kategorisindeki tüm online hesaplama, dönüştürme ve dijital araçlar. ${category.description} Ücretsiz, hızlı ve güvenli.`;

  return {
    title: pageTitle,
    description: metaDescription,
    alternates: {
      canonical: `/kategoriler/${category.slug}`,
    },
    openGraph: {
      title: `${pageTitle} | Pratiksel`,
      description: metaDescription,
      url: `${siteConfig.url}/kategoriler/${category.slug}`,
      type: 'website',
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageTitle} | Pratiksel`,
      description: metaDescription,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const category = categories.find(
    (c) => c.slug === resolvedParams.slug || c.id === resolvedParams.slug
  );

  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter(
    (t) => t.categoryId === category.id && t.status === 'active'
  );
  const otherCategories = categories.filter((c) => c.id !== category.id).slice(0, 3);
  const theme = CATEGORY_THEMES[category.id] || DEFAULT_THEME;

  // İlgili Bilgi Merkezi Rehberleri (Articles)
  const categoryToolSlugs = new Set(categoryTools.map((t) => t.slug));
  const relatedArticles = articles
    .filter(
      (a) =>
        (a.relatedToolSlug && categoryToolSlugs.has(a.relatedToolSlug)) ||
        a.category.toLowerCase().includes(category.id) ||
        category.id.includes(a.category.toLowerCase())
    )
    .slice(0, 3);

  // Kategori Sıkça Sorulan Sorular (SEO FAQ)
  const faqs = [
    {
      question: `${category.title} araçları ücretsiz mi?`,
      answer: `Evet, Pratiksel'deki tüm ${category.title.toLowerCase()} araçları %100 ücretsizdir. Hiçbir kayıt, üyelik veya gizli ücretlendirme bulunmaz.`,
    },
    {
      question: 'Girdiğim veriler veya dosyalar sunuculara kaydediliyor mu?',
      answer: 'Hayır. Pratiksel gizlilik odaklı bir mimariye sahiptir. Tüm hesaplama, metin, görsel ve dosya işlemleri doğrudan tarayıcınızda (yerel olarak) işlenir.',
    },
    {
      question: 'Mobil telefon veya tabletten kullanabilir miyim?',
      answer: 'Evet. Tüm araçlarımız mobil öncelikli responsive tasarıma sahiptir. Akıllı telefon, tablet ve masaüstü bilgisayarlarda yüksek performansla çalışır.',
    },
    {
      question: 'Bu kategoride aradığım bir aracı bulamazsam ne yapmalıyım?',
      answer: 'Kullanıcı geri bildirimleri doğrultusunda araç kütüphanemizi geliştirmeye ve zenginleştirmeye devam ediyoruz. İletişim sayfamızdan aradığınız aracı bize önerebilirsiniz.',
    },
  ];

  // JSON-LD BreadcrumbList, CollectionPage & FAQPage Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Pratiksel',
            item: siteConfig.url,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Kategoriler',
            item: `${siteConfig.url}/kategoriler`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: category.title,
            item: `${siteConfig.url}/kategoriler/${category.slug}`,
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: `${category.title} Hesaplama Araçları`,
        url: `${siteConfig.url}/kategoriler/${category.slug}`,
        description: category.description,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: categoryTools.length,
          itemListElement: categoryTools.map((tool, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: tool.title,
            url: `${siteConfig.url}/arac/${tool.slug}`,
            description: tool.description,
          })),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigasyonu */}
      <Breadcrumb
        items={[
          { label: 'Kategoriler', href: '/kategoriler' },
          { label: category.title },
        ]}
      />

      {/* Kategori Başlık ve Hero Alanı */}
      <div className="mt-4 mb-10 border-b border-border/70 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5 mb-3.5">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${theme.iconBg} ${theme.iconText} ${theme.iconBorder} shadow-2xs`}
            >
              <CategoryIcon categoryId={category.id} className="w-6 h-6" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-muted text-muted-foreground border border-border/60 uppercase tracking-wider">
              <span>Kategori Rehberi</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground mb-3">
            {category.title} Araçları
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <div className="text-xs font-bold px-3.5 py-2 rounded-xl bg-card border border-border text-foreground shadow-2xs">
            {categoryTools.length} Aktif Araç
          </div>
          <Link
            href="/kategoriler"
            className="text-xs font-semibold px-3.5 py-2 rounded-xl border border-border/80 bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            Tüm Kategoriler
          </Link>
          <Link
            href="/araclar"
            className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover transition-colors shadow-2xs"
          >
            Tüm Araçlar
          </Link>
        </div>
      </div>

      {/* Araç Kartları Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            {category.title} Kataloğu
          </h2>
          <span className="text-xs text-muted-foreground">
            {categoryTools.length} araç listeleniyor
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categoryTools.length > 0 ? (
            categoryTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} showCategory={false} />
            ))
          ) : (
            <div className="col-span-full p-12 text-center rounded-2xl border border-dashed border-border bg-card">
              <p className="text-sm text-muted-foreground">
                Bu kategoride henüz araç bulunmuyor. Çok yakında yeni araçlar eklenecektir.
              </p>
              <Link
                href="/araclar"
                className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-primary hover:underline"
              >
                Tüm Araçları Keşfedin &rarr;
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* İlgili Bilgi Merkezi İçerikleri (Topic Authority / Silo Links) */}
      {relatedArticles.length > 0 && (
        <section className="mt-14 pt-10 border-t border-border/60">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Kapsamlı Rehberler
              </span>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                {category.title} ile İlgili Bilgiler
              </h2>
            </div>
            <Link
              href="/bilgi"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              Tüm Bilgi Merkezi <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedArticles.map((ra) => (
              <Link
                key={ra.id}
                href={`/bilgi/${ra.slug}`}
                className="group flex flex-col justify-between p-5 rounded-2xl border border-border/70 bg-card hover:border-primary/40 hover:shadow-xs transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground font-semibold mb-2">
                    <span className="text-primary">{ra.category}</span>
                    <span>{ra.readTime}</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors mb-1.5 line-clamp-2">
                    {ra.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {ra.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-4 group-hover:translate-x-0.5 transition-transform">
                  Rehberi Oku &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Sıkça Sorulan Sorular (FAQ Accordion / Box) */}
      <section className="mt-14 pt-10 border-t border-border/60">
        <div className="mb-6">
          <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
            Merak Edilenler
          </span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
            Sıkça Sorulan Sorular
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-border/70 bg-card/70 shadow-2xs space-y-2"
            >
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-xs">Q.</span>
                {faq.question}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/20">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Diğer Kategoriler */}
      {otherCategories.length > 0 && (
        <section className="mt-14 pt-10 border-t border-border/60">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Keşfetmeye Devam Edin
              </span>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                Diğer Popüler Kategoriler
              </h2>
            </div>
            <Link
              href="/kategoriler"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              Tüm Kategoriler <span>&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {otherCategories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
