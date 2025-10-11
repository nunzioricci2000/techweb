import { html } from "htm/preact";
import { logout, username } from "../services/auth.js";
import { route } from "preact-router";

const onLogout = () => {
  logout();
  route("/");
};

const MePage = () => {
  return html`
    <h2>Hi, ${username}!</h2>
    <p>
      I don't have other information about you to display. If you want, you can
      send your confidential, top secret, high value information at${" "}
      <a href="mailto:nunzio.ricci.2000@gmail.com">it.isnt@scam.org</a>.
    </p>
    <button onClick=${onLogout}>Log Out</button>
  `;
};

export default MePage;
