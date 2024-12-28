// Styles
import styles from './HeadingForm.module.css';

/**
 * HeadingForm component
 * @param {object} props - Component props
 * @param {string} props.title - The title to display
 * @returns {JSX.Element} The HeadingForm component
 */
function HeadingForm({ title }) {
  return (
    <div className={styles.title}>
      {title}
    </div>
  );
}

export default HeadingForm;
