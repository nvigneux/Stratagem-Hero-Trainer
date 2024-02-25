import PropTypes from 'prop-types';
// Lib
import { fetchFilteredInvoices } from '../../../lib/data';

async function Invoices({ query, currentPage, pageSize }) {
  const invoices = await fetchFilteredInvoices(query, currentPage, pageSize);

  return (
    <div>
      {invoices.map((invoice) => (
        <div key={invoice.id}>
          <strong>{invoice.name}</strong>
          <p>{invoice.amount}</p>
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
