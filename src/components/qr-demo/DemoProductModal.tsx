'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { formatDemoPrice, type DemoLocale, type DemoProduct } from '@/lib/qr-demo-data';
import styles from './demo-menu.module.css';

interface DemoProductModalProps {
  product: DemoProduct;
  locale: DemoLocale;
  closeLabel: string;
  detailLabel: string;
  allergensLabel: string;
  onClose: () => void;
}

export default function DemoProductModal({ product, locale, closeLabel, detailLabel, allergensLabel, onClose }: DemoProductModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className={styles.modalBackdrop} role="presentation" onClick={onClose}>
      <section
        className={styles.productModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-product-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.modalImage}>
          <Image src={product.image} alt={product.name[locale]} fill sizes="(max-width: 900px) 100vw, 520px" className={styles.modalImageAsset} />
          <button type="button" className={styles.modalClose} onClick={onClose} aria-label={closeLabel}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className={styles.modalBody}>
          <span className={styles.modalEyebrow}>{detailLabel}</span>
          <h2 id="demo-product-title" className={styles.modalTitle}>{product.name[locale]}</h2>
          <p className={styles.modalDescription}>{product.description[locale]}</p>
          <p className={styles.modalMeta}><span aria-hidden="true">✦</span>{allergensLabel}</p>
          <div className={styles.modalDivider} />
          <strong className={styles.modalPrice}>{formatDemoPrice(product.price, locale)}</strong>
        </div>
      </section>
    </div>
  );
}
