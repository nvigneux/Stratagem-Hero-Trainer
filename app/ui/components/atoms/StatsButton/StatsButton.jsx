import PropTypes from 'prop-types';

// Styles
import styles from './StatsButton.module.css';

// Utils
import cn from '../../../../lib/cn';

function StatsButton({
  onClick, active, small, disabled, children,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn([styles.button, active && styles.active, disabled && styles.disabled])}
    >
      <div className={styles.label}>
        {children}
      </div>
      <div className={styles.smallBorder}>
        <span className={styles.smallValue}>{small}</span>
      </div>
      <div className={styles.small}>
        <span className={styles.smallValue}>{small}</span>
      </div>
    </button>
  );
}

StatsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  small: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default StatsButton;

export function StatsButtonWrapper({ className, children }) {
  return (
    <div className={cn([styles.wrapper, className])}>
      <div className={cn([styles.container, 'stats-button-wrapper-container'])}>
        {children}
      </div>
    </div>
  );
}
StatsButtonWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export function StatsButtonClose({ disabled, children }) {
  return (
    <div className={cn([styles.close, disabled && styles.disabledClose])}>
      {children}
    </div>
  );
}
StatsButtonClose.propTypes = {
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export function StatsButtonLabel({ mobile, desktop }) {
  return (
    <div className={styles.label}>
      <span className={styles.mobile}>
        {mobile}
      </span>
      <span className={styles.desktop}>
        {desktop}
      </span>
    </div>
  );
}
StatsButtonLabel.propTypes = {
  mobile: PropTypes.string.isRequired,
  desktop: PropTypes.string.isRequired,
};
