import multer from "@koa/multer";
import { logger } from "../core/logger.js";

logger.debug("Loading Multipart Parser Middleware");

const parseMultipart = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 16 * 1024 * 1024,
  },
});

export default parseMultipart;

logger.debug("Multipart Parser Middleware loaded");
