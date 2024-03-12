import PropTypes from 'prop-types';

// Styles
import styles from './StratagemForm.module.css';

function StratagemFormLayout({ children }) {
  return (
    <div className={styles.layout}>{children}</div>
  );
}

StratagemFormLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StratagemFormLayout;
