import request from "supertest";
import app from "../src/app";
const assert = require("assert");

describe("Example Test Suite", () => {
  it("should return true for 1 + 1 = 2", () => {
    assert.strictEqual(1 + 1, 2);
  });

  xit("should return 200 OK", (done) => {
    request(app).get("/api/tools").expect(200, done);
  });

  xit("should filter isRentable", (done) => {
    request(app)
      .get("/api/example?isRentable=true")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body[0]._bRentable === "true");
        done();
      });
  });

  xit("should filter findBySize", (done) => {
    request(app)
      .get("/api/example?findBySize=15x10")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body[0]._dcWidth === "10.0000");
        assert(res.body[0]._dcLength === "15.0000");
        done();
      });
  });

  xit("should filter findByPrice", (done) => {
    request(app)
      .get("/api/example?findByPrice=[10,1000]")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(parseInt(res.body[0]._dcWebRate) <= 1000);
        assert(parseInt(res.body[0]._dcWebRate) >= 10);
        done();
      });
  });

  xit("should filter by multiple rules", (done) => {
    request(app)
      .get("/api/example?isRentable=true&findBySize=15x10")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body[0]._dcWidth === "10.0000");
        assert(res.body[0]._dcLength === "15.0000");
        assert(res.body[0]._bRentable === "true");
        done();
      });
  });
});
