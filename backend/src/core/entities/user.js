/**
 * User entity
 */
export default class User {
  /** @type {number} */
  #id;
  /** @type {string} */
  #username;

  /**
   * Get the ID of the user
   * @returns {number} User ID
   */
  get id() {
    return this.#id;
  }

  /**
   * Get the username of the user
   * @returns {string} Username
   */
  get username() {
    return this.#username;
  }

  /**
   * User entity
   * @param {object} params
   * @param {number} params.id - Unique user identifier
   * @param {string} params.username - Username of the user
   */
  constructor({ id, username }) {
    if (typeof id !== "number") {
      throw new TypeError("User ID must be a number");
    }
    if (typeof username !== "string") {
      throw new TypeError("Username must be a string");
    }
    this.#id = id;
    this.#username = username;
  }
}
