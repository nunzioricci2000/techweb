/** @todo Find a way to avoid this dependecy from a feature */

import authService from "../features/auth/auth.service.js";

console.debug("Loading Check Auth middleware");

/**
 * Check authentication middleware
 * @type {CheckAuth}
 */
const checkAuth = async (ctx, next) => {
  console.debug("Checking authentication for request");
  const authHeader = ctx.headers.authorization;
  if (!authHeader) {
    console.debug("No Authorization header found");
    ctx.state.user = { status: "unauthorized" };
    await next();
    return;
  }
  console.debug("Authorization header:", authHeader);
  const token = authHeader.split(" ")[1];
  console.debug("Extracted token:", token);
  try {
    const user = await authService.authenticate(token);
    if (!user) throw {};
    console.debug("Authenticated user:", user);
    ctx.state.user = { status: "authorized", ...user };
  } catch {
    console.debug("Authentication failed for token:", token);
    ctx.state.user = { status: "unauthorized" };
  }
  await next();
};

/**
 * Ensure the user is authenticated
 * @type {import("koa").Middleware<AppState>}
 */
checkAuth.required = async (ctx, next) => {
  console.debug("Ensuring authentication for request");
  await checkAuth(ctx, async () => {});
  if (ctx.state.user.status !== "authorized") {
    console.debug("Unauthorized access attempt");
    ctx.status = 401;
    ctx.body = { error: "Unauthorized" };
    return;
  }
  console.debug("User is authorized");
  await next();
};

export default checkAuth;

console.debug("Check Auth middleware loaded");

/**
 * @typedef {import("koa").Middleware<AppState>} CheckAuth
 * @property {import("koa").Middleware<AppState>} required - Middleware to ensure authentication
 */
