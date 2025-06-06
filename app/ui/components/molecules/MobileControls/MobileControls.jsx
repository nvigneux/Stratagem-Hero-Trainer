// Components
import { Picto } from '../../atoms/Picto/Picto';
import StratagemsKeyboardMobile from '../StratagemsKeyboardMobile/StratagemsKeyboardMobile';
import StratagemsDpadMobile from '../StratagemsDpadMobile/StratagemsDpadMobile';

// Lib
import cn from '../../../../lib/cn';

// Styles
import styles from './MobileControls.module.css';

/**
 * MobileControls component
 * @param {object} props - The props
 * @param {'keyboard' | 'dpad'} props.layout - The layout
 * @param {Function} props.setLayout - The setLayout function
 * @returns {JSX.Element} The MobileControls component
 */
function MobileControls({ layout, setLayout }) {
  return (
    <div className={styles.container} data-testid="mobile-controls">
      <div className={styles.controlsSelector}>
        {layout === 'dpad' && (
          <button
            type="button"
            className={cn([styles.selectorButton, styles.keyboardButton])}
            data-testid="keyboard-button"
            onClick={() => setLayout('keyboard')}
            aria-label="Switch to keyboard controls"
          >
            <Picto icon="keypad" className={styles.selectorIcon} />
          </button>
        )}
        {layout === 'keyboard' && (
          <button
            type="button"
            className={cn([styles.selectorButton, styles.dpadButton])}
            data-testid="dpad-button"
            onClick={() => setLayout('dpad')}
            aria-label="Switch to D-pad controls"
          >
            <Picto icon="dpad" className={styles.selectorIcon} />
          </button>
        )}
      </div>

      <div key={layout} className={styles.layoutContainer} data-testid={`mobile-${layout}`}>
        {layout === 'keyboard' ? <StratagemsKeyboardMobile /> : <StratagemsDpadMobile />}
      </div>
    </div>
  );
}

export default MobileControls;
