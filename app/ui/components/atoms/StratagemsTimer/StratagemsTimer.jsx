/* eslint-disable max-len */
import PropTypes from 'prop-types';

// Styles
import styles from './StratagemsTimer.module.css';

// Lib
import cn from '../../../../lib/cn';

function StratagemsTimer({
  progress = 10000, total = 10000, className = '',
}) {
  return (
    <div className={cn([styles.timer])}>
      <div className={cn([styles.inner, className])} style={{ width: `${(progress / total) * 100}%` }} />
    </div>
  );
}

StratagemsTimer.propTypes = {
  progress: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
};

export default StratagemsTimer;
