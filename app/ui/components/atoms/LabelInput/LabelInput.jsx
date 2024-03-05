import PropTypes from 'prop-types';

// Styles
import styles from './LabelInput.module.css';

function LabelInput({ htmlFor, label, children }) {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      <span className={styles.labelText}>
        {label}
      </span>
      {children}
    </label>
  );
}

LabelInput.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default LabelInput;
