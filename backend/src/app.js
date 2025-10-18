import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import { getCurrentRouter, setCurrentRouter } from "./core/route.js";

const app = new Koa();
app.use(async (ctx, next) => {
  console.log(`start: ${JSON.stringify(ctx)}`);
  await next();
  console.log(`end: ${JSON.stringify(ctx)}`);
});
app.use(cors());
app.on("error", (error) => {
  console.error(error);
});
setCurrentRouter(new Router());
await import("./features/auth/auth.controller.js");
app.use(getCurrentRouter().routes(), getCurrentRouter().allowedMethods());

export default app;
