/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';

// Styles
import styles from './Button.module.css';

// Lib
import cn from '../../../../lib/cn';

function Button({
  disabled = false, children, className = '', type = 'button',
}) {
  return (
    <button
      disabled={disabled}
      className={cn([styles.button, className])}
      // eslint-disable-next-line react/button-has-type
      type={type}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
