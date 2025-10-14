/**
 * @param {import('knex').Knex} db
 */
export default async function initUserModel(db) {
  const tableExists = await db.schema.hasTable("user");
  if (!tableExists) {
    await db.schema.createTable("user", (table) => {
      table.increments("id").primary();
      table.string("username").unique();
      table.string("password");
    });
  }
}
