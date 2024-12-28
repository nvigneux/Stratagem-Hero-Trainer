// Styles
import styles from './LabelInput.module.css';

/**
 * LabelInput component
 * @param {object} props - Component props
 * @param {string} props.htmlFor - The id of the input element this label is for
 * @param {string} props.label - The text content of the label
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the label
 * @returns {JSX.Element} The rendered label input component
 */
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

export default LabelInput;
