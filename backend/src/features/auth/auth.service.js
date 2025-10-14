import hashHandler from "./infrastracture/hash-handler.js";
import jwtHandler from "./infrastracture/jwt-handler.js";
import authRepository from "./auth.repository.js";

/**
 * Authenticates user and returns token
 * @param {AuthData} data
 * @returns {Promise<AuthToken>}
 */
export async function login({ username, password }) {
  const user = await authRepository.getUser({ byUsername: username });
  if (!user) throw Error("User not found!");
  if (!hashHandler.compare(password, user.password))
    throw Error("Wrong password!");
  return jwtHandler.sign(username);
}

/**
 * Registers new user
 * @param {AuthData} data
 * @returns {Promise<AuthToken>}
 */
export async function register({ username, password }) {
  if (await authRepository.getUser({ byUsername: username }))
    throw Error("User already exists!");
  const hash = hashHandler.hash(password);
  authRepository.createUser({ username, password: hash });
  return jwtHandler.sign(username);
}

/**
 * Validates token and returns user
 * @param {AuthToken} token
 * @returns {Promise<User>}
 */
export function authenticate(token) {
  const payload = jwtHandler.verify(token);
  if (!payload) throw Error("Invalid token!");
  const user = authRepository.getUser({ byUsername: payload.username });
  if (!user) throw Error("User not found!");
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
