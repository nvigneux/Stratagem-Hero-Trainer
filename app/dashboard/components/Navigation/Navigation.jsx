'use client';

// For Server Components, use the redirect function instead.

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Styles
import styles from './Navigation.module.css';

function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <Link href="/dashboard/login">Open modal</Link>
        </li>
        <li className={styles.item}>
          <Link className={`link ${pathname === '/dashboard' ? styles.active : ''}`} href="/dashboard">
            NAV - Admin
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            className={`link ${pathname === '/dashboard/categories' ? styles.active : ''}`}
            href="/dashboard/categories"
          >
            NAV - Categories
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            className={`link ${pathname === '/dashboard/settings' ? styles.active : ''}`}
            href="/dashboard/settings"
          >
            NAV - Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
