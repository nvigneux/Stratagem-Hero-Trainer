'use client';

import { useEffect } from 'react';

/**
 * Error component
 * @param {object} props - Component properties
 * @param {Error} props.error - Error object
 * @param {Function} props.reset - Function to reset the error state
 * @returns {JSX.Element} The Error component
 */
function Error({ error, reset }) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        type="button"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm
        text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}

export default Error;
