import bcrypt from "bcrypt";

console.debug("Loading Hash Handler");

/**
 * Number of salt rounds for bcrypt
 * @type {number}
 * @private
 */
const saltRounds = Number(process.env["SALT_ROUNDS"] ?? 10);
console.debug(`Using salt rounds: ${saltRounds}`);

/**
 * Creates a hash of the given string
 * @param {string} string - The string to hash
 * @returns {string} - The hashed string
 */
export function hash(string) {
  console.debug(`Hashing string: ${string}`);
  const result = bcrypt.hashSync(string, saltRounds);
  console.debug(`Hashed string: ${string} -> ${result}`);
  return result;
}

/**
 * Compares a string with a hash
 * @param {string} string - The string to compare
 * @param {string} hash - The hash to compare against
 * @returns {boolean} - True if the string matches the hash, false otherwise
 */
export function compare(string, hash) {
  console.debug(`Comparing string with hash: ${string} & ${hash}`);
  const result = bcrypt.compareSync(string, hash);
  console.debug(`Compared string with hash: ${string} & ${hash} -> ${result}`);
  return result;
}

export default { hash, compare };

console.debug("Hash Handler loaded");
