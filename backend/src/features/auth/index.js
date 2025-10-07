import AuthRepository from "./auth.repository.js";
import AuthService from "./auth.service.js";
import AuthController from "./auth.controller.js";
import AuthRouter from "./auth.router.js";
import AuthMiddleware from "./auth.middleware.js";
import JwtHandler from "./infrastracture/jwt-handler.js";
import HashHandler from "./infrastracture/hash-handler.js";

/**
 *
 * @param {object} deps
 * @returns {Auth}
 */
export default function Auth(deps) {
  deps.jwtHandler = JwtHandler(deps);
  deps.hashHandler = HashHandler(deps);
  deps.authRepository = AuthRepository(deps);
  deps.authService = AuthService(deps);
  deps.authController = AuthController(deps);
  deps.checkAuth = AuthMiddleware(deps);
  deps.authRouter = AuthRouter(deps);
  return deps;
}

/**
 * @typedef {object} Auth
 * @property {import("./auth.controller").AuthController} authController
 * @property {import("./auth.router").AuthRouter} authRouter
 * @property {import("./auth.middleware").AuthMiddleware} checkAuth
 * @property {import("./auth.service").AuthService} authService
 * @property {import("./auth.repository").AuthRepository} authRepository
 * @property {import("./infrastracture/jwt-handler").JwtHandler} jwtHandler
 * @property {import("./infrastracture/hash-handler").HashHandler} hashHandler
 */
