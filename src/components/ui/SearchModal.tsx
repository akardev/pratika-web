'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { tools, categories, POPULAR_SEARCH_TAGS } from '@/data/tools';
import { matchesSearchQuery, getSearchRelevanceScore } from '@/lib/search';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const modalPlaceholder = isMobileScreen
    ? 'Aracınızı arayın...'
    : 'Aracınızı yazın (Örn: KDV, PDF, QR, yüzde, kıdem...)';

  // Modal açıldığında inputa odaklan
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Escape tuşu ile kapatma
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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


  const handleSelectTool = useCallback(
    (slug: string) => {
      onClose();
      router.push(`/arac/${slug}`);
    },
    [onClose, router]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && selectedIndex < filteredTools.length) {
      handleSelectTool(filteredTools[selectedIndex].slug);
    } else if (filteredTools.length > 0) {
      handleSelectTool(filteredTools[0].slug);
    } else if (query.trim()) {
      onClose();
      router.push(`/araclar?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const maxItems = Math.min(filteredTools.length, 8);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 >= maxItems ? 0 : prev + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 < 0 ? maxItems - 1 : prev - 1));
    }
  };

  const getCategoryTitle = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.title || 'Genel';
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 overflow-y-auto bg-foreground/30 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl bg-card rounded-2xl border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-label="Araç Ara"
      >
        {/* Arama Input Barı */}
        <form onSubmit={handleSubmit} className="relative border-b border-border/70">
          <div className="flex items-center px-4 h-14 sm:h-16">
            <svg
              className="w-5 h-5 text-muted-foreground shrink-0 mr-3"
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

            <input
              ref={inputRef}
              type="text"
              className="w-full bg-transparent text-sm sm:text-base outline-none text-foreground placeholder:text-muted-foreground"
              placeholder={modalPlaceholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />

            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedIndex(-1);
                  inputRef.current?.focus();
                }}
                className="p-1 text-xs text-muted-foreground hover:text-foreground rounded-md bg-muted mr-2"
                aria-label="Aramayı temizle"
              >
                Temizle
              </button>
            ) : null}

            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground border border-border rounded-md bg-muted/40"
              aria-label="Kapat"
            >
              ESC
            </button>
          </div>
        </form>

        {/* Sonuç Alanı */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() ? (
            filteredTools.length > 0 ? (
              <div className="space-y-1">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex justify-between items-center">
                  <span>Eşleşen Araçlar ({filteredTools.length})</span>
                  <span className="text-[10px] font-normal lowercase hidden sm:inline">
                    seçmek için ↑↓ enter
                  </span>
                </div>

                {filteredTools.slice(0, 8).map((tool, index) => {
                  const isSelected = selectedIndex === index;
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => handleSelectTool(tool.slug)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left flex items-center justify-between p-3 rounded-xl transition-colors ${
                        isSelected ? 'bg-muted text-foreground' : 'hover:bg-muted/60'
                      }`}
                    >
                      <div className="pr-3 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-foreground">
                            {tool.title}
                          </span>
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-card text-muted-foreground border border-border/60">
                            {getCategoryTitle(tool.categoryId)}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                          {tool.description}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary shrink-0 flex items-center gap-1">
                        Kullan &rarr;
                      </span>
                    </button>
                  );
                })}

                {filteredTools.length > 8 && (
                  <div className="pt-2 border-t border-border/60 text-center">
                    <Link
                      href={`/araclar?q=${encodeURIComponent(query.trim())}`}
                      onClick={onClose}
                      className="text-xs font-semibold text-primary hover:underline p-2 block"
                    >
                      Tüm {filteredTools.length} sonucu katalogda gör &rarr;
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm font-semibold text-foreground mb-1">
                  &ldquo;{query}&rdquo; ile eşleşen bir araç bulunamadı
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Farklı bir kelime deneyebilir veya aşağıdaki popüler araçlara göz atabilirsiniz.
                </p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {POPULAR_SEARCH_TAGS.slice(0, 5).map((tag) => (
                    <button
                      key={tag.label}
                      type="button"
                      onClick={() => {
                        setQuery(tag.query);
                        setSelectedIndex(-1);
                      }}
                      className="px-2.5 py-1 text-xs rounded-lg border border-border bg-muted/40 hover:bg-muted font-medium text-foreground transition-colors"
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            )
          ) : (
            /* Başlangıç Vitrini (Arama Yapılmamışken) */
            <div className="p-4 space-y-4">
              <div>
                <div className="px-2 pb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Popüler Aramalar
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SEARCH_TAGS.map((tag) => (
                    <button
                      key={tag.label}
                      type="button"
                      onClick={() => {
                        setQuery(tag.query);
                        setSelectedIndex(-1);
                      }}
                      className="px-3 py-1.5 text-xs rounded-lg border border-border/80 bg-card hover:bg-muted font-medium text-foreground transition-colors"
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-border/60 pt-3">
                <div className="px-2 pb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Sık Kullanılan Araçlar
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tools.slice(0, 6).map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => handleSelectTool(tool.slug)}
                      className="p-2.5 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/60 text-left transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-semibold text-foreground">
                          {tool.title}
                        </div>
                        <div className="text-[11px] text-muted-foreground line-clamp-1">
                          {tool.description}
                        </div>
                      </div>
                      <span className="text-xs text-primary font-semibold shrink-0 ml-2">
                        &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer İpucu */}
        <div className="p-3 bg-muted/40 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span><kbd className="font-mono bg-card px-1.5 py-0.5 rounded border border-border">↑↓</kbd> Gezin</span>
            <span><kbd className="font-mono bg-card px-1.5 py-0.5 rounded border border-border">↵</kbd> Seç</span>
            <span><kbd className="font-mono bg-card px-1.5 py-0.5 rounded border border-border">esc</kbd> Kapat</span>
          </div>
          <Link
            href="/araclar"
            onClick={onClose}
            className="text-primary hover:underline font-semibold"
          >
            Tüm Kataloğu Aç &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
