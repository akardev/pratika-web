'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './admin.module.css';

interface AdminSidebarProps {
  adminEmail: string;
  pendingRequestsCount?: number;
}

export default function AdminSidebar({ adminEmail, pendingRequestsCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Genel Bakış', icon: '📊', exact: true },
    { href: '/admin/customers', label: 'Müşteriler', icon: '👥' },
    { href: '/admin/businesses', label: 'İşletmeler', icon: '🏪' },
    { href: '/admin/subscriptions', label: 'Abonelikler', icon: '💳' },
    {
      href: '/admin/requests',
      label: 'Talepler',
      icon: '📨',
      count: pendingRequestsCount > 0 ? pendingRequestsCount : undefined,
    },
    { href: '/admin/settings', label: 'Sistem', icon: '⚙️' },
  ];

  const adminLetter = (adminEmail[0] || 'A').toUpperCase();

  return (
    <aside className={styles.sidebar}>
      {/* HEADER */}
      <div className={styles.sidebarHeader}>
        <div className={styles.brandWrap}>
          <div className={styles.brandIcon}>🛡️</div>
          <div>
            <h1 className={styles.brandTitle}>Pratika</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={styles.brandBadge}>ADMIN V1</span>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className={styles.navSection}>
        <div className={styles.navLabel}>Yönetim Menüsü</div>
        <ul className={styles.navList}>
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                >
                  <div className={styles.navItemLeft}>
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className={styles.navCountPill}>{item.count}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* FOOTER */}
      <div className={styles.sidebarFooter}>
        <div className={styles.adminUserBox}>
          <div className={styles.adminAvatar}>{adminLetter}</div>
          <div className="min-w-0 flex-1">
            <div className={styles.adminEmail} title={adminEmail}>
              {adminEmail}
            </div>
            <div className={styles.adminRoleBadge}>● Süper Yönetici</div>
          </div>
        </div>

        <div className={styles.footerActions}>
          <Link href="/panel" className={styles.footerBtn} title="Müşteri paneline geçiş yap">
            <span>🏢</span>
            <span>Müşteri Paneli</span>
          </Link>
          <form action="/login?mode=logout" method="GET">
            <Link href="/login" className={`${styles.footerBtn} text-red-400 hover:text-red-300`}>
              <span>🚪</span>
              <span>Çıkış Yap</span>
            </Link>
          </form>
        </div>
      </div>
    </aside>
  );
}
