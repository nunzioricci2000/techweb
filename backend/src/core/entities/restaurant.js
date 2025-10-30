import Geolocation from "./geolocation.js";
import Image from "./image.js";
import Review from "./review.js";
import User from "./user.js";

/**
 * Represents a restaurant with metadata, location, media, an owner and reviews.
 *
 * Immutable public API exposing readonly getters for name, description, geolocation, image, owner and reviews.
 * Reviews are stored internally and the getter returns a shallow copy to prevent external mutation.
 *
 * @class Restaurant
 *
 * @example
 * const restaurant = new Restaurant({
 *   name: 'Trattoria Roma',
 *   description: 'Traditional Italian kitchen',
 *   geolocation: new Geolocation({ latitude: 41.9028, longitude: 12.4964 }),
 *   image: new Image({ url: 'https://example.com/image.jpg'}),
 *   owner: new User({ id: 'user-123' }),
 *   reviews: []
 * });
 */
export default class Restaurant {
  /** @type {string} */
  #name;
  /** @type {string} */
  #description;
  /** @type {Geolocation} */
  #geolocation;
  /** @type {Image} */
  #image;
  /** @type {User} */
  #owner;
  /** @type {Review[]} */
  #reviews;

  /**
   * Get the name of the restaurant
   * @returns {User} Restaurant name
   */
  get name() {
    return this.#name;
  }

  /**
   * Get the description of the restaurant
   * @returns {string} Restaurant description
   */
  get description() {
    return this.#description;
  }

  /**
   * Get the geolocation of the restaurant
   * @returns {Geolocation} Restaurant geolocation
   */
  get geolocation() {
    return this.#geolocation;
  }

  /**
   * Get the image URL of the restaurant
   * @returns {Image} Restaurant image URL
   */
  get image() {
    return this.#image;
  }

  /**
   * Get the owner of the restaurant
   * @returns {User} Restaurant owner user ID
   */
  get owner() {
    return this.#owner;
  }

  /**
   * Get the reviews of the restaurant
   * @returns {Review[]} Restaurant reviews
   */
  get reviews() {
    return [...this.#reviews];
  }

  /**
   * @param {Object} params - Parameters for constructing a Restaurant.
   * @param {string} params.name - Name of the restaurant.
   * @param {string} params.description - Description of the restaurant.
   * @param {Geolocation} params.geolocation - Geolocation instance for the restaurant.
   * @param {Image} params.image - Image instance for the restaurant.
   * @param {User} params.owner - Owner User instance.
   * @param {Review[]} params.reviews - Initial array of Review instances.
   *
   * @throws {TypeError} If `name` or `description` are not strings.
   * @throws {TypeError} If `geolocation` is not an instance of Geolocation.
   * @throws {TypeError} If `image` is not an instance of Image.
   * @throws {TypeError} If `owner` is not an instance of User.
   * @throws {TypeError} If `reviews` is not an array or contains non-Review items.
   */
  constructor({ name, description, geolocation, image, owner, reviews }) {
    if (typeof name !== "string") {
      throw new TypeError("Restaurant name must be a string");
    }
    if (typeof description !== "string") {
      throw new TypeError("Restaurant description must be a string");
    }
    if (!(geolocation instanceof Geolocation)) {
      throw new TypeError(
        "Restaurant geolocation must be a Geolocation instance",
      );
    }
    if (!(image instanceof Image)) {
      throw new TypeError("Restaurant image must be a string");
    }
    if (!(owner instanceof User)) {
      throw new TypeError("Restaurant owner must be a string");
    }
    if (!Array.isArray(reviews)) {
      throw new TypeError("Restaurant reviews must be an array");
    }
    for (const review of reviews) {
      if (!(review instanceof Review)) {
        throw new TypeError("Each review must be an object");
      }
    }
    this.#name = name;
    this.#description = description;
    this.#geolocation = geolocation;
    this.#image = image;
    this.#owner = owner;
    this.#reviews = reviews;
  }

  /**
   * Add a review to the restaurant
   * @param {object} params
   * @param {User} params.by - User writing the review
   * @param {string} content - Content of the review
   * @returns {Review} New Review entity
   */
  addReview({ by: user }, content) {
    const review = new Review({
      content,
      rating: 0,
      author: user,
      restaurant: this,
    });
    this.#reviews.push(review);
    return review;
  }
}
