'use client';

import { useState } from 'react';

/**
 * Custom hook for managing checkboxes state.
 * @param {object} params - Parameters.
 * @param {Array} params.initialState - Initial state of the checkboxes.
 * @param {string} params.key - Key to identify each checkbox.
 * @param {boolean} params.defaultValue - Default value for the checkboxes.
 * @returns {object} Checkboxes state and control functions.
 */
function useCheckboxes({ initialState, key, defaultValue }) {
  const [checkboxes, setCheckboxes] = useState(initialState.reduce((acc, item) => {
    acc[item[key]] = defaultValue;
    return acc;
  }, {}));

  const checkboxesAreChecked = Object.values(checkboxes).every((value) => value);

  /**
   * Handle the change of multiple checkboxes
   * @param {{[key: string]: boolean}} keyValues - Key-value pairs to update
   */
  const handleChange = (keyValues) => {
    setCheckboxes((prevState) => ({
      ...prevState,
      ...Object.keys(keyValues).reduce((
        acc,
        name,
      ) => {
        acc[name] = keyValues[name] !== undefined ? keyValues[name] : !prevState[name];
        return acc;
      }, {}),
    }));
  };

  /**
   * Handle the change of all checkboxes
   */
  const handleChangeAll = () => {
    setCheckboxes((prevState) => {
      const newState = {};
      Object.keys(prevState).forEach((keyValue) => {
        newState[keyValue] = !checkboxesAreChecked;
      });
      return newState;
    });
  };

  return {
    checkboxes,
    handleChange,
    checkboxesAreChecked,
    handleChangeAll,
  };
}

export default useCheckboxes;
