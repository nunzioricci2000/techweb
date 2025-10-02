import { html } from "htm/preact";
import { signal, computed, batch } from "@preact/signals-core";

const usernameError = signal("");
const passwordError = signal("");

/**
 * showUsernameError is strangely typed as true | null
 * because aria-invalid behaves differently if set to
 * false or not set at all
 */
const showUsernameError = computed(() => {
  return usernameError.value !== "" ? true : null;
});
/** @see showUsernameError */
const showPasswordError = computed(() => {
  return passwordError.value !== "" ? true : null;
});

/**
 * @param {SubmitEvent} e
 */
const onSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const username = data.get("username");
  const password = data.get("password");
  let isInputValidated = true;
  batch(() => {
    usernameError.value = "";
    passwordError.value = "";
    if (username.length < 8) {
      usernameError.value = "The username must be 8 characters at least!";
      isInputValidated = false;
    }
    if (password.length < 8) {
      passwordError.value = "The password must be 8 characters at least!";
      isInputValidated = false;
    }
  });
  if (!isInputValidated) return;
  console.log("logged!");
};

export default function LoginPage() {
  return html`
    <h2>Log in</h2>
    <form onSubmit=${onSubmit}>
      <fieldset>
        <label for="username">
          Username
          <input
            id="username"
            name="username"
            placeholder="YourAwesomeUsername"
            autocomplete="username"
            aria-invalid="${showUsernameError}"
          />
          ${showUsernameError.value &&
          html`<small>${usernameError.value}</small>`}
        </label>
        <label>
          Password
          <input
            name="password"
            placeholder="YourSuperSecretPassword"
            autocomplete="current-password"
            type="password"
            aria-invalid="${showPasswordError}"
          />
          ${showPasswordError.value &&
          html`<small>${passwordError.value}</small>`}
        </label>
      </fieldset>
      <input type="submit" value="Log in" />
      <small
        >You don't have an account yet? <a href="/register">Register!</a></small
      >
    </form>
  `;
}
