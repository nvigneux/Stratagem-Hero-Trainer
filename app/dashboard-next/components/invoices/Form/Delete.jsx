import PropTypes from 'prop-types';

// Lib
import { deleteInvoice } from '../../../../lib/actions';

function DeleteInvoice({ id }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
      </button>
    </form>
  );
}

DeleteInvoice.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteInvoice;
