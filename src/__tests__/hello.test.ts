import request from "supertest";

import app from "../app";

describe("Hello route", () => {
  it("returns a json with the value world", async () => {
    const response = await request(app).get("/hello");

    expect(response.status).toBe(200);
    expect(response.body.hello).toBe("world");
  });
});
