// Styles
import styles from './Textfield.module.css';

// Lib
import cn from '../../../../lib/cn';

/**
 * Textfield component
 * @param {object} props - Component properties
 * @param {string} [props.id=''] - The textfield id
 * @param {string} [props.name=''] - The textfield name
 * @param {string} [props.placeholder=''] - Placeholder text
 * @param {string} [props.value=''] - The textfield value
 * @param {Function} [props.onChange] - Change handler function
 * @param {Function} [props.onBlur] - Blur handler function
 * @param {Function} [props.onFocus] - Focus handler function
 * @param {boolean} [props.disabled=false] - Whether the textfield is disabled
 * @param {boolean} [props.required=false] - Whether the textfield is required
 * @param {'text'|'email'|'password'|'number'|'search'|'tel'|'url'} [props.type='text'] - Input type
 * @param {string} [props.className=''] - Additional class names
 * @param {number} [props.maxLength] - Maximum length of input
 * @param {number} [props.minLength] - Minimum length of input
 * @param {string} [props.pattern] - Pattern for input validation
 * @returns {React.ReactElement} The rendered textfield component.
 */
function Textfield({
  id = '',
  name = '',
  placeholder = '',
  value = '',
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  type = 'text',
  className = '',
  maxLength,
  minLength,
  pattern,
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      required={required}
      maxLength={maxLength}
      minLength={minLength}
      pattern={pattern}
      className={cn([styles.textfield, className])}
      data-testid={id}
    />
  );
}

export default Textfield;
