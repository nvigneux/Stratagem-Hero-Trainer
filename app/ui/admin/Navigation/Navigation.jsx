'use client';

// For Server Components, use the redirect function instead.

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <Link className={`link ${pathname === '/admin' ? 'active' : ''}`} href="/">
            Admin
          </Link>
        </li>
        <li>
          <Link
            className={`link ${pathname === '/admin/categories' ? 'active' : ''}`}
            href="/categories"
          >
            Categories
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
