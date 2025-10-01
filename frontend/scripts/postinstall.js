import fs from "fs/promises";
import path from "path";

/**
 * Downloads a file from a given URL and saves it to the specified destination.
 * @param {string} source
 * @param {string} destination
 * @param {string} fileName
 * @returns {Promise<void>}
 */
async function downloadFile(source, destination, fileName) {
  await fs.mkdir(destination, { recursive: true });
  const response = await fetch(source);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = Buffer.from(await response.arrayBuffer());
  const filePath = path.join(destination, fileName);
  await fs.writeFile(filePath, data);
}

const source = "https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.css";
const destination = "src/lib";
process.stdout.write('Downloading PicoCSS... ');
downloadFile(source, destination, "pico.classless.css");
process.stdout.write('DONE\n');