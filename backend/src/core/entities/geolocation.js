/**
 * Geolocation entity class
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
   * Geolocation entity
   * @param {object} params
   * @param {number} params.latitude - Latitude coordinate
   * @param {number} params.longitude - Longitude coordinate
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
