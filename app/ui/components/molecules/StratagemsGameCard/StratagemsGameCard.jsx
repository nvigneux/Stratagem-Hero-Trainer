import PropTypes from 'prop-types';
import Image from 'next/image';

// Styles
import styles from './StratagemsGameCard.module.css';

// Lib
import cn from '../../../../lib/cn';

function StratagemsGameCard({
  name, category, active = false, success = false, className = '',
}) {
  return (
    <div className={cn([
      styles.container,
      active && styles.active,
      active && success && styles.success,
      className,
    ])}
    >
      <Image
        src={`/icons/stratagems/${category}/${name}.svg`}
        alt={name}
        width={55}
        height={55}
        className={styles.icon}
        loading="eager"
        priority
      />
    </div>
  );
}

StratagemsGameCard.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
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
