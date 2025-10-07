/** @type {import('knex').Knex.Config} */
const config = {
  client: "sqlite3",
  connection: {
    filename: "./mydb.sqlite",
  },
};

export default config;
