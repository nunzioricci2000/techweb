import { logger } from "./core/logger.js";

const { config } = await import("dotenv");
logger.debug("Loading environment variables");
config();
logger.debug("Environment variables loaded:", process.env);

const { default: app } = await import("./app.js");

const PORT = process.env.PORT || 3000;
logger.debug(`Starting server on port ${PORT}`);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

logger.debug(`Server started on port ${PORT}`);
