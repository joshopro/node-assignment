const mongoose = require("mongoose");
const request = require("supertest");
const { server, app } = require("../src/app");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

afterAll(() => {
  server.close();
});

describe("GET /api/employee", () => {
  it("should return all employees", async () => {
    const res = await request(app).get("/api/employee");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});

var id;

describe("POST /api/employee", () => {
  it("should create a product", async () => {
    const res = await request(app).post("/api/employee").send({
      EmpID: 21,
      Name: "Mr. C",
      Address: "Abcasas street road 2 NYC",
      DeptID: 11,
      AssestID: 987,
    });
    id = res.body.data._id;
    expect(res.statusCode).toBe(201);
    expect(res.body.data.Name).toBe("Mr. C");
  });
});

describe("PUT /api/employee/:id", () => {
  it("should update a employee", async () => {
    const res = await request(app).put(`/api/employee/${id}`).send({
      DeptID: 15,
    });
    console.log("ID---> ", id);
    console.log("res ", res.statusCode);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.DeptID).toBe(15);
  });
});

describe("DELETE /api/employee/:id", () => {
  it("should delete a employee", async () => {
    const res = await request(app).delete(`/api/employee/${id}`);
    expect(res.statusCode).toBe(200);
  });
});
