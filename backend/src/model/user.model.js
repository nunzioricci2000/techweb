import { logger } from "../core/logger.js";

logger.debug("Loading User model");

/**
 * @param {import('knex').Knex} db
 */
export default async function initUserModel(db) {
  logger.debug("Initializing User model in DB");
  const tableExists = await db.schema.hasTable("user");
  if (!tableExists) {
    logger.debug("Creating 'user' table in DB");
    await db.schema.createTable("user", (table) => {
      table.increments("id").primary();
      table.string("username").unique();
      table.string("password");
    });
  }
  logger.debug("User model initialized in DB");
}

logger.debug("User model loaded");
