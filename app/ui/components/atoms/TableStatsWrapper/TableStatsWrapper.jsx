import PropTypes from 'prop-types';

// Styles
import styles from './TableStatsWrapper.module.css';

function TableStatsWrapper({ title, children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          {title}
        </div>
      </div>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
}

TableStatsWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default TableStatsWrapper;
