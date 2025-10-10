import jwt from "jsonwebtoken";
import { expiresIn, secret } from "../../../config/jwt-config.js";
/**
 * @returns {JwtHandler}
 */
export default function JwtHandler() {
  return {
    sign: (username) => jwt.sign({ username }, secret, { expiresIn }),
    verify: (token) => jwt.verify(token, secret),
  }
}

/**
 * @typedef {object} JwtHandler
 * @property {JwtHandler.sign} sign - Signs a username into a token
 * @property {JwtHandler.verify} verify - Verifies a token and returns the payload or null if invalid
 */

/**
 * @callback JwtHandler.sign
 * @param {string} username - The username to sign
 * @returns {string} - The signed token
 */

/**
 * @callback JwtHandler.verify
 * @param {string} token - The token to verify
 * @returns {{username: string} | null} - The payload if valid, null otherwise
 */
