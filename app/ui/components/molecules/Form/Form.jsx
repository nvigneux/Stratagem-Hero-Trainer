import Form from 'next/form';
import { useTranslations } from 'next-intl';

// Styles
import styles from './Form.module.css';

// Components
import Button from '../../atoms/Button/Button';

/**
 * Form component
 * @param {object} props - Component properties
 * @param {string} props.name - The form name
 * @param {Function} props.action - The form action function
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The Form component
 */
function FormWrapper({ name, action, children }) {
  const t = useTranslations('Form');
  return (
    <Form
      className={styles.form}
      action={action}
    >
      {children}
      <Button
        id={name}
        type="submit"
        className={styles.button}
      >
        {t('apply')}
      </Button>
    </Form>
  );
}

export default FormWrapper;
