import Koa from "koa";
import Auth from "./features/auth/index.js";
import Router from "@koa/router";
import db from "./model/index.js";
import cors from "@koa/cors";

export default function App() {
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
  const router = new Router();
  const auth = Auth({ db });
  router.use(
    "/auth",
    auth.authRouter.routes(),
    auth.authRouter.allowedMethods(),
  );
  app.use(router.routes());
  return app;
}
