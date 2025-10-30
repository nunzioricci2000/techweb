/**
 * Image entity representing an image resource.
 * Immutable entity that encapsulates an image URL.
 *
 * @class Image
 *
 * @example
 * const img = new Image({ url: 'https://example.com/image.jpg' });
 * console.log(img.url); // 'https://example.com/image.jpg'
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
   * @param {Object} params - Constructor parameters.
   * @param {string} params.url - URL of the image.
   *
   * @throws {TypeError} If `url` is not a string.
   */
  constructor({ url }) {
    if (typeof url !== "string") {
      throw new TypeError("Image URL must be a string");
    }
    this.#url = url;
  }
}
