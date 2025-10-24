import knex from "knex";
import initUserModel from "./user.model.js";
import initRestaurantModel from "./restaurant.model.js";

console.debug("Initializing database connection");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./mydb.sqlite",
  },
  useNullAsDefault: true,
});

await initUserModel(db);
await initRestaurantModel(db);

console.debug("Database initialized");

export default db;
