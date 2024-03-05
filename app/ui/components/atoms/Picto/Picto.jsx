/* eslint-disable quote-props */
import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

// TODO : Remove dynamic import
export const availablePictos = {
  // Arrow
  'arrow': dynamic(() => import('../../../../../public/icons/arrow.svg')),
  // Settings
  'settings': dynamic(() => import('../../../../../public/icons/settings.svg')),
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
