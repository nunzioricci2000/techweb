import authService from "./auth.service.js";

/**
 * Login request handler
 * @type {import("koa").Middleware<AppState>}
 */
export const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  const token = await authService.login({ username, password });
  if (token) {
    ctx.body = { token };
  } else {
    ctx.status = 401;
    ctx.body = { error: "Invalid credentials" };
  }
};

/**
 * Registration request handler
 * @type {import("koa").Middleware<AppState>}
 */
export const register = async (ctx) => {
  const { username, password } = ctx.request.body;
  try {
    const token = await authService.register({ username, password });
    ctx.body = { token };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
};

/**
 * Get current user info
 * @type {import("koa").Middleware<AppState>}
 */
export const me = (ctx) => {
  ctx.body = { username: ctx.state.user.username };
};

export default {
  login,
  register,
  me,
};
