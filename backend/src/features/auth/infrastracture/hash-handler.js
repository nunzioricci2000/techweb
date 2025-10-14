import bcrypt from "bcrypt";

/**
 * Number of salt rounds for bcrypt
 * @type {number}
 * @private
 */
const saltRounds = Number(process.env["SALT_ROUNDS"] ?? 10);

/**
 * Creates a hash of the given string
 * @param {string} string - The string to hash
 * @returns {string} - The hashed string
 */
export function hash(string) {
  bcrypt.hashSync(string, saltRounds);
}

/**
 * Compares a string with a hash
 * @param {string} string - The string to compare
 * @param {string} hash - The hash to compare against
 * @returns {boolean} - True if the string matches the hash, false otherwise
 */
export function compare(string, hash) {
  bcrypt.compareSync(string, hash);
}

export default { hash, compare };
