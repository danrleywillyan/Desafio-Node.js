const request = require("supertest");
const app = require("../server");

describe("GET /", () => {
    it("respond with Bem vindo ao desafio.", (done) => {
        request(app).get("/").expect(`{"message":"Bem vindo ao desafio."}`, done);
    })
});