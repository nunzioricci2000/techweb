/**
 * @param {import('knex').Knex} db
 */
export default async function initRestaurantModel(db) {
  const tableExists = await db.schema.hasTable("restaurant");
  if (!tableExists) {
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
}
