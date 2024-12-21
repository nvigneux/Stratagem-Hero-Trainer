'use client';

/* eslint-disable react/jsx-props-no-spreading */

import { forwardRef } from 'react';

// Lib
import cn from '../../../../lib/cn';

// Styles
import styles from './Checkbox.module.css';

/**
 * Checkbox component
 * @param {object} props - Component properties
 * @param {string} props.id - The id of the checkbox
 * @param {string} [props.className] - Additional class names
 * @param {string} [props.label] - Label for the checkbox
 * @param {'small'|'large'} [props.size='large'] - Size of the checkbox
 * @param {React.ReactNode} [props.children] - Child nodes
 * @param {React.Ref} ref - Ref for the checkbox input
 * @returns {JSX.Element} The Checkbox component
 */
const Checkbox = forwardRef(({
  className = '',
  label = null,
  size = 'large',
  children = null,
  ...props
}, ref) => (
  !children ? (
    <label
      htmlFor={props.id}
      className={cn([styles['checkbox-container'], styles[size], 'ui-checkbox', className])}
    >
      {label ? <span className={styles.label}>{label}</span> : null}
      <input
        name={props.id}
        ref={ref}
        type="checkbox"
        className={styles['checkbox-input']}
        {...props}
      />
      <span className={cn([styles['checkbox-checkmark'], 'ui-checkbox-checkmark'])} />
    </label>
  )
    : (
      <label
        htmlFor={props.id}
        className={cn([styles['label-children'], className])}
      >
        <input
          name={props.id}
          ref={ref}
          type="checkbox"
          className={styles['checkbox-input']}
          {...props}
        />
        {children}
      </label>
    )
));

Checkbox.displayName = 'Checkbox';

export default Checkbox;
