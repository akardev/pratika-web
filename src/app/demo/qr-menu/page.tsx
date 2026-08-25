import type { Metadata } from 'next';
import DemoMenu from '@/components/qr-demo/DemoMenu';

export const metadata: Metadata = {
  title: 'Luna Coffee & Kitchen | QR Menü',
  description: 'Luna Coffee & Kitchen için Pratika QR menü deneyimi.',
  robots: { index: false, follow: false },
};

export default function DemoQrMenuPage() {
  return <DemoMenu />;
}
