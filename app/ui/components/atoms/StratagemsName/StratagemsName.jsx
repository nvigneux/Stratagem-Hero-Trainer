// Styles
import styles from './StratagemsName.module.css';

// Lib
import cn from '../../../../lib/cn';

/**
 * StratagemsName component
 * @param {object} props - Component properties
 * @param {string} props.name - The name of the stratagem
 * @param {string} [props.className=''] - Additional class names
 * @returns {JSX.Element} The StratagemsName component
 */
function StratagemsName({ name, className = '' }) {
  return (
    <div className={cn([styles.container, className])}>
      <span className={styles.name}>{name}</span>
    </div>
  );
}

export default StratagemsName;
