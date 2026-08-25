import type { Metadata } from 'next';
import QrLandingPage from '@/components/qr-landing/QrLandingPage';

export const metadata: Metadata = {
  title: 'QR Menü Sistemi | Dijital Menü ve AI Destekli Çeviri | Pratika',
  description:
    'Restoran, kafe ve oteller için profesyonel QR menü sistemi. Menülerinizi tek panelden yönetin, fiyatları anında güncelleyin ve AI destekli çeviri ile müşterilerinize farklı dillerde ulaşın.',
  keywords: [
    'qr menü',
    'dijital menü',
    'karekod menü',
    'restoran menüsü',
    'kafe qr menü',
    'ai çeviri qr menü',
    'çok dilli qr menü',
    'pratika qr',
  ],
  alternates: { canonical: '/qr-menu' },
  openGraph: {
    title: 'QR Menü Sistemi | Dijital Menü ve AI Destekli Çeviri | Pratika',
    description:
      'Restoran, kafe ve oteller için profesyonel QR menü sistemi. Fiyatlarınızı ve ürünlerinizi QR kodunuzu değiştirmeden tek panelden anında güncelleyin.',
    url: 'https://pratika.com/qr-menu',
    siteName: 'Pratika',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Menü Sistemi | Dijital Menü ve AI Destekli Çeviri | Pratika',
    description:
      'Menünüzü tek panelden yönetin, fiyatları anında güncelleyin. QR kodunuz hep sabit kalır.',
  },
};

export default function QrMenuPage() {
  return <QrLandingPage />;
}
