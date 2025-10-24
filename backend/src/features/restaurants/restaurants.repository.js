import db from "../../model/index.js";

console.debug("Loading Restaurants repository");

/**
 * Retrieves all restaurants with optional filtering
 * @param {RestaurantFilter} filter
 * @returns {Promise<Restaurant[]>}
 */
export async function getAllRestaurants({ byName: name }) {
  console.debug("Querying all restaurants with name filter:", name);
  let query = db("restaurant").select("*");
  if (name) {
    console.debug("Applying name filter:", name);
    query = await query.where("name", "like", `%${name}%`);
  } else {
    query = await query;
  }
  console.debug("Queried restaurants:", query);
  return query;
}

/**
 * Retrieves a restaurant by ID
 * @param {number} id
 * @returns {Promise<Restaurant|undefined>}
 */
export async function getRestaurantById(id) {
  console.debug("Fetching restaurant by ID from DB:", id);
  const result = await db("restaurant").where({ id }).first("*");
  console.debug("Fetched restaurant:", result);
  return result;
}

/**
 * Creates a new restaurant
 * @param {Omit<Restaurant, 'id'>} restaurant
 * @returns {Promise<number>}
 */
export async function createRestaurant(data) {
  console.debug("Creating restaurant with data:", data);
  const result = await db("restaurant").insert(data, "*");
  console.debug("Created restaurant with ID:", result);
  return result;
}

/**
 * Deletes a restaurant by ID
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function deleteRestaurant(id) {
  console.debug("Deleting restaurant by ID from DB:", id);
  await db("restaurant").where({ id }).del();
  console.debug("Deleted restaurant with ID:", id);
}

export default {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  deleteRestaurant,
};

console.debug("Restaurants repository loaded");

/**
 * Restaurant filter
 * @typedef {object} RestaurantFilter
 * @property {string} [byName] - Filter by restaurant name (partial match)
 */
