import PropTypes from 'prop-types';
import { notFound } from 'next/navigation';

// Lib
import { fetchStratagemById } from '../../../lib/data';
// Components
import EditStratagemForm from '../../components/EditStratagemForm';

export default async function Page({ params }) {
  const { stratagem: stratagemId } = params;
  const stratagem = await fetchStratagemById(stratagemId);

  if (!stratagem) {
    notFound();
  }

  return (
    <EditStratagemForm stratagem={stratagem} />
  );
}

Page.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
