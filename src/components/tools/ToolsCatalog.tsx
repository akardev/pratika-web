'use client';

import { useState, useMemo } from 'react';
import { tools, getActiveCategories, getCategoryById } from '@/data/tools';
import ToolCard from '@/components/ui/ToolCard';

export default function ToolsCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => getActiveCategories(), []);

  const filteredTools = useMemo(() => {
    const trimmed = searchQuery.trim().toLocaleLowerCase('tr-TR');

    return tools.filter((tool) => {
      if (tool.status !== 'active') return false;

      // Kategori Filtresi
      if (selectedCategory !== 'all' && tool.categoryId !== selectedCategory) {
        return false;
      }

      // Arama Filtresi
      if (trimmed) {
        const matchTitle = tool.title.toLocaleLowerCase('tr-TR').includes(trimmed);
        const matchDesc = tool.description.toLocaleLowerCase('tr-TR').includes(trimmed);
        const matchKeywords = tool.keywords?.some((k) =>
          k.toLocaleLowerCase('tr-TR').includes(trimmed)
        );
        const category = getCategoryById(tool.categoryId);
        const matchCategory = category?.title.toLocaleLowerCase('tr-TR').includes(trimmed);

        return matchTitle || matchDesc || matchKeywords || matchCategory;
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full space-y-8">
      {/* Arama Alanı */}
      <div className="relative w-full max-w-xl mx-auto">
        <div className="relative flex items-center w-full h-12 rounded-xl border border-border bg-card shadow-xs hover:shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
            id="catalog-search"
            aria-label="Araç Ara"
            autoComplete="off"
            placeholder="Aramak istediğiniz aracı yazın..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-full w-full outline-none text-sm bg-transparent pr-4 text-foreground placeholder:text-muted-foreground"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mr-3 p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors text-xs font-semibold"
              aria-label="Aramayı Temizle"
            >
              Temizle
            </button>
          )}
        </div>
      </div>

      {/* Kategori Filtre Butonları */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all ${
            selectedCategory === 'all'
              ? 'bg-primary text-primary-foreground shadow-xs'
              : 'bg-card text-muted-foreground border border-border/80 hover:text-foreground hover:bg-muted/40'
          }`}
        >
          Tümü ({tools.filter((t) => t.status === 'active').length})
        </button>

        {categories.map((cat) => {
          const count = tools.filter((t) => t.status === 'active' && t.categoryId === cat.id).length;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all ${
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-card text-muted-foreground border border-border/80 hover:text-foreground hover:bg-muted/40'
              }`}
            >
              {cat.title} ({count})
            </button>
          );
        })}
      </div>

      {/* Araç Listesi */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-xl border border-dashed border-border bg-card/40 my-6">
          <p className="text-base font-semibold text-foreground mb-1">
            Aradığınız kriterlere uygun bir araç bulunamadı.
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Farklı bir arama terimi deneyebilir veya kategori filtresini sıfırlayabilirsiniz.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            Filtreleri Sıfırla
          </button>
        </div>
      )}
    </div>
  );
}
