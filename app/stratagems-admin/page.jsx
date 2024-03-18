import { Suspense } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// Lib
import { fetchCategoriesPages } from '../lib/data';

// UI
import Pagination from '../ui/components/atoms/Pagination/Pagination';
import Categories from './components/Categories';
import Button from '../ui/components/atoms/Button/Button';

const ITEMS_PER_PAGE = 10;

export default async function Page({ searchParams = {} }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCategoriesPages(query, ITEMS_PER_PAGE);

  return (
    <div>
      <Link href="/stratagems-admin/create"><Button>Create Categorie</Button></Link>
      <Suspense key={query + currentPage} fallback={<p>Loading query + currentPage...</p>}>
        <Categories query={query} currentPage={currentPage} pageSize={ITEMS_PER_PAGE} />
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
