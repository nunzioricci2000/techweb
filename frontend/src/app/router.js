import { html } from 'htm/preact';
import { Router } from 'preact-router';
import HomePage from './pages/home';
import { Fragment } from 'preact';

const AppRouter = () => html`
  <${Fragment}>
    <header>
      <hgroup>
        <h1>Fake Restaurants</h1>
        <p>The Nonciclopedia for Restaurants</p>
      </hgroup>
      <nav>
        <a href="/">Home</a>
      </nav>
    </header>
    <main>
      <${Router}>
        <${HomePage} path="/" />
      <//>
    </main>
  <//>
`;

export default AppRouter;