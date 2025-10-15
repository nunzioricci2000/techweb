import db from "../../model/index.js";

/**
 * Creates a new user
 * @param {{ username: string, password: string }} user
 * @returns { Promise<number> }
 */
export async function createUser({ username, password }) {
  return await db("user").insert({ username, password }, "id");
}

/**
 * Retrieves user by filter
 * @param {UserFilter} filter
 * @returns {Promise<User|undefined>}
 */
export async function getUser(filter) {
  return await db("user")
    .where(
      filter.by === "id" ? { id: filter.value } : { username: filter.value },
    )
    .first();
}

export default {
  createUser,
  getUser,
};

/**
 * User filter options for database queries
 * @typedef {UserFilterById | UserFilterByUsername} UserFilter
 */

/**
 * User filter by ID
 * @typedef {{ by: 'id', value: number } } UserFilterById
 */

/**
 * User filter by username
 * @typedef {{ by: 'username', value: string } } UserFilterByUsername
 */
