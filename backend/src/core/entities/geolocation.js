/**
 * Geolocation entity representing an immutable geographic coordinate.
 * Immutable value object that stores latitude and longitude in decimal degrees.
 *
 * @class Geolocation
 *
 * @example
 * const g = new Geolocation({ latitude: 45.0, longitude: 9.19 });
 * console.log(g.latitude); // 45
 * console.log(g.longitude); // 9.19
 */
export default class Geolocation {
  /** @type {number} */
  #latitude;
  /** @type {number} */
  #longitude;

  /**
   * Get the latitude coordinate
   * @returns {number} Latitude
   */
  get latitude() {
    return this.#latitude;
  }

  /**
   * Get the longitude coordinate
   * @returns {number} Longitude
   */
  get longitude() {
    return this.#longitude;
  }

  /**
   * @param {Object} params - Constructor parameters.
   * @param {number} params.latitude - Latitude coordinate in decimal degrees. Must be between -90 and 90.
   * @param {number} params.longitude - Longitude coordinate in decimal degrees. Must be between -180 and 180.
   *
   * @property {number} latitude - Read-only latitude in decimal degrees.
   * @property {number} longitude - Read-only longitude in decimal degrees.
   *
   * @throws {TypeError} If latitude or longitude is not a number.
   * @throws {RangeError} If latitude is outside [-90, 90] or longitude is outside [-180, 180].
   *
   */
  constructor({ latitude, longitude }) {
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      throw new TypeError("Latitude and Longitude must be numbers");
    }
    if (latitude < -90 || latitude > 90) {
      throw new RangeError("Latitude must be between -90 and 90");
    }
    if (longitude < -180 || longitude > 180) {
      throw new RangeError("Longitude must be between -180 and 180");
    }
    this.#latitude = latitude;
    this.#longitude = longitude;
  }
}
