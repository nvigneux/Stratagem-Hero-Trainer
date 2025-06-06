// Styles
import styles from './RoundInfo.module.css';

// Lib
import cn from '../../../../lib/cn';
import { Picto } from '../Picto/Picto';

/**
 * RoundInfo component
 * @param {object} props - Component properties
 * @param {number} props.roundNb - The round number
 * @param {React.ReactNode} props.children - Child nodes
 * @param {string} props.className - Additional class names
 * @returns {JSX.Element} The RoundInfo component
 */
function RoundInfo({ roundNb, children, className }) {
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        {children}
      </div>
      <div
        data-testid="round-info"
        className={cn([styles.round, className])}
      >
        {roundNb}
      </div>
    </div>
  );
}

/**
 * RoundInfoButton component
 * @param {object} props - Component properties
 * @param {Function} props.onClick - Click handler function
 * @param {boolean} props.disabled - Whether the button is disabled
 * @returns {JSX.Element} The RoundInfoButton component
 */
export function RoundInfoButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.historyButton}
      aria-label="Show history"
      title="Round History & Stats"
      disabled={disabled}
      data-testid="round-history"
    >
      <div className={styles.label}>Round</div>
      <div className={styles.historyIcon}>
        <Picto icon="history" />
      </div>
    </button>
  );
}

export default RoundInfo;
