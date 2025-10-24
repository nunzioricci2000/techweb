/** @todo Find a way to avoid this dependecy from a feature */
import { logger } from "../core/logger.js";
import authService from "../features/auth/auth.service.js";

logger.debug("Loading Check Auth middleware");

/**
 * Check authentication middleware
 * @type {CheckAuth}
 */
const checkAuth = async (ctx, next) => {
  logger.debug("Checking authentication for request");
  const authHeader = ctx.headers.authorization;
  if (!authHeader) {
    logger.debug("No Authorization header found");
    ctx.state.user = { status: "unauthorized" };
    await next();
    return;
  }
  logger.debug("Authorization header:", authHeader);
  const token = authHeader.split(" ")[1];
  logger.debug("Extracted token:", token);
  try {
    const user = await authService.authenticate(token);
    if (!user) throw {};
    logger.debug("Authenticated user:", user);
    ctx.state.user = { status: "authorized", ...user };
  } catch {
    logger.debug("Authentication failed for token:", token);
    ctx.state.user = { status: "unauthorized" };
  }
  await next();
};

/**
 * Ensure the user is authenticated
 * @type {import("koa").Middleware<AppState>}
 */
checkAuth.required = async (ctx, next) => {
  logger.debug("Ensuring authentication for request");
  await checkAuth(ctx, async () => {});
  if (ctx.state.user.status !== "authorized") {
    logger.debug("Unauthorized access attempt");
    ctx.status = 401;
    ctx.body = { error: "Unauthorized" };
    return;
  }
  logger.debug("User is authorized");
  await next();
};

export default checkAuth;

logger.debug("Check Auth middleware loaded");

/**
 * @typedef {import("koa").Middleware<AppState>} CheckAuth
 * @property {import("koa").Middleware<AppState>} required - Middleware to ensure authentication
 */
