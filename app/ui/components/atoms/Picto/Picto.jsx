/* eslint-disable quote-props */
import React from 'react';
import PropTypes from 'prop-types';

import ArrowIcon from '../../../../../public/icons/arrow.svg';
import SettingsIcon from '../../../../../public/icons/settings.svg';
import CoffeeIcon from '../../../../../public/assets/bmec_logo.svg';

export const availablePictos = {
  // Arrow
  'arrow': ArrowIcon,
  // Settings
  'settings': SettingsIcon,
  // Coffee
  'coffee': CoffeeIcon,
};

export function Picto({ icon, ...props }) {
  if (availablePictos[icon]) {
    try {
      const IconComponent = availablePictos[icon];
      return IconComponent ? React.createElement(IconComponent, props) : null;
    } catch (error) {
      console.log(`"${icon}":`, error);
    }
  }

  return null;
}

Picto.propTypes = {
  icon: PropTypes.oneOf(Object.keys(availablePictos)).isRequired,
};
