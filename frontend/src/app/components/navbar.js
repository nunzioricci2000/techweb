import { html } from "htm/preact";

export default function NavbarComponent() {
  return html`
    <nav>
      <hgroup>
        <h1>Fake Restaurants</h1>
        <p>The Nonciclopedia for Restaurants</p>
      </hgroup>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/login">Log in</a></li>
      </ul>
    </nav>
  `;
}
