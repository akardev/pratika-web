import { Metadata } from 'next';
import Link from 'next/link';
import SearchBar from '@/components/ui/SearchBar';
import ToolCard from '@/components/ui/ToolCard';
import TodayWidget from '@/components/home/TodayWidget';
import DailyDiscoverySection from '@/components/discovery/DailyDiscoverySection';
import { tools } from '@/data/tools';
import { articles } from '@/data/articles';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: {
    absolute: 'Pratiksel',
  },
  description: 'Hesaplama, dönüştürme, dosya işlemleri, metin, görsel ve günlük dijital ihtiyaçlar için hızlı, güvenilir ve sade dijital yardımcı platformu.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Pratiksel — Günlük İşler İçin Pratik Dijital Yardımcı',
    description: 'Hesaplama, dönüştürme, dosya işlemleri, metin, görsel ve günlük dijital ihtiyaçlar için hızlı, güvenilir ve sade dijital yardımcı platformu.',
    url: siteConfig.url,
    type: 'website',
  },
};

export default function Home() {
  // Çok yönlü seçilmiş 8 pratik dijital yardımcı (Farklı kategorilerden dengeli örnekler)
  const curatedToolSlugs = [
    'kdv-hesaplama',
    'pdf-jpg-donusturucu',
    'qr-kod-olusturucu',
    'guvenli-sifre-olusturucu',
    'kar-marji-hesaplama',
    'yakit-maliyeti-hesaplama',
    'tarih-farki-hesaplama',
    'json-formatlayici',
  ];

  const featuredTools = curatedToolSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter((t): t is typeof tools[0] => Boolean(t && t.status === 'active'));

  // Öne Çıkan 4 Bilgi Merkezi Rehberi
  const featuredArticleSlugs = [
    'kdv-nasil-hesaplanir',
    'maliyet-nedir-ve-nasil-hesaplanir',
    'kar-marji-nedir-ve-nasil-hesaplanir',
    'kredi-taksiti-nasil-hesaplanir',
  ];

  const featuredArticles = featuredArticleSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((a): a is typeof articles[0] => Boolean(a));

  // JSON-LD WebSite Structured Data
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: 'Günlük dijital ihtiyaçlar, hesaplama ve dönüştürme platformu.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/araclar?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // Kullanıcı Niyetine Dayalı Hızlı Başlangıç Etiketleri (Gerçek ve popüler araçlara doğrudan bağlantı)
  const intentTags = [
    { label: 'Yakıt Maliyeti', query: 'yakıt' },
    { label: 'PDF Dönüştür', query: 'pdf' },
    { label: 'QR Kod Oluştur', query: 'qr' },
    { label: 'KDV Hesapla', query: 'kdv' },
    { label: 'Güvenli Şifre', query: 'şifre' },
    { label: 'Yaş & Tarih', query: 'yaş' },
    { label: 'JSON Formatla', query: 'json' },
  ];

  // 6 Geniş Çözüm Alanı (Pillars of Pratiksel)
  const discoveryPillars = [
    {
      title: 'Hesapla',
      description: 'Finans, kredi, KDV, kâr marjı, indirim, faiz ve matematiksel işlemler.',
      examples: 'KDV • Kredi • Kâr Marjı • Faiz • Yaş',
      href: '/kategoriler/finans',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Dönüştür',
      description: 'PDF\'den görsele, metin formatları, veri dönüşümleri ve ölçü birimleri.',
      examples: 'PDF → JPG • Metin → PDF • Birimler • JSON',
      href: '/kategoriler/donusum',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.033 8.033 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: 'Oluştur',
      description: 'Hızlı QR kodlar, güçlü şifreler, benzersiz UUID\'ler ve test metinleri.',
      examples: 'QR Kod • Güvenli Şifre • UUID • Lorem Ipsum',
      href: '/araclar?q=oluştur',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      title: 'Görsel & Tasarım',
      description: 'Renk kodları, görsel boyutlandırma ve sosyal medya formatları.',
      examples: 'Renk Kodları • Görsel Boyutları • Formatlar',
      href: '/kategoriler/tasarim',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Günlük Hayat',
      description: 'Tarih farkı, iş günleri, yakıt maliyeti, elektrik ve sağlık hesaplamaları.',
      examples: 'Tarih Farkı • İş Günü • Yakıt Maliyeti • BMI',
      href: '/kategoriler/gunluk-hayat',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Öğren & Keşfet',
      description: 'Formüllerin mantığı, mevzuat açıklamaları ve pratik rehberler.',
      examples: 'KDV Mantığı • Maliyet Analizi • Kredi Rehberi',
      href: '/bilgi',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      {/* WebSite JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* ============================================================ */}
      {/* TODAY BAR (GÜNLÜK BAĞLAM VE HAVA DURUMU)                      */}
      {/* ============================================================ */}
      <TodayWidget />

      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="pt-8 pb-7 sm:pt-12 sm:pb-9 px-4 sm:px-6 lg:px-8 border-b border-border/70 bg-card">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border/60 mb-4 sm:mb-5">
            <span>Dijital Yardımcı &amp; Pratik Çözümler</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-3 sm:mb-4">
            İhtiyacın olan pratik çözümler, tek yerde.
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Pratiksel; günlük hayatta, işte ve internette karşılaştığınız küçük ama zaman alan işleri saniyeler içinde çözmenize yardımcı olan sade bir dijital yardımcıdır.
          </p>

          <div className="mb-4 sm:mb-5">
            <SearchBar
              placeholder="Ne yapmak istiyorsun? (Örn: PDF, QR kod, KDV, yakıt...)"
              placeholderMobile="Ne yapmak istiyorsun?"
            />
          </div>

          {/* Doğal Niyet Etiketleri */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs text-muted-foreground pt-1">
            <span className="font-semibold text-foreground/80">Hızlı Başla:</span>
            {intentTags.map((tag) => (
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
      {/* GÜNÜN KEŞFİ (TARİHTE BUGÜN • BİLİYOR MUYDUNUZ • GÜNÜN SORUSU) */}
      {/* ============================================================ */}
      <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-b border-border/60 bg-muted/10">
        <div className="container mx-auto max-w-6xl">
          <DailyDiscoverySection />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. BUGÜN NEYE İHTİYACINIZ VAR? (GENİŞ ÇÖZÜM ALANLARI)         */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-border/60 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2 border-b border-border/60 pb-3">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                Keşfet ve Çözüm Bul
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Bugün neye ihtiyacınız var?
              </h2>
            </div>
            <Link
              href="/araclar"
              className="text-xs font-semibold text-primary hover:underline transition-colors inline-flex items-center gap-1"
            >
              Tüm Çözüm Kataloğu &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {discoveryPillars.map((pillar) => (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="group flex flex-col justify-between p-5 sm:p-6 rounded-xl border border-border/70 bg-card hover:border-foreground/30 hover:shadow-xs transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {pillar.icon}
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      &rarr;
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-border/40 text-[11px] font-medium text-muted-foreground/80 truncate">
                  {pillar.examples}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SEÇİLMİŞ PRATİK ÇÖZÜMLER                                  */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-border/60">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2 border-b border-border/60 pb-3">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                Öne Çıkan Çözümler
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Hemen Kullanabileceğiniz Dijital Yardımcılar
              </h2>
            </div>
            <Link
              href="/araclar"
              className="text-xs font-semibold text-primary hover:underline transition-colors inline-flex items-center gap-1"
            >
              Tüm çözümleri gör &rarr;
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
      {/* 4. NASIL ÇALIŞIR? (3 ADIMDA PRATİKSEL)                         */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-border/60 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1.5">
              Hızlı ve Sade
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground mb-2">
              3 Adımda İşinizi Tamamlayın
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Karmaşık yazılımlara veya üyelik zorunluluklarına gerek kalmadan ihtiyacınızı anında çözün.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-border/70 bg-card shadow-2xs">
              <span className="text-xs font-bold text-primary font-mono px-2.5 py-1 rounded-md bg-primary/10 inline-block mb-3">
                01
              </span>
              <h3 className="font-bold text-base text-foreground mb-1.5">İhtiyacınızı Belirleyin</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Arama çubuğuna yapmak istediğiniz işlemi doğal dille yazın veya kategorilerden doğrudan seçin.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/70 bg-card shadow-2xs">
              <span className="text-xs font-bold text-primary font-mono px-2.5 py-1 rounded-md bg-primary/10 inline-block mb-3">
                02
              </span>
              <h3 className="font-bold text-base text-foreground mb-1.5">Değerlerinizi Girin</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Hesaplama veya dönüştürme alanına bilgilerinizi ekleyin; hiçbir zorunlu kayıt veya bekleme olmadan anında işleyin.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/70 bg-card shadow-2xs">
              <span className="text-xs font-bold text-primary font-mono px-2.5 py-1 rounded-md bg-primary/10 inline-block mb-3">
                03
              </span>
              <h3 className="font-bold text-base text-foreground mb-1.5">Güvenle Sonuçlandırın</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Dosyalarınız ve verileriniz sunuculara gitmez; tarayıcınızda güvenle işlenip anında hazır hale gelir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. PLATFORM DEĞERLERİ (PRATİKSEL NEDEN FARKLI?)                 */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-border/60">
        <div className="container mx-auto max-w-6xl">
          <div className="p-7 sm:p-10 rounded-2xl border border-border/80 bg-card shadow-2xs">
            <div className="w-full">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-2">
                Güvenilirlik &amp; Sadeliğin Standardı
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
                Neden Pratiksel?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
                Pratiksel, gereksiz reklamlar, karmaşık yönlendirmeler ve hantal arayüzler olmadan; aradığınız sonuca tek tıkla ulaşmanızı sağlayan profesyonel bir dijital yardımcı platformudur.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 pt-8 border-t border-border/60 text-left">
                <div className="space-y-1.5">
                  <h3 className="font-bold text-sm sm:text-base text-foreground">Sade &amp; Doğrudan</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Karmaşık adımlar yok. Değerinizi girin, anında doğru ve temiz sonuca ulaşın.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-sm sm:text-base text-foreground">Mevzuata ve Standartlara Uygun</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Kanuni oranlar, yasal katsayılar ve doğrulanmış matematik standartlarıyla çalışır.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-sm sm:text-base text-foreground">%100 Tarayıcıda Güvenli</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    PDF ve görsel işlemleriniz harici sunucuya yüklenmez, cihazınızda güvenle işlenir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. BİLGİ MERKEZİ (BİLGİ + ARAÇ BÜTÜNLÜĞÜ)                     */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-border/60 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2 border-b border-border/60 pb-3">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                Pratiksel Rehberleri
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-1">
                Bir şeyi sadece hesaplamayın, mantığını öğrenin.
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                Bilgi Merkezi&apos;nde formülleri, resmi mevzuatları ve pratik ipuçlarını sade bir dille keşfedin.
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
      {/* 7. SON ÇAĞRI (CTA)                                           */}
      {/* ============================================================ */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
            İhtiyacın olan çözüme hemen ulaş.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            Geniş dijital çözüm havuzu ve kapsamlı bilgi rehberleri ile internetteki işlemlerinizi saniyeler içinde tamamlayın.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/araclar"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-foreground text-background font-semibold text-xs sm:text-sm hover:bg-foreground/90 transition-all text-center cursor-pointer"
            >
              Dijital Çözümleri Keşfet
            </Link>
            <Link
              href="/bilgi"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-border bg-card text-foreground font-semibold text-xs sm:text-sm hover:bg-muted/40 transition-all text-center cursor-pointer"
            >
              Bilgi Merkezi&apos;ne Git
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
