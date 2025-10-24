import jwt from "jsonwebtoken";

console.debug("Loading JWT Handler");

/**
 * Secret key for signing the JWT tokens
 * @type {string}
 * @private
 */
const secret = process.env["JWT_SECRET"];
console.debug("Using JWT secret from environment:", secret);

/**
 * Maximum age for the JWT tokens
 * @type {string}
 * @private
 */
const maxAge = process.env["JWT_MAX_AGE"];
console.debug("Using JWT max age from environment:", maxAge);

/**
 * @param {string} username - The username to sign
 * @returns {string} - The signed token
 */
export function sign(username) {
  console.debug(`Signing JWT for username: ${username}`);
  const result = jwt.sign({ username }, secret, { expiresIn: maxAge });
  console.debug(`Signed JWT for username: ${username} -> ${result}`);
  return result;
}

/**
 * @param {string} token - The token to verify
 * @returns {{username: string} | null} - The payload if valid, null otherwise
 */
export function verify(token) {
  try {
    console.debug(`Verifying JWT token: ${token}`);
    const result = jwt.verify(token, secret);
    console.debug(`Verified JWT token: ${token} -> ${JSON.stringify(result)}`);
    return result;
  } catch (e) {
    console.debug("JWT verification failed:", e);
    return null;
  }
}

export default { sign, verify };

console.debug("JWT Handler loaded");
