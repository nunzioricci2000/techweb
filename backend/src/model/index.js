import knex from "knex";
import config from "../config/db-config.js";
import initUserModel from "./user.model.js";

const db = knex(config);
initUserModel(db);

export default db;
