// Styles
import styles from './InfoMessage.module.css';

/**
 * InfoMessage component to display informational messages.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content to display inside the message.
 * @returns {JSX.Element} The InfoMessage component.
 */
function InfoMessage({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

export default InfoMessage;
