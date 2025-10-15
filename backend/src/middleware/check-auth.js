/** @todo Find a way to avoid this dependecy from a feature */
import authService from "../features/auth/auth.service.js";

/**
 * Check authentication middleware
 * @type {CheckAuth}
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
 * Ensure the user is authenticated
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

export default checkAuth;

/**
 * @typedef {import("koa").Middleware<AppState>} CheckAuth
 * @property {import("koa").Middleware<AppState>} required - Middleware to ensure authentication
 */
