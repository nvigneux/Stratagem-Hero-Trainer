// Translation helper for game data (category & stratagem names).
// next-intl's t() returns a truthy path string when a key is missing,
// so `t(key) || fallback` never works. Use t.has() to detect missing keys.

/**
 * Get the translated name for a game data item.
 * @param {import('next-intl').UseTranslations} t - The scoped translator for 'GameData'
 * @param {string} englishName - The original English name
 * @param {'categories'|'stratagems'} type - Whether it's a category or stratagem name
 * @returns {string} The translated name, or the original English name if no translation exists
 *
 * next-intl treats `.` in keys as a nesting separator, so any `.` in `englishName`
 * (e.g. "StA-X3 W.A.S.P. Launcher") is escaped to `__DOT__` before building the key.
 * The original `englishName` is returned unchanged as the fallback.
 */
export function translateGameData(t, englishName, type) {
  const escapedName = englishName.replace(/\./g, '__DOT__');
  const key = `${type}.${escapedName}`;
  return t.has(key) ? t(key) : englishName;
}

/**
 * Get translated category name.
 * @param {import('next-intl').UseTranslations} t
 * @param {string} categoryName
 * @returns {string}
 */
export function tCategory(t, categoryName) {
  return translateGameData(t, categoryName, 'categories');
}

/**
 * Get translated stratagem name.
 * @param {import('next-intl').UseTranslations} t
 * @param {string} stratagemName
 * @returns {string}
 */
export function tStratagem(t, stratagemName) {
  return translateGameData(t, stratagemName, 'stratagems');
}
