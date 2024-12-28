/* eslint-disable max-len */

// Styles
import styles from './StratagemsTimer.module.css';

// Lib
import cn from '../../../../lib/cn';

/**
 * StratagemsTimer component
 * @param {object} props - Component properties
 * @param {number} props.progress - The current progress value
 * @param {number} props.total - The total value
 * @param {string} [props.className=''] - Additional class names
 * @returns {JSX.Element} The StratagemsTimer component
 */
function StratagemsTimer({
  progress = 10000, total = 10000, className = '',
}) {
  return (
    <div className={cn([styles.timer])}>
      <div className={cn([styles.inner, className])} style={{ width: `${(progress / total) * 100}%` }} />
    </div>
  );
}

export default StratagemsTimer;
