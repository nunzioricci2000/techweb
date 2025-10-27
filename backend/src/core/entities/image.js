/**
 * Image entity
 */
export default class Image {
  /** @type {string} */
  #url;

  /**
   * Get the URL of the image
   * @returns {string} Image URL
   */
  get url() {
    return this.#url;
  }

  /**
   * Image entity
   * @param {object} params
   * @param {string} params.url - URL of the image
   */
  constructor({ url }) {
    if (typeof url !== "string") {
      throw new TypeError("Image URL must be a string");
    }
    this.#url = url;
  }
}
