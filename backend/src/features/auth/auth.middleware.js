/**
 * Authentication middleware for Koa.js
 * @param {object} deps
 * @returns {AuthMiddleware}
 */
export default function AuthMiddleware({ authService }) {
  /**
   * @type {import("koa").Middleware<AppState>}
   */
  const checkAuth = async (ctx, next) => {
    const authHeader = ctx.headers.authorization;
    if (!authHeader) {
      ctx.state.user = { status: "unauthorized" };
      await next();
      return;
    }
    const token = authHeader.split(" ")[1];
    try {
      const user = await authService.authenticate(token);
      if (!user) throw {};
      ctx.state.user = { status: "authorized", ...user };
    } catch {
      ctx.state.user = { status: "unauthorized" };
    }
    await next();
  };
  /**
   * @type {import("koa").Middleware<AppState>}
   */
  checkAuth.required = async (ctx, next) => {
    await checkAuth(ctx, async () => {});
    if (ctx.state.user.status !== "authorized") {
      ctx.status = 401;
      ctx.body = { error: "Unauthorized" };
      return;
    }
    await next();
  };
  return checkAuth;
}
/**
 * Authentication middleware interface
 * @typedef {import("koa").Middleware<AppState> & { required: import("koa").Middleware<AppState>}} AuthMiddleware
 * @property {import("koa").Middleware<AppState>} required - Middleware that ensures the user is authenticated
 */
