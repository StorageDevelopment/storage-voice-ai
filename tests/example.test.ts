import request from "supertest";
import app from "../src/app";
//import { expect } from "chai";
const assert = require("assert");

describe("Example Test Suite", () => {
  it("should return true for 1 + 1 = 2", () => {
    assert.strictEqual(1 + 1, 2);
  });

  it("should return 200 OK for getAllUnits", (done) => {
    request(app)
      .post("/api/tools")
      .send({
        "message": {
          "timestamp": 0,
          "type": "tool-calls",
          "toolCalls": [
            {
              "id": "call_3JewUpif1jmC6YWLITvVEn7U",
              "type": "function",
              "function": {
                "name": "getAllUnits",
                "arguments": {
                }
              }
            }
          ]
        }
      })
      .expect(200, done);
  });

  // it("should filter isRentable", (done) => {
  //   request(app)
  //     .get("/api/example?isRentable=true")
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       assert(res.body[0]._bRentable === "true");
  //       done();
  //     });
  // });

  // it("should filter findBySize", (done) => {
  //   request(app)
  //     .get("/api/example?findBySize=15x10")
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       assert(res.body[0]._dcWidth === "10.0000");
  //       assert(res.body[0]._dcLength === "15.0000");
  //       done();
  //     });
  // });

  // it("should filter findByPrice", (done) => {
  //   request(app)
  //     .get("/api/example?findByPrice=[10,1000]")
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       assert(parseInt(res.body[0]._dcWebRate) <= 1000);
  //       assert(parseInt(res.body[0]._dcWebRate) >= 10);
  //       done();
  //     });
  // });

  // it("should filter by multiple rules", (done) => {
  //   request(app)
  //     .get("/api/example?isRentable=true&findBySize=15x10")
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       assert(res.body[0]._dcWidth === "10.0000");
  //       assert(res.body[0]._dcLength === "15.0000");
  //       assert(res.body[0]._bRentable === "true");
  //       done();
  //     });
  // });
});
