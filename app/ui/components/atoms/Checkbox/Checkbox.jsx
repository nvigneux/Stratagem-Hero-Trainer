'use client';

/* eslint-disable react/jsx-props-no-spreading */

import { forwardRef } from 'react';
import PropTypes from 'prop-types';

// Lib
import cn from '../../../../lib/cn';

// Styles
import styles from './Checkbox.module.css';

const Checkbox = forwardRef(({
  className,
  label,
  size,
  checked,
  children,
  ...props
}, ref) => (
  !children ? (
    <label htmlFor={props.id} className={cn([styles['checkbox-container'], styles[size], 'ui-checkbox', className])}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <input ref={ref} type="checkbox" className={styles['checkbox-input']} checked={checked} {...props} />
      <span className={cn([styles['checkbox-checkmark'], 'ui-checkbox-checkmark'])} />
    </label>
  )
    : (
      <label htmlFor={props.id} className={cn([styles['label-children'], className])}>
        <input ref={ref} type="checkbox" className={styles['checkbox-input']} checked={checked} {...props} />
        {children}
      </label>
    )
));

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'large']),
  children: PropTypes.node,
};

Checkbox.defaultProps = {
  className: '',
  label: null,
  size: 'large',
  checked: null,
  children: null,
};

export default Checkbox;
