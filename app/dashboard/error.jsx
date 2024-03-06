'use client';

import PropTypes from 'prop-types';
import { useEffect } from 'react';

function Error({ error, reset }) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main>
      <h2>Something went wrong!</h2>
      <button
        type="button"
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}

Error.propTypes = {
  error: PropTypes.shape({}).isRequired,
  reset: PropTypes.func.isRequired,
};

export default Error;
