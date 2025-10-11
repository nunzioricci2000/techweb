const baseUrl = "http://localhost:3000";

/** @type {Array<function(Response): void>} */
const interceptors = [];

/**
 * Sends an HTTP request to the specified API endpoint using fetch.
 *
 * @template {T}
 * @async
 * @function request
 * @param {Object} params - The request parameters.
 * @param {string} params.method - The HTTP method (e.g., 'GET', 'POST').
 * @param {string} params.endpoint - The API endpoint to send the request to.
 * @param {Object} [params.headers] - Additional headers to include in the request.
 * @param {Object} [params.body] - The request payload, if applicable.
 * @returns {Promise<T>} The parsed JSON response from the API.
 * @throws {Object} Throws the parsed JSON error response if the request fails.
 */
export async function request({ method, endpoint, headers, body }) {
  const res = await fetch(baseUrl + endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  interceptors.forEach((interceptor) => interceptor(res));
  if (!res.ok) {
    throw await res.json();
  }
  return await res.json();
}

/**
 * Adds a new interceptor function to the list of interceptors.
 *
 * @param {function(Response): void} newInterceptor - The interceptor function to be added.
 */
export function addInterceptor(newInterceptor) {
  interceptors.push(newInterceptor);
}
