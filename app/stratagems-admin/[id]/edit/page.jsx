import PropTypes from 'prop-types';
import { notFound } from 'next/navigation';

// Lib
import { fetchCategoryById } from '../../../lib/data';
import EditCategoryForm from '../../components/EditCategoryForm';

export default async function Page({ params }) {
  const { id } = params;
  const category = await fetchCategoryById(id);

  console.log(category);
  if (!category) {
    notFound();
  }

  return (
    <main>
      <EditCategoryForm category={category} />
    </main>
  );
}

Page.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
