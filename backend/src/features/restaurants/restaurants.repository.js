import db from "../../model/index.js";
import { logger } from "../../core/logger.js";

logger.debug("Loading Restaurants repository");

/**
 * Retrieves all restaurants with optional filtering
 * @param {RestaurantFilter} filter
 * @returns {Promise<Restaurant[]>}
 */
export async function getAllRestaurants({ byName: name }) {
  logger.debug("Querying all restaurants with name filter:", name);
  let query = db("restaurant").select("*");
  if (name) {
    logger.debug("Applying name filter:", name);
    query = await query.where("name", "like", `%${name}%`);
  } else {
    query = await query;
  }
  logger.debug("Queried restaurants:", query);
  return query;
}

/**
 * Retrieves a restaurant by ID
 * @param {number} id
 * @returns {Promise<Restaurant|undefined>}
 */
export async function getRestaurantById(id) {
  logger.debug("Fetching restaurant by ID from DB:", id);
  const result = await db("restaurant").where({ id }).first("*");
  logger.debug("Fetched restaurant:", result);
  return result;
}

/**
 * Creates a new restaurant
 * @param {Omit<Restaurant, 'id'>} restaurant
 * @returns {Promise<number>}
 */
export async function createRestaurant(data) {
  logger.debug("Creating restaurant with data:", data);
  const result = await db("restaurant").insert(data, "*");
  logger.debug("Created restaurant with ID:", result);
  return result;
}

/**
 * Deletes a restaurant by ID
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function deleteRestaurant(id) {
  logger.debug("Deleting restaurant by ID from DB:", id);
  await db("restaurant").where({ id }).del();
  logger.debug("Deleted restaurant with ID:", id);
}

export default {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  deleteRestaurant,
};

logger.debug("Restaurants repository loaded");

/**
 * Restaurant filter
 * @typedef {object} RestaurantFilter
 * @property {string} [byName] - Filter by restaurant name (partial match)
 */
