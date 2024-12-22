// Styles
import styles from './ScoreInfo.module.css';

// Lib
import cn from '../../../../lib/cn';

/**
 * ScoreInfo component
 * @param {object} props - Component properties
 * @param {number} props.score - The score value
 * @param {number} props.bonusRound - The round bonus value
 * @param {number} props.bonusRestingTime - The resting time bonus value
 * @param {number} props.bonusPerfectRound - The perfect round bonus value
 * @param {number} props.bestScore - The best score value
 * @param {boolean} props.displayBonus - Whether to display the bonus
 * @param {string} props.className - Additional class names
 * @returns {JSX.Element} The ScoreInfo component
 */
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

export default ScoreInfo;
