import localFont from 'next/font/local';
// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/next';
import { NextIntlClientProvider } from 'next-intl';
// eslint-disable-next-line import/no-unresolved
import { getMessages, getLocale, getTranslations } from 'next-intl/server';

import './globals.css';

const fsSinclair = localFont({
  src: [
    {
      path: '../public/fonts/FS Sinclair Regular.woff2',
      weight: '400',
    },
    {
      path: '../public/fonts/FS Sinclair Medium.woff2',
      weight: '500',
    },
    {
      path: '../public/fonts/FS Sinclair Bold.woff2',
      weight: '700',
    },
  ],
  display: 'swap',
  variable: '--font-fs-sinclair',
});

/**
 * Generates metadata for the root layout.
 * @returns {Promise<{title: string, description: string}>} Metadata object
 */
export async function generateMetadata() {
  const t = await getTranslations('Metadata');
  return {
    title: t('title'),
    description: t('description'),
  };
}

/**
 * RootLayout component
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {Promise<JSX.Element>} The RootLayout component
 */
export default async function RootLayout({ children }) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${fsSinclair.className} ${fsSinclair.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
