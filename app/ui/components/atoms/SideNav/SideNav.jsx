import Link from 'next/link';

// Styles
import styles from './SideNav.module.css';

/**
 * SideNav component
 * @returns {JSX.Element} The SideNav component
 */
function SideNav() {
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <Link href="/dashboard-next">
          Dashboard
        </Link>
        <Link href="/dashboard-next/invoices">
          Invoices
        </Link>
        <Link href="/dashboard-next/customers">
          Customers
        </Link>
      </div>
      <div className={styles.links}>
        <Link href="/">
          Back Home
        </Link>
      </div>
    </div>
  );
}

export default SideNav;
