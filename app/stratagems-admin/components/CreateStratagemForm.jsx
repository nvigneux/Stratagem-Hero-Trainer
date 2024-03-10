'use client';

import PropTypes from 'prop-types';

import Link from 'next/link';
import { useFormState } from 'react-dom';

// Lib
import { createStratagem } from '../../lib/actions';

export default function Form({ categoryId }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createStratagem, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Category Categories */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Choose an name
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  required
                />
              </div>
            </div>
          </label>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name && state.errors.name.map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        {/* Category Categories */}
        <div className="mb-4">
          <label htmlFor="code" className="mb-2 block text-sm font-medium">
            Choose a code
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="code"
                  name="code"
                  type="text"
                  placeholder="Enter name"
                  required
                />
              </div>
            </div>
          </label>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.code && state.errors.code.map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/strateagems-admin"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button type="submit">Create Category</button>
      </div>

      <input type="hidden" name="category_id" value={categoryId} />
    </form>
  );
}

Form.propTypes = {
  categoryId: PropTypes.string.isRequired,
};
