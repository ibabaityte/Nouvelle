import request from "supertest";
import app from "../app.js";

describe("GET /scrape", () => {

    test("should respond with status code 200", async () => {
        let response = await request(app).get("/scrape?query=lupdazis&currentPage=0&kristianaCurrentPage=0&productOffset=0");
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        expect(response.body).toBeDefined();
    });

    test("should respond with status code 404", async () => {
        let response = await request(app).get("/scrape?query=lupdazis");
        expect(response.statusCode).toBe(404);
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        expect(response.body).toBeDefined();
    });

    test("should respond with status code 200", async () => {
        let response = await request(app).get("/scrape?currentPage=0");
        expect(response.statusCode).toBe(404);
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        expect(response.body).toBeDefined();
    });

    test("should respond with status code 200", async () => {
        let response = await request(app).get("/scrape?query=lupdazis&currentPage=0");
        expect(response.statusCode).toBe(404);
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        expect(response.body).toBeDefined();
    });

    test("should respond with status code 404", async () => {
        let response = await request(app).get("/scrape");
        expect(response.statusCode).toBe(404);
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        expect(response.body).toBeDefined();
    });

    test("should respond with status code 404", async () => {
        let response = await request(app).get("/wrong");
        expect(response.statusCode).toBe(404);
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("text/html; charset=utf-8"));
        expect(response.body).toBeDefined();
    });

    test("should respond with status code 404", async () => {
        let response = await request(app).get("");
        expect(response.statusCode).toBe(404);
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("text/html; charset=utf-8"));
        expect(response.body).toBeDefined();
    });

});
