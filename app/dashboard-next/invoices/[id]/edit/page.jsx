import PropTypes from 'prop-types';
import { notFound } from 'next/navigation';

// Lib
import { fetchCustomers, fetchInvoiceById } from '../../../../lib/data';

// Ui
import EditInvoiceForm from '../../../components/invoices/Form/Edit';

export default async function Page({ params }) {
  const { id } = params;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  console.log(invoice);
  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  );
}

Page.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
