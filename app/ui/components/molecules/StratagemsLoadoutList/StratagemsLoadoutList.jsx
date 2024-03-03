import PropTypes from 'prop-types';

// Styles
import styles from './StratagemsLoadoutList.module.css';

// Components
import StratagemsLoadoutCard from '../../atoms/StratagemsLoadoutCard/StratagemsLoadoutCard';

function StratagemsLoadoutList({ stratagems }) {
  return (
    <div className={styles.list}>
      {stratagems.map((stratagem) => (
        <div key={stratagem.id} className={styles.item}>
          <StratagemsLoadoutCard stratagem={stratagem} />
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
};

export default StratagemsLoadoutList;
