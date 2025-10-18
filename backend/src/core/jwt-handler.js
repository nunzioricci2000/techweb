import jwt from "jsonwebtoken";

/**
 * Secret key for signing the JWT tokens
 * @type {string}
 * @private
 */
const secret = process.env["JWT_SECRET"];

/**
 * Maximum age for the JWT tokens
 * @type {string}
 * @private
 */
const maxAge = process.env["JWT_MAX_AGE"];

/**
 * @param {string} username - The username to sign
 * @returns {string} - The signed token
 */
export function sign(username) {
  return jwt.sign({ username }, secret, { expiresIn: maxAge });
}

/**
 * @param {string} token - The token to verify
 * @returns {{username: string} | null} - The payload if valid, null otherwise
 */
export function verify(token) {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    console.debug("JWT verification failed:", e);
    return null;
  }
}

export default { sign, verify };
