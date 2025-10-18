import knex from "knex";
import initUserModel from "./user.model.js";
import initRestaurantModel from "./restaurant.model.js";

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./mydb.sqlite",
  },
  useNullAsDefault: true,
});

initUserModel(db);
initRestaurantModel(db);

export default db;
