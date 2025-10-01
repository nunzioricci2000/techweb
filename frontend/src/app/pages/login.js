import { html } from "htm/preact";

const LoginPage = () => {
  return html`
    <h2>Log in</h2>
    <form>
      <fieldset>
        <label for="username">Username</label>
        <input
          id="username"
          name="username"
          placeholder="YourAwesomeUsername"
          autocomplete="username"
        />
        <label>Password</label>
        <input
          name="password"
          placeholder="YourSuperSecretPassword"
          autocomplete="current-password"
        />
      </fieldset>
      <input type="submit" value="Log in" />
      <!--
    <small
      >You don't have an account yet? <a href="/register">Register!</a></small
    >
    -->
    </form>
  `;
};

export default LoginPage;
