import { Metadata } from 'next';
import Link from 'next/link';
import SearchBar from '@/components/ui/SearchBar';
import ToolCard from '@/components/ui/ToolCard';
import CategoryCard from '@/components/ui/CategoryCard';
import { tools, categories, getPopularTools, POPULAR_SEARCH_TAGS } from '@/data/tools';
import { articles } from '@/data/articles';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pratika — Dijital Araçlar ve Hesaplama Platformu',
  description: 'Finans, iş, matematik, PDF ve günlük hayat için pratik, hızlı ve güvenilir dijital araçlar platformu.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Pratika — Dijital Araçlar ve Hesaplama Platformu',
    description: 'Finans, iş, matematik, PDF ve günlük hayat için pratik, hızlı ve güvenilir dijital araçlar platformu.',
    url: siteConfig.url,
    type: 'website',
  },
};

export default function Home() {
  // Popüler 8 Araç
  const featuredTools = getPopularTools();

  // Öne Çıkan 4 Bilgi Merkezi Makalesi
  const featuredArticleSlugs = [
    'kdv-nasil-hesaplanir',
    'maliyet-nedir-ve-nasil-hesaplanir',
    'kar-marji-nedir-ve-nasil-hesaplanir',
    'kredi-taksiti-nasil-hesaplanir',
  ];

  const featuredArticles = featuredArticleSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((a): a is typeof articles[0] => Boolean(a));

  const totalActiveToolsCount = tools.filter((t) => t.status === 'active').length;

  // JSON-LD WebSite Structured Data
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: 'Dijital araçlar ve pratik hesaplamalar platformu.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/araclar?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="flex flex-col flex-1">
      {/* WebSite JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-border/70 bg-card">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border/60 mb-5">
            <span>Modern Dijital Araç Platformu</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            Hesapla. Dönüştür. Kullan.
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Finans, ticaret, matematik, PDF ve günlük hayat için ihtiyacınız olan dijital araçlar tek ve sade bir platformda.
          </p>

          <div className="mb-5">
            <SearchBar placeholder="KDV, PDF, QR kod, yüzde, fotoğraf..." />
          </div>

          {/* Hızlı Popüler Arama İpuçları */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
            <span className="font-semibold text-foreground/80">Popüler:</span>
            {POPULAR_SEARCH_TAGS.slice(0, 6).map((tag) => (
              <Link
                key={tag.label}
                href={`/araclar?q=${encodeURIComponent(tag.query)}`}
                className="px-2.5 py-1 rounded-lg bg-card border border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-colors font-medium text-xs"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. POPÜLER ARAÇLAR                                           */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-border/60">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2 border-b border-border/60 pb-3">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                Hızlı Çözümler
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                En Çok Kullanılan Araçlar
              </h2>
            </div>
            <Link
              href="/araclar"
              className="text-xs font-semibold text-primary hover:underline transition-colors inline-flex items-center gap-1"
            >
              Tüm {totalActiveToolsCount} aracı gör &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. KATEGORİLER (İHTİYACINIZA GÖRE KEŞFEDİN)                 */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-border/60 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2 border-b border-border/60 pb-3">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                Kapsamlı Rehber
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Kategorilere Göre Keşfedin
              </h2>
            </div>
            <Link
              href="/araclar"
              className="text-xs font-semibold text-primary hover:underline transition-colors inline-flex items-center gap-1"
            >
              Kataloğa Git &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. PLATFORM TANITIMI (PRATİKA NEDİR?)                        */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-border/60">
        <div className="container mx-auto max-w-6xl">
          <div className="p-7 sm:p-10 rounded-2xl border border-border/80 bg-card shadow-2xs">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-2">
                Güvenilirlik & Sadeliğin Standartı
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
                Pratika neden farklı?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Pratika, gereksiz reklamlar, karmaşık yönlendirmeler ve hantal arayüzler olmadan; aradığınız hesaplamaya veya dönüştürmeye tek tıkla ulaşmanızı sağlayan profesyonel bir dijital araç platformudur.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-border/60 text-left">
                <div>
                  <h3 className="font-bold text-sm text-foreground mb-1.5">Sade & Doğrudan</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Karmaşık adımlar yok. Değerinizi girin, anında doğru sonuca ulaşın.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground mb-1.5">Mevzuata Uygun</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Kanuni oranlar, yasal katsayılar ve doğrulanmış matematik formülleriyle çalışır.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground mb-1.5">%100 Tarayıcıda Güvenli</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    PDF ve görsel işlemleriniz sunucuya yüklenmez, cihazınızda güvenle işlenir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BİLGİ MERKEZİ                                             */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-border/60 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2 border-b border-border/60 pb-3">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                Pratika Rehberleri
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-1">
                Sadece hesaplamayın, mantığını öğrenin.
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                Bilgi Merkezi&apos;nde formülleri, gerçek hayat örneklerini ve pratik ipuçlarını sade bir dille keşfedin.
              </p>
            </div>
            <Link
              href="/bilgi"
              className="text-xs font-semibold text-primary hover:underline transition-colors inline-flex items-center gap-1 shrink-0"
            >
              Tüm Bilgi Merkezi &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/bilgi/${article.slug}`}
                className="group flex flex-col justify-between p-5 sm:p-6 rounded-xl border border-border/70 bg-card hover:border-foreground/30 hover:shadow-xs transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2.5">
                    <span className="font-semibold text-primary px-2 py-0.5 rounded bg-primary/10 text-[11px]">
                      {article.category}
                    </span>
                    <span className="text-[11px]">{article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors mb-1.5">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {article.description}
                  </p>
                </div>
                <div className="pt-4 mt-2 text-xs font-semibold text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform border-t border-border/40">
                  <span>Rehberi İncele</span>
                  <span>&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. SON ÇAĞRI (CTA)                                           */}
      {/* ============================================================ */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
            Hemen aradığınız araca ulaşın.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            {totalActiveToolsCount} farklı araç ve kapsamlı bilgi rehberleri ile işlemlerinizi saniyeler içinde tamamlayın.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/araclar"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-foreground text-background font-semibold text-xs sm:text-sm hover:bg-foreground/90 transition-all text-center"
            >
              Tüm Araçları Keşfet ({totalActiveToolsCount})
            </Link>
            <Link
              href="/bilgi"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-border bg-card text-foreground font-semibold text-xs sm:text-sm hover:bg-muted/40 transition-all text-center"
            >
              Bilgi Merkezi&apos;ne Git ({articles.length})
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

