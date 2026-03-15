import { describe, it, expect } from "vitest";
import  request from "supertest";
import app from "../src/server.js";

describe("GET /api/breweries", () => {
    it("should return breweries", async () => {
        const res = await request(app).get("/api/breweries")

        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body.data)).toBe(true)
    })
})
