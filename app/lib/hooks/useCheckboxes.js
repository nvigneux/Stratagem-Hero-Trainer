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
   * Handle the change of a single checkbox
   * @param {string} keyValue - Key of the checkbox.
   * @param {boolean} [value] - Value to set for the checkbox.
   */
  const handleChange = (keyValue, value) => {
    setCheckboxes((prevState) => ({
      ...prevState,
      [keyValue]: value || !prevState[keyValue],
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

  // TODO handleChangeMany

  return {
    checkboxes,
    handleChange,
    checkboxesAreChecked,
    handleChangeAll,
  };
}

export default useCheckboxes;
