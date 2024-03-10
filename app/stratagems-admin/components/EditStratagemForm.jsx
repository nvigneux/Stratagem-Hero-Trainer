'use client';

import PropTypes from 'prop-types';
import Link from 'next/link';

// Lib
import { updateStratagem } from '../../lib/actions';

export default function EditCategoryForm({
  stratagem,
}) {
  const updateStratagemWithId = updateStratagem.bind(null, stratagem.id);

  const code = JSON.parse(stratagem.code).join(' ');

  return (
    <form action={updateStratagemWithId}>
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
                  defaultValue={stratagem.name}
                  placeholder="Enter name"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </label>
        </div>
        {/* Code Name */}
        <div className="mb-4">
          <label htmlFor="code" className="mb-2 block text-sm font-medium">
            Choose an code
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  defaultValue={code}
                  placeholder="Enter code"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </label>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/stratagems-admin/${stratagem.category_id}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button type="submit">Edit Category</button>
      </div>
      <input type="hidden" name="category_id" value={stratagem.category_id} />
    </form>
  );
}

EditCategoryForm.propTypes = {
  stratagem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    category_id: PropTypes.string.isRequired,
  }).isRequired,
};
