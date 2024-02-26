// Lib
import { fetchCustomers } from '../../../lib/data';

// Ui
import Form from '../../../ui/invoices/Form/Form';

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <h1>Create Invoice</h1>
      <Form customers={customers} />
    </main>
  );
}
