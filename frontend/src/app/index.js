import { html } from "htm/preact";
import { render } from "preact";
import App from "./app.js";

render(html`<${App} />`, document.body);
