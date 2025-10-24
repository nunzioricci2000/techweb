import restaurantRepository from "./restaurant.repository.js";

/**
 * @type {Set<OnDeleteRestaurantCallback>}
 * A set of subscribers to be notified when a restaurant is deleted
 * @private
 */
const onDeleteRestaurantSubscribers = new Set();

/**
 * Retrieves all restaurants, optionally filtered by name.
 * @param {string} [name] - Optional name filter
 * @returns {Promise<RestaurantOverview[]>}
 */
export async function getAllRestaurants(name) {
    const result = await restaurantRepository.getAllRestaurants({
        byName: name,
    });
    return result;
}

/**
 * Retrieves a restaurant by its ID.
 * @param {number} id - Restaurant ID
 * @returns {Promise<Restaurant>}
 * @throws {Error} If the restaurant is not found
 */
export async function getRestaurantById(id) {
    const restaurant = await restaurantRepository.getRestaurantById(id);
    if (!restaurant) {
        throw new Error("Restaurant not found");
    }
    return restaurant;
}

/**
 * Creates a new restaurant.
 * @param {Omit<Restaurant, 'id'>} restaurantData - Data for the new restaurant
 * @returns {Promise<number>} The ID of the newly created restaurant
 * @throws {Error} If creation fails
 */
export async function createRestaurant(restaurantData) {
    const newRestaurantId =
        await restaurantRepository.createRestaurant(restaurantData);
    if (!newRestaurantId) {
        throw new Error("Failed to create restaurant");
    }
    return newRestaurantId;
}

/**
 * Deletes a restaurant by its ID.
 * @param {number} id - Restaurant ID
 * @returns {Promise<void>}
 * @throws {Error} If the restaurant is not found or deletion fails
 */
export async function deleteRestaurant(id) {
    const restaurant = await restaurantRepository.getRestaurantById(id);
    if (!restaurant) {
        throw new Error("Restaurant not found");
    }
    onDeleteRestaurantSubscribers.forEach((callback) => callback(id));
    await restaurantRepository.deleteRestaurant(id);
}

/**
 * Registers a callback to be called when a restaurant is deleted.
 * @param {OnDeleteRestaurantCallback} callback - The callback function
 * @return {() => void} A function to unregister the callback
 */
export function onDeleteRestaurant(callback) {
    onDeleteRestaurantSubscribers.add(callback);
    return () => onDeleteRestaurantSubscribers.delete(callback);
}

export default {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    deleteRestaurant,
    onDeleteRestaurant,
};

/**
 * @callback OnDeleteRestaurantCallback
 * @param {number} restaurantId - ID of the deleted restaurant
 * @returns {Promise<void>|void}
 */
