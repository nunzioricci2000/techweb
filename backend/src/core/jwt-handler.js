import jwt from "jsonwebtoken";
import { logger } from "./logger.js";

logger.debug("Loading JWT Handler");

/**
 * Secret key for signing the JWT tokens
 * @type {string}
 * @private
 */
const secret = process.env["JWT_SECRET"];
logger.debug("Using JWT secret from environment:", secret);

/**
 * Maximum age for the JWT tokens
 * @type {string}
 * @private
 */
const maxAge = process.env["JWT_MAX_AGE"];
logger.debug("Using JWT max age from environment:", maxAge);

/**
 * @param {string} username - The username to sign
 * @returns {string} - The signed token
 */
export function sign(username) {
  logger.debug(`Signing JWT for username: ${username}`);
  const result = jwt.sign({ username }, secret, { expiresIn: maxAge });
  logger.debug(`Signed JWT for username: ${username} -> ${result}`);
  return result;
}

/**
 * @param {string} token - The token to verify
 * @returns {{username: string} | null} - The payload if valid, null otherwise
 */
export function verify(token) {
  try {
    logger.debug(`Verifying JWT token: ${token}`);
    const result = jwt.verify(token, secret);
    logger.debug(`Verified JWT token: ${token} -> ${JSON.stringify(result)}`);
    return result;
  } catch (e) {
    logger.debug("JWT verification failed:", e);
    return null;
  }
}

export default { sign, verify };

logger.debug("JWT Handler loaded");
