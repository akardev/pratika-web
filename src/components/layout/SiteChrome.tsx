'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Exclude standalone app screens from main website header & footer:
  // - Public customer QR menu (/m/..., /qr/...)
  // - SaaS merchant panel (/panel)
  // - Auth login screen (/login)
  // - Interactive QR demo (/demo/qr-menu)
  if (
    pathname === '/login' ||
    pathname.startsWith('/panel') ||
    pathname.startsWith('/m/') ||
    pathname.startsWith('/qr/') ||
    pathname === '/demo/qr-menu'
  ) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
