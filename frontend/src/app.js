import { render } from 'preact';
import { html } from 'htm/preact';

const app = html`<h1>Hello, World!</h1>`;

render(app, document.body);