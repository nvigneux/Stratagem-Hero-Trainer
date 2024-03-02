import PropTypes from 'prop-types';

// Styles
import styles from './StratagemsKeyboardMobile.module.css';

// Lib
import cn from '../../../../lib/cn';

function StratagemsKeyboardMobile() {
  return (
    <div className={styles.keyboardContainer}>
      <StratagemsKeyboardMobile.Button keyName="up" keydownEvent={{ code: 'ArrowUp' }}>
        Up
      </StratagemsKeyboardMobile.Button>
      <StratagemsKeyboardMobile.Button keyName="left" keydownEvent={{ code: 'ArrowLeft' }}>
        Left
      </StratagemsKeyboardMobile.Button>
      <StratagemsKeyboardMobile.Button keyName="down" keydownEvent={{ code: 'ArrowDown' }}>
        Down
      </StratagemsKeyboardMobile.Button>
      <StratagemsKeyboardMobile.Button keyName="right" keydownEvent={{ code: 'ArrowRight' }}>
        Right
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
