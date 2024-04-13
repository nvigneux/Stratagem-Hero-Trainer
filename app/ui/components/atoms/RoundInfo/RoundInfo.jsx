import PropTypes from 'prop-types';

// Styles
import styles from './RoundInfo.module.css';

// Lib
import cn from '../../../../lib/cn';

function RoundInfo({ roundNb, className }) {
  return (
    <div className={styles.container}>
      <div className={styles.label}>Round</div>
      <div className={cn([styles.round, className])}>{roundNb}</div>
    </div>
  );
}

RoundInfo.propTypes = {
  roundNb: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
};

export default RoundInfo;
