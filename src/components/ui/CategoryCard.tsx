import { Category } from '@/types';
import Link from 'next/link';
import { getToolsByCategoryId } from '@/data/tools';
import CategoryIcon from './CategoryIcon';

interface CategoryCardProps {
  category: Category;
  className?: string;
  onClick?: () => void;
  customHref?: string;
}

export interface CategoryTheme {
  iconBg: string;
  iconText: string;
  iconBorder: string;
  badgeBg: string;
  accentHoverBorder: string;
}

export const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  // Finans & Ticaret
  finans: {
    iconBg: 'bg-emerald-500/10',
    iconText: 'text-emerald-600',
    iconBorder: 'border-emerald-500/20',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    accentHoverBorder: 'hover:border-emerald-500/40',
  },
  ticaret: {
    iconBg: 'bg-teal-500/10',
    iconText: 'text-teal-600',
    iconBorder: 'border-teal-500/20',
    badgeBg: 'bg-teal-50 text-teal-800 border-teal-200/80',
    accentHoverBorder: 'hover:border-teal-500/40',
  },
  muhasebe: {
    iconBg: 'bg-cyan-500/10',
    iconText: 'text-cyan-700',
    iconBorder: 'border-cyan-500/20',
    badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-200/80',
    accentHoverBorder: 'hover:border-cyan-500/40',
  },
  yatirim: {
    iconBg: 'bg-emerald-600/10',
    iconText: 'text-emerald-700',
    iconBorder: 'border-emerald-600/20',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    accentHoverBorder: 'hover:border-emerald-600/40',
  },
  kredi: {
    iconBg: 'bg-green-500/10',
    iconText: 'text-green-700',
    iconBorder: 'border-green-500/20',
    badgeBg: 'bg-green-50 text-green-800 border-green-200/80',
    accentHoverBorder: 'hover:border-green-500/40',
  },
  gayrimenkul: {
    iconBg: 'bg-blue-600/10',
    iconText: 'text-blue-700',
    iconBorder: 'border-blue-600/20',
    badgeBg: 'bg-blue-50 text-blue-800 border-blue-200/80',
    accentHoverBorder: 'hover:border-blue-600/40',
  },
  maas: {
    iconBg: 'bg-emerald-500/10',
    iconText: 'text-emerald-700',
    iconBorder: 'border-emerald-500/20',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    accentHoverBorder: 'hover:border-emerald-500/40',
  },

  // Eğitim & Matematik
  egitim: {
    iconBg: 'bg-blue-500/10',
    iconText: 'text-blue-600',
    iconBorder: 'border-blue-500/20',
    badgeBg: 'bg-blue-50 text-blue-800 border-blue-200/80',
    accentHoverBorder: 'hover:border-blue-500/40',
  },
  matematik: {
    iconBg: 'bg-indigo-500/10',
    iconText: 'text-indigo-600',
    iconBorder: 'border-indigo-500/20',
    badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200/80',
    accentHoverBorder: 'hover:border-indigo-500/40',
  },
  donusum: {
    iconBg: 'bg-sky-500/10',
    iconText: 'text-sky-600',
    iconBorder: 'border-sky-500/20',
    badgeBg: 'bg-sky-50 text-sky-800 border-sky-200/80',
    accentHoverBorder: 'hover:border-sky-500/40',
  },
  zaman: {
    iconBg: 'bg-amber-500/10',
    iconText: 'text-amber-700',
    iconBorder: 'border-amber-500/20',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200/80',
    accentHoverBorder: 'hover:border-amber-500/40',
  },

  // Dijital & Medya
  pdf: {
    iconBg: 'bg-red-500/10',
    iconText: 'text-red-600',
    iconBorder: 'border-red-500/20',
    badgeBg: 'bg-red-50 text-red-800 border-red-200/80',
    accentHoverBorder: 'hover:border-red-500/40',
  },
  yazilim: {
    iconBg: 'bg-violet-500/10',
    iconText: 'text-violet-600',
    iconBorder: 'border-violet-500/20',
    badgeBg: 'bg-violet-50 text-violet-800 border-violet-200/80',
    accentHoverBorder: 'hover:border-violet-500/40',
  },
  tasarim: {
    iconBg: 'bg-fuchsia-500/10',
    iconText: 'text-fuchsia-600',
    iconBorder: 'border-fuchsia-500/20',
    badgeBg: 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200/80',
    accentHoverBorder: 'hover:border-fuchsia-500/40',
  },
  gorsel: {
    iconBg: 'bg-pink-500/10',
    iconText: 'text-pink-600',
    iconBorder: 'border-pink-500/20',
    badgeBg: 'bg-pink-50 text-pink-800 border-pink-200/80',
    accentHoverBorder: 'hover:border-pink-500/40',
  },
  metin: {
    iconBg: 'bg-slate-500/10',
    iconText: 'text-slate-700',
    iconBorder: 'border-slate-500/20',
    badgeBg: 'bg-slate-100 text-slate-800 border-slate-200/80',
    accentHoverBorder: 'hover:border-slate-500/40',
  },
  guvenlik: {
    iconBg: 'bg-blue-600/10',
    iconText: 'text-blue-700',
    iconBorder: 'border-blue-600/20',
    badgeBg: 'bg-blue-50 text-blue-800 border-blue-200/80',
    accentHoverBorder: 'hover:border-blue-600/40',
  },

  // Yaşam & Sağlık
  'gunluk-hayat': {
    iconBg: 'bg-amber-500/10',
    iconText: 'text-amber-700',
    iconBorder: 'border-amber-500/20',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200/80',
    accentHoverBorder: 'hover:border-amber-500/40',
  },
  saglik: {
    iconBg: 'bg-rose-500/10',
    iconText: 'text-rose-600',
    iconBorder: 'border-rose-500/20',
    badgeBg: 'bg-rose-50 text-rose-800 border-rose-200/80',
    accentHoverBorder: 'hover:border-rose-500/40',
  },
  araba: {
    iconBg: 'bg-orange-500/10',
    iconText: 'text-orange-600',
    iconBorder: 'border-orange-500/20',
    badgeBg: 'bg-orange-50 text-orange-800 border-orange-200/80',
    accentHoverBorder: 'hover:border-orange-500/40',
  },
  alisveris: {
    iconBg: 'bg-amber-600/10',
    iconText: 'text-amber-700',
    iconBorder: 'border-amber-600/20',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200/80',
    accentHoverBorder: 'hover:border-amber-600/40',
  },
  'ev-yasam': {
    iconBg: 'bg-emerald-600/10',
    iconText: 'text-emerald-700',
    iconBorder: 'border-emerald-600/20',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    accentHoverBorder: 'hover:border-emerald-600/40',
  },
};

export const DEFAULT_THEME: CategoryTheme = {
  iconBg: 'bg-primary/10',
  iconText: 'text-primary',
  iconBorder: 'border-primary/20',
  badgeBg: 'bg-primary/5 text-primary border-primary/20',
  accentHoverBorder: 'hover:border-primary/40',
};

export default function CategoryCard({
  category,
  className = '',
  onClick,
  customHref,
}: CategoryCardProps) {
  const categoryTools = getToolsByCategoryId(category.id);
  const sampleTools = categoryTools.slice(0, 3);
  const href = customHref || `/araclar/${category.slug}`;
  const theme = CATEGORY_THEMES[category.id] || DEFAULT_THEME;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card p-6 shadow-xs hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${theme.accentHoverBorder} ${className}`}
      aria-label={`${category.title} kategorisindeki ${categoryTools.length} aracı görüntüle`}
    >
      {/* Üst İnce Vurgu Barı */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Üst Başlık & İkon Amblemi */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <div
              className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border ${theme.iconBg} ${theme.iconText} ${theme.iconBorder} shadow-sm group-hover:scale-110 transition-transform duration-300`}
            >
              <CategoryIcon categoryId={category.id} className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 block mb-0.5">
                Kategori Rehberi
              </span>
              <h3 className="font-extrabold text-lg text-foreground tracking-tight group-hover:text-primary transition-colors leading-tight">
                {category.title}
              </h3>
            </div>
          </div>

          <span
            className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 ${theme.badgeBg}`}
          >
            {categoryTools.length} Araç
          </span>
        </div>

        {/* Kategori Açıklaması */}
        <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed line-clamp-2 mb-4">
          {category.description}
        </p>

        {/* Mini-Dizin / Öne Çıkan Araçlar Vitrini */}
        {sampleTools.length > 0 && (
          <div className="rounded-2xl border border-border/60 bg-muted/30 p-3 space-y-1.5 mb-2">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 px-1 pb-1">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                Öne Çıkan Araçlar
              </span>
              <span className="text-[10px] font-normal text-muted-foreground">
                +{categoryTools.length} araç
              </span>
            </div>

            {sampleTools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl bg-card/90 border border-border/40 text-foreground/90 font-medium group-hover:border-border transition-colors"
              >
                <span className="truncate">{tool.title}</span>
                <svg
                  className="w-3 h-3 text-muted-foreground/50 shrink-0 ml-2 group-hover:text-primary group-hover:translate-x-0.5 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alt Aksiyon Çubuğu (CTA) */}
      <div className="mt-4 pt-3.5 border-t border-border/60 flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors">
          Tüm Kataloğu İncele
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-primary bg-primary/10 group-hover:bg-primary group-hover:text-white transition-all shadow-2xs">
          Kategoriye Git
          <svg
            className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
