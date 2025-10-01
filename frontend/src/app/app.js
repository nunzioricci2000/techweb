import { html } from "htm/preact";
import AppRouter from "./router";

export function App() {
    return html`<${AppRouter} />`;
}