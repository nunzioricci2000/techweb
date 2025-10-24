import db from "../../model/index.js";
import { logger } from "../../core/logger.js";

logger.debug("Loading Auth repository");

/**
 * Creates a new user
 * @param {{ username: string, password: string }} user
 * @returns { Promise<number> }
 */
export async function createUser({ username, password }) {
  logger.debug("Creating user with username:", username);
  const result = await db("user").insert({ username, password }, "id");
  logger.debug("Created user with ID:", result);
  return result;
}

/**
 * Retrieves user by filter
 * @param {UserFilter} filter
 * @returns {Promise<User|undefined>}
 */
export async function getUser(filter) {
  logger.debug("Fetching user with filter:", filter);
  const result = await db("user")
    .where(
      filter.by === "id" ? { id: filter.value } : { username: filter.value },
    )
    .first();
  logger.debug("Fetched user:", result);
  return result;
}

export default {
  createUser,
  getUser,
};

logger.debug("Auth repository loaded");

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
