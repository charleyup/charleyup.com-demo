import Koa from "koa";
import router from "./router.js";
// import KoaLogger from "koa-logger";

const app = new Koa();

app
    // .use(KoaLogger())
    .use(require("koa-static")("./static"), {
        gzip: true
    })
    .use(router.routes())
    .use(router.allowedMethods());

export default app;
