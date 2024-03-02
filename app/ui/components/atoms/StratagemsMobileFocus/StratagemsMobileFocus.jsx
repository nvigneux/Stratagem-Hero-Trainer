// Styles
import styles from './StratagemsMobileFocus.module.css';

function StratagemsMobileFocus() {
  return (
    <label
      htmlFor="focusMobile"
      className={styles.focus}
      aria-label="focus mobile"
    >
      <span>Play on mobile</span>
      <input id="focusMobile" type="number" />
    </label>
  );
}

export default StratagemsMobileFocus;
