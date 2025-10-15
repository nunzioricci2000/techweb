/**
 * @template {T}
 * @param {import("joi").Schema<T>} schema
 * @returns {import("koa").Middleware<AppState>}
 */
export default function prune(schema) {
  return async (ctx, next) => {
    await next();
    if (ctx.status >= 400) {
      return;
    }
    const data = ctx.body;
    const valid = schema.validate(data, {
      abortEarly: false,
      // stripUnknown: true,
    });
    if (valid.error) {
      console.debug("Response not valid:", valid.value);
      ctx.status = 500;
      ctx.body = { error: valid.error?.message ?? "Internal Error!" };
      return;
    }
  };
}
