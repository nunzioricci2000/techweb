/**
 * Converts a Buffer to a Base64 data URL string.
 * @param {{ format: string, buffer: Buffer<ArrayBufferLike>}} params
 * @param {Buffer<ArrayBufferLike>} params.data
 * @param {string} params.format
 * @returns
 */
export const bufferToBase64 = ({ format, data }) =>
  `data:${format};base64,${data.toString("base64")}`;

export default bufferToBase64;

/**
 * @todo
 * This method should not be used. The current implementation of image saving
 * and serving should be changed with a file system store or other better
 * solutions.
 */
