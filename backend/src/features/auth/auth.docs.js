/**
 * @fileoverview Authentication module documentation
 * @module Auth
 */

/**
 * User object structure
 * @typedef {object} User
 * @property {number} id - Unique user identifier
 * @property {string} username - User's username (unique)
 * @property {string} password - User's hashed password
 */

/**
 * AuthData object structure
 * @typedef {object} AuthData
 * @property {string} username - User's username (unique)
 * @property {string} password - User's hashed password
 */

/**
 * @namespace AuthAPI
 * @description REST API endpoints for authentication
 */

/**
 * @memberof AuthAPI
 * @name POST /auth/login
 * @description User login endpoint
 * @param {AuthData} credentials - User login credentials
 * @returns {AuthToken} Authentication token
 * @throws {401} Invalid credentials
 * @throws {400} Missing username or password
 * @example
 * // Request body
 * {
 *   "username": "john_doe",
 *   "password": "securePassword123"
 * }
 *
 * // Response
 * {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "expiresIn": 3600
 * }
 */

/**
 * @memberof AuthAPI
 * @name POST /auth/register
 * @description User registration endpoint
 * @param {AuthData} userData - User registration data
 * @returns {User} Created user (without password)
 * @throws {409} Username already exists
 * @throws {400} Invalid username or password format
 * @example
 * // Request body
 * {
 *   "username": "new_user",
 *   "password": "securePassword123"
 * }
 *
 * // Response
 * {
 *   "id": 123,
 *   "username": "new_user"
 * }
 */

/**
 * @memberof AuthAPI
 * @name GET /auth/me
 * @description Get current user profile
 * @param {string} Authorization - Bearer token in header
 * @returns {User} Current user profile (without password)
 * @throws {401} Invalid or expired token
 * @throws {403} Missing authorization header
 * @example
 * // Request headers
 * Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 * // Response
 * {
 *   "id": 123,
 *   "username": "john_doe"
 * }
 */
