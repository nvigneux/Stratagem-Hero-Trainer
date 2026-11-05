'use client';

import { useEffect } from 'react';

/**
 * Register the offline worker in production after the page has loaded.
 * @returns {null} No visible UI.
 */
export default function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.error('Service worker registration failed:', error);
      });
    }
  }, []);
  return null;
}
