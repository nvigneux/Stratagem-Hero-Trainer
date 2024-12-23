import Form from 'next/form';

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
function FormWrapper({ action, children }) {
  return (
    <Form
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
    </Form>
  );
}

export default FormWrapper;
