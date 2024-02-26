import PropTypes from 'prop-types';
import Link from 'next/link';
// Lib
import { fetchFilteredInvoices } from '../../../lib/data';
import DeleteInvoice from '../../invoices/Form/Delete';

async function Invoices({ query, currentPage, pageSize }) {
  const invoices = await fetchFilteredInvoices(query, currentPage, pageSize);

  return (
    <div>
      {invoices.map((invoice) => (
        <div key={invoice.id}>
          <strong>{invoice.name}</strong>
          <p>{invoice.amount}</p>
          <Link href={`/dashboard/invoices/${invoice.id}/edit`}>Edit</Link>
          <DeleteInvoice id={invoice.id} />
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
