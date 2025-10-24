import db from "../../model/index.js";

console.debug("Loading Auth repository");

/**
 * Creates a new user
 * @param {{ username: string, password: string }} user
 * @returns { Promise<number> }
 */
export async function createUser({ username, password }) {
  console.debug("Creating user with username:", username);
  const result = await db("user").insert({ username, password }, "id");
  console.debug("Created user with ID:", result);
  return result;
}

/**
 * Retrieves user by filter
 * @param {UserFilter} filter
 * @returns {Promise<User|undefined>}
 */
export async function getUser(filter) {
  console.debug("Fetching user with filter:", filter);
  const result = await db("user")
    .where(
      filter.by === "id" ? { id: filter.value } : { username: filter.value },
    )
    .first();
  console.debug("Fetched user:", result);
  return result;
}

export default {
  createUser,
  getUser,
};

console.debug("Auth repository loaded");

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
