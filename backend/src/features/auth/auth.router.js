import Router from "@koa/router";
import bodyParser from "@koa/bodyparser";
import validate from "../../middleware/validate.js";
import Joi from "joi";

const formSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

/**
 *
 * @param {AuthRouterDeps} deps
 * @returns {AuthRouter}
 */
export default function AuthRouter({ authController, checkAuth }) {
  const router = new Router();
  router.use(bodyParser({
    onError(err, ctx) {
      ctx.throw(422, "body parse error");
    },
  }));
  router.post("/login", validate(formSchema), authController.login);
  router.post("/register", validate(formSchema), authController.register);
  router.get("/me", checkAuth.required, authController.me);
  return router;
}

/**
 * @typedef {import("@koa/router")} AuthRouter
 */

/**
 * @typedef {object} AuthRouterDeps
 * @property {import("./auth.controller").AuthController} authController - The authentication controller
 * @property {import("./auth.middleware").AuthMiddleware} checkAuth - Middleware to check authentication
 */
