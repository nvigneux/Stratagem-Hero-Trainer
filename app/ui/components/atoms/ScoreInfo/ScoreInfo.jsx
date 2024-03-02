import PropTypes from 'prop-types';

// Styles
import styles from './ScoreInfo.module.css';

function ScoreInfo({ score }) {
  return (
    <div className={styles.container}>
      <div className={styles.score}>{score}</div>
      <div className={styles.label}>Score</div>
    </div>
  );
}

ScoreInfo.propTypes = {
  score: PropTypes.number.isRequired,
};

export default ScoreInfo;
