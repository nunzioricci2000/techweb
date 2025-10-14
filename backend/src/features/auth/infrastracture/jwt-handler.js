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
  jwt.sign({ username }, secret, { expiresIn: maxAge });
}

/**
 * @param {string} token - The token to verify
 * @returns {{username: string} | null} - The payload if valid, null otherwise
 */
export function verify(token) {
  jwt.verify(token, secret);
}

export default { sign, verify };
