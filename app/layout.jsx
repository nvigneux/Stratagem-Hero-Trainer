import localFont from 'next/font/local';
// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/next';

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

export const metadata = {
  title: 'Stratagem Hero Trainer - Helldivers',
  // eslint-disable-next-line max-len
  description: 'Turning Average Joes into Stratagem Superstars, Because Even Bugs Fear a Well-Placed Stratagem!',
};

/**
 * RootLayout component
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The RootLayout component
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fsSinclair.className} ${fsSinclair.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
