console.debug("Loading Validation Middleware");

/**
 * @template {T}
 * @param {import("joi").Schema<T>} schema
 * @returns {import("koa").Middleware<AppState>}
 */
export default function validate(schema) {
  return async (ctx, next) => {
    console.debug("Validating request body");
    const data = ctx.request.body;
    console.debug("Request body to validate:", data);
    const valid = schema.validate(data, { abortEarly: false });
    if (valid.error) {
      console.debug("Validation failed:", valid.value);
      ctx.status = 400;
      ctx.body = { error: valid.error?.message ?? "Invalid request!" };
      return;
    }
    console.debug("Validation succeeded:", valid.value);
    await next();
  };
}

console.debug("Validation Middleware loaded");
