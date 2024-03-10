import PropTypes from 'prop-types';
import Link from 'next/link';
// Lib
import { fetchFilteredCategories } from '../../lib/data';
// import DeleteCategory from './DeleteCategory';

async function Invoices({ query, currentPage, pageSize }) {
  const categories = await fetchFilteredCategories(query, currentPage, pageSize);

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <Link href={`/stratagems-admin/${category.id}`}>{category.name}</Link>
          {/* <DeleteCategory id={category.id} /> */}
        </div>
      ))}
    </div>
  );
}

Invoices.propTypes = {
  query: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default Invoices;
