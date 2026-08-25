import type { Metadata } from 'next';
import QrLandingPage from '@/components/qr-landing/QrLandingPage';

export const metadata: Metadata = {
  title: 'Pratika QR Menü | Kolay ve Akıllı Dijital Menü Yönetimi',
  description:
    'Domain gerektirmez, dakikalar içinde hazır. Fiyatlarınızı ve ürünlerinizi QR kodunuzu değiştirmeden tek panelden anında güncelleyin.',
  keywords: [
    'qr menü',
    'dijital menü',
    'karekod menü',
    'restoran menüsü',
    'kafe qr menü',
    'çok dilli qr menü',
    'pratika qr',
  ],
  alternates: { canonical: '/qr-menu' },
  openGraph: {
    title: 'Pratika QR Menü | Kolay ve Akıllı Dijital Menü Yönetimi',
    description:
      'Menünüzü bir kez oluşturun, güncellemesi saniyeler sürsün. Domain satın almadan, QR kodunuzu yeniden bastırmadan menünüzü yönetin.',
    url: 'https://pratika.com/qr-menu',
    siteName: 'Pratika',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratika QR Menü | Kolay ve Akıllı Dijital Menü Yönetimi',
    description:
      'Menünüzü bir kez oluşturun, güncellemesi saniyeler sürsün. Domain gerektirmez, QR kodunuz hep aynı kalır.',
  },
};

export default function QrMenuPage() {
  return <QrLandingPage />;
}
