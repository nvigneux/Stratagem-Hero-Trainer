import PropTypes from 'prop-types';

// Styles
import styles from './Table.module.css';

function Table({ children }) {
  return (
    <table className={styles.table}>
      {children}
    </table>
  );
}
Table.propTypes = { children: PropTypes.node.isRequired };

Table.Action = function TableAction({ children }) {
  return (
    <div className={styles.action}>
      {children}
    </div>
  );
};
Table.Action.propTypes = { children: PropTypes.node.isRequired };

Table.Head = function TableHead({ columns, children }) {
  return (
    <thead className={styles.head}>
      <tr className={styles.headRow}>
        {columns.map((column) => children(column))}
      </tr>
    </thead>
  );
};
Table.Head.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  children: PropTypes.func.isRequired,
};

Table.HeaderCell = function TableStatsHeaderCell({ width, children }) {
  return <th width={width} className={styles.headerCell}>{children}</th>;
};
Table.HeaderCell.propTypes = {
  width: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Table.Body = function TableStatsBody({ data, children }) {
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
Table.Body.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  children: PropTypes.func.isRequired,
};

Table.Cell = function TableStatsCell({ children }) {
  return (
    <td className={styles.cell}>
      <div className={styles.cellContainer}>
        {children}
      </div>
    </td>
  );
};
Table.Cell.propTypes = { children: PropTypes.node.isRequired };

export default Table;
