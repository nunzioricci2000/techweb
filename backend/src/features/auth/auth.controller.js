import authService from "./auth.service.js";
import { route } from "../../core/route.js";
import checkAuth from "../../middleware/check-auth.js";
import parseBody from "../../middleware/parse-body.js";
import validate from "../../middleware/validate.js";
import prune from "../../middleware/prune.js";
import Joi from "joi";
import { logger } from "../../core/logger.js";

logger.debug("Loading Auth controller");

const username = Joi.string().alphanum().min(8).max(30);
const password = Joi.string().pattern(
  new RegExp("^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}$"),
);

/**
 * Login request handler
 */
route("post", "/auth/login", [
  parseBody,
  validate(
    Joi.object({
      username: username.required(),
      password: password.required(),
    }),
  ),
  prune(
    Joi.object({
      token: Joi.string().required(),
    }),
  ),
  async (ctx) => {
    logger.debug("Handling login request");
    const { username, password } = ctx.request.body;
    logger.debug(`Login attempt for user: ${username}`);
    const token = await authService.login({ username, password });
    if (token) {
      logger.debug(`Login successful for user: ${username}`);
      ctx.body = { token };
    } else {
      logger.debug(`Login failed for user: ${username}`);
      ctx.status = 401;
      ctx.body = { error: "Invalid credentials" };
    }
  },
]);

/**
 * Registration request handler
 */
route("post", "/auth/register", [
  parseBody,
  validate(
    Joi.object({
      username: username.required(),
      password: password.required(),
    }),
  ),
  prune(
    Joi.object({
      token: Joi.string().required(),
    }),
  ),
  async (ctx) => {
    logger.debug("Handling registration request");
    const { username, password } = ctx.request.body;
    logger.debug(`Registration attempt for user: ${username}`);
    try {
      const token = await authService.register({ username, password });
      logger.debug(`Registration successful for user: ${username}`);
      ctx.body = { token };
    } catch (error) {
      logger.debug(
        `Registration failed for user: ${username} - ${error.message}`,
      );
      ctx.status = 400;
      ctx.body = { error: error.message };
    }
  },
]);

/**
 * Get current user info
 */
route("get", "/auth/me", [
  prune(
    Joi.object({
      username: username.required(),
    }),
  ),
  checkAuth.required,
  (ctx) => {
    logger.debug("Handling get current user request for user:", ctx.state.user);
    ctx.body = { username: ctx.state.user.username };
  },
]);

logger.debug("Auth controller loaded");
