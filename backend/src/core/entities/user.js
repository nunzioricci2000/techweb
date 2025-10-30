import Restaurant from "./restaurant";

/**
 * User entity representing an application user who can own restaurants and write reviews.
 * Immutable user entity that exposes the username and behaviors to
 * create restaurants and write reviews on other restaurants.
 *
 * @class User
 *
 * @property {string} username - Public getter that returns the user's username.
 *
 * @example
 * // Create a new user
 * const user = new User({ username: 'alice' });
 *
 * // Create a restaurant owned by the user
 * const restaurant = user.createRestaurant({
 *   name: 'Pasta Place',
 *   description: 'Homemade pasta',
 *   geolocation: new Geolocation({ latitude: 40.7128, longitude: -74.0060 }),
 *   image: 'https://example.com/image.jpg'
 * });
 *
 * // Write a review for a restaurant
 * const review = user.writeReview({ to: restaurant }, 'Great food and service!');
 */
export default class User {
  /** @type {string} */
  #username;

  /**
   * Get the username of the user
   * @returns {string} Username
   */
  get username() {
    return this.#username;
  }

  /**
   * @param {object} params - Parameters used to construct the User.
   * @param {string} params.username - Username of the user.
   *
   * @throws {TypeError} If the provided username is not a string.
   *
   */
  constructor({ username }) {
    if (typeof username !== "string") {
      throw new TypeError("Username must be a string");
    }
    this.#username = username;
  }

  /**
   * Create a new Restaurant entity owned by this user. The created
   * restaurant will include this user as the owner and start with an empty reviews array.
   * @param {object} params - Restaurant creation parameters.
   * @param {string} params.name - Name of the restaurant.
   * @param {string} params.description - Description of the restaurant.
   * @param {Geolocation} params.geolocation - Geolocation of the restaurant.
   * @param {Image} params.image - Image or image URL for the restaurant.
   * @returns {Restaurant} Newly created Restaurant entity.
   */
  createRestaurant(params) {
    return new Restaurant({
      ...params,
      owner: this,
      reviews: [],
    });
  }

  /**
   * Create and attach a new Review to the specified restaurant as authored by this user.
   * @param {object} params - Parameters for writing a review.
   * @param {Restaurant} params.to - Target restaurant to receive the review.
   * @param {string} content - Content/body of the review.
   * @returns {Review} Newly created Review entity added to the restaurant.
   */
  writeReview({ to: restaurant }, content) {
    return restaurant.addReview({ by: this }, content);
  }
}
