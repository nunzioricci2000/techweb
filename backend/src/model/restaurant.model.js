import { logger } from "../core/logger.js";

logger.debug("Loading Restaurant model");

/**
 * @param {import('knex').Knex} db
 */
export default async function initRestaurantModel(db) {
  logger.debug("Initializing Restaurant model in DB");
  const tableExists = await db.schema.hasTable("restaurant");
  if (!tableExists) {
    logger.debug("Creating 'restaurant' table in DB");
    await db.schema.createTable("restaurant", (table) => {
      table.increments("id").primary();
      table.string("name");
      table.string("description");
      table.string("geolocation");
      table.string("image");
      table
        .integer("owner")
        .references("id")
        .inTable("user")
        .onDelete("CASCADE");
    });
  }
  logger.debug("Restaurant model initialized in DB");
}

logger.debug("Restaurant model loaded");
