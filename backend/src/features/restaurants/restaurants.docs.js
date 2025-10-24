/**
 * @fileoverview Restaurant module documentation
 * @module Restaurant
 */

/**
 * Restaurant object structure
 * @typedef {object} Restaurant
 * @property {number} id - Unique restaurant identifier
 * @property {string} name - Name of the restaurant
 * @property {string} description - Description of the restaurant
 * @property {Geolocation} geolocation - Geolocation of the restaurant
 * @property {Image} image - Image of the restaurant
 * @property {number} owner - User ID of the restaurant owner
 */

/**
 * @typedef {object} Geolocation
 * @property {number} latitude - Latitude coordinate
 * @property {number} longitude - Longitude coordinate
 */

/**
 * @typedef {object} Image
 * @property {Buffer} data - Image binary data
 * @property {string} format - Image format (e.g., 'image/png')
 */
