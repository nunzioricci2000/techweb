console.debug("Loading User model");

/**
 * @param {import('knex').Knex} db
 */
export default async function initUserModel(db) {
  console.debug("Initializing User model in DB");
  const tableExists = await db.schema.hasTable("user");
  if (!tableExists) {
    console.debug("Creating 'user' table in DB");
    await db.schema.createTable("user", (table) => {
      table.increments("id").primary();
      table.string("username").unique();
      table.string("password");
    });
  }
  console.debug("User model initialized in DB");
}

console.debug("User model loaded");
