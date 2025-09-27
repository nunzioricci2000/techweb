import { h, render } from 'https://esm.sh/preact';

const app = h('h1', null, 'Hello World!');

render(app, document.body);