'use client';

import { useState } from 'react';

/**
 * Get the highest order found in checkboxes
 * @param {{ [key: string]: { value: boolean, order: number } }} checkboxesState - Checkboxes state object
 * @returns {number} The maximum order found
 */
function getMaxOrderFromCheckboxes(checkboxesState) {
  const maxOrder = Math.max(0, ...Object.values(checkboxesState)
    .map((checkbox) => checkbox.order)
    .sort((a, b) => b - a));

  return maxOrder;
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
    checkboxesState,
    setCheckboxesState,
  ] = useState(initialState.reduce((acc, item) => {
    acc[item[key]] = { value: defaultValue, order: 0 };
    return acc;
  }, {}));

  const allCheckboxesAreChecked = Object.values(checkboxesState).every((value) => value.value);

  /**
   * Handle the change of multiple checkboxes
   * @param {{[key: string]: { value: boolean, order: number }}} keyValues - Key-value pairs to update
   */
  const handleCheckboxChange = (keyValues) => {
    const maxOrderFound = getMaxOrderFromCheckboxes(checkboxesState);
    const nextOrder = maxOrderFound + 1;

    setCheckboxesState((prevState) => ({
      ...prevState,
      ...Object.keys(keyValues).reduce((
        acc,
        name,
      ) => {
        acc[name] = keyValues[name] !== undefined
          ? keyValues[name]
          : {
            value: !prevState[name].value,
            order: nextOrder,
          };
        return acc;
      }, {}),
    }));
  };

  /**
   * Handle the change of all checkboxes
   */
  const handleChangeAll = () => {
    setCheckboxesState((prevState) => {
      const newState = {};
      Object.keys(prevState).forEach((keyValue) => {
        newState[keyValue] = {
          value: !allCheckboxesAreChecked,
          order: 0,
        };
      });
      return newState;
    });
  };

  return {
    checkboxes: checkboxesState,
    handleChange: handleCheckboxChange,
    checkboxesAreChecked: allCheckboxesAreChecked,
    handleChangeAll,
  };
}

export default useCheckboxes;
