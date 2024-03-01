import PropTypes from 'prop-types';

// Styles
import styles from './StratagemsName.module.css';

function StratagemsName({ name }) {
  return (
    <div className={styles.container}>
      <span className={styles.name}>{name}</span>
    </div>
  );
}

StratagemsName.propTypes = {
  name: PropTypes.string.isRequired,
};

export default StratagemsName;
