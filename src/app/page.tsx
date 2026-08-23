import { Metadata } from 'next';
import Link from 'next/link';
import SearchBar from '@/components/ui/SearchBar';
import ToolCard from '@/components/ui/ToolCard';
import { tools, categories } from '@/data/tools';
import { articles } from '@/data/articles';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pratika — Hesaplama Araçları ve Pratik Bilgiler',
  description: 'Finans, iş, günlük hayat ve daha fazlası için hesaplama araçlarını ve anlaşılır bilgileri Pratika\'da keşfedin.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Pratika — Hesaplama Araçları ve Pratik Bilgiler',
    description: 'Finans, iş, günlük hayat ve daha fazlası için hesaplama araçlarını ve anlaşılır bilgileri Pratika\'da keşfedin.',
    url: siteConfig.url,
    type: 'website',
  },
};

export default function Home() {
  // Öne Çıkan Seçilmiş 8 Araç (Merkezi veriden dinamik çekilir)
  const featuredSlugs = [
    'kdv-hesaplama',
    'maliyet-hesaplama',
    'kar-marji-hesaplama',
    'kar-zarar-hesaplama',
    'faiz-hesaplama',
    'kredi-taksit-hesaplama',
    'indirim-hesaplama',
    'basabas-noktasi-hesaplama',
  ];

  const featuredTools = featuredSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter((t): t is typeof tools[0] => Boolean(t && t.status === 'active'));

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

  // Her kategorideki aktif araç sayısını hesapla
  const categoryToolCounts = categories.map((cat) => ({
    ...cat,
    toolCount: tools.filter((t) => t.categoryId === cat.id && t.status === 'active').length,
  }));

  // JSON-LD WebSite Structured Data
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: 'Hesaplama araçları ve pratik bilgiler platformu.',
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
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-5">
            <span>Dijital Araç ve Bilgi Platformu</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4 sm:mb-5">
            Hesapla. Öğren. Pratikleştir.
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground mb-7 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Pratika, günlük hayat, iş ve finans için ihtiyaç duyduğunuz araçları ve bilgileri tek bir yerde sunar.
          </p>

          <div className="mb-5">
            <SearchBar placeholder="KDV, faiz, kâr marjı, maliyet..." />
          </div>

          {/* Hızlı Popüler Arama İpuçları */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
            <span className="font-medium text-foreground/80">Popüler:</span>
            <Link
              href="/arac/kdv-hesaplama"
              className="px-2.5 py-1 rounded-lg bg-card border border-border/80 hover:border-primary/50 hover:text-foreground transition-colors"
            >
              KDV Hesaplama
            </Link>
            <Link
              href="/arac/maliyet-hesaplama"
              className="px-2.5 py-1 rounded-lg bg-card border border-border/80 hover:border-primary/50 hover:text-foreground transition-colors"
            >
              Maliyet Hesaplama
            </Link>
            <Link
              href="/arac/faiz-hesaplama"
              className="px-2.5 py-1 rounded-lg bg-card border border-border/80 hover:border-primary/50 hover:text-foreground transition-colors"
            >
              Faiz Hesaplama
            </Link>
            <Link
              href="/arac/kar-marji-hesaplama"
              className="px-2.5 py-1 rounded-lg bg-card border border-border/80 hover:border-primary/50 hover:text-foreground transition-colors"
            >
              Kâr Marjı
            </Link>
            <Link
              href="/arac/kredi-taksit-hesaplama"
              className="px-2.5 py-1 rounded-lg bg-card border border-border/80 hover:border-primary/50 hover:text-foreground transition-colors"
            >
              Kredi Taksit
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. PRATİKA NEDİR?                                            */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-border/40">
        <div className="container mx-auto max-w-4xl">
          <div className="p-7 sm:p-9 rounded-2xl border border-border/70 bg-card shadow-xs">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1.5">
                Platform Tanıtımı
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
                Pratika nedir?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Pratika, insanların günlük hayatta, işte ve finansal konularda ihtiyaç duyduğu hesaplamaları, 
                pratik araçları ve anlaşılır bilgileri tek bir platformda bulabilmesi için geliştirilen dijital bir araç ve bilgi platformudur.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-7 pt-7 border-t border-border/60 text-left">
                <div>
                  <h3 className="font-bold text-sm text-foreground mb-1">Pratik ve Sade</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Karmaşık formüller ve dikkat dağıtan unsurlar olmadan doğrudan sonuca ulaştırır.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground mb-1">Açık ve Doğru Hesaplamalar</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Yasal mevzuata, kanuni katsayılara ve standart formüllere uygun güvenilir hesaplama motoru.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground mb-1">Anlaşılır Bilgi</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Hesaplamanın arkasındaki mantığı ve gerçek hayat örneklerini şeffaf biçimde sunar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. KATEGORİLER (İHTİYACINIZA GÖRE KEŞFEDİN)                 */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-muted/10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-7 gap-2">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                Kapsamlı Kütüphane
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                İhtiyacınıza göre keşfedin
              </h2>
            </div>
            <Link
              href="/araclar"
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
            >
              Tüm araçları listele &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryToolCounts.map((cat) => (
              <Link
                key={cat.id}
                href={`/kategori/${cat.slug}`}
                className="group flex flex-col justify-between p-5 rounded-xl border border-border/70 bg-card hover:border-primary/50 hover:shadow-xs transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                      {cat.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                      {cat.toolCount} Araç
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="pt-4 mt-2 text-xs font-semibold text-primary group-hover:translate-x-0.5 transition-transform">
                  Kategoriye Git &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. ÖNE ÇIKAN ARAÇLAR                                         */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-border/40">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-7 gap-2">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                Popüler Çözümler
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Öne Çıkan Araçlar
              </h2>
            </div>
            <Link
              href="/araclar"
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
            >
              Tüm 39 aracı keşfet &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          <div className="mt-7 text-center">
            <Link
              href="/araclar"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl border border-border/80 bg-card hover:bg-muted/40 font-semibold text-xs sm:text-sm text-foreground transition-all shadow-2xs"
            >
              Katalogdaki Tüm Araçları Gör ({tools.length}) &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BİLGİ MERKEZİ                                             */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-muted/10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-7 gap-2">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                Pratika Rehberleri
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-1">
                Sadece hesaplamayın, öğrenin.
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                Pratika Bilgi Merkezi&apos;nde hesaplamaların arkasındaki kavramları, formülleri ve gerçek kullanım örneklerini sade bir dille keşfedin.
              </p>
            </div>
            <Link
              href="/bilgi"
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 shrink-0"
            >
              Tüm Bilgi Merkezi &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/bilgi/${article.slug}`}
                className="group flex flex-col justify-between p-5 sm:p-6 rounded-xl border border-border/70 bg-card hover:border-primary/50 hover:shadow-xs transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span className="font-semibold text-primary">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors mb-1.5">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {article.description}
                  </p>
                </div>
                <div className="pt-3 mt-1 text-xs font-semibold text-primary group-hover:translate-x-0.5 transition-transform">
                  Rehberi Oku &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. NEDEN PRATİKA?                                            */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-border/40">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-9">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
              Kalite ve Standart
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
              Neden Pratika?
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Karmaşık ve reklam dolu sayfalar yerine, ihtiyacınız olan sonuca güvenle ulaşmanız için tasarlandı.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl border border-border/60 bg-card">
              <h3 className="font-bold text-sm text-foreground mb-1.5">Sade ve Hızlı</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Gereksiz adımlardan arındırılmış, doğrudan sonuca ulaştıran hafif ve akıcı arayüz.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border/60 bg-card">
              <h3 className="font-bold text-sm text-foreground mb-1.5">Açık ve Doğru Hesaplamalar</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Formülleri doğrulanmış, matematiksel standartlara ve güncel mevzuata uygun hesaplama altyapısı.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border/60 bg-card">
              <h3 className="font-bold text-sm text-foreground mb-1.5">Anlaşılır Açıklamalar</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Hesaplama mantığını, formül detaylarını ve sıkça sorulan soruları sade bir dille anlatan rehberler.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border/60 bg-card">
              <h3 className="font-bold text-sm text-foreground mb-1.5">Gerçek Örnekler</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Teorik kalıplar yerine ticarette, işte ve günlük hayatta karşılaşılan somut senaryolar.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border/60 bg-card">
              <h3 className="font-bold text-sm text-foreground mb-1.5">Mobil ve Masaüstü Uyumlu</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Telefon, tablet veya bilgisayarda eksiksiz ve rahat çalışan responsive altyapı.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border/60 bg-card">
              <h3 className="font-bold text-sm text-foreground mb-1.5">Sürekli Gelişen Kütüphane</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Kullanıcı ihtiyaçları doğrultusunda düzenli olarak genişleyen araç ve içerik seti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. NASIL ÇALIŞIR?                                            */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-muted/10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center max-w-xl mx-auto mb-9">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
              Kolay Kullanım
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
              Nasıl çalışır?
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Üç basit adımda hesabınızı yapın veya aradığınız bilgiye ulaşın.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 sm:p-6 rounded-xl border border-border/70 bg-card flex flex-col justify-between">
              <div>
                <span className="text-xl sm:text-2xl font-black text-primary/40 block mb-2.5 font-mono">
                  01
                </span>
                <h3 className="font-bold text-base text-foreground mb-1.5">
                  İhtiyacını bul
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Arama alanından veya kategoriler üzerinden aradığın hesaplama aracını ya da bilgi konusunu keşfet.
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-xl border border-border/70 bg-card flex flex-col justify-between">
              <div>
                <span className="text-xl sm:text-2xl font-black text-primary/40 block mb-2.5 font-mono">
                  02
                </span>
                <h3 className="font-bold text-base text-foreground mb-1.5">
                  Hesapla veya öğren
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Değerlerini girerek anında hesaplama yap veya Bilgi Merkezi rehberinden formülün mantığını incele.
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-xl border border-border/70 bg-card flex flex-col justify-between">
              <div>
                <span className="text-xl sm:text-2xl font-black text-primary/40 block mb-2.5 font-mono">
                  03
                </span>
                <h3 className="font-bold text-base text-foreground mb-1.5">
                  Sonucunu kullan
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Hesabını hızlıca tamamla, detaylı sonuçları ve dökümleri işinde veya günlük hayatında kullan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. KISA MARKA MESAJI                                         */}
      {/* ============================================================ */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-border/40">
        <div className="container mx-auto max-w-3xl text-center">
          <blockquote className="text-base sm:text-lg font-bold text-foreground max-w-2xl mx-auto mb-2 leading-snug">
            &ldquo;Pratika, internette farklı yerlerde aranan küçük ama önemli ihtiyaçları tek bir yerde buluşturmayı hedefler.&rdquo;
          </blockquote>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Hesaplama araçlarından dönüşümlere ve rehber bilgilere kadar zamanla büyüyen dijital platform.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. SON CTA                                                   */}
      {/* ============================================================ */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-muted/15">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-2.5">
            Aradığınız şeyi bulun.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mb-7 max-w-md mx-auto">
            İhtiyacınız olan aracı veya bilgiyi Pratika&apos;da hemen keşfedin.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/araclar"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-sm hover:bg-primary/90 transition-all text-center"
            >
              Tüm Araçları Keşfet ({tools.length})
            </Link>
            <Link
              href="/bilgi"
              className="w-full sm:w-auto px-7 py-3 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:bg-muted/40 transition-all text-center"
            >
              Bilgi Merkezi&apos;ne Git ({articles.length})
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
