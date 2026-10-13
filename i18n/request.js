// eslint-disable-next-line import/no-unresolved
import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { readdirSync } from 'node:fs';
import { join, basename, extname } from 'node:path';

const DEFAULT_LOCALE = 'en';
const MESSAGES_DIR = join(process.cwd(), 'messages');

/**
 * Locales supported by this app, discovered by scanning messages/*.json.
 * Add a new `<locale>.json` file to support a new language.
 */
const SUPPORTED_LOCALES = readdirSync(MESSAGES_DIR)
  .filter((file) => extname(file) === '.json')
  .map((file) => basename(file, '.json'));

/**
 * Pick the best supported locale from an Accept-Language header, honoring
 * q-values. Examples:
 *   "en-US;q=0.9, jp;q=0.1" -> "en"
 *   "jp-CN,jp;q=0.9,en;q=0.8" -> "jp"
 *   "fr-FR" -> "en" (fallback)
 * @param {string} header - Raw Accept-Language header value
 * @returns {string} The best supported locale, or DEFAULT_LOCALE
 */
function pickLocale(header) {
  const parsed = header
    .split(',')
    .map((entry) => {
      const [tag, ...params] = entry.trim().split(';');
      const qParam = params.find((p) => p.trim().startsWith('q='));
      const q = qParam ? parseFloat(qParam.split('=')[1]) : 1;
      const locale = tag.trim().split('-')[0].toLowerCase();
      return { locale, q: Number.isNaN(q) ? 0 : q };
    })
    .filter(({ locale, q }) => locale && q > 0)
    .sort((a, b) => b.q - a.q);

  const match = parsed.find(({ locale }) => SUPPORTED_LOCALES.includes(locale));
  return match ? match.locale : DEFAULT_LOCALE;
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;

  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    return {
      locale: cookieLocale,
      messages: (await import(`../messages/${cookieLocale}.json`)).default,
    };
  }

  const headersList = await headers();
  const acceptLanguage = headersList.get('Accept-Language') || DEFAULT_LOCALE;
  const locale = pickLocale(acceptLanguage);

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
