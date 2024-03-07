import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

// Utils
import { formatCurrency } from './utils';

/**
 * Fetches the revenue data from the database.
 * @returns {Promise<Array>} The revenue data.
 */
export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(() => resolve(), 3000));

    const data = await sql`SELECT * FROM revenue`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

/**
 * Fetches the latest invoices from the database.
 * @returns {Promise<Array>} The latest invoices.
 */
export async function fetchLatestInvoices() {
  // noStore();

  try {
    const data = await sql`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));

    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));

    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

/**
 * Fetches the card data from the database.
 * @returns {Promise<Object>} The card data.
 */
export async function fetchCardData() {
  noStore();

  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? 0);
    const numberOfCustomers = Number(data[1].rows[0].count ?? 0);
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? 0);
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? 0);

    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(() => resolve(), 1500));

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query,
  currentPage,
  sizePage,
) {
  const itemsPerPage = sizePage || ITEMS_PER_PAGE;
  const offset = (currentPage - 1) * (itemsPerPage);

  try {
    const invoices = await sql`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${itemsPerPage} OFFSET ${offset}
    `;

    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query, sizePage) {
  const itemsPerPage = sizePage || ITEMS_PER_PAGE;
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / itemsPerPage);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id) {
  noStore();

  try {
    const data = await sql`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoiceItem) => ({
      ...invoiceItem,
      // Convert amount from cents to dollars
      amount: invoiceItem.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query) {
  try {
    const data = await sql`
      SELECT
      customers.id,
      customers.name,
      customers.email,
      customers.image_url,
      COUNT(invoices.id) AS total_invoices,
      SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
      SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
      FROM customers
      LEFT JOIN invoices ON customers.id = invoices.customer_id
      WHERE
      customers.name ILIKE ${`%${query}%`} OR
            customers.email ILIKE ${`%${query}%`}
      GROUP BY customers.id, customers.name, customers.email, customers.image_url
      ORDER BY customers.name ASC
    `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

/**
 * Fetches the stratagems from the database.
 * @returns {Promise<Array>} The stratagems.
 */
export async function fetchStratagems() {
  try {
    const data = await sql`
    SELECT 
    stratagems.id,
    stratagems.code,
    stratagems.name,
    JSON_BUILD_OBJECT('id', categories.id, 'name', categories.name) AS category
    FROM 
        stratagems
    INNER JOIN 
        categories ON stratagems.category_id = categories.id;
    `;

    return data.rows.map((stratagem) => ({
      ...stratagem,
      code: JSON.parse(stratagem.code),
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stratagems.');
  }
}

/**
 * Fetches a stratagem by its ID.
 * @param {number} id The stratagem ID.
 * @returns {Promise<Object>} The stratagem.
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
 * @param {number} categoryId The category ID.
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

export async function fetchCategoryById(id) {
  console.log(id);
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
