import { logger } from "../core/logger.js";

logger.debug("Loading Prune Middleware");

/**
 * @template {T}
 * @param {import("joi").Schema<T>} schema
 * @returns {import("koa").Middleware<AppState>}
 */
export default function prune(schema) {
  return async (ctx, next) => {
    await next();
    logger.debug("Pruning response body");
    if (ctx.status >= 400) {
      logger.debug("Skipping pruning due to error status:", ctx.status);
      return;
    }
    const data = ctx.body;
    logger.debug("Response body before pruning:", data);
    const valid = schema.validate(data, {
      abortEarly: false,
      // stripUnknown: true,
    });
    if (valid.error) {
      logger.debug("Response not valid:", valid.value);
      ctx.status = 500;
      ctx.body = { error: valid.error?.message ?? "Internal Error!" };
      return;
    }
    logger.debug("Response body after pruning:", valid.value);
  };
}

logger.debug("Prune Middleware loaded");
