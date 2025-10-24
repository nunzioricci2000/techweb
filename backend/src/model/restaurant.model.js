console.debug("Loading Restaurant model");

/**
 * @param {import('knex').Knex} db
 */
export default async function initRestaurantModel(db) {
  console.debug("Initializing Restaurant model in DB");
  const tableExists = await db.schema.hasTable("restaurant");
  if (!tableExists) {
    console.debug("Creating 'restaurant' table in DB");
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
  console.debug("Restaurant model initialized in DB");
}

console.debug("Restaurant model loaded");
