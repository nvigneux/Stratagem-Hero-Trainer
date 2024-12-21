// Styles
import styles from './Button.module.css';

// Lib
import cn from '../../../../lib/cn';

/**
 * Button component
 * @param {object} props - Component properties
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {React.ReactNode} props.children - Child nodes
 * @param {string} [props.className=''] - Additional class names
 * @param {'button'|'submit'|'reset'} [props.type='button'] - Button type
 * @returns {React.ReactElement} The rendered component.
 */
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

export default Button;
