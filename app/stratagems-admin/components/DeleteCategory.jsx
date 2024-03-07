import PropTypes from 'prop-types';

// Lib
import { deleteCategory } from '../../lib/actions';

function DeleteCategory({ id }) {
  const deleteCategoryWithId = deleteCategory.bind(null, id);

  return (
    <form action={deleteCategoryWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
      </button>
    </form>
  );
}

DeleteCategory.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteCategory;
