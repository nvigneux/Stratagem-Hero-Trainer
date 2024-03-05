import PropTypes from 'prop-types';

// Styles
import styles from './Form.module.css';

// Components
import Button from '../../atoms/Button/Button';

function Form({ action, children }) {
  return (
    <form
      className={styles.form}
      action={action}
    >
      {children}
      <Button
        type="submit"
        className={styles.button}
      >
        Apply
      </Button>
    </form>
  );
}

Form.propTypes = {
  action: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Form;
