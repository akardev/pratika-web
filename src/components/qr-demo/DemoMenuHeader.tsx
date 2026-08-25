'use client';

import type { DemoLocale } from '@/lib/qr-demo-data';
import DemoLanguageSwitcher from './DemoLanguageSwitcher';
import styles from './demo-menu.module.css';

interface DemoMenuHeaderProps {
  locale: DemoLocale;
  onLocaleChange: (locale: DemoLocale) => void;
  onBackToWelcome: () => void;
  menuLabel: string;
  openMenuLabel: string;
}

export default function DemoMenuHeader({
  locale, onLocaleChange, onBackToWelcome, menuLabel, openMenuLabel,
}: DemoMenuHeaderProps) {
  return (
    <header className={styles.menuHeader}>
      <button type="button" className={styles.miniBrand} onClick={onBackToWelcome} aria-label={openMenuLabel}>
        <span className={styles.miniLogo}>L</span>
        <span className={styles.miniBrandName}>Luna</span>
      </button>
      <div className={styles.menuHeaderCenter}>
        <span className={styles.menuKicker}>LUNA</span>
        <span className={styles.menuTitle}>{menuLabel}</span>
      </div>
      <DemoLanguageSwitcher locale={locale} onChange={onLocaleChange} />
    </header>
  );
}
