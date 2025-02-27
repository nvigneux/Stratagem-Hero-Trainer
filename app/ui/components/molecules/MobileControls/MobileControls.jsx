import React from 'react';

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
 * @returns {JSX.Element} The MobileControls component
 */
function MobileControls() {
  const [controlType, setControlType] = React.useState('keyboard');

  return (
    <div className={styles.container}>
      <div className={styles.controlsSelector}>
        {controlType === 'dpad' && (
          <button
            type="button"
            className={cn([styles.selectorButton, styles.keyboardButton])}
            onClick={() => setControlType('keyboard')}
            aria-label="Switch to keyboard controls"
          >
            <Picto icon="keypad" />
          </button>
        )}
        {controlType === 'keyboard' && (
          <button
            type="button"
            className={cn([styles.selectorButton, styles.dpadButton])}
            onClick={() => setControlType('dpad')}
            aria-label="Switch to D-pad controls"
          >
            <Picto icon="dpad" />
          </button>
        )}
      </div>

      <div key={controlType} className={styles.layoutContainer}>
        {controlType === 'keyboard' ? <StratagemsKeyboardMobile /> : <StratagemsDpadMobile />}
      </div>
    </div>
  );
}

export default MobileControls;
