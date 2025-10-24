import { logger } from "../core/logger.js";

logger.debug("Loading Validation Middleware");

/**
 * @template {T}
 * @param {import("joi").Schema<T>} schema
 * @returns {import("koa").Middleware<AppState>}
 */
export default function validate(schema) {
  return async (ctx, next) => {
    logger.debug("Validating request body");
    const data = ctx.request.body;
    logger.debug("Request body to validate:", data);
    const valid = schema.validate(data, { abortEarly: false });
    if (valid.error) {
      logger.debug("Validation failed:", valid.value);
      ctx.status = 400;
      ctx.body = { error: valid.error?.message ?? "Invalid request!" };
      return;
    }
    logger.debug("Validation succeeded:", valid.value);
    await next();
  };
}

logger.debug("Validation Middleware loaded");
