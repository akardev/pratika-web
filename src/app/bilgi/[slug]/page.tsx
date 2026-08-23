import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { articles, getArticleBySlug } from '@/data/articles';
import { tools } from '@/data/tools';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: 'İçerik Bulunamadı | Pratika',
    };
  }

  return {
    title: `${article.title} | Pratika`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const relatedTool = article.relatedToolSlug
    ? tools.find((t) => t.slug === article.relatedToolSlug)
    : undefined;

  const relatedArticles = articles
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-3xl">
      {/* Geri Bağlantısı */}
      <div className="mb-6">
        <Link
          href="/bilgi"
          className="text-xs font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
        >
          &larr; Bilgi Merkezi
        </Link>
      </div>

      {/* Makale Başlık Alanı */}
      <header className="mb-8 border-b border-border/60 pb-8">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
            {article.category}
          </span>
          {article.readTime && (
            <span className="text-xs text-muted-foreground">
              {article.readTime}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3 leading-tight">
          {article.title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {article.description}
        </p>
      </header>

      {/* İlgili Araç Üst Banner'ı (Varsa) */}
      {relatedTool && (
        <div className="mb-8 p-4 sm:p-5 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
              Pratik Hesaplama Aracı
            </p>
            <p className="text-sm text-foreground font-medium">
              Bu hesaplamayı doğrudan Pratika&apos;nın <strong>{relatedTool.title}</strong> aracıyla anında yapabilirsiniz.
            </p>
          </div>
          <Link
            href={`/arac/${relatedTool.slug}`}
            className="inline-flex items-center justify-center shrink-0 px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs"
          >
            {relatedTool.title} &rarr;
          </Link>
        </div>
      )}

      {/* Makale Bölümleri */}
      <div className="space-y-8 text-foreground">
        {article.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            {section.heading && (
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground pt-2">
                {section.heading}
              </h2>
            )}

            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-base text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}

            {/* Formül Kutusu */}
            {section.formula && (
              <div className="my-4 p-4 rounded-xl border border-border/80 bg-muted/30 font-mono text-xs sm:text-sm text-foreground whitespace-pre-line leading-relaxed">
                <span className="text-xs font-semibold text-muted-foreground block mb-1 font-sans uppercase tracking-wider">
                  Formül:
                </span>
                {section.formula}
              </div>
            )}

            {/* Örnek Kutusu */}
            {section.example && (
              <div className="my-5 p-5 rounded-xl border border-border bg-card shadow-xs">
                <h3 className="text-sm font-bold text-foreground mb-3">
                  {section.example.title}
                </h3>
                <div className="divide-y divide-border/60 text-xs sm:text-sm">
                  {section.example.items.map((item, iIdx) => (
                    <div key={iIdx} className="py-2 flex justify-between items-center gap-4">
                      <span className="text-muted-foreground">{item.label}:</span>
                      <span className="font-semibold text-foreground text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Not / İpucu Kutusu */}
            {section.note && (
              <div className="p-4 rounded-xl bg-muted/40 border border-border/60 text-xs sm:text-sm text-muted-foreground">
                <strong className="font-semibold text-foreground">Not: </strong>
                {section.note}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* İlgili Araç Alt Kartı */}
      {relatedTool && (
        <div className="mt-12 p-6 rounded-xl border border-border/80 bg-card shadow-xs text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base text-foreground mb-1">
              Hesaplama Yapmak İster misiniz?
            </h3>
            <p className="text-xs text-muted-foreground">
              {relatedTool.description}
            </p>
          </div>
          <Link
            href={`/arac/${relatedTool.slug}`}
            className="w-full sm:w-auto text-center px-5 py-2.5 text-xs font-bold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs shrink-0"
          >
            {relatedTool.title} Aracı &rarr;
          </Link>
        </div>
      )}

      {/* İlgili Diğer İçerikler */}
      {relatedArticles.length > 0 && (
        <div className="border-t border-border/60 pt-10 mt-12">
          <h2 className="text-lg font-bold tracking-tight text-foreground mb-4">
            İlgili Diğer Bilgiler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((ra) => (
              <Link
                key={ra.id}
                href={`/bilgi/${ra.slug}`}
                className="group block p-4 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-xs transition-all"
              >
                <span className="text-xs font-semibold text-primary mb-1 block">
                  {ra.category}
                </span>
                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  {ra.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
