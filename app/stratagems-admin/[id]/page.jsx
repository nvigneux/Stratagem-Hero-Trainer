import PropTypes from 'prop-types';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Lib
import { fetchCategoryById } from '../../lib/data';

export default async function Page({ params }) {
  const { id } = params;
  const category = await fetchCategoryById(id);
  if (!category) {
    notFound();
  }

  return (
    <main>
      <Link href={`/stratagems-admin/${category.id}/edit`}>Edit</Link>
      <Link href="/stratagems-admin">Retour</Link>
      <h1>{category.name}</h1>
    </main>
  );
}

Page.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
