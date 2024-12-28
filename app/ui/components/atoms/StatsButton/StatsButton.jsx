// Styles
import styles from './StatsButton.module.css';

// Utils
import cn from '../../../../lib/cn';

/**
 * StatsButton component
 * @param {object} props - Component properties
 * @param {Function} props.onClick - Click handler function
 * @param {boolean} props.active - Whether the button is active
 * @param {string|number} props.small - Small value
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The StatsButton component
 */
function StatsButton({
  onClick, active, small, disabled, children,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn([styles.button, active && styles.active, disabled && styles.disabled])}
    >
      <div className={styles.label}>
        {children}
      </div>
      <div className={styles.smallBorder}>
        <span className={styles.smallValue}>{small}</span>
      </div>
      <div className={styles.small}>
        <span className={styles.smallValue}>{small}</span>
      </div>
    </button>
  );
}

export default StatsButton;

/**
 * StatsButtonWrapper component
 * @param {object} props - Component properties
 * @param {string} props.className - Additional class names
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The StatsButtonWrapper component
 */
export function StatsButtonWrapper({ className, children }) {
  return (
    <div className={cn([styles.wrapper, className])}>
      <div className={cn([styles.container, 'stats-button-wrapper-container'])}>
        {children}
      </div>
    </div>
  );
}

/**
 * StatsButtonClose component
 * @param {object} props - Component properties
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The StatsButtonClose component
 */
export function StatsButtonClose({ disabled, children }) {
  return (
    <div className={cn([styles.close, disabled && styles.disabledClose])}>
      {children}
    </div>
  );
}

/**
 * StatsButtonLabel component
 * @param {object} props - Component properties
 * @param {string} props.mobile - Mobile label
 * @param {string} props.desktop - Desktop label
 * @returns {JSX.Element} The StatsButtonLabel component
 */
export function StatsButtonLabel({ mobile, desktop }) {
  return (
    <div className={styles.label}>
      <span className={styles.mobile}>
        {mobile}
      </span>
      <span className={styles.desktop}>
        {desktop}
      </span>
    </div>
  );
}
