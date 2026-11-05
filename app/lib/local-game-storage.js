/**
 * Keep the game playable when browser storage is unavailable.
 * @param {string} key - Storage key.
 * @param {*} value - Saved value.
 */
export function saveLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Game progress could not be saved locally:', error);
  }
}

/**
 * Read local data, migrating the current browser's cookies when needed.
 * @param {string} key - Storage key.
 * @param {*} fallback - Legacy value.
 * @returns {*} Saved value.
 */
export function readLocal(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    const cookie = document.cookie.split('; ').find((entry) => entry.startsWith(`${key}=`));
    const value = JSON.parse(stored ?? (cookie && decodeURIComponent(cookie.slice(key.length + 1))))
      ?? fallback;
    if (stored === null) saveLocal(key, value);
    return value;
  } catch {
    return fallback;
  }
}
