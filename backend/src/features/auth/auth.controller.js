/**
 *
 * @param {import("../services/auth.service").AuthService} deps
 * @returns {AuthController}
 */
export default function AuthController({ authService }) {
  return {
    login: async (ctx) => {
      const { username, password } = ctx.request.body;
      const token = await authService.login({ username, password });
      if (token) {
        ctx.body = { token };
      } else {
        ctx.status = 401;
        ctx.body = { error: "Invalid credentials" };
      }
    },
    register: async (ctx) => {
      const { username, password } = ctx.request.body;
      try {
        const token = await authService.register({ username, password });
        ctx.body = { token };
      } catch (error) {
        ctx.status = 400;
        ctx.body = { error: error.message };
      }
    },
    me: async (ctx) => {
      ctx.body = { username: ctx.state.user.username };
    },
  };
}

/**
 * @typedef {object} AuthController
 * @property {import("koa").Middleware<AppState>} login - Handles user login
 * @property {import("koa").Middleware<AppState>} register - Handles user registration
 * @property {import("koa").Middleware<AppState>} me - Returns the authenticated user's info
 */
