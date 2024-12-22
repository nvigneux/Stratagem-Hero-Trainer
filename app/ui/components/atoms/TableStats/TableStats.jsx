// Styles
import styles from './TableStats.module.css';

// Lib
import cn from '../../../../lib/cn';

/**
 * TableStats component
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The TableStats component
 */
function TableStats({ children }) {
  return <div className={styles.table}>{children}</div>;
}

export default TableStats;

/**
 * TableStatsTitle component
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The TableStatsTitle component
 */
export function TableStatsTitle({ children }) {
  return <div className={styles.title}>{children}</div>;
}

/**
 * TableStatsHeader component
 * @param {object} props - Component properties
 * @param {string} [props.className] - Additional class names
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The TableStatsHeader component
 */
export function TableStatsHeader({ className = '', children }) {
  return <div className={cn([styles.header, className])}>{children}</div>;
}

/**
 * TableStatsBody component
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The TableStatsBody component
 */
export function TableStatsBody({ children }) {
  return <div className={styles.body}>{children}</div>;
}

/**
 * TableStatsRow component
 * @param {object} props - Component properties
 * @param {string} [props.className] - Additional class names
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The TableStatsRow component
 */
export function TableStatsRow({ className = '', children }) {
  return <div className={cn([styles.row, className])}>{children}</div>;
}

/**
 * TableStatsCell component
 * @param {object} props - Component properties
 * @param {string} props.name - The name of the cell
 * @param {Function} [props.onClick] - Click handler function
 * @param {boolean} [props.isActiveFilter] - Whether the cell is an active filter
 * @param {string} [props.order] - The order of the cell
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The TableStatsCell component
 */
export function TableStatsCell({
  name,
  onClick = false,
  isActiveFilter = false,
  order,
  children,
}) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      name={name}
      onClick={onClick ? () => onClick(order) : undefined}
      className={cn([
        styles.cell,
        !!onClick && styles.button,
        isActiveFilter && styles.active,
      ])}
    >
      <div className={styles.children}>
        {children}
        {order
          ? <span className={cn([isActiveFilter ? `${styles.arrow} ${styles[order]}` : ''])} />
          : null}
      </div>
    </Tag>
  );
}

/**
 * TableStatsCellMobile component
 * @param {object} props - Component properties
 * @param {string} props.name - The name of the cell
 * @param {Function} [props.onClick] - Click handler function
 * @param {boolean} [props.isActiveFilter] - Whether the cell is an active filter
 * @param {string} props.label - The label of the cell
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The TableStatsCellMobile component
 */
export function TableStatsCellMobile({
  name,
  onClick = false,
  isActiveFilter = false,
  label,
  children,
}) {
  return (
    <button
      type="button"
      name={name}
      onClick={onClick || undefined}
      className={cn([
        styles.cellMobile,
        !!onClick && styles.button,
        isActiveFilter && styles.active,
      ])}
    >
      {label ? <span className={styles.cellMobileLabel}>{`${label}:`}</span> : null}
      <span>
        {children}
      </span>
    </button>
  );
}
