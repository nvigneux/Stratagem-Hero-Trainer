// Lib
import { fetchRevenue } from '../../../lib/data';

async function RevenueList() {
  const revenue = await fetchRevenue();

  return (
    <div>
      {revenue?.length > 0 ? (
        <table>
          <tbody>
            {revenue.map((entry) => (
              <tr key={entry.month}>
                <td>{entry.month}</td>
                <td>{entry.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No revenue data available.</p>
      )}
    </div>
  );
}

RevenueList.propTypes = {};

export default RevenueList;
