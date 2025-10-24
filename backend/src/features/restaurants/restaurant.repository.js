import db from "../../model/index.js";

/**
 * Retrieves all restaurants with optional filtering
 * @param {RestaurantFilter} filter
 * @returns {Promise<Restaurant[]>}
 */
export async function getAllRestaurants({ byName: name }) {
    let query = db("restaurant").select("*");
    if (name) {
        query = query.where("name", "like", `%${name}%`);
    }
    return await query;
}

/**
 * Retrieves a restaurant by ID
 * @param {number} id
 * @returns {Promise<Restaurant|undefined>}
 */
export async function getRestaurantById(id) {
    return await db("restaurant").where({ id }).first();
}

/**
 * Creates a new restaurant
 * @param {Omit<Restaurant, 'id'>} restaurant
 * @returns {Promise<number>}
 */
export async function createRestaurant(data) {
    return await db("restaurant").insert(data, "id");
}

/**
 * Deletes a restaurant by ID
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function deleteRestaurant(id) {
    await db("restaurant").where({ id }).del();
}

export default {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    deleteRestaurant,
};

/**
 * Restaurant filter
 * @typedef {object} RestaurantFilter
 * @property {string} [byName] - Filter by restaurant name (partial match)
 */
