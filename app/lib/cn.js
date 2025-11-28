/**
 * Concatenates class names into a single string.
 * @param {Array<string|boolean>} classNames - Array of class names and boolean values.
 * @returns {string} The concatenated class names.
 */
function cn(classNames) {
  return classNames.filter(Boolean).join(' ');
}

export default cn;
