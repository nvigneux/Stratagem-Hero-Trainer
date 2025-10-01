/**
 * Direct mapping of hex colors found in SVG files to application themes
 */
const COLOR_HEX_TO_THEME = {
  '#c9b269': 'yellow',
  '#de7b6c': 'red',
  '#679552': 'green',
  '#49adc9': 'blue',
  '#fff': '',
  '#ffffff': '',
  '#000': '',
  '#000000': '',
};

/**
 * Extracts unique hex colors from SVG content
 * @param {string} svgContent - The SVG file content
 * @returns {string[]} Array of unique hex colors found
 */
const extractHexColors = (svgContent) => {
  const hexRegex = /#[0-9a-fA-F]{3,6}/g;
  const matches = [...svgContent.matchAll(hexRegex)];
  const uniqueColors = new Set();

  matches.forEach((match) => {
    uniqueColors.add(match[0].toLowerCase());
  });

  return Array.from(uniqueColors);
};

/**
 * Determines theme color from a list of hex colors
 * @param {string[]} hexColors - Array of hex colors
 * @returns {string} Theme color ('red', 'yellow', 'green', 'blue') or empty string
 */
const mapColorsToTheme = (hexColors) => {
  const foundColor = hexColors.find((color) => {
    const theme = COLOR_HEX_TO_THEME[color];
    return theme && theme !== '';
  });
  return foundColor ? COLOR_HEX_TO_THEME[foundColor] : '';
};

/**
 * Analyzes SVG content and returns its theme color
 * @param {string} svgContent - The SVG content string
 * @returns {string} Theme color or empty string if none found
 */
const getSVGThemeColor = (svgContent) => {
  try {
    const hexColors = extractHexColors(svgContent);
    return mapColorsToTheme(hexColors);
  } catch (error) {
    return '';
  }
};

export {
  extractHexColors,
  getSVGThemeColor,
  COLOR_HEX_TO_THEME,
};
