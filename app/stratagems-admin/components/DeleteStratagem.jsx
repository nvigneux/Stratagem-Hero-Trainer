import PropTypes from 'prop-types';

// Lib
import { deleteStratagem } from '../../lib/actions';

// Components
import Button from '../../ui/components/atoms/Button/Button';

function DeleteStratagem({ id, categoryId }) {
  const deleteStratagemWithId = deleteStratagem.bind(null, id);

  return (
    <form action={deleteStratagemWithId}>
      <input type="hidden" name="category_id" value={categoryId} />
      <Button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
      </Button>
    </form>
  );
}

DeleteStratagem.propTypes = {
  id: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
};

export default DeleteStratagem;
