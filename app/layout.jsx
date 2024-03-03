import PropTypes from 'prop-types';
import localFont from 'next/font/local';

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
});

export const metadata = {
  title: 'Stratagem Hero Trainer - Helldivers™ 2',
  description: 'Turning Average Joes into Stratagem Superstars, Because Even Bugs Fear a Well-Placed Stratagem !',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fsSinclair.className}>{children}</body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
