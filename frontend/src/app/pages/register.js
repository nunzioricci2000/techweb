import { html } from "htm/preact";
import { signal, computed, batch } from "@preact/signals";
import { register } from "../services/auth.js";
import { route } from "preact-router";

const loading = signal(false);
const usernameError = signal("");
const passwordError = signal("");
const confirmPasswordError = signal("");

/**
 * isUsernameInvalid is strangely typed as true | null
 * because aria-invalid behaves differently if set to
 * false or not set at all
 */
const isUsernameInvalid = computed(() => {
  return usernameError.value ? true : null;
});
/** @see isUsernameInvalid */
const isPasswordInvalid = computed(() => {
  return usernameError.value ? true : null;
});
/** @see isUsernameInvalid */
const isConfirmPasswordInvalid = computed(() => {
  return confirmPasswordError.value ? true : null;
});

/**
 * Validates the input fields and sets the error messages
 * accordingly.
 * @param {SubmitEvent} e
 * @returns { valid: boolean, username: string, password: string }
 */
const validateInput = (e) =>
  batch(() => {
    const data = new FormData(e.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    let valid = true;
    usernameError.value = "";
    passwordError.value = "";
    if (username.length < 8) {
      usernameError.value = "The username must be 8 characters at least!";
      valid = false;
    }
    if (password.length < 8) {
      passwordError.value = "The password must be 8 characters at least!";
      valid = false;
    }
    if (password !== data.get("confirmPassword")) {
      confirmPasswordError.value = "The passwords do not match!";
      valid = false;
    }
    return {
      valid,
      username,
      password,
    };
  });

/**
 * @param {SubmitEvent} e
 */
const onSubmit = async (e) => {
  try {
    e.preventDefault();
    loading.value = true;
    const { valid, username, password } = validateInput(e);
    if (!valid) return;
    await Promise.all([
      register({ username, password }),
      new Promise((res) => setTimeout(res, 500)),
    ]);
    route("/");
  } catch (error) {
    passwordError.value = error.message;
    console.error(error);
  } finally {
    loading.value = false;
  }
};

export default function RegisterPage() {
  return html`
    <h2>Register</h2>
    <form onSubmit=${onSubmit}>
      <fieldset>
        <label for="username">
          Username
          <input
            id="username"
            name="username"
            placeholder="YourAwesomeUsername"
            autocomplete="username"
            aria-invalid="${isUsernameInvalid}"
          />
          <small>${usernameError}</small>
        </label>
        <label>
          Password
          <input
            name="password"
            placeholder="YourSuperSecretPassword"
            autocomplete="current-password"
            type="password"
            aria-invalid="${isPasswordInvalid}"
          />
          <small>${passwordError}</small>
        </label>
        <label>
          Confirm Password
          <input
            name="confirmPassword"
            placeholder="ConfirmYourSuperSecretPassword"
            autocomplete="new-password"
            type="password"
            aria-invalid="${isConfirmPasswordInvalid}"
          />
          <small>${confirmPasswordError}</small>
        </label>
      </fieldset>
      <button
        type="submit"
        aria-busy="${loading}"
        disabled="${loading}"
        aria-label="${loading ? "processing" : ""}"
      >
        Register
      </button>
      <small
        >Are you already registered?${" "}
        <a href="/login">Log in!</a>
      </small>
    </form>
  `;
}
