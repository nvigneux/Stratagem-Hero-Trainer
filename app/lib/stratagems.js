/**
 * Finds the difference between two arrays based on a comparison function.
 * @param {Array} arr1 - The source array.
 * @param {Array} arr2 - The array to exclude items from.
 * @param {Function} compareFn - A function to compare two items (should return true if equal).
 * @returns {Array} Items in arr1 that are not in arr2.
 */
const findDiffArray = (arr1, arr2, compareFn) => {
  const diffFromArr1 = arr1.filter((item1) => !arr2.some((item2) => compareFn(item1, item2)));
  const diffFromArr2 = arr2.filter((item2) => !arr1.some((item1) => compareFn(item1, item2)));

  return [...diffFromArr1, ...diffFromArr2];
};

/**
 * Compares two stratagem objects by their unique identifier (e.g., `name` or `short_id`).
 * @param {object} a - The first stratagem.
 * @param {object} b - The second stratagem.
 * @returns {boolean} True if the objects are considered equal.
 */
const areStratagemsEqual = (a, b) => a.name === b.name;

export { findDiffArray, areStratagemsEqual };
