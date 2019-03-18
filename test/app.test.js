import app from "../app/app.js";
import request from "supertest";

describe("应用测试", () => {
    let server = app.listen(9900);

    after( done => {
        server.close(done);
    });

    it("健康接口", async () => {
        const res = await request(server).get("/healthy").expect("ok!");
    });

    it("不存在的路由", async () => {
        const res = await request(server).get("/ajkdjajdla").expect(404);
    });

});
