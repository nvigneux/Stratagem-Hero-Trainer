import PropTypes from 'prop-types';

// Components
import { Picto } from '../Picto/Picto';

// Lib
import cn from '../../../../lib/cn';

// Styles
import styles from './Arrow.module.css';

/**
 * Arrow component
 * @param {object} props - Component properties
 * @param {'left'|'right'|'up'|'down'} props.direction - Direction of the arrow
 * @param {boolean} props.active - Whether the arrow is active
 * @param {boolean} props.error - Whether the arrow is in error state
 * @param {'small'|'large'} [props.size='large'] - Size of the arrow
 * @returns {React.ReactElement} The rendered component.
 */
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
        active && `${styles.active} arrow-is-active`,
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

/**
 * ArrowList component
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {React.ReactElement} The rendered component.
 */
Arrow.List = function ArrowList({ children }) {
  return <div className={styles.list}>{children}</div>;
};
Arrow.List.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Arrow;
