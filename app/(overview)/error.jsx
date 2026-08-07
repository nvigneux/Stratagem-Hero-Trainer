'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

/**
 * Error component
 * @param {object} props - Component properties
 * @param {Error} props.error - Error object
 * @param {Function} props.reset - Function to reset the error state
 * @returns {JSX.Element} The Error component
 */
function Error({ error, reset }) {
  const t = useTranslations('ErrorPage');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">{t('title')}</h2>
      <button
        type="button"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm
        text-white transition-colors hover:bg-blue-400"
        onClick={() => reset()}
      >
        {t('tryAgain')}
      </button>
    </main>
  );
}

export default Error;
