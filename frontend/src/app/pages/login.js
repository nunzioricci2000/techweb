import { html } from "htm/preact";

const LoginPage = () => html`
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
  </form>
`;

export default LoginPage;
