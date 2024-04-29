import PropTypes from 'prop-types';

// Styles
import styles from './RoundInfo.module.css';

// Lib
import cn from '../../../../lib/cn';
import { Picto } from '../Picto/Picto';

function RoundInfo({ roundNb, children, className }) {
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        {children}
      </div>
      <div className={cn([styles.round, className])}>{roundNb}</div>
    </div>
  );
}

RoundInfo.propTypes = {
  roundNb: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};

export default RoundInfo;

export function RoundInfoButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.historyButton}
      aria-label="Show history"
      title="Round History & Stats"
      disabled={disabled}
    >
      <div className={styles.label}>Round</div>
      <div className={styles.historyIcon}>
        <Picto icon="history" />
      </div>
    </button>
  );
}
RoundInfoButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
