'use client';

import { useState } from 'react';

/**
 * Get the highest order found in checkboxes
 * @param {{ [key: string]: { value: boolean, order: number } }} checkboxes - Checkboxes object
 * @returns {number} The maximum order found
 */
function getMaxOrderFromCheckboxes(checkboxes) {
  const orderedCheckboxes = Math.max(0, ...Object.values(checkboxes)
    .map((checkbox) => checkbox.order)
    .sort((a, b) => b - a));

  return orderedCheckboxes;
}

/**
 * Custom hook for managing checkboxes state.
 * @param {object} params - Parameters.
 * @param {Array} params.initialState - Initial state of the checkboxes.
 * @param {string} params.key - Key to identify each checkbox.
 * @param {boolean} params.defaultValue - Default value for the checkboxes.
 * @returns {object} Checkboxes state and control functions.
 */
function useCheckboxes({ initialState, key, defaultValue }) {
  /** @type {[{ [key: string]: { value: boolean, order: number } }, React.Dispatch<React.SetStateAction<{ [key: string]: { value: boolean, order: number } }>>]} */
  const [
    checkboxes,
    setCheckboxes,
  ] = useState(initialState.reduce((acc, item) => {
    acc[item[key]] = { value: defaultValue, order: 0 };
    return acc;
  }, {}));

  const checkboxesAreChecked = Object.values(checkboxes).every((value) => value.value);

  /**
   * Handle the change of multiple checkboxes
   * @param {{[key: string]: { value: boolean, order: number }}} keyValues - Key-value pairs to update
   */
  const handleChange = (keyValues) => {
    const maxOrderFound = getMaxOrderFromCheckboxes(checkboxes);
    const lastOrder = maxOrderFound + 1;

    setCheckboxes((prevState) => ({
      ...prevState,
      ...Object.keys(keyValues).reduce((
        acc,
        name,
      ) => {
        acc[name] = keyValues[name] !== undefined
          ? keyValues[name]
          : {
            value: !prevState[name].value,
            order: lastOrder,
          };
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
        newState[keyValue] = {
          value: !checkboxesAreChecked,
          order: 0,
        };
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
