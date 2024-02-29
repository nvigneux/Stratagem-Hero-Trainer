'use client';

/* eslint-disable react/jsx-props-no-spreading */

import { forwardRef } from 'react';
import PropTypes from 'prop-types';

// Lib
import cn from '../../../../lib/cn';

// Styles
import style from './Checkbox.module.css';

const Checkbox = forwardRef(({
  className,
  label,
  size,
  checked,
  ...props
}, ref) => (
  <label htmlFor={props.id} className={cn([style['checkbox-container'], style[size], 'ui-checkbox', className])}>
    <input ref={ref} type="checkbox" className={style['checkbox-input']} checked={checked} {...props} />
    <span className={cn([style['checkbox-checkmark'], 'ui-checkbox-checkmark'])} />
    {label}
  </label>
));

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'large']),
};

Checkbox.defaultProps = {
  className: '',
  label: null,
  size: 'large',
  checked: null,
};

export default Checkbox;
