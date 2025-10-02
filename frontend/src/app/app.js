import { html } from "htm/preact";
import AppRouter from "./router";

export default function App() {
  return html`<${AppRouter} />`;
}
