/* eslint-disable quote-props */
import React from 'react';

// Assets
import ArrowIcon from '../../../../../public/icons/arrow.svg';
import SettingsIcon from '../../../../../public/icons/settings.svg';
import CloseIcon from '../../../../../public/icons/close.svg';
import HistoryIcon from '../../../../../public/icons/history.svg';
import CoffeeIcon from '../../../../../public/assets/bmec_logo.svg';
import KeypadIcon from '../../../../../public/assets/keypad_icon.svg';
import DpadIcon from '../../../../../public/assets/dpad_icon.svg';

export const availablePictos = {
  // Arrow
  'arrow': ArrowIcon,
  // Settings
  'settings': SettingsIcon,
  // Close
  'close': CloseIcon,
  // History
  'history': HistoryIcon,
  // Coffee
  'coffee': CoffeeIcon,
  // Keypad
  'keypad': KeypadIcon,
  // D-pad
  'dpad': DpadIcon,
};

/**
 * Picto component
 * @param {object} props - Component props
 * @param {string} props.icon - Icon name
 * @returns {React.Element|null} The icon component or null if not found
 */
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
