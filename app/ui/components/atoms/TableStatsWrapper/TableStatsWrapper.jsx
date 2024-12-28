// Styles
import styles from './TableStatsWrapper.module.css';

/**
 * TableStatsWrapper component
 * @param {object} props - Component properties
 * @param {string} props.title - The title of the wrapper
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The TableStatsWrapper component
 */
function TableStatsWrapper({ title, children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          {title}
        </div>
      </div>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
}

export default TableStatsWrapper;
