/**
 * @returns {JwtHandler}
 */
export default function JwtHandler() {
  return {
    sign: (username) => `token-for-${username}`,
    verify: (token) =>
      token.startsWith("token-for-")
        ? { username: token.replace("token-for-", "") }
        : null,
  };
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
