// Styles
import styles from './TextNoiseEffect.module.css';

/**
 * TextNoiseEffect component
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.title
 * @returns {JSX.Element} The TextNoiseEffect component
 */
export default function TextNoiseEffect({ label = '', title = '' }) {
  return (
    <span
      data-testid="text-noise-effect"
      className={styles.noise}
      title={title}
      data-text={label}
      aria-label={label}
    >
      {label}
    </span>
  );
}
