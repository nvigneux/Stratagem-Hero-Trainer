import PropTypes from 'prop-types';

// Styles
import styles from './ScoreInfo.module.css';

// Lib
import cn from '../../../../lib/cn';

function ScoreInfo({
  score, bonusRound, bonusRestingTime, bonusPerfectRound, bestScore, displayBonus, className,
}) {
  return (
    <div className={styles.container}>
      <div className={cn([styles.scoreDetails, displayBonus && styles.displayBonus])}>
        <div className={styles.bonus}>
          <span>Round Bonus</span>
          <span className={styles.bonusValue}>{bonusRound}</span>
        </div>
        <div className={styles.bonus}>
          <span>Time Bonus</span>
          <span className={styles.bonusValue}>{bonusRestingTime}</span>
        </div>
        <div className={styles.bonus}>
          <span>Perfect Round</span>
          <span className={styles.bonusValue}>{bonusPerfectRound}</span>
        </div>
      </div>
      <div className={cn([styles.score, className])}>{score}</div>
      <div className={styles.label}>Score</div>
      {bestScore > 0 ? (
        <div className={styles.bestScore}>
          <span>{'Record : '}</span>
          <span className={cn([styles.bestScoreNb, className])}>{bestScore}</span>
        </div>
      ) : null}
    </div>
  );
}

ScoreInfo.propTypes = {
  score: PropTypes.number.isRequired,
  bonusRound: PropTypes.number.isRequired,
  bonusRestingTime: PropTypes.number.isRequired,
  bonusPerfectRound: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
  displayBonus: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
};

export default ScoreInfo;
