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
  await db("user")
    .where(
      filter.byId !== undefined
        ? { id: filter.byId }
        : { username: filter.byUsername },
    )
    .first();
}

/**
 * User filter options for database queries
 * @typedef {{ byId: number } | { byUsername: string }} UserFilter
 */

export default {
  createUser,
  getUser,
};
