import { Suspense } from 'react';

// Libs
import { fetchLatestInvoices } from '../../lib/data';

// UI
import Card from '../../ui/dashboard/Card/Card';
import RevenueList from '../../ui/dashboard/RevenueList/RevenueList';

export default async function Page() {
  const lastestInvoices = await fetchLatestInvoices();

  return (
    <main>
      <h1>
        Dashboard
      </h1>

      <div>
        {lastestInvoices?.length > 0 ? (
          <table>
            <tbody>
              {lastestInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.name}</td>
                  <td>{invoice.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No invoices available.</p>
        )}
      </div>

      <div>
        <h2>Latest Invoices</h2>
        <Suspense fallback={<p>Loading card data...</p>}>
          <Card.Wrapper>
            {({
              totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers,
            }) => (
              <>
                <Card title="Collected" value={totalPaidInvoices} type="collected" />
                <Card title="Pending" value={totalPendingInvoices} type="pending" />
                <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
                <Card title="Total Customers" value={numberOfCustomers} type="customers" />
              </>
            )}
          </Card.Wrapper>
        </Suspense>
      </div>

      <div>
        <h2>Revenue</h2>
        <Suspense fallback={<p>Loading revenue data...</p>}>
          <RevenueList />
        </Suspense>
      </div>
    </main>
  );
}
