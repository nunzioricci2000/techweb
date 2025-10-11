import { computed, signal } from "@preact/signals";
import { addInterceptor, request } from "./api.js";
import { pushNotification } from "./notification.js";
import { route } from "preact-router";

/**
 * A reactive signal that holds the current authenticated user object.
 * @type {import('@preact/signals-core').Signal<{username:string,token:string}|null>}
 * @default null - No user is authenticated by default.
 */
const user = signal(null);
/**
 * A computed property that returns the current user's authentication token, or null if not available.
 * @type {import('vue').ComputedRef<string|null>}
 */
const token = computed(() => user.value?.token || null);
/**
 * Whether the user is authenticated or not
 * @type {import('@preact/signals').Signal<boolean>}
 */
export const isAuthenticated = computed(() => user.value !== null);
/**
 * The authenticated user's username, or null if not authenticated
 * @type {import('@preact/signals').Signal<string|null>}
 */
export const username = computed(() => user.value?.username || null);
/**
 * Logs in a user and sets the token
 * @param {{ username: string, password: string }} data
 */
export async function login({ username, password }) {
  const response = await request({
    method: "POST",
    endpoint: "/auth/login",
    body: { username, password },
  });
  user.value = { username, token: response.token };
}
/**
 * Registers a new user and sets the token
 * @param {{ username: string, password: string }} data
 */
export async function register({ username, password }) {
  const response = await request({
    method: "POST",
    endpoint: "/auth/register",
    body: { username, password },
  });
  user.value = { username, token: response.token };
}
/**
 * Fetches the authenticated user's info
 * @returns {Promise<{username: string}>}
 */
export async function me() {
  return await request({
    method: "GET",
    endpoint: "/auth/me",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
}
/**
 * Logs out the current user
 * @returns {void}
 */
export async function logout() {
  user.value = null;
}

addInterceptor((res) => {
  if (res.status === 401) {
    pushNotification("Session expired. Please log in again.", "error", () =>
      route("/"),
    );
    logout();
  }
});
