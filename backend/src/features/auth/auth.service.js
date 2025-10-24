import hashHandler from "../../core/hash-handler.js";
import jwtHandler from "../../core/jwt-handler.js";
import authRepository from "./auth.repository.js";
import { logger } from "../../core/logger.js";

logger.debug("Loading Auth service");

/**
 * Authenticates user and returns token
 * @param {AuthData} data
 * @returns {Promise<AuthToken>}
 */
export async function login({ username, password }) {
  logger.debug("Attempting login for user:", username);
  const user = await authRepository.getUser({
    by: "username",
    value: username,
  });
  if (!user) {
    logger.debug("User not found:", username);
    throw Error("User not found!");
  }
  if (!hashHandler.compare(password, user.password)) {
    logger.debug("Wrong password for user:", username);
    throw Error("Wrong password!");
  }
  const result = jwtHandler.sign(username);
  logger.debug("Login successful for user:", username);
  return result;
}

/**
 * Registers new user
 * @param {AuthData} data
 * @returns {Promise<AuthToken>}
 */
export async function register({ username, password }) {
  logger.debug("Attempting registration for user:", username);
  if (await authRepository.getUser({ by: "username", value: username })) {
    logger.debug("User already exists:", username);
    throw Error("User already exists!");
  }
  const hash = hashHandler.hash(password);
  await authRepository.createUser({ username, password: hash });
  const token = jwtHandler.sign(username);
  logger.debug("Registration successful for user:", username);
  return token;
}

/**
 * Validates token and returns user
 * @param {AuthToken} token
 * @returns {Promise<User>}
 */
export function authenticate(token) {
  logger.debug("Authenticating token:", token);
  const payload = jwtHandler.verify(token);
  if (!payload) {
    logger.debug("Invalid token:", token);
    throw Error("Invalid token!");
  }
  const user = authRepository.getUser({
    by: "username",
    value: payload.username,
  });
  if (!user) {
    logger.debug("User not found for token:", token);
    throw Error("User not found!");
  }
  logger.debug("Authentication successful for user:", payload.username);
  return user;
}

/**
 * Authentication token
 * @typedef {string} AuthToken
 */

export default {
  login,
  register,
  authenticate,
};

logger.debug("Auth service loaded");
