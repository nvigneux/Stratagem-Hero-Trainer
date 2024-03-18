import PropTypes from 'prop-types';

// Libs
import { fetchCardData } from '../../../../lib/data';
import cn from '../../../../lib/cn';

// Styles
import styles from './Card.module.css';

function Card({
  title, value, type,
}) {
  return (
    <div className={cn([styles.container, styles[type]])}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value}</p>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.oneOf(['invoices', 'customers', 'pending', 'collected']).isRequired,
};

Card.Wrapper = async function CardWrapper({ children }) {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <div className={styles.wrapper}>
      {children({
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,
      })}
    </div>
  );
};

Card.Wrapper.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Card;
