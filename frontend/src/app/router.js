import { html } from 'htm/preact';
import { Router } from 'preact-router';

const HomePage = () => html`<div>Home Page</div>`; // Componente inline per test

const AppRouter = () => html`
  <div>
    <nav>
      <a href="/">Home</a>
    </nav>
    <${Router}>
      <${HomePage} path="/" />
    </${Router}>
  </div>
`;

export default AppRouter;