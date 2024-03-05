export const formatCurrency = (amount) => (amount / 100).toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
});

/**
 * Format a date string to a localized date string.
 * @param {string} dateStr - The date string to format.
 * @param {string} locale - The locale to use for formatting.
 * @returns {string} The localized date string.
 */
export const formatDateToLocal = (
  dateStr,
  locale = 'en-US',
) => {
  const date = new Date(dateStr);
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

/**
 * Generate the y-axis labels and the top label for the revenue chart.
 * @param {Array} revenue - The revenue data to generate the y-axis labels from.
 * @returns {Object} An object with the y-axis labels and the top label.
 */
export const generateYAxis = (revenue) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

/**
 * Generate the pagination array based on the current page and the total number of pages.
 * @param {number} currentPage - The current page.
 * @param {number} totalPages - The total number of pages.
 */
export const generatePagination = (currentPage, totalPages) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
