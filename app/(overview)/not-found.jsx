import Link from 'next/link';
// eslint-disable-next-line import/no-unresolved
import { getTranslations } from 'next-intl/server';

/**
 * NotFound component
 * @returns {Promise<JSX.Element>} The NotFound component
 */
export default async function NotFound() {
  const t = await getTranslations('NotFoundPage');

  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">{t('title')}</h2>
      <p>{t('description')}</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm
        text-white transition-colors hover:bg-blue-400"
      >
        {t('goBack')}
      </Link>
    </main>
  );
}
