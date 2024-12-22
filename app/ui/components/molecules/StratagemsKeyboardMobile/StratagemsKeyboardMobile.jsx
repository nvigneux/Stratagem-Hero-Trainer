// Styles
import styles from './StratagemsKeyboardMobile.module.css';

// Lib
import cn from '../../../../lib/cn';

// Components
import { Picto } from '../../atoms/Picto/Picto';

/**
 * StratagemsKeyboardMobile component
 * @returns {JSX.Element} The StratagemsKeyboardMobile component
 */
function StratagemsKeyboardMobile() {
  return (
    <div className={styles.keyboardContainer}>
      <StratagemsKeyboardMobile.Button keyName="up" keydownEvent={{ code: 'ArrowUp' }}>
        <Picto icon="arrow" className={cn([styles.icon, styles.up])} />
      </StratagemsKeyboardMobile.Button>
      <StratagemsKeyboardMobile.Button keyName="left" keydownEvent={{ code: 'ArrowLeft' }}>
        <Picto icon="arrow" className={cn([styles.icon, styles.left])} />
      </StratagemsKeyboardMobile.Button>
      <StratagemsKeyboardMobile.Button keyName="down" keydownEvent={{ code: 'ArrowDown' }}>
        <Picto icon="arrow" className={cn([styles.icon, styles.down])} />
      </StratagemsKeyboardMobile.Button>
      <StratagemsKeyboardMobile.Button keyName="right" keydownEvent={{ code: 'ArrowRight' }}>
        <Picto icon="arrow" className={cn([styles.icon, styles.right])} />
      </StratagemsKeyboardMobile.Button>
    </div>
  );
}

/**
 * StratagemsKeyboardMobileButton component
 * @param {object} props - Component properties
 * @param {object} props.keydownEvent - Keydown event
 * @param {string} props.keyName - Key name
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The StratagemsKeyboardMobileButton component
 */
StratagemsKeyboardMobile.Button = function StratagemsKeyboardMobileButton(
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

export default StratagemsKeyboardMobile;
