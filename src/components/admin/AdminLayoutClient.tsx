'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import styles from './admin.module.css';

interface AdminLayoutClientProps {
  adminEmail: string;
  pendingRequestsCount?: number;
  isAdmin?: boolean;
  children: React.ReactNode;
}

export default function AdminLayoutClient({
  adminEmail,
  pendingRequestsCount = 0,
  children,
}: AdminLayoutClientProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Standalone pages (login, unauthorized) render without sidebar
  if (pathname === '/admin/login' || pathname === '/admin/unauthorized') {
    return <>{children}</>;
  }

  // Compute breadcrumb title
  let sectionTitle = 'Genel Bakış';
  if (pathname.includes('/customers')) sectionTitle = 'Müşteriler';
  else if (pathname.includes('/businesses')) sectionTitle = 'İşletmeler';
  else if (pathname.includes('/subscriptions')) sectionTitle = 'Abonelikler';
  else if (pathname.includes('/requests')) sectionTitle = 'Talepler';
  else if (pathname.includes('/settings')) sectionTitle = 'Sistem Ayarları';

  return (
    <div className={styles.adminLayout}>
      {/* DESKTOP SIDEBAR */}
      <AdminSidebar
        adminEmail={adminEmail}
        pendingRequestsCount={pendingRequestsCount}
      />

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="h-full w-72 max-w-[80vw] bg-[#090d16]"
            onClick={(e) => e.stopPropagation()}
          >
            <AdminSidebar
              adminEmail={adminEmail}
              pendingRequestsCount={pendingRequestsCount}
            />
          </div>
        </div>
      )}

      {/* MAIN WRAPPER */}
      <div className={styles.mainWrapper}>
        {/* TOPBAR */}
        <header className={styles.topBar}>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 lg:hidden"
              aria-label="Menüyü aç"
            >
              ☰
            </button>
            <div className={styles.breadcrumbs}>
              <Link href="/admin" className="hover:text-white transition">
                Admin
              </Link>
              <span>/</span>
              <span className="font-bold text-white">{sectionTitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Sistem Aktif
            </span>
            <Link
              href="/panel"
              className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition"
            >
              🏢 Müşteri Paneli
            </Link>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className={styles.pageContent}>{children}</main>
      </div>
    </div>
  );
}
