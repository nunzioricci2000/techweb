import { html } from "htm/preact";
import { isAuthenticated, username } from "../services/auth.js";

export default function NavbarComponent() {
  return html`
    <nav>
      <hgroup>
        <h1>Fake Restaurants</h1>
        <p>The Nonciclopedia for Restaurants</p>
      </hgroup>
      <ul>
        <li><a href="/">Home</a></li>
        ${isAuthenticated.value
          ? html`<li><a href="/me">Hi, ${username.value}!</a></li>`
          : html`<li><a href="/login">Log in</a></li>`}
      </ul>
    </nav>
  `;
}
