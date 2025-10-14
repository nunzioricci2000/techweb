import Router from "@koa/router";
import validate from "../../middleware/validate.js";
import Joi from "joi";
import parseBody from "../../middleware/parse-body.js";
import prune from "../../middleware/prune.js";
import authController from "./auth.controller.js";
import checkAuth from "./auth.middleware.js";

const username = Joi.string().alphanum().min(8).max(30).required();
const password = Joi.string()
  .pattern(new RegExp("^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}$"))
  .required();

const router = new Router({ routerPath: "/auth" });

/**
 * Get current user info
 */
router.get(
  //
  "/me",
  checkAuth.required,
  authController.me,
);

/**
 * User login
 */
router.post(
  "/login",
  parseBody,
  validate(
    Joi.object({
      username,
      password,
    }),
  ),
  prune(
    Joi.object({
      username,
    }),
  ),
  authController.login,
);

/**
 * User registration
 */
router.post(
  "/register",
  parseBody,
  validate(
    Joi.object({
      username,
      password,
    }),
  ),
  prune(
    Joi.object({
      username,
    }),
  ),
  authController.register,
);

export default router;
