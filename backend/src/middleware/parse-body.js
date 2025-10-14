import bodyParser from "@koa/bodyparser";

/**
 * Body parsing middleware for Koa.js
 * @type {import("koa").Middleware<AppState>}
 */
export default bodyParser({
  onError(_err, ctx) {
    ctx.throw(422, "body parse error");
  },
});
