// Styles
import styles from './StratagemsDpadMobile.module.css';

// Lib
import cn from '../../../../lib/cn';

// Components
import { Picto } from '../../atoms/Picto/Picto';

/**
 * StratagemsDpadMobile component
 * @returns {JSX.Element} The StratagemsDpadMobile component
 */
function StratagemsDpadMobile() {
  return (
    <div className={styles.dpadContainer}>
      <StratagemsDpadMobile.Button
        keyName="up"
        keydownEvent={{ code: 'ArrowUp' }}
        data-testid="dpad-up"
      >
        <Picto icon="arrow" className={cn([styles.icon, styles.up])} />
      </StratagemsDpadMobile.Button>
      <StratagemsDpadMobile.Button
        keyName="left"
        keydownEvent={{ code: 'ArrowLeft' }}
        data-testid="dpad-left"
      >
        <Picto icon="arrow" className={cn([styles.icon, styles.left])} />
      </StratagemsDpadMobile.Button>
      <StratagemsDpadMobile.Button
        keyName="down"
        keydownEvent={{ code: 'ArrowDown' }}
        data-testid="dpad-down"
      >
        <Picto icon="arrow" className={cn([styles.icon, styles.down])} />
      </StratagemsDpadMobile.Button>
      <StratagemsDpadMobile.Button
        keyName="right"
        keydownEvent={{ code: 'ArrowRight' }}
        data-testid="dpad-right"
      >
        <Picto icon="arrow" className={cn([styles.icon, styles.right])} />
      </StratagemsDpadMobile.Button>
    </div>
  );
}

/**
 * StratagemsDpadMobileButton component
 * @param {object} props - Component properties
 * @param {object} props.keydownEvent - Keydown event
 * @param {string} props.keyName - Key name
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The StratagemsDpadMobileButton component
 */
StratagemsDpadMobile.Button = function StratagemsDpadMobileButton(
  { keydownEvent, keyName, children },
) {
  return (
    <button
      type="button"
      className={cn([styles.button, styles[`key-${keyName}`]])}
      onClick={() => {
        const event = new KeyboardEvent('keydown', { ...keydownEvent });
        window.dispatchEvent(event);
      }}
    >
      {children}
    </button>
  );
};

export default StratagemsDpadMobile;
