import PropTypes from 'prop-types';

// Lib
import { fetchCustomers, fetchInvoiceById } from '../../../../lib/data';

// Ui
import EditInvoiceForm from '../../../../ui/invoices/Form/Edit';

export default async function Page({ params }) {
  const { id } = params;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

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
