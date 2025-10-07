/**
 * @param {import('knex').Knex} db
 */
export default async function initUserModel(db) {
  const tableExists = await db.schema.hasTable("USER");
  if (!tableExists) {
    await db.schema.createTable("USER", (table) => {
      table.increments("id").primary();
      table.string("username").unique();
      table.string("password");
    });
  }
}
