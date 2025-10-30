import Restaurant from "./restaurant.js";
import User from "./user.js";

/**
 * Review entity representing a user's review for a restaurant.
 *
 * @class Review
 *
 * @example
 * const review = new Review({
 *   content: 'Great food and service!',
 *   rating: 4,
 *   author: someUserInstance,
 *   restaurant: someRestaurantInstance
 * });
 */
export default class Review {
  /** @type {string} */
  #content;
  /** @type {number} */
  #rating;
  /** @type {User} */
  #author;
  /** @type {Restaurant} */
  #restaurant;

  /**
   * Get the content of the review
   * @returns {string} Review content
   */
  get content() {
    return this.#content;
  }

  /**
   * Get the rating of the review
   * @returns {number} Review rating
   */
  get rating() {
    return this.#rating;
  }

  /**
   * Get the author of the review
   * @returns {User} Review author
   */
  get author() {
    return this.#author;
  }

  /**
   * Get the restaurant of the review
   * @returns {Restaurant} Review restaurant
   */
  get restaurant() {
    return this.#restaurant;
  }

  /**
   * @param {Object} params - Constructor parameters.
   * @param {string} params.content - Content of the review.
   * @param {number} params.rating - Rating given in the review.
   * @param {User} params.author - Author of the review.
   * @param {Restaurant} params.restaurant - Restaurant being reviewed.
   *
   * @throws {TypeError} If content is not a string.
   * @throws {RangeError} If rating is not a number.
   * @throws {TypeError} If author is not an instance of User.
   * @throws {TypeError} If restaurant is not an instance of Restaurant.
   */
  constructor({ content, rating, author, restaurant }) {
    if (typeof content !== "string") {
      throw new TypeError("Review content must be a string");
    }
    if (typeof rating !== "number") {
      throw new RangeError("Review rating must be a number");
    }
    if (!(author instanceof User)) {
      throw new TypeError("Review author must be a User object");
    }
    if (!(restaurant instanceof Restaurant)) {
      throw new TypeError("Review restaurant must be a Restaurant object");
    }
    this.#content = content;
    this.#rating = rating;
    this.#author = author;
    this.#restaurant = restaurant;
  }
}
