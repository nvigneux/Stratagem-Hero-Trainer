import PropTypes from 'prop-types';

// Styles
import styles from './StratagemsKeyboardMobile.module.css';

// Lib
import cn from '../../../../lib/cn';

// Components
import { Picto } from '../../atoms/Picto/Picto';

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
StratagemsKeyboardMobile.Button.propTypes = {
  keydownEvent: PropTypes.shape({
    code: PropTypes.string.isRequired,
  }).isRequired,
  keyName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default StratagemsKeyboardMobile;
