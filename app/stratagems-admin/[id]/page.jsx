import PropTypes from 'prop-types';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Lib
import { fetchCategoryById, fetchStratagemByCategory } from '../../lib/data';

export default async function Page({ params }) {
  const { id } = params;
  const [category, stratagems] = await Promise.all([
    fetchCategoryById(id),
    fetchStratagemByCategory(id),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <main>
      <Link href={`/stratagems-admin/${category.id}/edit`}>Edit</Link>
      <Link href="/stratagems-admin">Retour</Link>
      <h1>{category.name}</h1>
      {stratagems.map((stratagem) => (
        <div key={stratagem.id}>
          <h2>{stratagem.name}</h2>
          <Link href={`/stratagems-admin/${category.id}/${stratagem.id}`}>Edit</Link>
        </div>
      ))}
    </main>
  );
}

Page.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
