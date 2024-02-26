import Link from 'next/link';

// Styles
import styles from './SideNav.module.css';
import { signOut } from '../../../../../auth';

function SideNav() {
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <Link href="/dashboard">
          Dashboard
        </Link>
        <Link href="/dashboard/invoices">
          Invoices
        </Link>
        <Link href="/dashboard/customers">
          Customers
        </Link>
      </div>
      <div className={styles.links}>
        <form
          action={async () => {
            'use server';

            await signOut();
          }}
        >
          <button type="submit">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
        <Link href="/">
          Back Home
        </Link>
      </div>
    </div>
  );
}

SideNav.propTypes = {};

export default SideNav;
