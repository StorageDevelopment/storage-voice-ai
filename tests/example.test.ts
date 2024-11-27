import request from "supertest";
import app from "../src/app";
//import { expect } from "chai";
const assert = require("assert");

describe.skip("Example Test Suite", () => {
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
  
});

describe("New Testing", () => {
  
  it("should return 200 for getTenant", (done) => {
    
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
                "name": "getTenant",
                "arguments": {
                  "firstName": "Mary",
                  "lastName": "Jane",
                  "phone" : "1112223333"
                }
              }
            }
          ]
        }
      })
      .expect(200, done);

  });

});