import bodyParser from "@koa/bodyparser";
import { logger } from "../core/logger.js";

logger.debug("Loading Body Parser Middleware");

/**
 * Body parsing middleware for Koa.js
 * @type {import("koa").Middleware<AppState>}
 */
export default bodyParser({
  onError(err, ctx) {
    logger.debug("Body parse error:", err);
    ctx.throw(422, "body parse error");
  },
});

logger.debug("Body Parser Middleware loaded");
