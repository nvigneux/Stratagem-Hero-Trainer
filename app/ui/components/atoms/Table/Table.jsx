// Styles
import styles from './Table.module.css';

/**
 * Table component
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The Table component
 */
function Table({ children }) {
  return (
    <table className={styles.table}>
      {children}
    </table>
  );
}

/**
 * TableAction component
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The TableAction component
 */
Table.Action = function TableAction({ children }) {
  return (
    <div className={styles.action}>
      {children}
    </div>
  );
};

/**
 * TableHead component
 * @param {object} props - Component properties
 * @param {Array<{ id: string, title: string }>} props.columns - Array of column objects
 * @param {Function} props.children - Function to render each column
 * @returns {JSX.Element} The TableHead component
 */
Table.Head = function TableHead({ columns, children }) {
  return (
    <thead className={styles.head}>
      <tr className={styles.headRow}>
        {columns.map((column) => children(column))}
      </tr>
    </thead>
  );
};

/**
 * TableHeaderCell component
 * @param {object} props - Component properties
 * @param {string} props.width - Width of the header cell
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The TableHeaderCell component
 */
Table.HeaderCell = function TableHeaderCell({ width, children }) {
  return <th width={width} className={styles.headerCell}>{children}</th>;
};

/**
 * TableBody component
 * @param {object} props - Component properties
 * @param {Array<object>} props.data - Array of data objects
 * @param {Function} props.children - Function to render each row
 * @returns {JSX.Element} The TableBody component
 */
Table.Body = function TableBody({ data, children }) {
  return (
    <tbody className={styles.body}>
      {data.map((row) => (
        <tr key={row.id} className={styles.row}>
          {children(row)}
        </tr>
      ))}
    </tbody>
  );
};

/**
 * TableCell component
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The TableCell component
 */
Table.Cell = function TableCell({ children }) {
  return (
    <td className={styles.cell}>
      <div className={styles.cellContainer}>
        {children}
      </div>
    </td>
  );
};

export default Table;
