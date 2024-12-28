/**
 * Concatenates class names into a single string.
 * @param {Array<string|boolean>} classes - Array of class names and boolean values.
 * @returns {string} The concatenated class names.
 */
function cn(classes) {
  return classes.filter(Boolean).join(' ');
}

export default cn;
