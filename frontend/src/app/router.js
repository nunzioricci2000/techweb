import { html } from "htm/preact";
import { Router } from "preact-router";
import HomePage from "./pages/home";
import { Fragment } from "preact";
import LoginPage from "./pages/login";
import NotFoundPage from "./pages/not-found";

const AppRouter = () => html`
  <${Fragment}>
    <header>
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
    </header>
    <main>
      <${Router}>
        <${HomePage} path="/" />
        <${LoginPage} path="/login" />
        <${NotFoundPage} default />
      <//>
    </main>
  <//>
`;

export default AppRouter;
