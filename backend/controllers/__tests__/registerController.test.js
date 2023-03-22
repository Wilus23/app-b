const request = require("supertest");
const app = require("../../server");
const User = require("../../models/userModel");
const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Test the register route", () => {
  afterEach(async () => {
    await User.deleteMany({ email: "test@test.com" });
  });

  test("It should return 201 status code and a message 'Register succesfull!' if the registration is successful", async () => {
    const user = {
      email: "test@test.com",
      firstName: "Test",
      password: "testpassword",
    };

    const response = await request(app).post("/api/users/register").send(user);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Register succesfull!");
  });

  test("It should return 400 status code and a message 'User exists with that particular email' if the user with the same email already exists", async () => {
    const user = {
      email: "test1@test.com",
      firstName: "Test1",
      password: "testpassword1",
    };

    await request(app).post("/api/users/register").send(user);
    const response = await request(app).post("/api/users/register").send(user);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      "User exists with that particular email"
    );
  });
});
