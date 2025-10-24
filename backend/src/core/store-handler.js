import fs from "fs/promises";
import path from "path";

console.debug("Loading Store Handler");

const UPLOAD_DIR = process.env["FILE_STORAGE"];
console.debug("Using upload directory from environment:", UPLOAD_DIR);

await fs.mkdir(UPLOAD_DIR, { recursive: true });

async function fileExists(filename) {
  try {
    console.debug(`Checking if file exists: ${filename}`);
    const filepath = path.join(UPLOAD_DIR, filename);
    await fs.access(filepath);
    console.debug(`File exists: ${filename}`);
    return true;
  } catch {
    console.debug(`File does not exist: ${filename}`);
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
  console.debug(`Saving file as: ${filename}`);
  if (!filename) {
    console.error("No filename provided for saving file");
    throw new Error("No filename provided");
  }
  const filepath = path.join(UPLOAD_DIR, filename);
  await fs.writeFile(filepath, buffer);
  console.debug(`File saved successfully as: ${filename}`);
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
  console.debug(`Retrieving file: ${filename}`);
  if (!filename) {
    console.error("No filename provided for retrieving file");
    throw new Error("No filename provided");
  }
  const filepath = path.join(UPLOAD_DIR, filename);
  if (!(await fileExists(filename))) {
    console.error(`File not found: ${filename}`);
    throw new Error("File not found");
  }
  const result = await fs.readFile(filepath);
  console.debug(`File retrieved successfully: ${filename}`);
  return result;
}

export default {
  saveFile,
  getFile,
};

console.debug("Store Handler loaded");
