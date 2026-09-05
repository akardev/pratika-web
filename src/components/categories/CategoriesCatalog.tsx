'use client';

import React, { useState, useMemo } from 'react';
import { Category } from '@/types';
import { categories, tools, getToolsByCategoryId } from '@/data/tools';
import CategoryCard from '@/components/ui/CategoryCard';

type CategoryGroupKey = 'all' | 'finans-is' | 'egitim-matematik' | 'dijital-medya' | 'yasam-saglik';

interface CategoryGroup {
  key: CategoryGroupKey;
  label: string;
  categoryIds: string[];
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    key: 'all',
    label: 'Tüm Kategoriler',
    categoryIds: [],
  },
  {
    key: 'finans-is',
    label: 'Finans & Ticaret',
    categoryIds: ['finans', 'ticaret', 'muhasebe', 'yatirim', 'kredi', 'maas', 'gayrimenkul'],
  },
  {
    key: 'egitim-matematik',
    label: 'Eğitim & Matematik',
    categoryIds: ['egitim', 'matematik', 'donusum', 'zaman'],
  },
  {
    key: 'dijital-medya',
    label: 'Dijital & Tasarım',
    categoryIds: ['pdf', 'yazilim', 'tasarim', 'gorsel', 'metin', 'guvenlik'],
  },
  {
    key: 'yasam-saglik',
    label: 'Yaşam & Sağlık',
    categoryIds: ['gunluk-hayat', 'saglik', 'araba', 'alisveris', 'ev-yasam'],
  },
];

export default function CategoriesCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<CategoryGroupKey>('all');

  // Filter categories based on search query and active cluster group
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return categories.filter((category: Category) => {
      // 1. Group cluster filter
      if (selectedGroup !== 'all') {
        const group = CATEGORY_GROUPS.find((g) => g.key === selectedGroup);
        if (group && !group.categoryIds.includes(category.id)) {
          return false;
        }
      }

      // 2. Search query filter
      if (!q) return true;

      // Check title & description
      const titleMatch = category.title.toLowerCase().includes(q);
      const descMatch = category.description.toLowerCase().includes(q);

      // Also match if any tool inside this category matches
      const categoryTools = getToolsByCategoryId(category.id);
      const toolMatch = categoryTools.some(
        (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );

      return titleMatch || descMatch || toolMatch;
    });
  }, [searchQuery, selectedGroup]);

  // Compute total tools matching currently displayed categories
  const totalMatchingTools = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => {
      return acc + getToolsByCategoryId(cat.id).length;
    }, 0);
  }, [filteredCategories]);

  // Overall database active tools count
  const totalActiveToolsCount = useMemo(() => {
    return tools.filter((t) => t.status === 'active').length;
  }, []);

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="text-center pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4 shadow-2xs">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>Pratiksel Kategori Kataloğu</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3">
          Kategorilere Göre Keşfedin
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Finans, eğitim, matematik, ticaret, tasarım, PDF ve günlük hayatınızda ihtiyaç duyduğunuz tüm pratik araçları uzmanlık alanlarına göre inceleyin.
        </p>

        {/* Canlı Kategori Arama Alanı */}
        <div className="relative w-full max-w-2xl mx-auto mb-4">
          <div className="relative flex items-center w-full h-13 sm:h-14 rounded-2xl border border-border bg-card shadow-xs hover:border-foreground/30 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
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
              type="text"
              id="category-catalog-search"
              aria-label="Kategorilerde arama yapın"
              autoComplete="off"
              placeholder="Kategori veya araç arayın..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-full w-full outline-none text-sm sm:text-base bg-transparent pr-3 text-foreground placeholder:text-muted-foreground"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mr-3 px-2.5 py-1 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors text-xs font-semibold shrink-0 cursor-pointer"
                aria-label="Aramayı Temizle"
              >
                Temizle
              </button>
            )}
          </div>
        </div>

        {/* Hızlı Grup Filtre Butonları */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1">
          {CATEGORY_GROUPS.map((group) => {
            const isSelected = selectedGroup === group.key;
            return (
              <button
                key={group.key}
                type="button"
                onClick={() => setSelectedGroup(group.key)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-foreground text-background border-foreground shadow-2xs'
                    : 'bg-card border-border/80 text-muted-foreground hover:border-foreground/30 hover:text-foreground hover:bg-muted/40'
                }`}
              >
                {group.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. STATS & GRİD BAŞLIĞI                                      */}
      {/* ============================================================ */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border/60 pb-3">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
              {searchQuery ? 'Arama Sonuçları' : 'Kategori Kataloğu'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {selectedGroup === 'all' && !searchQuery
                ? 'Tüm Kategoriler'
                : `${CATEGORY_GROUPS.find((g) => g.key === selectedGroup)?.label || 'Seçili Kategoriler'}`}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredCategories.length}</span> kategori
            <span>·</span>
            <span className="font-semibold text-foreground">{totalMatchingTools}</span> aktif araç
          </div>
        </div>

        {/* Kategori Kartları Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredCategories.map((category: Category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl border border-dashed border-border bg-card/50">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3 text-muted-foreground">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-foreground mb-1">Eşleşen Kategori Bulunamadı</h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-5">
              &quot;{searchQuery}&quot; araması ile eşleşen bir kategori ya da araç bulunamadı. Lütfen farklı bir arama terimi deneyin.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedGroup('all');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary-hover transition-colors cursor-pointer"
            >
              Tüm Kategorileri Göster
            </button>
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* 3. BİLGİLENDİRİCİ AVANTAJ BLOKLARI (GÜVEN & REHBER)          */}
      {/* ============================================================ */}
      <section className="pt-6 border-t border-border/60">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 sm:p-6 rounded-2xl border border-border/70 bg-card shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3.5 border border-blue-100">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-foreground mb-1">Hızlı ve Odaklı Çözümler</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Her kategori, kullanıcı deneyimi optimize edilmiş doğrudan işlem araçlarına bağlanır. Karışık menüler yerine anında sonuca ulaşırsınız.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl border border-border/70 bg-card shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3.5 border border-emerald-100">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-foreground mb-1">%100 İstemci Taraflı Gizlilik</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              PDF, metin, hesaplama ve görsel işlemleriniz tarayıcınızda yerel olarak gerçekleşir. Hassas verileriniz sunucularımıza kaydedilmez.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl border border-border/70 bg-card shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3.5 border border-purple-100">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-foreground mb-1">Genişleyen Araç Kütüphanesi</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Vergi oranları, mevzuat standartları ve pratik hesaplamalar {totalActiveToolsCount}+ araçlık portföyümüzde güvenle kullanıma sunulur.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
