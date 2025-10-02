import { html } from "htm/preact";
import { render } from "preact";
import App from "./app";

render(html`<${App} />`, document.body);
