import fs from "fs/promises";
import path from "path";

const UPLOAD_DIR = process.env["FILE_STORAGE"];

await fs.mkdir(UPLOAD_DIR, { recursive: true });

async function fileExists(filename) {
  try {
    const filepath = path.join(UPLOAD_DIR, filename);
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Saves a file to the upload directory. If a file with the same name exists, it will be overwritten.
 * @param {Object} args
 * @param {Buffer} args.buffer
 * @param {string} args.saveAs
 * @returns {Promise<string>} The filename under which the file was saved.
 * @throws {Error} If saving fails
 *
 * @example
 * const filename = await saveFile({ buffer: fileBuffer, saveAs: 'restaurant-1692345678901-photo.jpg' });
 * console.log(`File saved as: ${filename}`);
 */
export async function saveFile({ buffer, saveAs: filename }) {
  if (!filename) throw new Error("No filename provided");
  const filepath = path.join(UPLOAD_DIR, filename);
  await fs.writeFile(filepath, buffer);
  return filename;
}
/**
 * Retrieves a file from the upload directory by its filename.
 *
 * @async
 * @function getFile
 * @param {string} filename - The name of the file to retrieve.
 * @returns {Promise<Buffer>} A buffer containing the file contents.
 * @throws {Error} Throws an error if the file does not exist or cannot be read.
 *
 * @example
 * const fileBuffer = await getFile('restaurant-1692345678901-photo.jpg');
 */
export async function getFile(filename) {
  if (!filename) throw new Error("No filename provided");
  const filepath = path.join(UPLOAD_DIR, filename);
  if (!(await fileExists(filename))) {
    throw new Error("File not found");
  }
  return await fs.readFile(filepath);
}

export default {
  saveFile,
  getFile,
};
