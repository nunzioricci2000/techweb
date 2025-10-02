import fs from 'fs/promises'

/** @type {import('@web/dev-server').DevServerConfig} */
export default {
  open: "/",
  rootDir: "src",
  nodeResolve: true,
  watch: true,
  middleware: [
    async function onNotFound(ctx, next) {
      await next();
      if (ctx.status === 404) {
        ctx.body = (await fs.readFile("src/index.html")).toString();
      }
    },
  ],
};
