import fs from "fs";
import path from "path";

function createEnvFile() {
  const envPath = path.resolve(__dirname, "../.env");
  const defaultEnvPath = path.resolve(__dirname, "../.default.env");
  if (fs.existsSync(envPath)) return;
  if (!fs.existsSync(defaultEnvPath))
    return console.warn(".default.env not found. Cannot create .env file!");
  fs.copyFileSync(defaultEnvPath, envPath);
  console.log(".env file created from .default.env");
}

createEnvFile();
