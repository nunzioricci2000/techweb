console.debug("Loading Route Handler");

/**
 * @type { import("@koa/router")<AppState> | null }
 */
let currentRouter = null;

/**
 * Defines a route for the Koa router.
 * @param {string} method - The HTTP method for the route
 * @param {string} endpoint - The route endpoint
 * @param {import("koa").Middleware<AppState>[]} requestHandlers - The request handlers for the route
 */
export const route = (method, endpoint, requestHandlers) => {
  console.debug(`Defining route: [${method.toUpperCase()}] ${endpoint}`);
  currentRouter[method](endpoint, ...requestHandlers);
};

/**
 * Sets the current router.
 * @param { import("@koa/router")<AppState> | null } router
 */
export const setCurrentRouter = (router) => {
  console.debug("Setting current router");
  currentRouter = router;
};

/**
 * Gets the current router.
 * @returns { import("@koa/router")<AppState> | null }
 */
export const getCurrentRouter = () => currentRouter;

console.debug("Route Handler loaded");

/**
 * @typedef {object} Route
 * @property {string} method - The HTTP method for the route
 * @property {string} endpoint - The route endpoint
 * @property {import("koa").Middleware<AppState>[]} requestHandlers - The request handlers for the route
 */
