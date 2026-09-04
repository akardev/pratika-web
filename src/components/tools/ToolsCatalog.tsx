'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  tools,
  categories,
  getActiveCategories,
  getPopularTools,
  POPULAR_SEARCH_TAGS,
  getToolsByCategoryId,
} from '@/data/tools';
import { matchesSearchQuery, getSearchRelevanceScore } from '@/lib/search';

import ToolCard from '@/components/ui/ToolCard';
import { Tool, Category } from '@/types';

type SortOption = 'recommended' | 'az' | 'za';

export default function ToolsCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const catalogListRef = useRef<HTMLDivElement>(null);

  // URL query parametrelerinden başlangıç state'lerini al
  const initialCategory = searchParams.get('kategori') || 'all';
  const initialQuery = searchParams.get('q') || '';
  const initialSort = (searchParams.get('sirala') as SortOption) || 'recommended';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortOption, setSortOption] = useState<SortOption>(initialSort);

  // Global Ctrl+K / Cmd+K kısayolu ile hero arama inputuna odaklan
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
      window.history.replaceState(null, '', newUrl);
    },
    [pathname]
  );

  const handleCategoryChange = (categoryId: string, scrollToList = false) => {
    setSelectedCategory(categoryId);
    updateUrlParams(categoryId, searchQuery, sortOption);
    if (scrollToList && catalogListRef.current) {
      catalogListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateUrlParams(selectedCategory, value, sortOption);
  };

  const handlePopularTagClick = (queryText: string) => {
    setSearchQuery(queryText);
    setSelectedCategory('all');
    updateUrlParams('all', queryText, sortOption);
    if (catalogListRef.current) {
      catalogListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
  const activeCategories = useMemo(() => getActiveCategories(), []);

  // Popüler 8 araç
  const popularTools = useMemo(() => getPopularTools(), []);

  // Toplam aktif araç sayısı
  const totalActiveToolsCount = useMemo(() => {
    return tools.filter((t) => t.status === 'active').length;
  }, []);

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
        const category = categories.find((c) => c.id === tool.categoryId);
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
        if (searchQuery.trim()) {
          return list.sort((a, b) => {
            const scoreA = getSearchRelevanceScore(a, searchQuery);
            const scoreB = getSearchRelevanceScore(b, searchQuery);
            return scoreB - scoreA;
          });
        }
        return list;
    }
  }, [filteredTools, sortOption, searchQuery]);


  const isFiltered = selectedCategory !== 'all' || searchQuery.trim().length > 0;

  // Seçili kategori bilgisi
  const currentCategoryObj = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return categories.find((c) => c.id === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* ============================================================ */}
      {/* 1. HERO & SEARCH ALANI                                      */}
      {/* ============================================================ */}
      <section className="text-center pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border/60 mb-4">
          <span>Pratika Araç Kataloğu</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3">
          İhtiyacınız olan aracı bulun.
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Hesaplama, dönüştürme ve günlük işler için pratik, hızlı ve güvenilir dijital araçlar.
        </p>

        {/* BÜYÜK ARAMA ALANI */}
        <div className="relative w-full max-w-2xl mx-auto mb-4">
          <div className="relative flex items-center w-full h-13 sm:h-14 rounded-xl border border-border bg-card shadow-xs hover:border-foreground/30 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <div className="grid place-items-center h-full w-12 sm:w-14 text-muted-foreground shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              ref={searchInputRef}
              type="text"
              id="hero-catalog-search"
              aria-label="Katalogda arama yapın"
              autoComplete="off"
              placeholder="Araç veya işlem arayın..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="h-full w-full outline-none text-sm sm:text-base bg-transparent pr-3 text-foreground placeholder:text-muted-foreground"
            />

            {searchQuery ? (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="mr-3 px-2 py-1 rounded-md bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors text-xs font-semibold shrink-0"
                aria-label="Aramayı Temizle"
              >
                Temizle
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-0.5 mr-3.5 px-2 py-0.5 rounded border border-border/80 bg-muted/60 text-[11px] font-mono font-medium text-muted-foreground select-none pointer-events-none shrink-0">
                <span>⌘K / Ctrl K</span>
              </div>

            )}
          </div>
        </div>

        {/* POPÜLER ARAMA HIZLI BAĞLANTILARI */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs text-muted-foreground max-w-2xl mx-auto pt-1">
          <span className="font-semibold text-foreground/80 mr-1">Popüler:</span>
          {POPULAR_SEARCH_TAGS.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => handlePopularTagClick(tag.query)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                searchQuery.toLowerCase() === tag.query.toLowerCase()
                  ? 'bg-foreground text-background border-foreground font-semibold'
                  : 'bg-card border-border/80 text-muted-foreground hover:border-foreground/40 hover:text-foreground'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Kategori Vitrini Yönlendirme Rozeti */}
        <div className="pt-3.5 flex items-center justify-center">
          <Link
            href="/kategoriler"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground bg-card border border-border hover:border-primary/40 hover:bg-muted/30 transition-all shadow-2xs"
          >
            <span>Kategorileri geniş vitrinde incelemek için</span>
            <span className="text-primary font-semibold inline-flex items-center gap-0.5">
              Kategori Vitrini <span>&rarr;</span>
            </span>
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. ÖNE ÇIKAN / POPÜLER ARAÇLAR                               */}
      {/* Sadece filtre uygulanmamışken gösterilir                     */}
      {/* ============================================================ */}
      {!isFiltered && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border/60 pb-3">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                Hızlı Erişim
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                En Çok Kullanılan Araçlar
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Sık kullanılan popüler araçlar
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTools.map((tool: Tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 4. TÜM ARAÇLAR (KATALOG & FİLTRELEME ALANI)                  */}
      {/* ============================================================ */}
      <section ref={catalogListRef} className="space-y-6 pt-4">
        {/* Katalog Başlık & Kontrol Çubuğu */}
        <div className="flex flex-col gap-4 border-b border-border/70 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
                <span>
                  {currentCategoryObj ? `${currentCategoryObj.title} Araçları` : 'Tüm Araçlar'}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/60">
                  {sortedTools.length}
                </span>
              </h2>
              {currentCategoryObj && (
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <p className="text-xs text-muted-foreground">
                    {currentCategoryObj.description}
                  </p>
                  <Link
                    href={`/araclar/${currentCategoryObj.slug}`}
                    className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-0.5"
                  >
                    Kategori Rehberine Git &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Sağ Alan: Sıralama & Filtre Temizleme */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              {isFiltered && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-primary hover:underline font-semibold"
                >
                  Filtreleri Temizle
                </button>
              )}

              <div className="flex items-center gap-1.5">
                <label htmlFor="catalog-sort-select" className="text-xs text-muted-foreground font-medium">
                  Sırala:
                </label>
                <select
                  id="catalog-sort-select"
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                  className="text-xs font-medium bg-card border border-border text-foreground rounded-lg px-2.5 py-1.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer"
                >
                  <option value="recommended">Önerilen Sıralama</option>
                  <option value="az">İsim (A-Z)</option>
                  <option value="za">İsim (Z-A)</option>
                </select>
              </div>
            </div>
          </div>

          {/* KATEGORİ SEÇİCİ BARI (Kompakt, Ekranı Boğmayan Scrollable & Dropdown Hibrit Tasarım) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {/* Tümü Butonu */}
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-foreground text-background font-semibold'
                  : 'bg-card text-muted-foreground border border-border hover:text-foreground hover:border-foreground/30'
              }`}
            >
              Tümü ({totalActiveToolsCount})
            </button>

            {/* Kategori Butonları */}
            {activeCategories.map((cat: Category) => {
              const count = getToolsByCategoryId(cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-foreground text-background font-semibold'
                      : 'bg-card text-muted-foreground border border-border hover:text-foreground hover:border-foreground/30'
                  }`}
                >
                  {cat.title} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* ARAÇ KARTLARI GRİDİ VEYA EMPTY STATE */}
        {sortedTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedTools.map((tool: Tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="p-8 sm:p-14 text-center rounded-2xl border border-dashed border-border bg-card/60 my-6">
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
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
              Aradığınız kriterlere uygun araç bulunamadı.
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
              Farklı bir arama terimi deneyebilir, yazım hatalarını kontrol edebilir veya tüm kategorilere göz atabilirsiniz.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all"
              >
                Tüm Araçları Göster
              </button>
              <button
                type="button"
                onClick={() => handlePopularTagClick('kdv')}
                className="inline-flex items-center px-3 py-2 text-xs font-medium rounded-lg bg-card border border-border text-foreground hover:bg-muted transition-all"
              >
                KDV Hesaplama
              </button>
              <button
                type="button"
                onClick={() => handlePopularTagClick('pdf')}
                className="inline-flex items-center px-3 py-2 text-xs font-medium rounded-lg bg-card border border-border text-foreground hover:bg-muted transition-all"
              >
                PDF Araçları
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

