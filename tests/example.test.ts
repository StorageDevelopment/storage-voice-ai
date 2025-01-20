import request from "supertest";
import app from "../src/app";
import { expect } from "earl";
import exp from "constants";
const assert = require("assert");

// you can use a global variable if tests span many files
let currentResponse: any | null = null;

// afterEach(function () {
//   const errorBody = currentResponse && currentResponse.body;

//   if (this.currentTest) {
//     if (this.currentTest.state === 'failed' && errorBody) {
//       console.log(errorBody);
//     }
//   }

//   currentResponse = null;
// });


// describe.skip("Primary Unit Tests", () => {
//   // it("should return true for 1 + 1 = 2", () => {
//   //   assert.strictEqual(1 + 1, 2);
//   // });



//   it.skip("should return 200 OK for getUnits", (done) => {
//     request(app)
//       .post("/api/tools")
//       .send({
//         "message": {
//           "timestamp": 0,
//           "type": "tool-calls",
//           "toolCalls": [
//             {
//               "id": "call_3JewUpif1jmC6YWLITvVEn7U",
//               "type": "function",
//               "function": {
//                 "name": "getUnits",
//                 "arguments": {
//                 }
//               }
//             }
//           ]
//         }
//       })
//       .expect(200)
//       .end((err, response : any) => {
//         currentResponse = response; // update it here
//         if (err) return done(err);
//         return done();
//       })
//   });

//   it.skip("should return 200 for getTenant", (done) => {

//     request(app)
//       .post("/api/tools")
//       .send({
//         "message": {
//           "timestamp": 0,
//           "type": "tool-calls",
//           "toolCalls": [
//             {
//               "id": "call_3JewUpif1jmC6YWLITvVEn7U",
//               "type": "function",
//               "function": {
//                 "name": "getAccount",
//                 "arguments": {
//                   "firstName": "Mocha",
//                   "lastName": "UnitTest",
//                   "phone": "1234567890"
//                 }
//               }
//             }
//           ]
//         }
//       })
//       .expect(200)
//       .end((err, response : any) => {
//         currentResponse = response; // update it here
//         if (err) return done(err);
//         return done();
//       })
//   });

//   it.skip("should return 200 for createTenant", (done) => {

//     //get the number of ticks since the Unix Epoch (January 1, 1970 00:00:00 GMT)
//     let ticks = new Date().getTime();

//     //create a test last name
//     const lastName = "UnitTest" + ticks;
//     const firstName = "Mocha";
//     const phone = "1234567890";

//     request(app)
//       .post("/api/tools")
//       .send({
//         "message": {
//           "timestamp": 0,
//           "type": "tool-calls",
//           "toolCalls": [
//             {
//               "id": "call_3JewUpif1jmC6YWLITvVEn7U",
//               "type": "function",
//               "function": {
//                 "name": "createAccount",
//                 "arguments": {
//                   "firstName": firstName,
//                   "lastName": lastName,
//                   "phone": phone
//                 }
//               }
//             }
//           ]
//         }
//       })
//       .expect(200)
//       .end((err, response : any) => {
//         currentResponse = response; // update it here
//         if (err) return done(err);
//         return done();
//       })
//   });

//   it.skip("should return 200 for getAvailableUnit", (done) => {

//     //get the number of ticks since the Unix Epoch (January 1, 1970 00:00:00 GMT)
//     let ticks = new Date().getTime();

//     //create a test last name
//     const lastName = "UnitTest" + ticks;
//     const firstName = "Mocha";
//     const phone = "1234567890";

//     request(app)
//       .post("/api/tools")
//       .send({
//         "message": {
//           "timestamp": 0,
//           "type": "tool-calls",
//           "toolCalls": [
//             {
//               "id": "call_3JewUpif1jmC6YWLITvVEn7U",
//               "type": "function",
//               "function": {
//                 "name": "getAvailableUnit",
//                 "arguments": {
//                   "width": 10,
//                   "length": 20
//                 }
//               }
//             }
//           ]
//         }
//       })
//       .expect(200)
//       .expect((res) => {

//         const unitId = res.body.results[0].result.availableStorageUnit.unitID;

//          expect(unitId).not.toBeNullish();
//          expect(unitId).not.toBeEmpty();
//          })
//       .end((err, response : any) => {
//         currentResponse = response; // update it here
//         if (err) return done(err);
//         return done();
//       })
//   });

//   it.skip("should return 200 for makeReservation", (done) => {


//     request(app)
//       .post("/api/tools")
//       .send({
//         "message": {
//           "timestamp": 0,
//           "type": "tool-calls",
//           "toolCalls": [
//             {
//               "id": "call_3JewUpif1jmC6YWLITvVEn7U",
//               "type": "function",
//               "function": {
//                 "name": "makeReservation",
//                 "arguments": {
//                   "tenantID": "401557",
//                   "unitID": "92110",
//                   "dateNeeded": "2022-01-01"
//                 }
//               }
//             }
//           ]
//         }
//       })
//       .expect(200)
//       .expect((res) => {

//         const unitId = res.body.results[0].result.reservation.unitID;

//          expect(unitId).not.toBeNullish();
//          expect(unitId).not.toBeEmpty();
//          })
//       .end((err, response : any) => {
//         currentResponse = response; // update it here
//         if (err) return done(err);
//         return done();
//       })
//   });

//   it.skip("should return 200 for performMoveIn", (done) => {


//     request(app)
//       .post("/api/tools")
//       .send({
//         "message": {
//           "timestamp": 0,
//           "type": "tool-calls",
//           "toolCalls": [
//             {
//               "id": "call_3JewUpif1jmC6YWLITvVEn7U",
//               "type": "function",
//               "function": {
//                 "name": "performMoveIn",
//                 "arguments": {
//                   "tenantID": "401207",
//                   "unitID": "92112",
//                   "dateNeeded": "2024-12-14",
//                   "creditCard": "4111111111111111",
//                   "expirationDate": "2022-01-01",
//                   "cvv": "123",
//                   "billingName": "John Doe"

//                 }
//               }
//             }
//           ]
//         }
//       })
//       .expect(200)
//       .expect((res) => {

//         const unitId = res.body.results[0].result.moveIn.unitID;

//          expect(unitId).not.toBeNullish();
//          expect(unitId).not.toBeEmpty();
//          })
//       .end((err, response : any) => {
//         currentResponse = response; // update it here
//         if (err) return done(err);
//         return done();
//       })
//   });

// });

describe("Management App Unit Testing", () => {

  it("should return 200 for management app login", (done) => {

    request(app)
      .post("/api/mgmt/locations/mspv/login")
      .send({
        "user": "tuser",
        "pass": "tuser"
      })
      .expect((res) => {


        const userId = res.body.userId;
        expect(res.status).toEqual(200);
        expect(userId).not.toBeNullish();
        expect(userId).not.toBeEmpty();

      })
      .end(function(err, res) {
        if (err) throw err;
        return done();
      });
  });

  it("should return 401 for management app login", (done) => {

    request(app)
      .post("/api/mgmt/locations/mspv/login")
      .send({
        "user": "tuser",
        "pass": "wrongpass"
      })
      .expect((res) => {


        const tasklistId = res.body.tasklistId;
        expect(res.status).toEqual(401);

      })
      .end(function(err, res) {
        if (err) throw err;
        return done();
      });
  });

  it("should return 200 for getting checklist", (done) => {

    request(app)
      .get("/api/mgmt/locations/mspv/tasklist")
      .send()
      .expect((res) => {

        const taskId = res.body[0].id;

        expect(res.status).toEqual(200);

        expect(taskId).not.toBeNullish();
        expect(taskId).not.toBeEmpty();

      })
      .end(function(err, res) {
        if (err) throw err;
        return done();
      });
  });

  it("should return 200 for clearing the checklist", (done) => {

    request(app)
      .put("/api/mgmt/locations/mspv/tasklist")
      .send({action: "clearStatus"})
      .expect(200)
      .expect((res) => {

        for (const item of res.body) {

          const status = item.status;

          expect(status).toEqual("open");
          
        }

      })
      .end(function(err, res) {
        if (err) throw err;
        return done();
      });

  });

  it("should return 200 for updating checklist item", (done) => {

    request(app)
      .put("/api/mgmt/locations/mspv/tasklist")
      .send({
        action: "updateTask",
        userId: 1,
        taskId: 1,
        gpsLatitude: 123.456,
        gpsLongitude: -65.2353

      })
      .expect(200)
      .expect((res) => {

        const item = res.body.filter((item: any) => item.id === 1)[0];
        expect(item).not.toBeNullish();
        expect(item).not.toBeEmpty();
        expect(item.status).toEqual("closed");
        expect(item.timestamp).not.toBeEmpty();
        expect(item.gpsLatitude).not.toBeEmpty();
        expect(item.gpsLongitude).not.toBeEmpty();
        expect(item.completedBy).not.toBeEmpty();
        expect(item.timestamp).not.toBeNullish();
        expect(item.gpsLatitude).not.toBeNullish();
        expect(item.gpsLongitude).not.toBeNullish();
        expect(item.completedBy).not.toBeNullish();

      })
      .end(function(err, res) {
        if (err) throw err;
        return done();
      });

  });

  it("should return 200 for retrieving presigned upload url", (done) => {

    request(app)
      .put("/api/mgmt/aws/presignedurl/objectkey")
      .send()
      .expect(200)
      .expect((res) => {

        const url = res.body.url;
        expect(url).not.toBeNullish();
        expect(url).not.toBeEmpty();
      })
      .end(function(err, res) {
        if (err) throw err;
        return done();
      });

  });

  it("should return 200 for retrieving presigned download url", (done) => {

    request(app)
      .get("/api/mgmt/aws/presignedurl/objectkey")
      .send()
      .expect(200)
      .expect((res) => {

        const url = res.body.url;
        expect(url).not.toBeNullish();
        expect(url).not.toBeEmpty();
      })
      .end(function(err, res) {
        if (err) throw err;
        return done();
      });

  });


});