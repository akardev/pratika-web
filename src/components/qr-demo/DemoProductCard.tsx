'use client';

import { formatDemoPrice, type DemoLocale, type DemoProduct } from '@/lib/qr-demo-data';
import Image from 'next/image';
import styles from './demo-menu.module.css';

interface DemoProductCardProps {
  product: DemoProduct;
  locale: DemoLocale;
  onSelect: (product: DemoProduct) => void;
}

export default function DemoProductCard({ product, locale, onSelect }: DemoProductCardProps) {
  return (
    <button type="button" className={styles.productCard} onClick={() => onSelect(product)}>
      <span className={styles.productImage}>
        <Image
          src={product.image}
          alt={product.name[locale]}
          fill
          sizes="(max-width: 359px) 94px, (max-width: 619px) 112px, 100px"
          className={styles.productImageAsset}
        />
      </span>
      <span className={styles.productContent}>
        <span className={styles.productTopline}>
          <span className={styles.productName}>{product.name[locale]}</span>
          <span className={styles.productPrice}>{formatDemoPrice(product.price, locale)}</span>
        </span>
        <span className={styles.productDescription}>{product.description[locale]}</span>
        <span className={styles.productMore}>+</span>
      </span>
    </button>
  );
}
