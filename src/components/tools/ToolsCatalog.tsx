'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { tools, getActiveCategories, getCategoryById } from '@/data/tools';
import { matchesSearchQuery } from '@/lib/search';
import ToolCard from '@/components/ui/ToolCard';
import { Tool } from '@/types';

type SortOption = 'recommended' | 'az' | 'za';

export default function ToolsCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL query parametrelerinden başlangıç state'lerini al
  const initialCategory = searchParams.get('kategori') || 'all';
  const initialQuery = searchParams.get('q') || '';
  const initialSort = (searchParams.get('sirala') as SortOption) || 'recommended';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortOption, setSortOption] = useState<SortOption>(initialSort);

  // URL query parametrelerini güncelle (sayfa yenilenmeden)
  const updateUrlParams = useCallback(
    (newCategory: string, newQuery: string, newSort: SortOption) => {
      const params = new URLSearchParams();

      if (newCategory && newCategory !== 'all') {
        params.set('kategori', newCategory);
      }
      if (newQuery.trim()) {
        params.set('q', newQuery.trim());
      }
      if (newSort && newSort !== 'recommended') {
        params.set('sirala', newSort);
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      
      // router.replace ile scroll zıplaması olmadan URL güncelle
      window.history.replaceState(null, '', newUrl);
    },
    [pathname]
  );

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    updateUrlParams(categoryId, searchQuery, sortOption);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateUrlParams(selectedCategory, value, sortOption);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortOption(newSort);
    updateUrlParams(selectedCategory, searchQuery, newSort);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortOption('recommended');
    router.replace(pathname, { scroll: false });
  };

  // Aktif kategoriler
  const categories = useMemo(() => getActiveCategories(), []);

  // Filtreleme mantığı
  const filteredTools = useMemo(() => {
    const activeTools = tools.filter((tool) => tool.status === 'active');

    return activeTools.filter((tool) => {
      // Kategori Filtresi
      if (selectedCategory !== 'all' && tool.categoryId !== selectedCategory) {
        return false;
      }

      // Arama Filtresi (Türkçe ve normalleştirilmiş toleranslı)
      if (searchQuery.trim()) {
        const category = getCategoryById(tool.categoryId);
        const searchTargets = [
          tool.title,
          tool.description,
          tool.slug,
          category?.title,
          category?.slug,
          ...(tool.keywords || []),
        ];

        return matchesSearchQuery(searchTargets, searchQuery);
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  // Sıralama mantığı
  const sortedTools = useMemo(() => {
    const list = [...filteredTools];

    switch (sortOption) {
      case 'az':
        return list.sort((a, b) => a.title.localeCompare(b.title, 'tr-TR'));
      case 'za':
        return list.sort((a, b) => b.title.localeCompare(a.title, 'tr-TR'));
      case 'recommended':
      default:
        // Doğal katalog sırası
        return list;
    }
  }, [filteredTools, sortOption]);

  // Toplam aktif araç sayısı
  const totalActiveToolsCount = useMemo(() => {
    return tools.filter((t) => t.status === 'active').length;
  }, []);

  // Filtre uygulanmış mı kontrolü
  const isFiltered = selectedCategory !== 'all' || searchQuery.trim().length > 0;

  // Dinamik sonuç metni
  const getResultCountText = () => {
    const count = sortedTools.length;
    if (!isFiltered) {
      return `${count} araç listeleniyor`;
    }
    if (count === 1) {
      return '1 araç bulundu';
    }
    return `${count} araç bulundu`;
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* 1. ARAMA ALANI */}
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="relative flex items-center w-full h-12 sm:h-14 rounded-2xl border border-border/80 bg-card shadow-xs hover:border-primary/40 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden">
          <div className="grid place-items-center h-full w-12 sm:w-14 text-muted-foreground shrink-0">
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
            id="catalog-search"
            aria-label="Aracınızı veya yapmak istediğiniz işlemi arayın"
            autoComplete="off"
            placeholder="Aracınızı veya yapmak istediğiniz işlemi arayın..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-full w-full outline-none text-sm sm:text-base bg-transparent pr-4 text-foreground placeholder:text-muted-foreground"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              className="mr-3 px-2.5 py-1 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors text-xs font-semibold shrink-0"
              aria-label="Aramayı Temizle"
            >
              Temizle
            </button>
          )}
        </div>
      </div>

      {/* 2. KATEGORİ FİLTRELERİ */}
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {/* Tümü Butonu */}
          <button
            type="button"
            onClick={() => handleCategoryChange('all')}
            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'bg-card text-muted-foreground border border-border/70 hover:text-foreground hover:bg-muted/40'
            }`}
          >
            Tümü ({totalActiveToolsCount})
          </button>

          {/* Kategori Butonları */}
          {categories.map((cat) => {
            const count = tools.filter((t) => t.status === 'active' && t.categoryId === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all shrink-0 ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-card text-muted-foreground border border-border/70 hover:text-foreground hover:bg-muted/40'
                }`}
              >
                {cat.title} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SONUÇ SAYISI VE SIRALAMA ÇUBUĞU */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 pb-1 border-b border-border/50">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold text-foreground">
            {getResultCountText()}
          </span>
          {isFiltered && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-primary hover:underline font-medium"
            >
              (Filtreleri Temizle)
            </button>
          )}
        </div>

        {/* Sıralama Seçenekleri */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="catalog-sort" className="text-xs text-muted-foreground font-medium">
            Sırala:
          </label>
          <select
            id="catalog-sort"
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="text-xs font-medium bg-card border border-border/80 text-foreground rounded-lg px-2.5 py-1.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer"
          >
            <option value="recommended">Önerilen</option>
            <option value="az">Alfabetik (A-Z)</option>
            <option value="za">Alfabetik (Z-A)</option>
          </select>
        </div>
      </div>

      {/* 4. ARAÇ LİSTESİ VEYA EMPTY STATE */}
      {sortedTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {sortedTools.map((tool: Tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        /* 5. EMPTY STATE */
        <div className="p-8 sm:p-14 text-center rounded-2xl border border-dashed border-border/80 bg-card/40 my-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted text-muted-foreground mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-1">
            Aradığınız aracı bulamadık.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Farklı bir kelime deneyin veya kategorilere göz atın.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs"
          >
            Tüm Araçları Göster
          </button>
        </div>
      )}
    </div>
  );
}
