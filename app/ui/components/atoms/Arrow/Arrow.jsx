import PropTypes from 'prop-types';

// Components
import { Picto } from '../Picto/Picto';

// Lib
import cn from '../../../../lib/cn';

// Styles
import styles from './Arrow.module.css';

function Arrow({
  direction, active, error, size = 'large',
}) {
  return (
    <Picto
      icon="arrow"
      className={cn([
        styles.icon,
        styles[direction],
        styles[size],
        active && styles.active,
        error && styles.error,
      ])}
    />
  );
}

Arrow.propTypes = {
  direction: PropTypes.oneOf(['left', 'right', 'up', 'down']).isRequired,
  active: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['small', 'large']).isRequired,
};

Arrow.List = function ArrowList({ children }) {
  return (
    <div className={styles.list}>{children}</div>
  );
};
Arrow.List.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Arrow;
