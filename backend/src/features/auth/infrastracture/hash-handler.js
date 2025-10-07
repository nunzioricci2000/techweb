export default function HashHandler() {
  return {
    hash: (string) => string,
    compare: (string, hash) => string === hash,
  };
}

/**
 * @typedef {object} HashHandler
 * @property {HashHandler.hash} hash - Hashes a string
 * @property {HashHandler.compare} compare - Compares a string with a hash
 */

/**
 * @callback HashHandler.hash
 * @param {string} string - The string to hash
 * @returns {string} - The hashed string
 */

/**
 * @callback HashHandler.compare
 * @param {string} string - The string to compare
 * @param {string} hash - The hash to compare against
 * @returns {boolean} - True if the string matches the hash, false otherwise
 */
