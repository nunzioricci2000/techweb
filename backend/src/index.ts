import Koa, { Context, Next } from 'koa';
import Router from '@koa/router';




const app = new Koa();

const router = new Router();

router.get("/hello", (ctx: Context) => {
    ctx.body = "hello";
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);