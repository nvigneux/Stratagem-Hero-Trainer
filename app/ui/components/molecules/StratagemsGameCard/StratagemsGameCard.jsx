import Image from 'next/image';

// Styles
import styles from './StratagemsGameCard.module.css';

// Lib
import cn from '../../../../lib/cn';

/**
 * StratagemsGameCard component
 * @param {object} props - Component properties
 * @param {string} props.name - The name of the stratagem
 * @param {string} props.category - The category of the stratagem
 * @param {boolean} [props.active=false] - Whether the stratagem is active
 * @param {boolean} [props.success=false] - Whether the stratagem is successful
 * @param {string} [props.className=''] - Additional class names
 * @returns {JSX.Element} The StratagemsGameCard component
 */
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

/**
 * StratagemsGameCardList component
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The StratagemsGameCardList component
 */
StratagemsGameCard.List = function StratagemsGameCardList({ children }) {
  return (
    <div className={styles.list}>{children}</div>
  );
};

export default StratagemsGameCard;
