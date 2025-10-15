import Koa from "koa";
import authRouter from "./features/auth/auth.router.js";
import Router from "@koa/router";
import cors from "@koa/cors";

export default function App() {
  const app = new Koa();
  app.context.state = {
    user: { status: "not-checked" },
  };
  app.use(async (ctx, next) => {
    console.log(`start: ${JSON.stringify(ctx)}`);
    await next();
    console.log(`end: ${JSON.stringify(ctx)}`);
  });
  app.use(cors());
  app.on("error", (error) => {
    console.error(error);
  });
  const router = new Router();
  router.use("/auth", authRouter.routes(), authRouter.allowedMethods());
  app.use(router.routes());
  return app;
}
