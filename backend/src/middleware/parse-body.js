import bodyParser from "@koa/bodyparser";

console.debug("Loading Body Parser Middleware");

/**
 * Body parsing middleware for Koa.js
 * @type {import("koa").Middleware<AppState>}
 */
export default bodyParser({
  onError(err, ctx) {
    console.debug("Body parse error:", err);
    ctx.throw(422, "body parse error");
  },
});

console.debug("Body Parser Middleware loaded");
