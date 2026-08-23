'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { tools, categories } from '@/data/tools';
import { matchesSearchQuery, getSearchRelevanceScore } from '@/lib/search';

interface SearchBarProps {
  placeholder?: string;
  placeholderMobile?: string;
  className?: string;
  autoFocus?: boolean;
  onSelect?: () => void;
  id?: string;
}

export default function SearchBar({
  placeholder = 'KDV, PDF, QR kod, yüzde, fotoğraf...',
  placeholderMobile,
  className = '',
  autoFocus = false,
  onSelect,
  id = 'global-search',
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mobil ekran tespiti ile placeholder optimizasyonu
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activePlaceholder = isMobileScreen
    ? placeholderMobile || (placeholder.includes('(') ? placeholder.split('(')[0].trim() : placeholder)
    : placeholder;

  // Global Ctrl+K / Cmd+K kısayol dinleyicisi
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
        setIsOpen(true);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredTools = useMemo(() => {
    if (!query.trim()) return [];
    const matched = tools.filter((tool) => {
      if (tool.status !== 'active') return false;
      const category = categories.find((c) => c.id === tool.categoryId);
      const searchTargets = [
        tool.title,
        tool.description,
        tool.slug,
        category?.title,
        category?.slug,
        ...(tool.keywords || []),
      ];
      return matchesSearchQuery(searchTargets, query);
    });

    return matched.sort((a, b) => {
      const scoreA = getSearchRelevanceScore(a, query);
      const scoreB = getSearchRelevanceScore(b, query);
      return scoreB - scoreA;
    });
  }, [query]);


  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleNavigateToTool = useCallback((slug: string) => {
    setIsOpen(false);
    setQuery('');
    onSelect?.();
    router.push(`/arac/${slug}`);
  }, [onSelect, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && selectedIndex < filteredTools.length) {
      handleNavigateToTool(filteredTools[selectedIndex].slug);
    } else if (filteredTools.length > 0) {
      handleNavigateToTool(filteredTools[0].slug);
    } else if (query.trim()) {
      setIsOpen(false);
      router.push(`/araclar?q=${encodeURIComponent(query.trim())}`);
      onSelect?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredTools.length === 0) return;

    const maxItems = Math.min(filteredTools.length, 6);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 >= maxItems ? 0 : prev + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 < 0 ? maxItems - 1 : prev - 1));
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const getCategoryTitle = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.title || 'Genel';
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center w-full h-12 sm:h-14 rounded-xl border border-border bg-card shadow-xs hover:border-foreground/30 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
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
            ref={inputRef}
            className="peer h-full w-full outline-none text-sm sm:text-base bg-transparent pr-3 text-foreground placeholder:text-muted-foreground"
            type="text"
            id={id}
            autoComplete="off"
            autoFocus={autoFocus}
            placeholder={activePlaceholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            aria-label="Araç Arama"
          />

          {/* Temizle Butonu */}
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedIndex(-1);
                inputRef.current?.focus();
              }}
              className="mr-2 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-xs shrink-0"
              aria-label="Aramayı Temizle"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            /* Kısayol Göstergesi (Desktop) */
            <div className="hidden sm:flex items-center gap-1 mr-3 px-1.5 py-0.5 rounded border border-border/80 bg-muted/50 text-[10px] font-mono font-medium text-muted-foreground select-none pointer-events-none">
              <span>⌘K</span>
            </div>
          )}


          <button
            type="submit"
            className="h-9 px-4 mr-1.5 rounded-lg bg-foreground text-background text-xs sm:text-sm font-medium hover:bg-foreground/90 transition-colors hidden sm:block shrink-0"
          >
            Bul
          </button>
        </div>
      </form>

      {/* Arama Sonuçları Açılır Menüsü */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-card rounded-xl border border-border shadow-lg p-2 z-50 animate-in fade-in duration-100 max-h-[380px] overflow-y-auto">
          {filteredTools.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex justify-between items-center">
                <span>Eşleşen Araçlar ({filteredTools.length})</span>
                <span className="text-[10px] lowercase font-normal hidden sm:inline">seçmek için ↑↓ enter</span>
              </div>
              {filteredTools.slice(0, 6).map((tool, index) => {
                const isSelected = selectedIndex === index;
                return (
                  <Link
                    key={tool.id}
                    href={`/arac/${tool.slug}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery('');
                      onSelect?.();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors group ${
                      isSelected ? 'bg-muted text-foreground' : 'hover:bg-muted/60'
                    }`}
                  >
                    <div className="pr-3 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                          {tool.title}
                        </span>
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted/80 text-muted-foreground border border-border/40">
                          {getCategoryTitle(tool.categoryId)}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {tool.description}
                      </div>
                    </div>
                    <span className="text-xs font-medium text-primary shrink-0 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Kullan &rarr;
                    </span>
                  </Link>
                );
              })}

              {filteredTools.length > 6 && (
                <div className="pt-2 border-t border-border/60 text-center">
                  <Link
                    href={`/araclar?q=${encodeURIComponent(query.trim())}`}
                    onClick={() => {
                      setIsOpen(false);
                      onSelect?.();
                    }}
                    className="text-xs font-semibold text-primary hover:underline p-1.5 block"
                  >
                    Tüm {filteredTools.length} sonucu katalogda gör &rarr;
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-sm font-medium text-foreground mb-1">
                &ldquo;{query}&rdquo; için araç bulunamadı
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Farklı bir anahtar kelime deneyin veya tüm araçlar kataloğuna göz atın.
              </p>
              <Link
                href="/araclar"
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                  onSelect?.();
                }}
                className="inline-flex items-center text-xs font-semibold text-primary hover:underline"
              >
                Tüm Araçlar Kataloğu &rarr;
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

