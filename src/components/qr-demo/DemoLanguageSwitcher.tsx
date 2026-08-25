'use client';

import { demoLocales, type DemoLocale } from '@/lib/qr-demo-data';
import styles from './demo-menu.module.css';

interface DemoLanguageSwitcherProps {
  locale: DemoLocale;
  onChange: (locale: DemoLocale) => void;
}

function FlagIcon({ locale }: { locale: DemoLocale }) {
  const commonProps = {
    viewBox: '0 0 24 16',
    role: 'img' as const,
    focusable: 'false' as const,
  };

  if (locale === 'tr') {
    return (
      <svg {...commonProps} aria-hidden="true">
        <rect width="24" height="16" fill="#e30a17" />
        <circle cx="10" cy="8" r="4.2" fill="#fff" />
        <circle cx="11.1" cy="8" r="3.35" fill="#e30a17" />
        <path d="m15.8 8 .95.28.4 1.17.4-1.17.95-.28-.95-.28-.4-1.17-.4 1.17z" fill="#fff" />
      </svg>
    );
  }

  if (locale === 'en') {
    return (
      <svg {...commonProps} aria-hidden="true">
        <rect width="24" height="16" fill="#1b3f8f" />
        <path d="M0 0 24 16M24 0 0 16" stroke="#fff" strokeWidth="3.2" />
        <path d="M0 0 24 16M24 0 0 16" stroke="#c8102e" strokeWidth="1.2" />
        <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5" />
        <path d="M12 0v16M0 8h24" stroke="#c8102e" strokeWidth="2.5" />
      </svg>
    );
  }

  if (locale === 'de') {
    return (
      <svg {...commonProps} aria-hidden="true">
        <rect width="24" height="5.34" fill="#161616" />
        <rect y="5.33" width="24" height="5.34" fill="#d71920" />
        <rect y="10.66" width="24" height="5.34" fill="#ffce00" />
      </svg>
    );
  }

  return (
    <svg {...commonProps} aria-hidden="true">
      <rect width="24" height="5.34" fill="#fff" />
      <rect y="5.33" width="24" height="5.34" fill="#2457a6" />
      <rect y="10.66" width="24" height="5.34" fill="#d52b1e" />
    </svg>
  );
}

export default function DemoLanguageSwitcher({ locale, onChange }: DemoLanguageSwitcherProps) {
  return (
    <div className={styles.languageSwitcher} aria-label="Dil seçici" role="group">
      {demoLocales.map((item) => (
        <button
          key={item.id}
          type="button"
          className={locale === item.id ? styles.languageActive : styles.languageButton}
          onClick={() => onChange(item.id)}
          aria-pressed={locale === item.id}
          aria-label={item.label}
          title={item.label}
        >
          <span className={styles.languageFlag}><FlagIcon locale={item.id} /></span>
        </button>
      ))}
    </div>
  );
}
