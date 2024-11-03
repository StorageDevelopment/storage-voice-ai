import request from "supertest";
import app from "../src/app";

const assert = require("assert");

describe("Example Test Suite", () => {
  it("should return true for 1 + 1 = 2", () => {
    assert.strictEqual(1 + 1, 2);
  });

  it("should return 200 OK", (done) => {
    request(app).get("/api/example").expect(200, done);
  });

  it("should filter isRentable", (done) => {
    request(app)
      .get("/api/example?isRentable=true")
      .expect(200)
      .end((err, res) => {
        console.log(res.body);
        done();
      });
  });

  it("should filter findBySize", (done) => {
    request(app)
      .get("/api/example?findBySize=15x10")
      .expect(200)
      .end((err, res) => {
        console.log(res.body);
        done();
      });
  });

  it("should filter by multiple rules", (done) => {
    request(app)
      .get("/api/example?isRentable=true&findBySize=15x10")
      .expect(200)
      .end((err, res) => {
        console.log(res.body);
        done();
      });
  });
});
