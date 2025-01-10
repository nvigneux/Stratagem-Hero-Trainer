import { useCallback } from 'react';
import LZString from 'lz-string';

/**
 * Custom React hook to encode and decode stratagem codes.
 * @returns {{ encode: (stratagems: Array) => string,
 * decode: (encodedString: string) => Array<string>
 * }}
 */
export function useEncodeStratagems() {
  /**
   * Encodes an array of Stratagem objects into a compressed & base64-encoded string (safe for URLs).
   * @param {Array} stratagems - Array of stratagem objects
   * @returns {string} A URI-encoded string that represents the compressed stratagem names
   */
  function encodeStratagemCodes(stratagems) {
    if (!stratagems || !stratagems.length) {
      return '';
    }

    const names = [...stratagems].map((s) => s.name);

    const jsonData = JSON.stringify(names);

    const compressed = LZString.compressToBase64(jsonData);

    return encodeURIComponent(compressed).replace(/%20/g, '+');
  }

  /**
   * Decodes and decompresses a URI-encoded string back into an array of Stratagem codes.
   * @param {string} encodedString - The encoded and compressed string from the URL
   * @returns {Array<string>} An array of stratagem codes
   */
  function decodeStratagemCodes(encodedString) {
    if (!encodedString) {
      return [];
    }

    try {
      const decoded = decodeURIComponent(encodedString);

      const jsonData = LZString.decompressFromBase64(decoded);

      return JSON.parse(jsonData) || [];
    } catch (e) {
      console.error('Error decoding stratagem names:', e);
      return [];
    }
  }

  const encode = useCallback((stratagems) => {
    const encoded = encodeStratagemCodes(stratagems);
    return encoded;
  }, []);

  const decode = useCallback((encodedString) => decodeStratagemCodes(encodedString), []);

  return {
    encode,
    decode,
  };
}
