/**
 * @template {T}
 * @param {import("joi").Schema<T>} schema
 * @returns {import("koa").Middleware<AppState>}
 */
export default function validate(schema) {
  return async (ctx, next) => {
    const data = ctx.request.body;
    const valid = schema.validate(data, { abortEarly: false });
    if (valid.error) {
      console.debug("Validation failed:", valid.value);
      ctx.status = 400;
      ctx.body = { error: valid.error?.message ?? "Invalid credentials!" };
      return;
    }
    await next();
  };
}
