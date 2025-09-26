import { useMemo, useState } from 'react';

/**
 * Check if a stratagem matches the search term
 * @param {object} stratagem - The stratagem to check
 * @param {string} searchTerm - The search term (can contain multiple words separated by spaces)
 * @returns {boolean} True if stratagem matches any of the search terms (OR logic)
 */
const matchesSearchTerm = (stratagem, searchTerm) => {
  if (!searchTerm.trim()) return true;

  const searchTerms = searchTerm.toLowerCase().split(' ').filter((term) => term.trim());
  const stratagemName = stratagem.name.toLowerCase();
  const categoryName = stratagem.category.name.toLowerCase();
  const searchableText = `${stratagemName} ${categoryName}`;

  return searchTerms.some((term) => searchableText.includes(term));
};

/**
 * Filter stratagems by search term
 * @param {Array} stratagems - Array of stratagems to filter
 * @param {string} searchTerm - The search term
 * @returns {Array} Filtered stratagems
 */
const filterStratagemsBySearchTerm = (stratagems, searchTerm) => stratagems.filter(
  (stratagem) => matchesSearchTerm(stratagem, searchTerm),
);

/**
 * Filter all stratagems by categories using search term
 * @param {object} stratagemsByCategories - Stratagems grouped by categories
 * @param {string} searchTerm - The search term
 * @returns {object} Filtered stratagems by categories
 */
const filterStratagemsByCategories = (stratagemsByCategories, searchTerm) => Object.entries(
  stratagemsByCategories,
)
  .reduce((acc, [category, stratagems]) => ({
    ...acc,
    [category]: filterStratagemsBySearchTerm(stratagems, searchTerm),
  }), {});

/**
 * Check if there are no search results
 * @param {object} filteredStratagems - Filtered stratagems by categories
 * @returns {boolean} True if no search results found
 */
const hasNoSearchResults = (filteredStratagems) => Object.values(filteredStratagems).every(
  (stratagemsByCategory) => stratagemsByCategory.length === 0,
);

/**
 * Custom React hook to filter stratagems by search term.
 * @param {object} params - Parameters.
 * @param {object} params.stratagems - Stratagems grouped by categories
 * @returns {{
 *   filteredStratagems: object,
 *   noSearchResults: boolean,
 * }} Filtered stratagems and no search results
 */
export default function useSearchStratagems({ stratagems }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStratagems = useMemo(
    () => filterStratagemsByCategories(stratagems, searchTerm),
    [stratagems, searchTerm],
  );

  const noSearchResults = useMemo(
    () => hasNoSearchResults(filteredStratagems),
    [filteredStratagems],
  );

  return {
    filteredStratagems,
    noSearchResults,
    searchTerm,
    setSearchTerm,
  };
}
