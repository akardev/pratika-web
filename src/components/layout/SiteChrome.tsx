'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/login') {
    return (
      <>
        {children}
      </>
    );
  }

  if (pathname === '/demo/qr-menu') {
    return (
      <>
        <Header />
        {children}
      </>
    );
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
