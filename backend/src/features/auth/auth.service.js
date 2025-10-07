/**
 * @param {AuthServiceDeps} deps
 * @returns {AuthService}
 */
export default function AuthService({
  authRepository,
  jwtHandler,
  hashHandler,
}) {
  return {
    /**
     * Authenticates user and returns token
     * @param {AuthData} data
     * @returns {Promise<AuthToken>}
     */
    login: async ({ username, password }) => {
      const user = await authRepository.getUser({ byUsername: username });
      if (!user) throw Error("User not found!");
      if (!hashHandler.compare(password, user.password))
        throw Error("Wrong password!");
      return jwtHandler.sign(username);
    },
    /**
     * Registers new user
     * @param {AuthData} data
     * @returns {Promise<AuthToken>}
     */
    register: async ({ username, password }) => {
      if (await authRepository.getUser({ byUsername: username }))
        throw Error("User already exists!");
      const hash = hashHandler.hash(password);
      authRepository.createUser({ username, password: hash });
      return jwtHandler.sign(username);
    },
    /**
     * Validates token and returns user
     * @param {AuthToken} token
     * @returns {Promise<User>}
     */
    authenticate: (token) => {
      const payload = jwtHandler.verify(token);
      if (!payload) throw Error("Invalid token!");
      const user = authRepository.getUser({ byUsername: payload.username });
      if (!user) throw Error("User not found!");
      return user;
    },
  };
}

/**
 * @typedef {object} AuthServiceDeps
 * @property {import("./auth.repository").AuthRepository} authRepository - Authentication repository
 * @property {import("../auth/infrastracture/jwt-handler").JwtHandler} jwtHandler - JWT handler
 * @property {import("../auth/infrastracture/hash-handler").HashHandler} hashHandler - Password hash handler
 */

/**
 * Authentication service interface
 * @typedef {object} AuthService
 * @property {function(AuthData): Promise<AuthToken>} login - Authenticates user and returns token
 * @property {function(AuthData): Promise<AuthToken>} register - Registers new user
 * @property {function(AuthToken): Promise<User>} authenticate - Validates token and returns user
 */

/**
 * Authentication token
 * @typedef {string} AuthToken
 */
