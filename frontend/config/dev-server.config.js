/** @type {import('@web/dev-server').DevServerConfig} */
export default {
  open: "/",
  rootDir: 'src',
  nodeResolve: true,
  watch: true,
  middleware: [
    async (ctx, next) => {
      await next();
      if (ctx.status === 404) {
        ctx.redirect("/");
      }
    },
  ],
};