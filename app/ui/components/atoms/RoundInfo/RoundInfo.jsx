import PropTypes from 'prop-types';

// Styles
import styles from './RoundInfo.module.css';

function RoundInfo({ roundNb }) {
  return (
    <div className={styles.container}>
      <div className={styles.label}>Round</div>
      <div className={styles.round}>{roundNb}</div>
    </div>
  );
}

RoundInfo.propTypes = {
  roundNb: PropTypes.number.isRequired,
};

export default RoundInfo;
