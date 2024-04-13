import PropTypes from 'prop-types';

// Styles
import styles from './StratagemsName.module.css';

// Lib
import cn from '../../../../lib/cn';

function StratagemsName({ name, className = '' }) {
  return (
    <div className={cn([styles.container, className])}>
      <span className={styles.name}>{name}</span>
    </div>
  );
}

StratagemsName.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default StratagemsName;
