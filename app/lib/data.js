import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

import { STRATAGEMS, CATEGORIES } from './placeholder-data-helldivers';

const ITEMS_PER_PAGE = 6;

/**
 * Fetches the stratagems from the database.
 * @returns {Promise<Array>} The stratagems.
 */
export async function fetchStratagems() {
  return STRATAGEMS.reduce((acc, stratagem) => {
    const category = CATEGORIES.find((c) => c.id === stratagem.category_id);
    acc.push({
      ...stratagem,
      category,
    });
    return acc;
  }, []);
}

/**
 * Fetches a stratagem by its ID.
 * @param {number} id - The stratagem ID.
 * @returns {Promise<object>} The stratagem.
 */
export async function fetchStratagemById(id) {
  try {
    const data = await sql`
      SELECT * FROM stratagems WHERE id = ${id}
    `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stratagem.');
  }
}

/**
 * Fetches the stratagems by category from the database.
 * @param {number} categoryId - The category ID.
 * @returns {Promise<Array>} The stratagems.
 */
export async function fetchStratagemByCategory(categoryId) {
  try {
    const data = await sql`
      SELECT * FROM stratagems WHERE category_id = ${categoryId}
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stratagem.');
  }
}

/**
 * Fetches filtered categories from the database.
 * @param {string} query - The search query.
 * @param {number} currentPage - The current page number.
 * @param {number} sizePage - The number of items per page.
 * @returns {Promise<Array>} The filtered categories.
 */
export async function fetchFilteredCategories(
  query,
  currentPage,
  sizePage,
) {
  const itemsPerPage = sizePage || ITEMS_PER_PAGE;
  const offset = (currentPage - 1) * (itemsPerPage);

  try {
    const categories = await sql`
      SELECT
        categories.id,
        categories.name
      FROM categories
      WHERE
      categories.name ILIKE ${`%${query}%`}
      LIMIT ${itemsPerPage} OFFSET ${offset}
    `;

    return categories.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories.');
  }
}

/**
 * Fetches the total number of pages for the filtered categories.
 * @param {string} query - The search query.
 * @param {number} sizePage - The number of items per page.
 * @returns {Promise<number>} The total number of pages.
 */
export async function fetchCategoriesPages(query, sizePage) {
  const itemsPerPage = sizePage || ITEMS_PER_PAGE;
  try {
    const count = await sql`
    SELECT COUNT(*)
    FROM categories
    WHERE categories.name::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / itemsPerPage);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of categories.');
  }
}

/**
 * Fetches a category by its ID.
 * @param {number} id - The category ID.
 * @returns {Promise<object>} The category.
 */
export async function fetchCategoryById(id) {
  // noStore is used to prevent the response from being cached.
  noStore();

  try {
    const data = await sql`
      SELECT
        categories.id,
        categories.name
      FROM categories
      WHERE categories.id = ${id};
    `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch category.');
  }
}
