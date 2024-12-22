// Styles
import styles from './Form.module.css';

// Components
import Button from '../../atoms/Button/Button';

/**
 * Form component
 * @param {object} props - Component properties
 * @param {Function} props.action - The form action function
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The Form component
 */
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

export default Form;
