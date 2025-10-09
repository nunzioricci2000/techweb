import { html } from "htm/preact";
import { Router } from "preact-router";
import HomePage from "./pages/home.js";
import { Fragment } from "preact";
import LoginPage from "./pages/login.js";
import NotFoundPage from "./pages/not-found.js";
import NavbarComponent from "./components/navbar.js";
import MePage from "./pages/me.js";

const AppRouter = () => html`
  <${Fragment}>
    <header><${NavbarComponent} /></header>
    <main>
      <${Router}>
        <${HomePage} path="/" />
        <${LoginPage} path="/login" />
        <${MePage} path="/me" />
        <${NotFoundPage} default />
      <//>
    </main>
  <//>
`;

export default AppRouter;
