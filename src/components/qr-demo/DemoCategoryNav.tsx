'use client';

import type { DemoCategory, DemoLocale } from '@/lib/qr-demo-data';
import styles from './demo-menu.module.css';

interface DemoCategoryNavProps {
  categories: DemoCategory[];
  locale: DemoLocale;
  activeCategory: string;
  onSelect: (categoryId: string) => void;
}

export default function DemoCategoryNav({ categories, locale, activeCategory, onSelect }: DemoCategoryNavProps) {
  return (
    <div className={styles.categoryNavWrap}>
      <nav className={styles.categoryNav} aria-label="Menü kategorileri">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={activeCategory === category.id ? styles.categoryActive : styles.categoryButton}
            onClick={() => onSelect(category.id)}
            aria-pressed={activeCategory === category.id}
          >
            {category.name[locale]}
          </button>
        ))}
      </nav>
    </div>
  );
}
