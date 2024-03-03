import PropTypes from 'prop-types';

// Styles
import styles from './StratagemsGameCard.module.css';

// Components
import { Picto } from '../../atoms/Picto/Picto';

// Lib
import cn from '../../../../lib/cn';

function StratagemsGameCard({ name, active = false, success = false }) {
  return (
    <div className={cn([
      styles.container,
      active && styles.active,
      active && success && styles.success,
    ])}
    >
      <Picto icon={name} className={cn([styles.icon])} />
    </div>
  );
}

StratagemsGameCard.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
};

StratagemsGameCard.List = function StratagemsGameCardList({ children }) {
  return (
    <div className={styles.list}>{children}</div>
  );
};
StratagemsGameCard.List.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StratagemsGameCard;
