const baseUrl = "http://localhost:3000";

export async function request({ method, endpoint, headers, body }) {
  const res = await fetch(baseUrl + endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    throw await res.json();
  }
  return res.json();
}
