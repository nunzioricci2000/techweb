import { computed, signal } from "@preact/signals";
import { request } from "./api.js";

/** @type {import('@preact/signals').Signal<string|null>} */
const token = signal(null);
export const isAuthenticated = computed(() => token.value !== null);

export async function login({ username, password }) {
  const response = await request({
    method: "POST",
    endpoint: "/auth/login",
    body: { username, password },
  });
  token.value = response.token;
}

export async function register({ username, password }) {
  const response = await request({
    method: "POST",
    endpoint: "/auth/register",
    body: { username, password },
  });
  token.value = response.token;
}

export async function me() {
  return await request({
    method: "GET",
    endpoint: "/auth/me",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
}
