import hashHandler from "../../core/hash-handler.js";
import jwtHandler from "../../core/jwt-handler.js";
import authRepository from "./auth.repository.js";

console.debug("Loading Auth service");

/**
 * Authenticates user and returns token
 * @param {AuthData} data
 * @returns {Promise<AuthToken>}
 */
export async function login({ username, password }) {
  console.debug("Attempting login for user:", username);
  const user = await authRepository.getUser({
    by: "username",
    value: username,
  });
  if (!user) {
    console.debug("User not found:", username);
    throw Error("User not found!");
  }
  if (!hashHandler.compare(password, user.password)) {
    console.debug("Wrong password for user:", username);
    throw Error("Wrong password!");
  }
  const result = jwtHandler.sign(username);
  console.debug("Login successful for user:", username);
  return result;
}

/**
 * Registers new user
 * @param {AuthData} data
 * @returns {Promise<AuthToken>}
 */
export async function register({ username, password }) {
  console.debug("Attempting registration for user:", username);
  if (await authRepository.getUser({ by: "username", value: username })) {
    console.debug("User already exists:", username);
    throw Error("User already exists!");
  }
  const hash = hashHandler.hash(password);
  await authRepository.createUser({ username, password: hash });
  const token = jwtHandler.sign(username);
  console.debug("Registration successful for user:", username);
  return token;
}

/**
 * Validates token and returns user
 * @param {AuthToken} token
 * @returns {Promise<User>}
 */
export function authenticate(token) {
  console.debug("Authenticating token:", token);
  const payload = jwtHandler.verify(token);
  if (!payload) {
    console.debug("Invalid token:", token);
    throw Error("Invalid token!");
  }
  const user = authRepository.getUser({
    by: "username",
    value: payload.username,
  });
  if (!user) {
    console.debug("User not found for token:", token);
    throw Error("User not found!");
  }
  console.debug("Authentication successful for user:", payload.username);
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

console.debug("Auth service loaded");
