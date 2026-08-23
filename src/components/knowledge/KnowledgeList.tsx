'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { articles } from '@/data/articles';

export default function KnowledgeList() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    const trimmed = searchQuery.trim().toLocaleLowerCase('tr-TR');
    if (!trimmed) return articles;

    return articles.filter((article) => {
      const matchTitle = article.title.toLocaleLowerCase('tr-TR').includes(trimmed);
      const matchDesc = article.description.toLocaleLowerCase('tr-TR').includes(trimmed);
      const matchCat = article.category.toLocaleLowerCase('tr-TR').includes(trimmed);
      const matchKeywords = article.keywords?.some((k) =>
        k.toLocaleLowerCase('tr-TR').includes(trimmed)
      );

      return matchTitle || matchDesc || matchCat || matchKeywords;
    });
  }, [searchQuery]);

  return (
    <div className="w-full space-y-8">
      {/* Arama Alanı */}
      <div className="relative w-full max-w-xl mx-auto">
        <div className="relative flex items-center w-full h-12 sm:h-14 rounded-full border border-border/80 bg-card shadow-xs hover:shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all overflow-hidden">
          <div className="grid place-items-center h-full w-11 sm:w-14 text-muted-foreground shrink-0">
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
            placeholder="Bilgi içeriklerinde arayın..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="peer h-full w-full outline-none text-sm sm:text-base bg-transparent pr-4 text-foreground placeholder:text-muted-foreground"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mr-3 p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors text-xs font-semibold shrink-0"
              aria-label="Aramayı Temizle"
            >
              Temizle
            </button>
          )}
        </div>
      </div>

      {/* İçerik Listesi */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/bilgi/${article.slug}`}
              className="group block p-6 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted/60 text-muted-foreground">
                    {article.category}
                  </span>
                  {article.readTime && (
                    <span className="text-xs text-muted-foreground/80">
                      {article.readTime}
                    </span>
                  )}
                </div>

                <h2 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                  {article.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {article.description}
                </p>
              </div>

              <div className="mt-5 flex items-center text-xs font-semibold text-primary">
                <span>İçeriği Oku</span>
                <span className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-xl border border-dashed border-border bg-card/40 my-6">
          <p className="text-base font-semibold text-foreground mb-1">
            Aradığınız kriterlere uygun bir bilgi içeriği bulunamadı.
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Farklı bir arama terimi deneyebilir veya arama kutusunu temizleyebilirsiniz.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            Aramayı Temizle
          </button>
        </div>
      )}
    </div>
  );
}
