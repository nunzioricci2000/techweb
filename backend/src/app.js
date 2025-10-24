import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import { getCurrentRouter, setCurrentRouter } from "./core/route.js";

console.debug("Loading application");

const app = new Koa();
app.use(cors());
app.on("error", (error) => {
  console.error("Application error:", error);
});
setCurrentRouter(new Router());
await import("./features/auth/auth.controller.js");
await import("./features/restaurants/restaurants.controller.js");
app.use(getCurrentRouter().routes(), getCurrentRouter().allowedMethods());

console.debug("Application loaded");

export default app;
