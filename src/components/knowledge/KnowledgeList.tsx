'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { articles } from '@/data/articles';
import { matchesSearchQuery } from '@/lib/search';

export default function KnowledgeList() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;

    return articles.filter((article) => {
      const searchTargets = [
        article.title,
        article.description,
        article.category,
        ...(article.keywords || []),
      ];

      return matchesSearchQuery(searchTargets, searchQuery);
    });
  }, [searchQuery]);

  return (
    <div className="w-full space-y-8">
      {/* Arama Alanı */}
      <div className="relative w-full max-w-xl mx-auto">
        <div className="relative flex items-center w-full h-12 sm:h-13 rounded-xl border border-border bg-card shadow-xs hover:border-foreground/30 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <div className="grid place-items-center h-full w-11 sm:w-12 text-muted-foreground shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            type="text"
            id="knowledge-search"
            aria-label="Bilgi İçeriklerinde Ara"
            autoComplete="off"
            placeholder="Rehber veya konu arayın..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="peer h-full w-full outline-none text-sm sm:text-base bg-transparent pr-4 text-foreground placeholder:text-muted-foreground"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mr-3 px-2 py-1 rounded-md bg-muted text-muted-foreground hover:text-foreground transition-colors text-xs font-semibold shrink-0"
              aria-label="Aramayı Temizle"
            >
              Temizle
            </button>
          )}
        </div>
      </div>

      {/* Sonuç Sayısı */}
      <div className="flex items-center justify-between border-b border-border/60 pb-2 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">
          {filteredArticles.length} Rehber {searchQuery ? 'Bulundu' : 'Listeleniyor'}
        </span>
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-primary hover:underline font-medium"
          >
            Filtreyi Temizle
          </button>
        )}
      </div>

      {/* İçerik Listesi */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/bilgi/${article.slug}`}
              className="group block p-6 rounded-xl border border-border/70 bg-card hover:border-foreground/30 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                    {article.category}
                  </span>
                  {article.readTime && (
                    <span className="text-xs text-muted-foreground">
                      {article.readTime}
                    </span>
                  )}
                </div>

                <h2 className="font-semibold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                  {article.title}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {article.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary">
                <span className="text-muted-foreground font-normal text-[11px]">Rehber İçeriği</span>
                <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  İçeriği Oku &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-xl border border-dashed border-border bg-card/60 my-6">
          <p className="text-base font-semibold text-foreground mb-1">
            Aradığınız kriterlere uygun rehber bulunamadı.
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Farklı bir arama terimi deneyebilir veya filtreyi temizleyebilirsiniz.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all"
          >
            Tüm Rehberleri Göster
          </button>
        </div>
      )}
    </div>
  );
}

