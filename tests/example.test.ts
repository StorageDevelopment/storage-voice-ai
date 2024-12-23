import request from "supertest";
import app from "../src/app";
import { expect } from "earl";
const assert = require("assert");

// you can use a global variable if tests span many files
let currentResponse: any | null = null;

afterEach(function () {
  const errorBody = currentResponse && currentResponse.body;

  if (this.currentTest) {
    if (this.currentTest.state === 'failed' && errorBody) {
      console.log(errorBody);
    }
  }

  currentResponse = null;
});


describe("Primary Unit Tests", () => {
  // it("should return true for 1 + 1 = 2", () => {
  //   assert.strictEqual(1 + 1, 2);
  // });



  it.skip("should return 200 OK for getUnits", (done) => {
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
                "name": "getUnits",
                "arguments": {
                }
              }
            }
          ]
        }
      })
      .expect(200)
      .end((err, response : any) => {
        currentResponse = response; // update it here
        if (err) return done(err);
        return done();
      })
  });

  it.skip("should return 200 for getTenant", (done) => {

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
                "name": "getAccount",
                "arguments": {
                  "firstName": "Mocha",
                  "lastName": "UnitTest",
                  "phone": "1234567890"
                }
              }
            }
          ]
        }
      })
      .expect(200)
      .end((err, response : any) => {
        currentResponse = response; // update it here
        if (err) return done(err);
        return done();
      })
  });

  it.skip("should return 200 for createTenant", (done) => {

    //get the number of ticks since the Unix Epoch (January 1, 1970 00:00:00 GMT)
    let ticks = new Date().getTime();

    //create a test last name
    const lastName = "UnitTest" + ticks;
    const firstName = "Mocha";
    const phone = "1234567890";

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
                "name": "createAccount",
                "arguments": {
                  "firstName": firstName,
                  "lastName": lastName,
                  "phone": phone
                }
              }
            }
          ]
        }
      })
      .expect(200)
      .end((err, response : any) => {
        currentResponse = response; // update it here
        if (err) return done(err);
        return done();
      })
  });

  it.skip("should return 200 for getAvailableUnit", (done) => {

    //get the number of ticks since the Unix Epoch (January 1, 1970 00:00:00 GMT)
    let ticks = new Date().getTime();

    //create a test last name
    const lastName = "UnitTest" + ticks;
    const firstName = "Mocha";
    const phone = "1234567890";

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
                "name": "getAvailableUnit",
                "arguments": {
                  "width": 10,
                  "length": 20
                }
              }
            }
          ]
        }
      })
      .expect(200)
      .expect((res) => {

        const unitId = res.body.results[0].result.availableStorageUnit.unitID;

         expect(unitId).not.toBeNullish();
         expect(unitId).not.toBeEmpty();
         })
      .end((err, response : any) => {
        currentResponse = response; // update it here
        if (err) return done(err);
        return done();
      })
  });

  it.skip("should return 200 for makeReservation", (done) => {

    
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
                "name": "makeReservation",
                "arguments": {
                  "tenantID": "401557",
                  "unitID": "92110",
                  "dateNeeded": "2022-01-01"
                }
              }
            }
          ]
        }
      })
      .expect(200)
      .expect((res) => {

        const unitId = res.body.results[0].result.reservation.unitID;

         expect(unitId).not.toBeNullish();
         expect(unitId).not.toBeEmpty();
         })
      .end((err, response : any) => {
        currentResponse = response; // update it here
        if (err) return done(err);
        return done();
      })
  });

  it("should return 200 for performMoveIn", (done) => {

    
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
                "name": "performMoveIn",
                "arguments": {
                  "tenantID": "401207",
                  "unitID": "92112",
                  "dateNeeded": "2024-12-14",
                  "creditCard": "4111111111111111",
                  "expirationDate": "2022-01-01",
                  "cvv": "123",
                  "billingName": "John Doe"
                 
                }
              }
            }
          ]
        }
      })
      .expect(200)
      .expect((res) => {

        const unitId = res.body.results[0].result.moveIn.unitID;

         expect(unitId).not.toBeNullish();
         expect(unitId).not.toBeEmpty();
         })
      .end((err, response : any) => {
        currentResponse = response; // update it here
        if (err) return done(err);
        return done();
      })
  });

});

describe("Development Unit Testing", () => {


});