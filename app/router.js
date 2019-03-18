import KoaRouter from "koa-router";
const router = new KoaRouter();
import IndexController from "./controller/index.js";
// router.prefix("/api");
router
    .get("/", IndexController.index)
    .get("/post/:id/:slug", IndexController.post)
    .get("/note", IndexController.notes)
    .get("/healthy", async (ctx) => {
        ctx.body = "ok!";
    });
export default router;
