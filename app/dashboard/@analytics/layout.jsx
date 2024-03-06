import PropTypes from 'prop-types';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="bg-grey padding-l">
      <nav>
        <Link href="/dashboard/page-views" className="margin-s">Page Views</Link>
        <Link href="/dashboard/visitors" className="margin-s">Visitors</Link>
      </nav>
      <div>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
