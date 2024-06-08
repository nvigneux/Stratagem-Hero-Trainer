/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';

// Styles
import styles from './TableStats.module.css';

// Lib
import cn from '../../../../lib/cn';

function TableStats({ children }) {
  return <div className={styles.table}>{children}</div>;
}

TableStats.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableStats;

/**
 * Table title component
 * @param {string} children
 */
export function TableStatsTitle({ children }) {
  return <div className={styles.title}>{children}</div>;
}
TableStatsTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Table header component
 * @param {string} className
 * @param {node} children
 */
export function TableStatsHeader({ className = '', children }) {
  return <div className={cn([styles.header, className])}>{children}</div>;
}
TableStatsHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

/**
 * Table header cell component
 * @param {string} children
 */
export function TableStatsBody({ children }) {
  return <div className={styles.body}>{children}</div>;
}
TableStatsBody.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Table row component
 * @param {node} children
 */
export function TableStatsRow({ className = '', children }) {
  return <div className={cn([styles.row, className])}>{children}</div>;
}
TableStatsRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

/**
 * Table cell component
 * @param {node} children
 */
export function TableStatsCell({
  name,
  onClick = false,
  isActiveFilter = false,
  children,
}) {
  return (
    <button
      type="button"
      name={name}
      onClick={onClick || undefined}
      className={cn([
        styles.cell,
        !!onClick && styles.button,
        isActiveFilter && styles.active,
      ])}
    >
      {children}
    </button>
  );
}
TableStatsCell.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  isActiveFilter: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

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
TableStatsCellMobile.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  isActiveFilter: PropTypes.bool,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
