import { html } from "htm/preact";
import { Router } from "preact-router";
import HomePage from "./pages/home";
import { Fragment } from "preact";
import LoginPage from "./pages/login";
import NotFoundPage from "./pages/not-found";
import NavbarComponent from "./components/navbar";

const AppRouter = () => html`
  <${Fragment}>
    <header><${NavbarComponent} /></header>
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
