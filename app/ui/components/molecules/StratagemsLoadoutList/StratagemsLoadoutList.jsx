import PropTypes from 'prop-types';

// Styles
import styles from './StratagemsLoadoutList.module.css';

function StratagemsLoadoutList({ stratagems, children }) {
  return (
    <div className={styles.list}>
      {stratagems.map((stratagem, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`${stratagem.code}-${index}`} className={styles.item}>
          {children(stratagem, index)}
        </div>
      ))}
    </div>
  );
}

StratagemsLoadoutList.propTypes = {
  stratagems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  children: PropTypes.func.isRequired,
};

export default StratagemsLoadoutList;
