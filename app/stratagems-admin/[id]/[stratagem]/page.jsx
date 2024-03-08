import PropTypes from 'prop-types';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Lib
import { fetchStratagemById } from '../../../lib/data';

export default async function Page({ params }) {
  const { stratagem: stratagemId, id: idCategory } = params;

  const stratagem = await fetchStratagemById(stratagemId);

  console.log(stratagem, idCategory, params);

  if (!stratagem) {
    notFound();
  }

  return (
    <main>
      <Link href={`/stratagems-admin/${idCategory}`}>Retour</Link>
      <h1>{stratagem.name}</h1>
      <form action={updateStratagem}>
        <label htmlFor="name">
          Name
          <input type="text" id="name" name="name" defaultValue={stratagem.name} />
        </label>
      </form>
    </main>
  );
}

Page.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
