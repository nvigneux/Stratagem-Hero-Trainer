'use client';

import PropTypes from 'prop-types';
import Link from 'next/link';

// Lib
import { updateCategory } from '../../lib/actions';

export default function EditCategoryForm({
  category,
}) {
  const updateCategoryWithId = updateCategory.bind(null, category.id);

  return (
    <form action={updateCategoryWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Category Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Choose an name
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  defaultValue={category.name}
                  placeholder="Enter name"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </label>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/stratagems-admin/${category.id}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button type="submit">Edit Category</button>
      </div>
    </form>
  );
}

EditCategoryForm.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.number.isRequired,
  }).isRequired,
};
