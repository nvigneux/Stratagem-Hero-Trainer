/* eslint-disable camelcase */
/* eslint-disable consistent-return */

'use server';

import z from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { setCookie } from 'cookies-next';

// Constants
import { COOKIE_BEST_SCORE, COOKIE_SETTINGS } from './constants';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

/**
 * @description Create a new invoice
 * @param {FormData} formData
 * @returns {Promise<void>}
 */
export async function createInvoice(prevState, formData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Failed to create invoice',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

/**
 * @description Update an invoice
 * @param {string} id
 * @param {FormData} formData
 * @returns {Promise<void>}
 */
export async function updateInvoice(id, formData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: 'Failed to update invoice',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

/**
 * @description Delete an invoice
 * @param {string} id
 */
export async function deleteInvoice(id) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

/**
 * @description Set the best score in a cookie
 * @param {number} bestScore
 */
export async function setCookieBestScore(bestScore) {
  setCookie(COOKIE_BEST_SCORE, `${bestScore}`, { cookies, maxAge: 60 * 60 * 24 * 365 });
}

/**
 * @description Set the cookie settings
 * @param {Object} value
 * @param {boolean} value.timerDuration
 * @param {boolean} value.keyBindings
 */
export async function setCookieSettings(value) {
  setCookie(COOKIE_SETTINGS, JSON.stringify(value), { cookies, maxAge: 60 * 60 * 24 * 365 });
}

// POKEMON
export const revalidateByTag = async (tags) => {
  revalidateTag(tags);
};

/**
 * CATEGORIES
 */

// name required with zod
const FormCategorySchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter a category name.',
  }),
});
const CreateCategory = FormCategorySchema.omit({ id: true, date: true });
const UpdateCategory = FormCategorySchema.omit({ id: true, date: true });

export async function createCategory(prevState, formData) {
  const validatedFields = CreateCategory.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Category.',
    };
  }

  const { name } = validatedFields.data;

  try {
    await sql`
      INSERT INTO categories (name)
      VALUES (${name})
    `;
  } catch (error) {
    return {
      message: 'Failed to create category',
    };
  }

  revalidatePath('/stratagems-admin');
  redirect('/stratagems-admin');
}

/**
 * @description Update an invoice
 * @param {string} id
 * @param {FormData} formData
 * @returns {Promise<void>}
 */
export async function updateCategory(id, formData) {
  const { name } = UpdateCategory.parse({
    name: formData.get('name'),
  });

  try {
    await sql`
    UPDATE categories
    SET name = ${name}
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: 'Failed to update invoice',
    };
  }

  revalidatePath('/stratagems-admin');
  redirect('/stratagems-admin');
}

/**
 * @description Delete an invoice
 * @param {string} id
 */
export async function deleteCategory(id) {
  console.log(id);
  try {
    await sql`DELETE FROM categories WHERE id = ${id}`;
    revalidatePath('/stratagems-admin');
    return { message: 'Deleted Category' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Category.' };
  }
}

/**
 * STRATAGEMS
 */

// TODO add an order to the stratagems to sort them by order in the category

// name required with zod
const FormStratagemSchema = z.object({
  id: z.string(),
  name: z.string({ required_error: 'Please enter a stratagem name.' }).min(1, { message: 'Please enter a stratagem name.' }),
  code: z.string({ required_error: 'Please enter a stratagem code.' }).min(1, { message: 'Please enter a stratagem name.' }),
  category_id: z.string({ required_error: 'Please select a category.' }).min(1, { message: 'Please enter a stratagem name.' }),
});
const CreateStratagem = FormStratagemSchema.omit({ id: true, date: true });
const UpdateStratagem = FormStratagemSchema.omit({ id: true, date: true });

export async function createStratagem(prevState, formData) {
  const validatedFields = CreateStratagem.safeParse({
    name: formData.get('name'),
    code: formData.get('code'),
    category_id: formData.get('category_id'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Stratagem.',
    };
  }

  const { name, code, category_id } = validatedFields.data;

  const codeArray = code.split(' ');

  try {
    await sql`
      INSERT INTO stratagems (name, code, category_id)
      VALUES (${name}, ${JSON.stringify(codeArray)}, ${category_id})
    `;
  } catch (error) {
    return {
      message: `Failed to create stratagem ${name} ${JSON.stringify(codeArray)} ${category_id}`,
    };
  }

  revalidatePath(`/stratagems-admin/${category_id}`);
  redirect(`/stratagems-admin/${category_id}`);
}

/**
 * @description Update a stratagem
 * @param {string} id
 * @param {FormData} formData
 * @returns {Promise<void>}
 */
export async function updateStratagem(id, formData) {
  const { name, code, category_id } = UpdateStratagem.parse({
    name: formData.get('name'),
    code: formData.get('code'),
    category_id: formData.get('category_id'),
  });

  const codeArray = code.split(' ');

  try {
    await sql`
    UPDATE stratagems
    SET name = ${name}, code = ${JSON.stringify(codeArray)}
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: 'Failed to update stratagem',
    };
  }

  revalidatePath(`/stratagems-admin/${category_id}`);
  revalidatePath(`/stratagems-admin/${category_id}/${id}`);
  redirect(`/stratagems-admin/${category_id}`);
}

/**
 * @description Delete a stratagem
 * @param {string} id
 */
export async function deleteStratagem(id, formData) {
  const categoryId = formData.get('category_id');
  try {
    await sql`DELETE FROM stratagems WHERE id = ${id}`;
    revalidatePath(`/stratagems-admin/${categoryId}`);
    return { message: 'Deleted Stratagem' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Stratagem.' };
  }
}
