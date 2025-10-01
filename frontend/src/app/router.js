import { html } from "htm/preact";
import { Router } from "preact-router";
import HomePage from "./pages/home";
import { Fragment } from "preact";
import LoginPage from "./pages/login";

const AppRouter = () => html`
  <${Fragment}>
    <header>
      <hgroup>
        <h1>Fake Restaurants</h1>
        <p>The Nonciclopedia for Restaurants</p>
      </hgroup>
      <nav>
        <a href="/">Home</a>
        <a href="/login">Log in</a>
      </nav>
    </header>
    <main>
      <${Router}>
        <${HomePage} path="/" />
        <${LoginPage} path="/login" />
      <//>
    </main>
  <//>
`;

export default AppRouter;
