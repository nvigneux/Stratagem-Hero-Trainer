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

    const stratagemNames = [...stratagems].map((stratagem) => stratagem.name);

    const jsonData = JSON.stringify(stratagemNames);

    const compressedData = LZString.compressToBase64(jsonData);

    return encodeURIComponent(compressedData).replace(/%20/g, '+');
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
      const decodedString = decodeURIComponent(encodedString);

      const decompressedJson = LZString.decompressFromBase64(decodedString);

      return JSON.parse(decompressedJson) || [];
    } catch (error) {
      console.error('Error decoding stratagem names:', error);
      return [];
    }
  }

  const encode = useCallback((stratagems) => {
    const encodedStratagems = encodeStratagemCodes(stratagems);
    return encodedStratagems;
  }, []);

  const decode = useCallback((encodedString) => decodeStratagemCodes(encodedString), []);

  return {
    encode,
    decode,
  };
}
