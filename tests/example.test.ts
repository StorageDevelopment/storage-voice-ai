import request from "supertest";
import app from "../src/app";
const assert = require("assert");

const testPayload = {
  message: {
    toolCalls: [
      {
        id: 1,
        function: {
          name: "getAllUnits",
        },
      },
    ],
  },
};

describe("Example Test Suite", () => {
  it("should return true for 1 + 1 = 2", () => {
    assert.strictEqual(1 + 1, 2);
  });

  it("should return 200 OK", (done) => {
    request(app).post("/api/tools").send(testPayload).expect(200, done);
  });

  it("should filter isRentable", (done) => {
    request(app)
      .post("/api/tools?isRentable=true")
      .send(testPayload)
      .expect(200, done);
  });

  xit("should filter findBySize", (done) => {
    request(app)
      .post("/api/tools?findBySize=15x10")
      .send(testPayload)
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
      .post("/api/tools?findByPrice=[10,1000]")
      .send(testPayload)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(parseInt(res.body[0]._dcWebRate) <= 1000);
        assert(parseInt(res.body[0]._dcWebRate) >= 10);
        done();
      });
  });

  it("should filter by multiple rules", (done) => {
    request(app)
      .post("/api/tools?isRentable=true&findBySize=15x10")
      .send(testPayload)
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
