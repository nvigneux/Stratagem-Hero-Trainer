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
  children,
  ...props
}, ref) => (
  !children ? (
    <label htmlFor={props.id} className={cn([styles['checkbox-container'], styles[size], 'ui-checkbox', className])}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <input name={props.id} ref={ref} type="checkbox" className={styles['checkbox-input']} {...props} />
      <span className={cn([styles['checkbox-checkmark'], 'ui-checkbox-checkmark'])} />
    </label>
  )
    : (
      <label htmlFor={props.id} className={cn([styles['label-children'], className])}>
        <input name={props.id} ref={ref} type="checkbox" className={styles['checkbox-input']} {...props} />
        {children}
      </label>
    )
));

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.oneOf(['small', 'large']),
  children: PropTypes.node,
};

Checkbox.defaultProps = {
  className: '',
  label: null,
  size: 'large',
  children: null,
};

export default Checkbox;
