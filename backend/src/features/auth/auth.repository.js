/**
 * @param {AuthRepositoryDeps} deps
 * @returns {AuthRepository}
 */
export default function AuthRepository({ db }) {
  return {
    /**
     * Creates a new user
     * @param {{ username: string, password: string }} user
     * @returns { Promise<number> }
     */
    createUser: async ({ username, password }) =>
      await db("USER").insert({ username, password }, "id"),
    /**
     * Retrieves user by filter
     * @param {UserFilter} filter
     * @returns {Promise<User|undefined>}
     */
    getUser: async (filter) =>
      await db("USER")
        .where(
          filter.byId !== undefined
            ? { id: filter.byId }
            : { username: filter.byUsername },
        )
        .first(),
  };
}

/**
 * @typedef {object} AuthRepositoryDeps
 * @property {import("knex").Knex} db - Knex database instance
 */

/**
 * Authentication repository interface
 * @typedef {object} AuthRepository
 * @property {function(AuthData): Promise<number>} createUser - Creates a new user
 * @property {function(UserFilter): Promise<User|undefined>} getUser - Retrieves user by filter
 */

/**
 * User filter options for database queries
 * @typedef {{ byId: number } | { byUsername: string }} UserFilter
 */
