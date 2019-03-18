import pinyin from "pinyin";
import dayjs from "dayjs";
import marked from "marked";
import Posts from "../model/posts.js";
export default {
    async getPosts () {
        const result = await Posts.findAll({
            attributes: ["title", "id", "createdAt", "classify"],
            where: {
                classify: ["CODING", "LIVING"],
                visible: 1
            },
            order: [
                ["createdAt", "DESC"]
            ]
        });
        const posts = {};
        result.forEach(item => {
            item.slug = pinyin(item.title, { style: pinyin.STYLE_NORMAL }).join("-");
            item.createTime = dayjs(item.createdAt).format("MMMM YYYY");
            if (!posts[item.classify]) {
                posts[item.classify] = [];
            }
            posts[item.classify].push(item);
        });
        return posts;
    },
    async getPost (id) {
        const post = await Posts.findById(id, {
            attributes: ["title", "createdAt", "content", "description", "hits"],
        });
        post.content = marked(post.content);
        post.createTime = dayjs(post.createdAt).format("MMMM YYYY");
        return post;
    },
    async getNotes () {
        const notes = await Posts.findAll({
            attributes: ["title", "id", "createdAt", "classify"],
            where: {
                classify: ["NOTE"]
            },
            order: [
                ["createdAt", "DESC"]
            ]
        });
        notes.forEach(item => {
            item.slug = pinyin(item.title, { style: pinyin.STYLE_NORMAL }).join("-");
            item.createTime = dayjs(item.createdAt).format("MMMM YYYY");
        });
        return notes;
    },
    async postHits (id) {
        const post = await Posts.findById(id);
        post.update({
            hits: post.hits + 1
        });
    }
};
