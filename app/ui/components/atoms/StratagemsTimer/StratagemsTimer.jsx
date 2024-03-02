/* eslint-disable max-len */
import PropTypes from 'prop-types';

// Styles
import styles from './StratagemsTimer.module.css';

function StratagemsTimer({
  progress = 10000, total = 10000,
}) {
  return (
    <div className={styles.timer}>
      {`${progress} / ${total}`}
      <div className={styles.inner} style={{ width: `${(progress / total) * 100}%` }} />
    </div>
  );
}

StratagemsTimer.propTypes = {
  progress: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default StratagemsTimer;
