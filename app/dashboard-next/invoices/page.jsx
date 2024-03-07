import { Suspense } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// Lib
import { fetchInvoicesPages } from '../../lib/data';
// UI
import Pagination from '../../ui/components/atoms/Pagination/Pagination';
import Search from '../components/dashboard/Search/Search';
import Invoices from '../components/dashboard/Invoices/Invoices';

const ITEMS_PER_PAGE = 2;

export default async function Page({ searchParams = {} }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchInvoicesPages(query, ITEMS_PER_PAGE);

  return (
    <div>
      <Link href="/dashboard-next/invoices/create">Create Invoice</Link>
      <Search placeholder="Search invoices..." />
      <Suspense key={query + currentPage} fallback={<p>Loading query + currentPage...</p>}>
        <Invoices query={query} currentPage={currentPage} pageSize={ITEMS_PER_PAGE} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </div>
  );
}

Page.propTypes = {
  searchParams: PropTypes.shape({
    query: PropTypes.string,
    page: PropTypes.string,
  }),
};
