import pug from "pug";
import IndexService from "../service/index.js";

class IndexController {
    static async index (ctx) {
        const posts = await IndexService.getPosts();
        ctx.body = pug.renderFile("app/views/index.pug", {
            posts: posts,
            title: "charley的个人网站",
            description: "charley的个人网站"
        });
    }
    static async post (ctx) {
        const post = await IndexService.getPost(ctx.params.id);
        if (process.env.NODE_ENV === "production") {
            IndexService.postHits(ctx.params.id);
        }
        ctx.body = pug.renderFile("app/views/post.pug", {
            post: post,
            title: post.title,
            description: post.description
        });
    }
    static async notes (ctx) {
        const notes = await IndexService.getNotes();
        ctx.body = pug.renderFile("app/views/notes.pug", {
            notes: notes,
            title: "个人笔记",
            description: "程序员笔记，前端开发笔记"
        });
    }
}

export default IndexController;
