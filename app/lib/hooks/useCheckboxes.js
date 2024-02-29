'use client';

import { useState } from 'react';

function useCheckboxes({ initialState, key, defaultValue }) {
  const [checkboxes, setCheckboxes] = useState(initialState.reduce((acc, item) => {
    acc[item[key]] = defaultValue;
    return acc;
  }, {}));

  const checkboxesAreChecked = Object.values(checkboxes).every((value) => value);

  /**
   * Handle the change of a single checkbox
   * @param {string} keyValue
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

  return {
    checkboxes,
    handleChange,
    checkboxesAreChecked,
    handleChangeAll,
  };
}

export default useCheckboxes;
